import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { AppSettings } from '../types';
import { TEXT } from '../utils/translations';
import { Handshake, Briefcase, User, Users, Info, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';

interface PartnershipCalculatorProps {
  settings: AppSettings;
}

const PartnershipCalculator: React.FC<PartnershipCalculatorProps> = ({ settings }) => {
  const t = TEXT[settings.language];
  const [activeTab, setActiveTab] = useState<'MUSHARAKAH' | 'MUDARABAH'>('MUSHARAKAH');

  // Musharakah State
  const [musharakah, setMusharakah] = useState({
    capitalA: 100000,
    capitalB: 50000,
    profitRatioA: 50, // Agreed profit share % for A
    profitAmount: 20000
  });

  // Mudarabah State
  const [mudarabah, setMudarabah] = useState({
    capital: 100000,
    profitRatioInvestor: 60, // Investor (Rab ul Maal) share
    profitAmount: 25000
  });

  // Calculation Results
  const [mushResults, setMushResults] = useState<any>({});
  const [mudaResults, setMudaResults] = useState<any>({});

  // Recalculate Musharakah
  useEffect(() => {
    const totalCapital = musharakah.capitalA + musharakah.capitalB;
    const shareCapA = musharakah.capitalA / totalCapital;
    const shareCapB = musharakah.capitalB / totalCapital;

    // Profit Distribution (Based on AGREED ratio)
    const profitA = musharakah.profitAmount * (musharakah.profitRatioA / 100);
    const profitB = musharakah.profitAmount * ((100 - musharakah.profitRatioA) / 100);

    // Loss Liability (MUST be based on CAPITAL ratio)
    // Simulating if the "profitAmount" input was a loss (negative)
    const lossA = musharakah.profitAmount * shareCapA;
    const lossB = musharakah.profitAmount * shareCapB;

    setMushResults({
      totalCapital,
      shareCapA,
      shareCapB,
      profitA,
      profitB,
      lossA,
      lossB
    });
  }, [musharakah]);

  // Recalculate Mudarabah
  useEffect(() => {
    // Profit Distribution
    const profitInvestor = mudarabah.profitAmount * (mudarabah.profitRatioInvestor / 100);
    const profitManager = mudarabah.profitAmount * ((100 - mudarabah.profitRatioInvestor) / 100);

    setMudaResults({
      profitInvestor,
      profitManager
    });
  }, [mudarabah]);

  const COLORS = ['#D4AF37', '#004F59', '#800020'];

  return (
    <div className="w-full max-w-6xl animate-fade-in">
      
      {/* Header Tabs */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <button 
          onClick={() => setActiveTab('MUSHARAKAH')}
          className={`flex-1 p-6 rounded-xl border-2 transition-all duration-300 flex items-center justify-center gap-4 ${
            activeTab === 'MUSHARAKAH' 
              ? 'bg-ottoman-teal text-white border-ottoman-gold shadow-lg transform -translate-y-1' 
              : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
          }`}
        >
          <Users size={32} />
          <div className="text-left">
            <h3 className="font-serif text-xl">{t.PTN_MUSHARAKAH}</h3>
            <p className="text-xs opacity-80 font-body">Joint Venture</p>
          </div>
        </button>

        <button 
          onClick={() => setActiveTab('MUDARABAH')}
          className={`flex-1 p-6 rounded-xl border-2 transition-all duration-300 flex items-center justify-center gap-4 ${
            activeTab === 'MUDARABAH' 
              ? 'bg-ottoman-teal text-white border-ottoman-gold shadow-lg transform -translate-y-1' 
              : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
          }`}
        >
          <Handshake size={32} />
          <div className="text-left">
            <h3 className="font-serif text-xl">{t.PTN_MUDARABAH}</h3>
            <p className="text-xs opacity-80 font-body">Trust Financing</p>
          </div>
        </button>
      </div>

      <div className="bg-white rounded-xl border-4 border-double border-ottoman-gold/30 shadow-2xl overflow-hidden min-h-[500px]">
        {/* Banner */}
        <div className="bg-ottoman-parchment p-6 border-b border-ottoman-gold/20">
          <p className="text-lg font-body text-gray-700 leading-relaxed text-center italic">
            "{activeTab === 'MUSHARAKAH' ? t.PTN_DESC_MUSHARAKAH : t.PTN_DESC_MUDARABAH}"
          </p>
        </div>

        {activeTab === 'MUSHARAKAH' && (
          <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Side */}
            <div className="space-y-6">
              <h3 className="text-xl font-serif text-ottoman-teal flex items-center gap-2 mb-4">
                <Briefcase size={20} /> Contract Parameters
              </h3>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1">{t.PTN_PARTNER_A} Capital</label>
                        <div className="relative">
                            <span className="absolute left-2 top-2 text-gray-400 text-xs">{settings.currencySymbol}</span>
                            <input 
                                type="number" 
                                value={musharakah.capitalA}
                                onChange={(e) => setMusharakah({...musharakah, capitalA: parseFloat(e.target.value) || 0})}
                                className="w-full p-2 pl-6 border rounded font-bold"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1">{t.PTN_PARTNER_B} Capital</label>
                        <div className="relative">
                            <span className="absolute left-2 top-2 text-gray-400 text-xs">{settings.currencySymbol}</span>
                            <input 
                                type="number" 
                                value={musharakah.capitalB}
                                onChange={(e) => setMusharakah({...musharakah, capitalB: parseFloat(e.target.value) || 0})}
                                className="w-full p-2 pl-6 border rounded font-bold"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                    <span>A Ownership: {(mushResults.shareCapA * 100).toFixed(1)}%</span>
                    <span>B Ownership: {(mushResults.shareCapB * 100).toFixed(1)}%</span>
                </div>
              </div>

              <div className="bg-ottoman-gold/10 p-4 rounded-lg border border-ottoman-gold/30">
                 <label className="block text-sm font-bold text-ottoman-dark mb-2">{t.PTN_AGREED_SPLIT} ({t.PTN_PROFIT_RATIO})</label>
                 <div className="flex items-center gap-4">
                    <div className="flex-1 text-center">
                        <span className="block text-xs font-bold text-ottoman-teal">{t.PTN_PARTNER_A}</span>
                        <input 
                            type="range" min="1" max="99" 
                            value={musharakah.profitRatioA}
                            onChange={(e) => setMusharakah({...musharakah, profitRatioA: parseInt(e.target.value)})}
                            className="w-full h-2 bg-ottoman-teal/20 rounded-lg appearance-none cursor-pointer accent-ottoman-teal"
                        />
                        <span className="text-xl font-serif text-ottoman-teal">{musharakah.profitRatioA}%</span>
                    </div>
                    <div className="flex-1 text-center border-l border-ottoman-gold/30 pl-4">
                        <span className="block text-xs font-bold text-gray-600">{t.PTN_PARTNER_B}</span>
                        <span className="text-xl font-serif text-gray-600">{100 - musharakah.profitRatioA}%</span>
                    </div>
                 </div>
              </div>

              <div>
                 <label className="block text-sm font-bold text-gray-600 mb-1">{t.PTN_TOTAL_PROFIT}</label>
                 <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-400">{settings.currencySymbol}</span>
                    <input 
                        type="number" 
                        value={musharakah.profitAmount}
                        onChange={(e) => setMusharakah({...musharakah, profitAmount: parseFloat(e.target.value) || 0})}
                        className="w-full p-3 pl-8 border border-gray-300 rounded focus:ring-2 focus:ring-ottoman-gold outline-none text-lg"
                    />
                 </div>
              </div>
            </div>

            {/* Result Side */}
            <div className="flex flex-col gap-6">
                
                {/* Profit Scenario */}
                <div className="bg-green-50 p-4 rounded-lg border border-green-200 relative overflow-hidden">
                    <div className="absolute right-0 top-0 p-2 opacity-10"><TrendingUp size={64} className="text-green-700"/></div>
                    <h4 className="font-serif text-lg text-green-800 mb-2 flex items-center gap-2"><TrendingUp size={18}/> {t.PTN_RESULT_PROFIT}</h4>
                    <p className="text-xs text-green-700 mb-4 italic">{t.PTN_RULE_PROFIT}</p>
                    
                    <div className="flex justify-around items-end h-32">
                        <div className="w-16 bg-green-600 rounded-t hover:opacity-90 transition-all flex items-end justify-center text-white font-bold text-xs pb-1" style={{height: `${musharakah.profitRatioA}%`}}>
                             A
                        </div>
                        <div className="w-16 bg-green-400 rounded-t hover:opacity-90 transition-all flex items-end justify-center text-white font-bold text-xs pb-1" style={{height: `${100 - musharakah.profitRatioA}%`}}>
                             B
                        </div>
                    </div>
                    <div className="flex justify-around mt-2 font-bold text-green-900 text-sm">
                        <span>{settings.currencySymbol}{mushResults.profitA?.toLocaleString(undefined, {maximumFractionDigits:0})}</span>
                        <span>{settings.currencySymbol}{mushResults.profitB?.toLocaleString(undefined, {maximumFractionDigits:0})}</span>
                    </div>
                </div>

                {/* Loss Scenario */}
                <div className="bg-red-50 p-4 rounded-lg border border-red-200 relative overflow-hidden">
                    <div className="absolute right-0 top-0 p-2 opacity-10"><TrendingDown size={64} className="text-red-700"/></div>
                    <h4 className="font-serif text-lg text-red-800 mb-2 flex items-center gap-2"><TrendingDown size={18}/> {t.PTN_RESULT_LOSS} (If Loss Occurs)</h4>
                    <p className="text-xs text-red-700 mb-4 italic flex items-start gap-1"><AlertTriangle size={14} className="shrink-0 mt-0.5"/> {t.PTN_RULE_LOSS}</p>
                    
                    <div className="flex justify-between items-center bg-white/50 p-2 rounded">
                        <div className="text-center">
                            <span className="block text-xs text-red-600 font-bold">{t.PTN_PARTNER_A} Liability</span>
                            <span className="text-lg font-serif text-red-800">{(mushResults.shareCapA * 100).toFixed(1)}%</span>
                        </div>
                        <div className="h-8 w-px bg-red-200"></div>
                        <div className="text-center">
                            <span className="block text-xs text-red-600 font-bold">{t.PTN_PARTNER_B} Liability</span>
                            <span className="text-lg font-serif text-red-800">{(mushResults.shareCapB * 100).toFixed(1)}%</span>
                        </div>
                    </div>
                </div>

            </div>
          </div>
        )}

        {activeTab === 'MUDARABAH' && (
           <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
             {/* Input */}
             <div className="space-y-6">
                <div className="bg-ottoman-teal/5 p-4 rounded-lg border border-ottoman-teal/20">
                    <h3 className="font-bold text-ottoman-teal mb-4 flex items-center gap-2"><User size={18}/> {t.PTN_RAB_UL_MAAL} (Investor)</h3>
                    <div className="mb-4">
                        <label className="block text-xs font-bold text-gray-500 mb-1">{t.PTN_CAPITAL}</label>
                        <div className="relative">
                            <span className="absolute left-2 top-2 text-gray-400 text-xs">{settings.currencySymbol}</span>
                            <input 
                                type="number" 
                                value={mudarabah.capital}
                                onChange={(e) => setMudarabah({...mudarabah, capital: parseFloat(e.target.value) || 0})}
                                className="w-full p-2 pl-6 border rounded font-bold"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1">Agreed Profit Share (%)</label>
                        <input 
                            type="range" min="1" max="99" 
                            value={mudarabah.profitRatioInvestor}
                            onChange={(e) => setMudarabah({...mudarabah, profitRatioInvestor: parseInt(e.target.value)})}
                            className="w-full h-2 bg-ottoman-teal/20 rounded-lg appearance-none cursor-pointer accent-ottoman-teal"
                        />
                        <div className="flex justify-between mt-1">
                            <span className="font-bold text-ottoman-teal">{mudarabah.profitRatioInvestor}%</span>
                            <span className="text-xs text-gray-400">Investor Share</span>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2"><Briefcase size={18}/> {t.PTN_MUDARIB} (Manager)</h3>
                    <p className="text-xs text-gray-500 italic mb-4">The Manager contributes labor and expertise, no capital. They receive the remaining share of the profit.</p>
                     <div className="flex justify-between items-center bg-white p-3 rounded border">
                        <span className="font-bold text-gray-600">Manager Profit Share</span>
                        <span className="font-serif text-xl text-gray-800">{100 - mudarabah.profitRatioInvestor}%</span>
                    </div>
                </div>

                <div>
                 <label className="block text-sm font-bold text-gray-600 mb-1">{t.PTN_TOTAL_PROFIT}</label>
                 <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-400">{settings.currencySymbol}</span>
                    <input 
                        type="number" 
                        value={mudarabah.profitAmount}
                        onChange={(e) => setMudarabah({...mudarabah, profitAmount: parseFloat(e.target.value) || 0})}
                        className="w-full p-3 pl-8 border border-gray-300 rounded focus:ring-2 focus:ring-ottoman-gold outline-none text-lg"
                    />
                 </div>
              </div>
             </div>

             {/* Output */}
             <div className="flex flex-col gap-6">
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-inner">
                    <h4 className="font-serif text-lg text-center text-ottoman-dark mb-4">{t.PTN_RESULT_PROFIT}</h4>
                    <div className="h-64 relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={[
                                        { name: t.PTN_INVESTOR, value: mudaResults.profitInvestor },
                                        { name: t.PTN_MUDARIB, value: mudaResults.profitManager }
                                    ]}
                                    innerRadius={60}
                                    outerRadius={90}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    <Cell fill="#004F59" />
                                    <Cell fill="#D4AF37" />
                                </Pie>
                                <Tooltip formatter={(val:number) => `${settings.currencySymbol}${val.toLocaleString()}`} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none pb-4">
                            <span className="font-serif text-2xl text-ottoman-dark">{settings.currencySymbol}{mudarabah.profitAmount.toLocaleString(undefined, {notation: 'compact'})}</span>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="text-center p-2 bg-ottoman-teal/10 rounded">
                            <span className="block text-xs font-bold text-ottoman-teal">{t.PTN_INVESTOR}</span>
                            <span className="text-lg font-serif">{settings.currencySymbol}{mudaResults.profitInvestor?.toLocaleString(undefined, {maximumFractionDigits:0})}</span>
                        </div>
                        <div className="text-center p-2 bg-ottoman-gold/10 rounded">
                            <span className="block text-xs font-bold text-ottoman-gold-dim">{t.PTN_MUDARIB}</span>
                            <span className="text-lg font-serif">{settings.currencySymbol}{mudaResults.profitManager?.toLocaleString(undefined, {maximumFractionDigits:0})}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-red-50 p-4 rounded-lg border border-red-200 text-sm text-red-800">
                    <strong className="flex items-center gap-2 mb-1"><AlertTriangle size={16}/> Important Rule on Loss:</strong>
                    In Mudarabah, if a financial loss occurs (not due to negligence), the <strong>Investor</strong> bears 100% of the financial loss (up to their capital). The <strong>Manager</strong> loses their time/effort and receives no profit.
                </div>
             </div>
           </div>
        )}
      </div>
    </div>
  );
};

export default PartnershipCalculator;