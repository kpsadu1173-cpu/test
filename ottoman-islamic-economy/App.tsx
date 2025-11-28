import React, { useState } from 'react';
import { ViewState, NavItem, AppSettings } from './types';
import { TEXT } from './utils/translations';
import { 
  Scale, 
  Coins, 
  Handshake, 
  ScrollText, 
  ArrowLeft, 
  Home, 
  Calculator, 
  HelpCircle,
  Moon,
  PawPrint,
  MapPin,
  Gem,
  LayoutGrid,
  Sparkles
} from 'lucide-react';
import OrnateCard from './components/OrnateCard';
import PatternBackground from './components/PatternBackground';
import ZakatCalculator from './components/ZakatCalculator';
import InheritanceCalculator from './components/InheritanceCalculator';
import PartnershipCalculator from './components/PartnershipCalculator';
import AIAdvisor from './components/AIAdvisor';
import WelcomeModal from './components/WelcomeModal';

// Stub components for sections not fully implemented in this demo
const PlaceholderTool: React.FC<{ title: string; icon?: React.ReactNode; description?: string; buttonText: string }> = ({ title, icon, description, buttonText }) => (
  <div className="p-12 text-center bg-white/90 rounded-xl border-2 border-ottoman-gold/50 max-w-2xl shadow-xl relative overflow-hidden">
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-10 pointer-events-none"></div>
    <div className="relative z-10 flex flex-col items-center">
      <div className="mb-6 p-4 bg-ottoman-teal/10 rounded-full text-ottoman-teal">
        {icon || <ScrollText size={64} />}
      </div>
      <h2 className="text-3xl font-serif text-ottoman-teal mb-4">{title}</h2>
      <p className="font-body text-xl text-gray-700 mb-6">{description || "This architectural wing is currently under construction by our finest artisans."}</p>
      <button className="px-6 py-2 bg-ottoman-gold text-white font-serif rounded-lg shadow hover:bg-ottoman-gold-dim transition-colors">
        {buttonText}
      </button>
    </div>
  </div>
);

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.DASHBOARD);
  const [settings, setSettings] = useState<AppSettings>({
    language: 'en',
    country: '',
    currency: 'USD',
    currencySymbol: '$',
    isConfigured: false
  });

  const t = TEXT[settings.language];

  // Map settings update
  const handleSettingsSave = (newSettings: AppSettings) => {
    setSettings(newSettings);
  };

  const navItems: NavItem[] = [
    {
      id: ViewState.ZAKAT,
      titleKey: "TOOL_ZAKAT",
      arabicTitle: "حاسبة الزكاة",
      descriptionKey: "DESC_ZAKAT",
      icon: <Coins size={48} className="text-ottoman-teal group-hover:text-ottoman-gold transition-colors duration-500" />
    },
    {
      id: ViewState.INHERITANCE,
      titleKey: "TOOL_INHERITANCE",
      arabicTitle: "المواريث",
      descriptionKey: "DESC_INHERITANCE",
      icon: <Scale size={48} className="text-ottoman-teal group-hover:text-ottoman-gold transition-colors duration-500" />
    },
    {
      id: ViewState.PARTNERSHIP,
      titleKey: "TOOL_PARTNERSHIP",
      arabicTitle: "الشركات",
      descriptionKey: "DESC_PARTNERSHIP",
      icon: <Handshake size={48} className="text-ottoman-teal group-hover:text-ottoman-gold transition-colors duration-500" />
    },
    {
      id: ViewState.FASTING,
      titleKey: "TOOL_FASTING",
      arabicTitle: "فدية الصيام",
      descriptionKey: "DESC_FASTING",
      icon: <Moon size={48} className="text-ottoman-teal group-hover:text-ottoman-gold transition-colors duration-500" />
    },
    {
      id: ViewState.ANIMAL_ZAKAT,
      titleKey: "TOOL_ANIMAL",
      arabicTitle: "زكاة الأنعام",
      descriptionKey: "DESC_ANIMAL",
      icon: <PawPrint size={48} className="text-ottoman-teal group-hover:text-ottoman-gold transition-colors duration-500" />
    },
    {
      id: ViewState.HAJJ_UMRAH,
      titleKey: "TOOL_HAJJ",
      arabicTitle: "الحج والعمرة",
      descriptionKey: "DESC_HAJJ",
      icon: <MapPin size={48} className="text-ottoman-teal group-hover:text-ottoman-gold transition-colors duration-500" />
    },
    {
      id: ViewState.MAHR,
      titleKey: "TOOL_MAHR",
      arabicTitle: "حاسبة المهر",
      descriptionKey: "DESC_MAHR",
      icon: <Gem size={48} className="text-ottoman-teal group-hover:text-ottoman-gold transition-colors duration-500" />
    },
    {
      id: ViewState.MORE,
      titleKey: "TOOL_MORE",
      arabicTitle: "أدوات أخرى",
      descriptionKey: "DESC_MORE",
      icon: <LayoutGrid size={48} className="text-ottoman-teal group-hover:text-ottoman-gold transition-colors duration-500" />
    }
  ];

  const renderContent = () => {
    switch (currentView) {
      case ViewState.ZAKAT:
        return <ZakatCalculator settings={settings} />;
      case ViewState.INHERITANCE:
        return <InheritanceCalculator settings={settings} />;
      case ViewState.PARTNERSHIP:
        return <PartnershipCalculator settings={settings} />;
      case ViewState.ADVISOR:
        return <AIAdvisor settings={settings} />;
      case ViewState.FASTING:
        return <PlaceholderTool title={t.TOOL_FASTING} icon={<Moon size={64}/>} description={t.DESC_FASTING} buttonText={t.COMING_SOON} />;
      case ViewState.ANIMAL_ZAKAT:
        return <PlaceholderTool title={t.TOOL_ANIMAL} icon={<PawPrint size={64}/>} description={t.DESC_ANIMAL} buttonText={t.COMING_SOON} />;
      case ViewState.HAJJ_UMRAH:
        return <PlaceholderTool title={t.TOOL_HAJJ} icon={<MapPin size={64}/>} description={t.DESC_HAJJ} buttonText={t.COMING_SOON} />;
      case ViewState.MAHR:
        return <PlaceholderTool title={t.TOOL_MAHR} icon={<Gem size={64}/>} description={t.DESC_MAHR} buttonText={t.COMING_SOON} />;
      case ViewState.MORE:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
            <OrnateCard 
              title={t.TOOL_ADVISOR}
              arabicTitle="المستشار الذكي"
              onClick={() => setCurrentView(ViewState.ADVISOR)}
              className="h-64"
            >
              <div className="mb-4"><Sparkles size={48} className="text-ottoman-teal" /></div>
              <p className="font-body text-lg text-gray-700">{t.DESC_ADVISOR}</p>
            </OrnateCard>
            
            <OrnateCard 
              title="Currency Converter" 
              arabicTitle="محول العملات"
              onClick={() => {}} // Placeholder
              className="h-64 opacity-70"
            >
               <div className="mb-4"><Coins size={48} className="text-gray-500" /></div>
               <p className="font-body text-lg text-gray-700">{t.COMING_SOON}</p>
            </OrnateCard>
          </div>
        );
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl px-4">
            {navItems.map((item) => (
              <OrnateCard 
                key={item.id}
                title={TEXT[settings.language][item.titleKey as keyof typeof TEXT['en']]} 
                arabicTitle={item.arabicTitle}
                onClick={() => setCurrentView(item.id)}
                className="h-auto min-h-[320px]"
              >
                <div className="mb-4 transform group-hover:scale-110 transition-transform duration-500">{item.icon}</div>
                <p className="font-body text-lg text-gray-700 leading-relaxed px-2">
                  {TEXT[settings.language][item.descriptionKey as keyof typeof TEXT['en']]}
                </p>
              </OrnateCard>
            ))}
          </div>
        );
    }
  };

  return (
    <div className={`min-h-screen relative flex flex-col font-sans text-ottoman-dark bg-ottoman-cream selection:bg-ottoman-gold selection:text-white ${settings.language === 'ar' ? 'rtl' : 'ltr'}`} dir={settings.language === 'ar' ? 'rtl' : 'ltr'}>
      <PatternBackground />
      
      {!settings.isConfigured && <WelcomeModal onSave={handleSettingsSave} />}

      {/* --- Header --- */}
      <header className="relative z-50 bg-gradient-to-r from-ottoman-teal via-cyan-900 to-ottoman-teal text-white shadow-2xl border-b-4 border-ottoman-gold">
         <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] pointer-events-none"></div>
         
         <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between relative">
            
            {/* Logo Area */}
            <div 
              className="flex items-center gap-4 cursor-pointer group" 
              onClick={() => setCurrentView(ViewState.DASHBOARD)}
            >
              <div className="w-16 h-16 bg-ottoman-gold rounded-full flex items-center justify-center border-4 border-white/20 shadow-inner group-hover:scale-105 transition-transform">
                <span className="text-3xl">🕌</span>
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-serif text-ottoman-gold tracking-wider drop-shadow-md">
                  {t.APP_TITLE}
                </h1>
                <p className="font-body text-lg md:text-xl text-gray-200">{t.APP_SUBTITLE}</p>
              </div>
            </div>

            {/* Decoration */}
            <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 opacity-30">
               <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Islamic_Motif_2.svg/120px-Islamic_Motif_2.svg.png" alt="motif" className="w-32 animate-spin-slow" style={{ animationDuration: '60s' }} />
            </div>

            {/* Nav Controls */}
            {currentView !== ViewState.DASHBOARD && (
              <button 
                onClick={() => setCurrentView(ViewState.DASHBOARD)}
                className="mt-4 md:mt-0 flex items-center gap-2 px-6 py-2 bg-white/10 hover:bg-white/20 border border-ottoman-gold rounded-full transition-all text-ottoman-gold hover:text-white font-serif"
              >
                <ArrowLeft size={20} />
                {t.RETURN_HOME}
              </button>
            )}
         </div>
      </header>

      {/* --- Main Content --- */}
      <main className="flex-1 relative z-10 flex flex-col items-center justify-center py-12 px-4 md:px-8">
        
        {currentView === ViewState.DASHBOARD && (
          <div className="text-center mb-12 animate-fade-in-up">
             <h2 className="text-4xl md:text-5xl font-serif text-ottoman-teal mb-4">{t.WELCOME_TITLE}</h2>
             <div className="h-1 w-32 bg-ottoman-gold mx-auto mb-4"></div>
             <p className="text-xl font-body text-gray-600 max-w-2xl mx-auto">
               {t.WELCOME_DESC}
             </p>
          </div>
        )}

        <div className="w-full flex justify-center">
            {renderContent()}
        </div>

      </main>

      {/* --- Footer --- */}
      <footer className="relative z-50 bg-ottoman-dark text-ottoman-gold py-8 border-t-8 border-double border-ottoman-gold">
         <div className="max-w-7xl mx-auto px-4 text-center">
           <div className="flex justify-center gap-6 mb-6">
              <span className="p-2 border border-ottoman-gold/30 rounded-full hover:bg-ottoman-gold hover:text-ottoman-dark transition-colors cursor-pointer" onClick={() => setCurrentView(ViewState.DASHBOARD)}><Home size={20} /></span>
              <span className="p-2 border border-ottoman-gold/30 rounded-full hover:bg-ottoman-gold hover:text-ottoman-dark transition-colors cursor-pointer" onClick={() => setCurrentView(ViewState.ZAKAT)}><Calculator size={20} /></span>
              <span className="p-2 border border-ottoman-gold/30 rounded-full hover:bg-ottoman-gold hover:text-ottoman-dark transition-colors cursor-pointer" onClick={() => setCurrentView(ViewState.ADVISOR)}><HelpCircle size={20} /></span>
           </div>
           <p className="font-serif text-sm tracking-widest opacity-80">© 2025 OTTOMAN DIGITAL HERITAGE.</p>
           {/* Showing region info in footer */}
           {settings.isConfigured && (
              <p className="font-body text-xs mt-2 text-white/30">
                Region: {settings.country} | Currency: {settings.currency}
              </p>
           )}
         </div>
      </footer>
    </div>
  );
};

export default App;