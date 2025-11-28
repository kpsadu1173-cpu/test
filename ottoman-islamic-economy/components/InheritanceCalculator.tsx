import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { AppSettings, HeirInput, InheritanceResult } from '../types';
import { TEXT } from '../utils/translations';
import { calculateInheritance } from '../utils/inheritanceLogic';
import { ScrollText, User, Users, Coins, Info } from 'lucide-react';

interface InputGroupProps {
  title: string;
  children: React.ReactNode;
  isOpen?: boolean;
}

// Input Group Component moved outside to avoid re-creation and typing issues
const InputGroup: React.FC<InputGroupProps> = ({ title, children, isOpen = true }) => (
    <div className="border border-ottoman-gold/20 rounded-lg overflow-hidden mb-4">
        <div className="bg-ottoman-teal/5 p-3 font-bold text-ottoman-dark flex items-center gap-2 border-b border-ottoman-gold/10">
            <div className="w-2 h-2 rounded-full bg-ottoman-gold"></div>
            {title}
        </div>
        <div className="p-4 grid grid-cols-2 gap-4 bg-white">
            {children}
        </div>
    </div>
);

interface InheritanceCalculatorProps {
  settings: AppSettings;
}

const InheritanceCalculator: React.FC<InheritanceCalculatorProps> = ({ settings }) => {
  const t = TEXT[settings.language];
  const [activeSection, setActiveSection] = useState<'BASIC' | 'EXTENDED'>('BASIC');

  // Form State
  const [input, setInput] = useState<HeirInput>({
    gender: 'MALE',
    netEstate: 100000,
    husband: 0,
    wife: 1,
    father: 1,
    mother: 1,
    sons: 2,
    daughters: 1,
    paternalGrandfather: 0,
    paternalGrandmother: 0,
    maternalGrandmother: 0,
    fullBrothers: 0,
    fullSisters: 0,
    paternalBrothers: 0,
    paternalSisters: 0,
    maternalSiblings: 0
  });

  const [result, setResult] = useState<InheritanceResult | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInput(prev => {
        const newVal = name === 'gender' ? value : Math.max(0, parseFloat(value) || 0);
        // Logic constraint: Can't have Husband if Male, Can't have Wife if Female
        if (name === 'gender' && value === 'MALE') return { ...prev, gender: 'MALE', husband: 0 };
        if (name === 'gender' && value === 'FEMALE') return { ...prev, gender: 'FEMALE', wife: 0 };
        return { ...prev, [name]: newVal };
    });
  };

  const calculate = () => {
    const res = calculateInheritance(input);
    setResult(res);
  };

  const chartData = result?.heirs.filter(h => h.shareAmount > 0).map(h => ({
      name: t[h.heirType as keyof typeof t],
      value: h.shareAmount
  }));

  const COLORS = ['#004F59', '#D4AF37', '#800020', '#B59026', '#1A1A1A', '#5e4b23', '#2B5F75', '#A0522D'];

  return (
    <div className="flex flex-col lg:flex-row gap-8 animate-fade-in w-full max-w-7xl">
      
      {/* Input Section */}
      <div className="flex-1 space-y-4">
        <div className="bg-white p-6 rounded-xl border border-ottoman-gold/30 shadow-md">
           <h3 className="text-xl font-serif text-ottoman-teal mb-4 flex items-center gap-2">
             <User size={24}/> {t.INH_DECEASED} & {t.INH_NET_ESTATE}
           </h3>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                 <label className="block text-sm font-bold text-gray-700 mb-1">{t.INH_DECEASED}</label>
                 <select 
                    name="gender" 
                    value={input.gender} 
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded bg-gray-50 focus:ring-2 focus:ring-ottoman-gold outline-none"
                 >
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                 </select>
              </div>
              <div>
                 <label className="block text-sm font-bold text-gray-700 mb-1">{t.INH_NET_ESTATE} ({settings.currency})</label>
                 <input 
                    type="number" 
                    name="netEstate" 
                    value={input.netEstate} 
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded bg-gray-50 focus:ring-2 focus:ring-ottoman-gold outline-none"
                 />
              </div>
           </div>

           <div className="flex gap-2 mb-4 border-b border-gray-200">
               <button 
                onClick={() => setActiveSection('BASIC')} 
                className={`pb-2 px-4 font-bold text-sm ${activeSection === 'BASIC' ? 'text-ottoman-teal border-b-2 border-ottoman-teal' : 'text-gray-400'}`}
               >
                   Basic Family
               </button>
               <button 
                onClick={() => setActiveSection('EXTENDED')} 
                className={`pb-2 px-4 font-bold text-sm ${activeSection === 'EXTENDED' ? 'text-ottoman-teal border-b-2 border-ottoman-teal' : 'text-gray-400'}`}
               >
                   Extended (Grandparents/Siblings)
               </button>
           </div>

           <div className="h-[400px] overflow-y-auto pr-2 scrollbar-hide">
             {activeSection === 'BASIC' && (
                 <>
                    <InputGroup title="Spouse">
                        {input.gender === 'FEMALE' && (
                            <div>
                                <label className="block text-xs font-bold text-gray-500">{t.INH_HUSBAND}</label>
                                <select name="husband" value={input.husband} onChange={handleInputChange} className="w-full p-2 border rounded">
                                    <option value="0">No</option>
                                    <option value="1">Yes</option>
                                </select>
                            </div>
                        )}
                        {input.gender === 'MALE' && (
                            <div>
                                <label className="block text-xs font-bold text-gray-500">{t.INH_WIFE}</label>
                                <input type="number" name="wife" min="0" max="4" value={input.wife} onChange={handleInputChange} className="w-full p-2 border rounded"/>
                            </div>
                        )}
                    </InputGroup>
                    
                    <InputGroup title={t.INH_CAT_ASCENDANTS}>
                        <div>
                            <label className="block text-xs font-bold text-gray-500">{t.INH_FATHER}</label>
                            <select name="father" value={input.father} onChange={handleInputChange} className="w-full p-2 border rounded">
                                    <option value="0">No</option>
                                    <option value="1">Yes</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500">{t.INH_MOTHER}</label>
                            <select name="mother" value={input.mother} onChange={handleInputChange} className="w-full p-2 border rounded">
                                    <option value="0">No</option>
                                    <option value="1">Yes</option>
                            </select>
                        </div>
                    </InputGroup>

                    <InputGroup title={t.INH_CAT_DESCENDANTS}>
                        <div>
                            <label className="block text-xs font-bold text-gray-500">{t.INH_SON}</label>
                            <input type="number" name="sons" min="0" value={input.sons} onChange={handleInputChange} className="w-full p-2 border rounded"/>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500">{t.INH_DAUGHTER}</label>
                            <input type="number" name="daughters" min="0" value={input.daughters} onChange={handleInputChange} className="w-full p-2 border rounded"/>
                        </div>
                    </InputGroup>
                 </>
             )}

             {activeSection === 'EXTENDED' && (
                 <>
                    <InputGroup title="Grandparents (Secondary Ascendants)">
                        <div>
                            <label className="block text-xs font-bold text-gray-500">{t.INH_PAT_GRANDFATHER}</label>
                            <select name="paternalGrandfather" value={input.paternalGrandfather} onChange={handleInputChange} className="w-full p-2 border rounded">
                                    <option value="0">No</option>
                                    <option value="1">Yes</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500">{t.INH_PAT_GRANDMOTHER}</label>
                            <select name="paternalGrandmother" value={input.paternalGrandmother} onChange={handleInputChange} className="w-full p-2 border rounded">
                                    <option value="0">No</option>
                                    <option value="1">Yes</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500">{t.INH_MAT_GRANDMOTHER}</label>
                            <select name="maternalGrandmother" value={input.maternalGrandmother} onChange={handleInputChange} className="w-full p-2 border rounded">
                                    <option value="0">No</option>
                                    <option value="1">Yes</option>
                            </select>
                        </div>
                    </InputGroup>

                    <InputGroup title={t.INH_CAT_COLLATERALS}>
                        <div>
                            <label className="block text-xs font-bold text-gray-500">{t.INH_FULL_BROTHER}</label>
                            <input type="number" name="fullBrothers" min="0" value={input.fullBrothers} onChange={handleInputChange} className="w-full p-2 border rounded"/>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500">{t.INH_FULL_SISTER}</label>
                            <input type="number" name="fullSisters" min="0" value={input.fullSisters} onChange={handleInputChange} className="w-full p-2 border rounded"/>
                        </div>
                         <div>
                            <label className="block text-xs font-bold text-gray-500">{t.INH_PAT_BROTHER}</label>
                            <input type="number" name="paternalBrothers" min="0" value={input.paternalBrothers} onChange={handleInputChange} className="w-full p-2 border rounded"/>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500">{t.INH_PAT_SISTER}</label>
                            <input type="number" name="paternalSisters" min="0" value={input.paternalSisters} onChange={handleInputChange} className="w-full p-2 border rounded"/>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500">{t.INH_MAT_SIBLING}</label>
                            <input type="number" name="maternalSiblings" min="0" value={input.maternalSiblings} onChange={handleInputChange} className="w-full p-2 border rounded"/>
                        </div>
                    </InputGroup>
                 </>
             )}
           </div>
           
           <button 
             onClick={calculate}
             className="w-full mt-4 bg-ottoman-gold hover:bg-ottoman-gold-dim text-white font-serif py-3 rounded-lg shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2"
           >
             <Coins /> {t.INH_BTN_CALC}
           </button>
        </div>
      </div>

      {/* Result Section */}
      <div className="flex-1 bg-white p-6 rounded-xl border-2 border-ottoman-teal/20 shadow-xl min-h-[500px]">
         {result ? (
            <div className="flex flex-col h-full animate-fade-in">
                <h3 className="text-2xl font-serif text-center text-ottoman-gold mb-6">{t.INH_RESULT_TITLE}</h3>
                
                {/* Chart */}
                <div className="h-64 w-full mb-6 relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                innerRadius={50}
                                outerRadius={80}
                                paddingAngle={2}
                                dataKey="value"
                            >
                                {chartData?.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#FDFBF7', borderRadius: '8px', border: '1px solid #D4AF37' }}
                                formatter={(val: number) => `${settings.currencySymbol}${val.toLocaleString(undefined, {maximumFractionDigits:0})}`} 
                            />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute top-0 right-0 flex flex-col gap-1 items-end">
                        {result.hasAwal && (
                            <div className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded border border-orange-200 flex items-center gap-1">
                                <Info size={12}/> {t.INH_NOTE_AWAL}
                            </div>
                        )}
                        {result.hasRadd && (
                            <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded border border-green-200 flex items-center gap-1">
                                <Info size={12}/> {t.INH_NOTE_RADD}
                            </div>
                        )}
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm font-body">
                        <thead className="bg-ottoman-teal text-white">
                            <tr>
                                <th className="p-2 text-left rounded-tl-lg">{t.INH_TABLE_HEIR}</th>
                                <th className="p-2 text-center">{t.INH_TABLE_SHARE}</th>
                                <th className="p-2 text-right">{t.INH_TABLE_AMOUNT}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {result.heirs.map((h, idx) => (
                                <React.Fragment key={idx}>
                                    <tr className={`border-b border-gray-100 transition-colors ${h.isBlocked ? 'bg-gray-100 opacity-60' : 'bg-gray-50/50 hover:bg-gray-100'}`}>
                                        <td className="p-3 font-bold text-ottoman-dark">
                                            {t[h.heirType as keyof typeof t] || h.heirType} 
                                            <span className="text-gray-400 font-normal ml-1">x{h.count}</span>
                                            {h.note && (
                                                <div className="text-[10px] text-ottoman-teal font-normal mt-0.5">{h.note}</div>
                                            )}
                                        </td>
                                        <td className="p-3 text-center text-ottoman-teal font-bold">{h.shareFraction}</td>
                                        <td className="p-3 text-right font-bold text-ottoman-gold-dim">
                                            {h.shareAmount > 0 ? `${settings.currencySymbol}${h.shareAmount.toLocaleString(undefined, {maximumFractionDigits: 0})}` : '-'}
                                        </td>
                                    </tr>
                                    {/* Evidence Row */}
                                    {!h.isBlocked && h.shareAmount > 0 && (
                                        <tr className="border-b border-gray-200">
                                            <td colSpan={3} className="p-2 bg-ottoman-parchment text-xs text-gray-600 italic pl-6 border-l-4 border-l-ottoman-gold">
                                                <div className="flex items-start gap-2">
                                                    <ScrollText size={14} className="mt-0.5 shrink-0 text-ottoman-gold"/>
                                                    {t[h.evidenceKey as keyof typeof t]}
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                            {result.residue > 1 && (
                                <tr className="bg-gray-200 font-bold">
                                    <td className="p-3">Unallocated Residue</td>
                                    <td className="p-3 text-center">-</td>
                                    <td className="p-3 text-right">{settings.currencySymbol}{result.residue.toLocaleString(undefined, {maximumFractionDigits: 0})}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
         ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 opacity-60">
                <Users size={64} className="mb-4 text-ottoman-gold/50"/>
                <p className="font-serif text-lg text-center max-w-xs">Enter surviving relatives to view the Shariah distribution chart</p>
            </div>
         )}
      </div>
    </div>
  );
};

export default InheritanceCalculator;