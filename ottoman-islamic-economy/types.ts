import React from 'react';

export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  ZAKAT = 'ZAKAT',
  INHERITANCE = 'INHERITANCE',
  PARTNERSHIP = 'PARTNERSHIP',
  FASTING = 'FASTING',
  ANIMAL_ZAKAT = 'ANIMAL_ZAKAT',
  HAJJ_UMRAH = 'HAJJ_UMRAH',
  MAHR = 'MAHR',
  MORE = 'MORE',
  ADVISOR = 'ADVISOR'
}

export type Language = 'en' | 'ar' | 'hi' | 'ml' | 'ta';

export interface AppSettings {
  language: Language;
  country: string;
  currency: string;
  currencySymbol: string;
  isConfigured: boolean;
}

export interface NavItem {
  id: ViewState;
  titleKey: string; 
  arabicTitle: string; 
  descriptionKey: string; 
  icon: React.ReactNode;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface ZakatAssets {
  cash: number;
  goldSilver: number;
  investments: number;
  liabilities: number;
}

// --- Inheritance Types ---

export interface HeirInput {
  gender: 'MALE' | 'FEMALE'; // Deceased Gender
  netEstate: number;
  
  // Spouses
  husband: number; // 0 or 1
  wife: number; // 0 to 4
  
  // Ascendants (Roots)
  father: number; // 0 or 1
  mother: number; // 0 or 1
  paternalGrandfather: number; // 0 or 1
  paternalGrandmother: number; // 0 or 1
  maternalGrandmother: number; // 0 or 1

  // Descendants (Branches)
  sons: number;
  daughters: number;
  
  // Collaterals (Siblings) - Hawashi
  fullBrothers: number;
  fullSisters: number;
  paternalBrothers: number;
  paternalSisters: number;
  maternalSiblings: number; // Uterine brothers/sisters (Same mother, different father) share 1/3
}

export interface HeirShare {
  heirType: string; // key for translation
  count: number; // How many of this type
  shareFraction: string; // e.g. "1/8" or "Residue"
  sharePercentage: number; // e.g. 12.5
  shareAmount: number; // The money value
  evidenceKey: string; // Key for Quran/Hadith text
  note?: string; // Explanation (e.g. "Blocked by Father")
  isBlocked?: boolean;
}

export interface InheritanceResult {
  totalShares: number;
  heirs: HeirShare[];
  residue: number;
  hasAwal: boolean; // If total shares > 1 (denominator increase)
  hasRadd: boolean; // If total shares < 1 (return to blood relatives)
}