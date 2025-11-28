import React from 'react';

const PatternBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-10">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="islamic-geo" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M0,20 L20,0 L40,20 L20,40 Z" fill="none" stroke="#2B5F75" strokeWidth="1"/>
            <circle cx="20" cy="20" r="5" fill="#D4AF37" opacity="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#islamic-geo)" />
      </svg>
    </div>
  );
};

export default PatternBackground;
