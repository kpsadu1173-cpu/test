import React, { useState } from 'react';
import { AppSettings, Language } from '../types';
import { TEXT } from '../utils/translations';
import { Globe, MapPin, Coins, Check } from 'lucide-react';

interface WelcomeModalProps {
  onSave: (settings: AppSettings) => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ onSave }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [country, setCountry] = useState('India');
  const [currency, setCurrency] = useState('INR');
  const [currencySymbol, setCurrencySymbol] = useState('₹');

  // Predefined lists for better UX
  const countries = ["India", "USA", "UAE", "Saudi Arabia", "UK", "Other"];
  
  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'SAR', symbol: '﷼', name: 'Saudi Riyal' },
    { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
    { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
    { code: 'PKR', symbol: '₨', name: 'Pakistani Rupee' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit' },
    { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah' },
    { code: 'TRY', symbol: '₺', name: 'Turkish Lira' },
  ];

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setCountry(val);
    
    // Auto-select currency based on country
    if (val === 'India') { setCurrency('INR'); setCurrencySymbol('₹'); }
    else if (val === 'USA') { setCurrency('USD'); setCurrencySymbol('$'); }
    else if (val === 'UAE') { setCurrency('AED'); setCurrencySymbol('د.إ'); }
    else if (val === 'Saudi Arabia') { setCurrency('SAR'); setCurrencySymbol('﷼'); }
    else if (val === 'UK') { setCurrency('GBP'); setCurrencySymbol('£'); }
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = currencies.find(c => c.code === e.target.value);
    if (selected) {
      setCurrency(selected.code);
      setCurrencySymbol(selected.symbol);
    }
  };

  const handleSave = () => {
    onSave({
      language,
      country: country || 'Unknown',
      currency,
      currencySymbol,
      isConfigured: true
    });
  };

  const t = TEXT[language];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-modal-enter">
      <div className="bg-ottoman-cream border-4 border-ottoman-gold rounded-xl shadow-2xl max-w-lg w-full overflow-hidden relative flex flex-col">
        
        {/* Decorative header */}
        <div className="bg-ottoman-teal p-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>
          <h2 className="text-3xl font-serif text-ottoman-gold relative z-10">{t.MODAL_TITLE}</h2>
          <p className="text-white/80 font-body relative z-10 mt-2">{t.MODAL_SUBTITLE}</p>
        </div>

        <div className="p-8 space-y-6 bg-ottoman-parchment">
          
          {/* Language Selection */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-ottoman-dark font-bold font-body">
              <Globe size={18} className="text-ottoman-teal"/>
              {t.LBL_LANGUAGE}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['en', 'ar', 'hi', 'ml', 'ta'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`py-2 px-3 rounded border transition-all font-body ${
                    language === lang 
                      ? 'bg-ottoman-teal text-white border-ottoman-gold' 
                      : 'bg-white text-gray-600 border-gray-300 hover:border-ottoman-teal'
                  }`}
                >
                  {lang === 'en' ? 'English' : lang === 'ar' ? 'العربية' : lang === 'hi' ? 'हिंदी' : lang === 'ml' ? 'മലയാളം' : 'தமிழ்'}
                </button>
              ))}
            </div>
          </div>

          {/* Country Input */}
          <div className="space-y-2">
             <label className="flex items-center gap-2 text-ottoman-dark font-bold font-body">
              <MapPin size={18} className="text-ottoman-teal"/>
              {t.LBL_COUNTRY}
            </label>
            <select 
              value={country}
              onChange={handleCountryChange}
              className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-ottoman-gold focus:outline-none bg-white font-body"
            >
              {countries.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Currency Selection */}
          <div className="space-y-2">
             <label className="flex items-center gap-2 text-ottoman-dark font-bold font-body">
              <Coins size={18} className="text-ottoman-teal"/>
              {t.LBL_CURRENCY}
            </label>
            <select 
              value={currency}
              onChange={handleCurrencyChange}
              className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-ottoman-gold focus:outline-none bg-white font-body"
            >
              {currencies.map(c => (
                <option key={c.code} value={c.code}>{c.code} - {c.name} ({c.symbol})</option>
              ))}
            </select>
          </div>

          <button 
            onClick={handleSave}
            className="w-full mt-4 bg-ottoman-gold hover:bg-ottoman-gold-dim text-white font-serif py-4 rounded-lg shadow-lg transform transition-transform active:scale-95 flex items-center justify-center gap-2 text-xl"
          >
            {t.BTN_ENTER}
            <Check size={24} />
          </button>

        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;