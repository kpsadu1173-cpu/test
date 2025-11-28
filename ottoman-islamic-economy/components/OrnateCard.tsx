import React from 'react';

interface OrnateCardProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  title?: string;
  arabicTitle?: string;
}

const OrnateCard: React.FC<OrnateCardProps> = ({ children, onClick, className = '', title, arabicTitle }) => {
  return (
    <div 
      onClick={onClick}
      className={`relative group cursor-pointer transition-all duration-500 hover:-translate-y-2 ${className}`}
    >
      {/* Arch Shape Container */}
      <div className="bg-white border-2 border-ottoman-gold/30 rounded-t-[40%] rounded-b-lg shadow-lg overflow-hidden h-full flex flex-col relative z-10">
        
        {/* Header/Arch area */}
        <div className="h-24 bg-gradient-to-b from-ottoman-teal to-ottoman-teal/90 flex flex-col items-center justify-center pt-4 pb-2 relative">
            <div className="absolute top-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>
            {arabicTitle && <span className="text-ottoman-gold font-body text-xl tracking-wider opacity-90">{arabicTitle}</span>}
            {title && <h3 className="text-ottoman-cream font-serif text-lg font-bold tracking-widest mt-1 group-hover:text-ottoman-gold transition-colors">{title}</h3>}
        </div>

        {/* Content Body */}
        <div className="p-6 flex-1 bg-ottoman-parchment flex flex-col items-center justify-center text-center">
          {children}
        </div>

        {/* Decorative Bottom Border */}
        <div className="h-2 bg-ottoman-gold w-full"></div>
      </div>

      {/* Glow Effect behind */}
      <div className="absolute inset-0 bg-ottoman-gold/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 transform translate-y-4"></div>
    </div>
  );
};

export default OrnateCard;
