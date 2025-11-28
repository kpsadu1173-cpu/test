import React, { useState, useMemo, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { ZakatAssets, AppSettings } from '../types';
import { TEXT } from '../utils/translations';
import { getMetalRatesFromAI } from '../services/geminiService';
import { Edit2, RefreshCw, Info, Globe, Sparkles } from 'lucide-react';

const NISAB_GOLD_GRAMS = 85;
const NISAB_SILVER_GRAMS = 595;

// Comprehensive 24k Gold Price per gram estimates (Fallback Database - Retail Prices ~2025)
// India price boosted to reflect Duty+GST (~8400+ INR)
const ESTIMATED_GOLD_PRICES: Record<string, number> = {
  USD: 88,      // ~$2730/oz
  GBP: 70, 
  EUR: 82, 
  INR: 8450,    // Ref MMTC-PAMP / IBJA retail
  PKR: 24500,
  SAR: 330, 
  AED: 322, 
  KWD: 27, 
  QAR: 320, 
  BHD: 33, 
  OMR: 34,
  MYR: 410, 
  IDR: 1400000, 
  TRY: 2900,
};

// Estimated Silver Price per gram (Fallback Database)
const ESTIMATED_SILVER_PRICES: Record<string, number> = {
  USD: 1.05, 
  GBP: 0.82, 
  EUR: 0.95, 
  INR: 100, // Ref retail silver
  PKR: 290,
  SAR: 3.9, 
  AED: 3.8, 
  KWD: 0.32, 
  QAR: 3.8, 
  BHD: 0.39, 
  OMR: 0.40,
  MYR: 4.8, 
  IDR: 16500, 
  TRY: 35,
};

interface ZakatCalculatorProps {
  settings: AppSettings;
}

const ZakatCalculator: React.FC<ZakatCalculatorProps> = ({ settings }) => {
  const t = TEXT[settings.language];
  
  // State for assets
  const [assets, setAssets] = useState<ZakatAssets>({
    cash: 0,
    goldSilver: 0,
    investments: 0,
    liabilities: 0
  });

  // State for Metal Prices
  const [goldPricePerGram, setGoldPricePerGram] = useState<number>(85);
  const [silverPricePerGram, setSilverPricePerGram] = useState<number>(1);
  const [nisabType, setNisabType] = useState<'GOLD' | 'SILVER'>('GOLD');
  
  const [isEditingGold, setIsEditingGold] = useState(false);
  const [isEditingSilver, setIsEditingSilver] = useState(false);
  const [isFetchingRate, setIsFetchingRate] = useState(false);

  // Initialize prices based on currency when settings change
  useEffect(() => {
    // 1. Set Fallback immediately
    setGoldPricePerGram(ESTIMATED_GOLD_PRICES[settings.currency] || ESTIMATED_GOLD_PRICES['USD']);
    setSilverPricePerGram(ESTIMATED_SILVER_PRICES[settings.currency] || ESTIMATED_SILVER_PRICES['USD']);

    // 2. Auto-fetch from AI if we have a valid country to ensure accuracy
    if (settings.country && settings.isConfigured) {
      handleFetchLiveRate();
    }
  }, [settings.currency, settings.country]);

  // Function to fetch rate from AI
  const handleFetchLiveRate = async () => {
    setIsFetchingRate(true);
    const rates = await getMetalRatesFromAI(settings.currency, settings.country);
    if (rates) {
      if (rates.gold > 0) setGoldPricePerGram(rates.gold);
      if (rates.silver > 0) setSilverPricePerGram(rates.silver);
    }
    setIsFetchingRate(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAssets(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  const calculation = useMemo(() => {
    const totalAssets = assets.cash + assets.goldSilver + assets.investments;
    const netAssets = Math.max(0, totalAssets - assets.liabilities);
    
    // Calculate Nisab thresholds
    const nisabGold = NISAB_GOLD_GRAMS * goldPricePerGram;
    const nisabSilver = NISAB_SILVER_GRAMS * silverPricePerGram;
    
    // Select threshold based on user preference
    const nisabThreshold = nisabType === 'GOLD' ? nisabGold : nisabSilver; 
    
    const isEligible = netAssets >= nisabThreshold;
    const zakatPayable = isEligible ? netAssets * 0.025 : 0;

    return { totalAssets, netAssets, nisabThreshold, nisabGold, nisabSilver, isEligible, zakatPayable };
  }, [assets, goldPricePerGram, silverPricePerGram, nisabType]);

  const chartData = [
    { name: t.ZAKAT_ASSET_CASH, value: assets.cash },
    { name: t.ZAKAT_ASSET_GOLD, value: assets.goldSilver },
    { name: t.ZAKAT_ASSET_INVEST, value: assets.investments },
  ].filter(d => d.value > 0);

  const COLORS = ['#004F59', '#D4AF37', '#800020'];

  return (
    <div className="flex flex-col lg:flex-row gap-8 animate-fade-in w-full max-w-6xl">
      
      {/* Left Column: Inputs */}
      <div className="flex-1 space-y-6">
        
        {/* Market Data Card */}
        <div className="bg-white p-6 rounded-xl border border-ottoman-gold/30 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2 opacity-10"><Info size={40} /></div>
          
          <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-2">
            <h3 className="text-lg font-serif text-ottoman-dark flex items-center gap-2">
              <Globe size={18} /> {settings.country} Market Rates
            </h3>
            <button 
              onClick={handleFetchLiveRate}
              disabled={isFetchingRate}
              className="text-xs flex items-center gap-1 bg-ottoman-teal/10 hover:bg-ottoman-teal/20 text-ottoman-teal px-3 py-1 rounded-full transition-colors disabled:opacity-50"
            >
              {isFetchingRate ? <RefreshCw size={14} className="animate-spin" /> : <Sparkles size={14} />}
              {isFetchingRate ? 'Consulting AI...' : 'Refresh AI Rates'}
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Gold Rate */}
            <div className="bg-ottoman-parchment p-3 rounded-lg border border-ottoman-gold/20 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600 font-bold">{t.LBL_GOLD} (24k/g)</p>
                <p className="text-[10px] text-gray-400">
                  {isFetchingRate ? 'Checking Market...' : settings.country === 'India' ? 'Ref: MMTC/IBJA' : 'Ref: Local Market'}
                </p>
              </div>
              <div className="flex items-center gap-1">
                 <span className="text-ottoman-gold-dim text-xs">{settings.currencySymbol}</span>
                 {isEditingGold ? (
                   <input 
                      type="number" 
                      value={goldPricePerGram}
                      onChange={(e) => setGoldPricePerGram(parseFloat(e.target.value) || 0)}
                      onBlur={() => setIsEditingGold(false)}
                      autoFocus
                      className="w-20 p-1 border border-ottoman-teal rounded text-right font-bold text-sm"
                   />
                 ) : (
                   <span className="font-serif text-lg text-ottoman-dark">{goldPricePerGram.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                 )}
                 <button onClick={() => setIsEditingGold(!isEditingGold)} className="p-1 text-ottoman-teal/60 hover:text-ottoman-teal"><Edit2 size={12} /></button>
              </div>
            </div>

            {/* Silver Rate */}
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600 font-bold">{t.LBL_SILVER} (/g)</p>
                <p className="text-[10px] text-gray-400">Nisab Base (595g)</p>
              </div>
              <div className="flex items-center gap-1">
                 <span className="text-gray-500 text-xs">{settings.currencySymbol}</span>
                 {isEditingSilver ? (
                   <input 
                      type="number" 
                      value={silverPricePerGram}
                      onChange={(e) => setSilverPricePerGram(parseFloat(e.target.value) || 0)}
                      onBlur={() => setIsEditingSilver(false)}
                      autoFocus
                      className="w-20 p-1 border border-gray-400 rounded text-right font-bold text-sm"
                   />
                 ) : (
                   <span className="font-serif text-lg text-gray-700">{silverPricePerGram.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                 )}
                 <button onClick={() => setIsEditingSilver(!isEditingSilver)} className="p-1 text-gray-400 hover:text-gray-600"><Edit2 size={12} /></button>
              </div>
            </div>
          </div>
          
          {/* New Disclaimer Text */}
          <div className="mt-3 text-xs text-gray-500 italic text-center border-t border-gray-100 pt-2 flex items-center justify-center gap-1">
            <Info size={12} />
            {t.MSG_RATES_EDIT_HINT}
          </div>
        </div>

        {/* Assets Input Card */}
        <div className="bg-white p-6 rounded-xl border-2 border-ottoman-gold/30 shadow-md">
          <h2 className="text-2xl font-serif text-ottoman-teal mb-2">2. {t.ZAKAT_WEALTH_TITLE}</h2>
          <p className="text-gray-600 font-body mb-6">Enter the total value of your assets in {settings.currency}</p>
          
          <div className="space-y-4 font-body">
            {[
              { label: t.ZAKAT_ASSET_CASH, name: "cash" },
              { label: t.ZAKAT_ASSET_GOLD, name: "goldSilver" },
              { label: t.ZAKAT_ASSET_INVEST, name: "investments" },
              { label: t.ZAKAT_ASSET_DEBT, name: "liabilities" }
            ].map((field) => (
              <div key={field.name} className="flex flex-col">
                <label className="text-sm text-ottoman-dark font-bold mb-1">{field.label}</label>
                <div className="relative group">
                  <span className="absolute left-3 top-3 text-gray-400 group-focus-within:text-ottoman-gold transition-colors">{settings.currencySymbol}</span>
                  <input
                    type="number"
                    name={field.name}
                    value={assets[field.name as keyof ZakatAssets] || ''}
                    onChange={handleInputChange}
                    className="w-full p-3 pl-8 border border-gray-300 rounded bg-gray-50 focus:bg-white focus:ring-2 focus:ring-ottoman-teal focus:border-transparent outline-none transition-all"
                    placeholder="0.00"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column: Results */}
      <div className="flex-1 bg-gradient-to-br from-ottoman-teal to-[#003f4a] text-white p-8 rounded-xl border-4 border-double border-ottoman-gold shadow-2xl flex flex-col justify-between relative overflow-hidden min-h-[500px]">
        {/* Background Pattern Overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>
        
        <div className="z-10 relative">
          
          {/* Nisab Selector */}
          <div className="mb-4">
            <label className="text-xs text-ottoman-gold uppercase tracking-widest mb-2 block opacity-80">{t.LBL_SELECT_NISAB}</label>
            <div className="flex bg-black/20 p-1 rounded-lg">
                <button 
                    onClick={() => setNisabType('GOLD')}
                    className={`flex-1 py-2 px-3 text-sm font-bold rounded-md transition-all flex items-center justify-center gap-2 ${nisabType === 'GOLD' ? 'bg-ottoman-gold text-ottoman-dark shadow-lg' : 'text-white/60 hover:bg-white/10'}`}
                >
                    <span>{t.LBL_GOLD} (85g)</span>
                </button>
                <button 
                    onClick={() => setNisabType('SILVER')}
                    className={`flex-1 py-2 px-3 text-sm font-bold rounded-md transition-all flex items-center justify-center gap-2 ${nisabType === 'SILVER' ? 'bg-gray-300 text-gray-900 shadow-lg' : 'text-white/60 hover:bg-white/10'}`}
                >
                    <span>{t.LBL_SILVER} (595g)</span>
                </button>
            </div>
          </div>

          <div className="flex justify-between items-start mb-6">
            <div>
                <h2 className="text-3xl font-serif text-ottoman-gold mb-1">{t.ZAKAT_RESULT_TITLE}</h2>
                <div className="flex flex-col gap-1 text-sm opacity-80 font-body">
                    <div className="flex items-center gap-2">
                      <span>{t.ZAKAT_RESULT_NISAB} ({nisabType === 'GOLD' ? t.LBL_GOLD : t.LBL_SILVER}):</span>
                      <span className="font-bold text-white">{settings.currencySymbol}{calculation.nisabThreshold.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                    </div>
                </div>
            </div>
            {calculation.isEligible ? (
                <div className="bg-green-500/20 border border-green-400 text-green-100 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider animate-pulse-slow">
                    Eligible
                </div>
            ) : (
                <div className="bg-white/10 border border-white/30 text-gray-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    Below Nisab
                </div>
            )}
          </div>
          
          <div className="my-4 h-64 w-full relative">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#FDFBF7', borderRadius: '8px', border: '1px solid #D4AF37', color: '#1A1A1A' }}
                    itemStyle={{ color: '#1A1A1A' }}
                    formatter={(value: number) => `${settings.currencySymbol}${value.toLocaleString()}`}
                  />
                  <Legend iconType="circle" verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-40">
                    <RefreshCw size={48} className="mb-2" />
                    <span className="font-body text-sm">Waiting for input...</span>
                </div>
            )}
            
            {/* Center Label for Chart */}
            {chartData.length > 0 && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none pb-8">
                    <div className="text-center">
                        <p className="text-[10px] uppercase tracking-widest text-ottoman-gold">Total</p>
                        <p className="font-serif text-lg">{settings.currencySymbol}{calculation.totalAssets.toLocaleString(undefined, { notation: "compact" })}</p>
                    </div>
                </div>
            )}
          </div>
        </div>

        <div className="z-10 bg-black/20 p-6 rounded-xl backdrop-blur-md border border-white/10 mt-auto">
          <div className="flex justify-between items-end mb-2">
            <span className="font-body text-lg opacity-90">{t.ZAKAT_RESULT_NET}</span>
            <span className="font-serif text-2xl">{settings.currencySymbol}{calculation.netAssets.toLocaleString()}</span>
          </div>
          <div className="w-full h-px bg-gradient-to-r from-transparent via-ottoman-gold to-transparent opacity-50 mb-4"></div>
          
          <div className="flex flex-col gap-1">
            <span className="font-serif text-lg text-ottoman-gold uppercase tracking-widest text-center sm:text-left">{t.ZAKAT_RESULT_PAYABLE}</span>
            <div className="flex items-center justify-center sm:justify-between bg-ottoman-gold/10 p-4 rounded-lg border border-ottoman-gold/30">
                <span className="text-4xl sm:text-5xl font-serif font-bold text-white drop-shadow-lg">
                {settings.currencySymbol}{calculation.zakatPayable.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
            </div>
          </div>
           {!calculation.isEligible && calculation.netAssets > 0 && (
              <p className="text-orange-200/80 text-sm mt-3 text-center font-body bg-orange-900/30 p-2 rounded">
                {t.ZAKAT_RESULT_BELOW}
              </p>
            )}
        </div>
      </div>
    </div>
  );
};

export default ZakatCalculator;