import { HeirInput, HeirShare, InheritanceResult } from '../types';

/**
 * Advanced Inheritance Logic based on Sunni Fiqh (Primary Hanafi/Standard Shafi'i mix for general utility).
 * Handles:
 * 1. Blocking (Hajb) - e.g. Son blocks brothers, Father blocks grandfather.
 * 2. Ashab al-Furud (Fixed Shares) - Spouses, Parents, Grandparents, Daughters, Sisters, Uterine Siblings.
 * 3. Asaba (Residuaries) - Son, Father, Brother, etc.
 * 4. Awal (Proportional Reduction).
 * 5. Radd (Return of Surplus).
 */
export const calculateInheritance = (input: HeirInput): InheritanceResult => {
  let heirs: HeirShare[] = [];
  const { 
    netEstate, gender, husband, wife, 
    father, mother, paternalGrandfather, paternalGrandmother, maternalGrandmother,
    sons, daughters, 
    fullBrothers, fullSisters, paternalBrothers, paternalSisters, maternalSiblings 
  } = input;

  let remainingShare = 1.0; // 100% (24/24)

  // --- 1. DETERMINE BLOCKING (HAJB) ---
  // Who is excluded?
  const hasMaleDescendant = sons > 0; // Son, Grandson...
  const hasFemaleDescendant = daughters > 0; // Daughter, Granddaughter...
  const hasDescendant = hasMaleDescendant || hasFemaleDescendant;
  
  const hasFather = father > 0;
  const hasMaleAscendant = hasFather || (paternalGrandfather > 0); // Father or Grandfather

  // RULES:
  // Grandparents
  const isPatGrandfatherBlocked = hasFather;
  const isMatGrandmotherBlocked = mother > 0;
  const isPatGrandmotherBlocked = mother > 0 || hasFather; // Father blocks Pat. Grandmother in most schools

  // Siblings (Collaterals)
  // Blocked by Father? Yes (Majority View).
  // Blocked by Son? Yes (Consensus).
  // Grandfather blocks siblings? Simple view: Yes (Abu Hanifa). Advanced: No (Shafi/Maliki - Muqasama).
  // *Decision*: For this app, we use the rule that Father AND Grandfather block siblings to avoid extreme UI complexity, 
  // unless user specifically selects a Madhab (future feature).
  const isSiblingsBlocked = hasFather || hasMaleDescendant || (paternalGrandfather > 0); 
  
  // Specific Sibling Blocking
  const isFullSiblingBlocked = isSiblingsBlocked;
  const isPatSiblingBlocked = isFullSiblingBlocked || (fullBrothers > 0); // Full Brother blocks Paternal Brother
  
  // Uterine Siblings (Mother side)
  // Blocked by ANY Ascendant Male (Father/Grandfather) OR ANY Descendant (Son/Daughter).
  const isMatSiblingBlocked = hasMaleAscendant || hasDescendant;

  // --- 2. SPOUSE SHARES ---
  if (gender === 'FEMALE' && husband > 0) {
    const share = hasDescendant ? 0.25 : 0.5;
    const evidence = hasDescendant ? "EVD_4_12_HUSBAND_WITH_CHILD" : "EVD_4_12_HUSBAND_NO_CHILD";
    heirs.push(createHeir("INH_HUSBAND", 1, share, hasDescendant ? "1/4" : "1/2", evidence, netEstate));
    remainingShare -= share;
  } 
  else if (gender === 'MALE' && wife > 0) {
    const share = hasDescendant ? 0.125 : 0.25;
    const evidence = hasDescendant ? "EVD_4_12_WIFE_WITH_CHILD" : "EVD_4_12_WIFE_NO_CHILD";
    heirs.push(createHeir("INH_WIFE", wife, share, hasDescendant ? "1/8" : "1/4", evidence, netEstate));
    remainingShare -= share;
  }

  // --- 3. PARENTS & GRANDPARENTS (Fixed) ---
  
  // Father (Fixed Share)
  // Gets 1/6 if there is a child (Male or Female). If no child, he is purely Asaba (calculated later).
  // If Daughter exists, he gets 1/6 + Residue (Dual Capacity). We add 1/6 here first.
  if (father > 0) {
    if (hasDescendant) {
        heirs.push(createHeir("INH_FATHER", 1, 1/6, "1/6", "EVD_4_11_PARENTS_WITH_CHILD", netEstate));
        remainingShare -= 1/6;
    }
  } 
  // Grandfather (if no Father)
  else if (paternalGrandfather > 0 && !isPatGrandfatherBlocked) {
    if (hasDescendant) {
        heirs.push(createHeir("INH_PAT_GRANDFATHER", 1, 1/6, "1/6", "EVD_4_11_PARENTS_WITH_CHILD", netEstate));
        remainingShare -= 1/6;
    }
  }

  // Mother
  // 1/6 if Child OR Multiple Siblings (2+).
  // 1/3 if No Child AND <2 Siblings.
  // Exception: Umariyyat (Spouse + Parents only) -> Mother gets 1/3 of Residue. (Handled simply as adjusted fixed here for basic logic, or distinct case).
  // Let's implement standard Quranic fractions first.
  const numberOfSiblings = fullBrothers + fullSisters + paternalBrothers + paternalSisters + maternalSiblings;
  if (mother > 0) {
      // Special Case: Umariyyat Check could go here.
      // Standard:
      if (hasDescendant || numberOfSiblings >= 2) {
          heirs.push(createHeir("INH_MOTHER", 1, 1/6, "1/6", "EVD_4_11_PARENTS_WITH_CHILD", netEstate));
          remainingShare -= 1/6;
      } else {
          heirs.push(createHeir("INH_MOTHER", 1, 1/3, "1/3", "EVD_4_11_MOTHER_NO_CHILD", netEstate));
          remainingShare -= 1/3;
      }
  }

  // Grandmothers (if Mother absent)
  if (mother === 0) {
      let grandmothersCount = 0;
      if (maternalGrandmother > 0 && !isMatGrandmotherBlocked) grandmothersCount++;
      if (paternalGrandmother > 0 && !isPatGrandmotherBlocked) grandmothersCount++;

      if (grandmothersCount > 0) {
          const share = 1/6; // Shared between them
          heirs.push(createHeir(
              grandmothersCount > 1 ? "Grandmothers (Pat+Mat)" : (maternalGrandmother > 0 ? "INH_MAT_GRANDMOTHER" : "INH_PAT_GRANDMOTHER"), 
              grandmothersCount, 
              share, 
              "1/6", 
              "EVD_IJMA_GRANDMOTHER", 
              netEstate
          ));
          remainingShare -= share;
      }
  }

  // --- 4. UTERINE SIBLINGS (Maternal) ---
  if (maternalSiblings > 0 && !isMatSiblingBlocked) {
      const share = maternalSiblings > 1 ? 1/3 : 1/6;
      const fraction = maternalSiblings > 1 ? "1/3" : "1/6";
      heirs.push(createHeir("INH_MAT_SIBLING", maternalSiblings, share, fraction, "EVD_4_12_MAT_SIBLINGS", netEstate));
      remainingShare -= share;
  } else if (maternalSiblings > 0) {
      heirs.push(createBlockedHeir("INH_MAT_SIBLING", "EVD_HAJB_BLOCK"));
  }

  // --- 5. DAUGHTERS & SISTERS (Fixed Shares - Only if not Asaba) ---
  // Daughters are Fixed if no Son. If Son exists, they are Asaba.
  if (daughters > 0 && sons === 0) {
      const share = daughters > 1 ? 2/3 : 0.5;
      heirs.push(createHeir("INH_DAUGHTER", daughters, share, daughters > 1 ? "2/3" : "1/2", "EVD_4_11_SONS_DAUGHTERS", netEstate));
      remainingShare -= share;
  }

  // Full Sisters (if no Brother, no Descendant, no Father)
  // They are blocked by Son, Father.
  // They are Asaba with Daughter (Prophet's hadith: "Make sisters with daughters residuaries").
  // Complexity: Let's stick to standard Kalala fixed share for now.
  if (fullSisters > 0 && !isFullSiblingBlocked && fullBrothers === 0) {
      // Check if Daughters exist? If Daughters exist, Sisters become Asaba (Residue).
      if (daughters > 0) {
          // Asaba ma'a al-ghayr (Residue with others) -> Handled in Residue section
      } else {
          // Fixed Share
          const share = fullSisters > 1 ? 2/3 : 0.5;
          heirs.push(createHeir("INH_FULL_SISTER", fullSisters, share, fullSisters > 1 ? "2/3" : "1/2", "EVD_4_176_SIBLINGS", netEstate));
          remainingShare -= share;
      }
  }

  // Paternal Sisters (similar logic)
  if (paternalSisters > 0 && !isPatSiblingBlocked && paternalBrothers === 0 && fullBrothers === 0 && fullSisters === 0) {
       if (daughters > 0) {
           // Asaba
       } else {
           const share = paternalSisters > 1 ? 2/3 : 0.5;
           heirs.push(createHeir("INH_PAT_SISTER", paternalSisters, share, paternalSisters > 1 ? "2/3" : "1/2", "EVD_4_176_SIBLINGS", netEstate));
           remainingShare -= share;
       }
  } else if (paternalSisters > 0 && isPatSiblingBlocked) {
       heirs.push(createBlockedHeir("INH_PAT_SISTER", "EVD_HAJB_BLOCK"));
  }

  // --- 6. ASABA (RESIDUARIES) ---
  // Who takes the rest? Hierarchy: Son > Father > Grandfather > Brother > Pat. Brother > Uncle.
  let residue = Math.max(0, remainingShare);
  let residueTaker = "";
  
  if (residue > 0.0001) {
      // 1. SONS (+ Daughters)
      if (sons > 0) {
          // Mixed Children
          const totalUnits = (sons * 2) + daughters;
          const unitValue = residue / totalUnits;
          
          heirs.push(createHeir("INH_SON", sons, (unitValue * 2 * sons), "Residue (2:1)", "EVD_4_11_SONS_DAUGHTERS", netEstate, "Asaba bi-nafsihi"));
          if (daughters > 0) {
               heirs.push(createHeir("INH_DAUGHTER", daughters, (unitValue * daughters), "Residue (2:1)", "EVD_4_11_SONS_DAUGHTERS", netEstate, "Asaba bi-ghayrihi"));
          }
          residue = 0;
      }
      // 2. FATHER (if no Son)
      else if (father > 0) {
          // Father takes ALL residue (plus his fixed 1/6 if daughters existed, effectively summing up).
          // We already gave him 1/6 if Daughter exists. Now he takes the rest.
          // If no daughter, he takes all residue.
          const existingFather = heirs.find(h => h.heirType === "INH_FATHER");
          if (existingFather) {
              existingFather.shareAmount += residue * netEstate;
              existingFather.sharePercentage += residue * 100;
              existingFather.note = "Fixed + Residue";
          } else {
              heirs.push(createHeir("INH_FATHER", 1, residue, "Residue", "EVD_RESIDUE_HADITH", netEstate, "Asaba bi-nafsihi"));
          }
          residue = 0;
      }
      // 3. GRANDFATHER (if no Father/Son)
      else if (paternalGrandfather > 0 && !isPatGrandfatherBlocked) {
          const existingGF = heirs.find(h => h.heirType === "INH_PAT_GRANDFATHER");
          if (existingGF) {
              existingGF.shareAmount += residue * netEstate;
              existingGF.sharePercentage += residue * 100;
              existingGF.note = "Fixed + Residue";
          } else {
              heirs.push(createHeir("INH_PAT_GRANDFATHER", 1, residue, "Residue", "EVD_RESIDUE_HADITH", netEstate));
          }
          residue = 0;
      }
      // 4. FULL BROTHERS (+ Sisters)
      else if (fullBrothers > 0 && !isFullSiblingBlocked) {
          const totalUnits = (fullBrothers * 2) + fullSisters;
          const unitValue = residue / totalUnits;
          heirs.push(createHeir("INH_FULL_BROTHER", fullBrothers, (unitValue * 2 * fullBrothers), "Residue (2:1)", "EVD_4_176_SIBLINGS", netEstate));
          if (fullSisters > 0) {
               heirs.push(createHeir("INH_FULL_SISTER", fullSisters, (unitValue * fullSisters), "Residue (2:1)", "EVD_4_176_SIBLINGS", netEstate));
          }
          residue = 0;
      }
      // 5. FULL SISTERS (with Daughters)
      else if (fullSisters > 0 && daughters > 0 && !isFullSiblingBlocked) {
          heirs.push(createHeir("INH_FULL_SISTER", fullSisters, residue, "Residue", "EVD_RESIDUE_HADITH", netEstate, "Asaba ma'a ghayr"));
          residue = 0;
      }
      // ... Can continue for Paternal Brothers ...
  }

  // --- 7. AWAL (Reduction) & RADD (Return) ---
  const totalCalculatedShares = heirs.reduce((acc, h) => acc + (h.isBlocked ? 0 : (h.sharePercentage/100)), 0);
  let hasAwal = false;
  let hasRadd = false;

  // Awal: Shares > 1
  if (totalCalculatedShares > 1.0001) {
     hasAwal = true;
     heirs = heirs.map(h => {
         if (h.isBlocked) return h;
         const normalizedShare = (h.sharePercentage/100) / totalCalculatedShares;
         return {
             ...h,
             sharePercentage: normalizedShare * 100,
             shareAmount: normalizedShare * netEstate,
             note: h.note ? `${h.note}, Awal` : "Awal applied"
         };
     });
     residue = 0;
  }
  // Radd: Shares < 1 AND No Asaba consumed it AND No Spouse (Spouse doesn't get Radd usually)
  else if (totalCalculatedShares < 0.999 && residue > 0.0001) {
      // If there was a residue taker (e.g. Son), residue is 0 by now.
      // If residue > 0 here, it means no Asaba exists.
      // Return surplus to blood relatives (not spouse).
      hasRadd = true;
      const spouseShare = heirs.filter(h => h.heirType === "INH_HUSBAND" || h.heirType === "INH_WIFE")
                               .reduce((acc, h) => acc + (h.sharePercentage/100), 0);
      const returnableShare = totalCalculatedShares - spouseShare;
      
      if (returnableShare > 0) {
        const surplus = 1.0 - totalCalculatedShares;
        heirs = heirs.map(h => {
            if (h.heirType === "INH_HUSBAND" || h.heirType === "INH_WIFE" || h.isBlocked) return h;
            // Proportional increase
            const weight = (h.sharePercentage/100) / returnableShare;
            const extra = surplus * weight;
            return {
                ...h,
                sharePercentage: (h.sharePercentage/100 + extra) * 100,
                shareAmount: (h.sharePercentage/100 + extra) * netEstate,
                note: "Fixed + Radd"
            };
        });
        residue = 0;
      }
  }

  return {
    totalShares: totalCalculatedShares,
    heirs: heirs.sort((a,b) => b.shareAmount - a.shareAmount), // Sort by highest amount
    residue: Math.max(0, residue * netEstate),
    hasAwal,
    hasRadd
  };
};

// Helper
const createHeir = (type: string, count: number, share: number, fraction: string, evidence: string, totalEstate: number, note?: string): HeirShare => ({
    heirType: type,
    count,
    shareFraction: fraction,
    sharePercentage: share * 100,
    shareAmount: totalEstate * share,
    evidenceKey: evidence,
    note
});

const createBlockedHeir = (type: string, evidence: string): HeirShare => ({
    heirType: type,
    count: 0,
    shareFraction: "0",
    sharePercentage: 0,
    shareAmount: 0,
    evidenceKey: evidence,
    isBlocked: true,
    note: "Blocked (Mahjoub)"
});