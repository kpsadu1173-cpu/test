import { Language } from '../types';

type TranslationKey = 
  | 'APP_TITLE' 
  | 'APP_SUBTITLE'
  | 'RETURN_HOME'
  | 'WELCOME_TITLE'
  | 'WELCOME_DESC'
  | 'TOOL_ZAKAT' | 'DESC_ZAKAT'
  | 'TOOL_INHERITANCE' | 'DESC_INHERITANCE'
  | 'TOOL_PARTNERSHIP' | 'DESC_PARTNERSHIP'
  | 'TOOL_FASTING' | 'DESC_FASTING'
  | 'TOOL_ANIMAL' | 'DESC_ANIMAL'
  | 'TOOL_HAJJ' | 'DESC_HAJJ'
  | 'TOOL_MAHR' | 'DESC_MAHR'
  | 'TOOL_MORE' | 'DESC_MORE'
  | 'TOOL_ADVISOR' | 'DESC_ADVISOR'
  | 'ADVISOR_GREETING'
  | 'ZAKAT_WEALTH_TITLE'
  | 'ZAKAT_ASSET_CASH'
  | 'ZAKAT_ASSET_GOLD'
  | 'ZAKAT_ASSET_INVEST'
  | 'ZAKAT_ASSET_DEBT'
  | 'ZAKAT_RESULT_TITLE'
  | 'ZAKAT_RESULT_NISAB'
  | 'ZAKAT_RESULT_NET'
  | 'ZAKAT_RESULT_PAYABLE'
  | 'ZAKAT_RESULT_BELOW'
  | 'MODAL_TITLE'
  | 'MODAL_SUBTITLE'
  | 'LBL_LANGUAGE'
  | 'LBL_COUNTRY'
  | 'LBL_CURRENCY'
  | 'BTN_ENTER'
  | 'COMING_SOON'
  | 'MSG_RATES_EDIT_HINT'
  | 'LBL_SELECT_NISAB'
  | 'LBL_GOLD'
  | 'LBL_SILVER'
  // Inheritance Keys
  | 'INH_DECEASED'
  | 'INH_NET_ESTATE'
  | 'INH_RELATIVES'
  | 'INH_HUSBAND'
  | 'INH_WIFE'
  | 'INH_FATHER'
  | 'INH_MOTHER'
  | 'INH_PAT_GRANDFATHER'
  | 'INH_PAT_GRANDMOTHER'
  | 'INH_MAT_GRANDMOTHER'
  | 'INH_SON'
  | 'INH_DAUGHTER'
  | 'INH_FULL_BROTHER'
  | 'INH_FULL_SISTER'
  | 'INH_PAT_BROTHER'
  | 'INH_PAT_SISTER'
  | 'INH_MAT_SIBLING'
  | 'INH_BTN_CALC'
  | 'INH_RESULT_TITLE'
  | 'INH_TABLE_HEIR'
  | 'INH_TABLE_SHARE'
  | 'INH_TABLE_AMOUNT'
  | 'INH_TABLE_EVIDENCE'
  | 'INH_NOTE_BLOCKED'
  | 'INH_NOTE_RESIDUE'
  | 'INH_NOTE_AWAL'
  | 'INH_NOTE_RADD'
  | 'INH_CAT_ASCENDANTS'
  | 'INH_CAT_DESCENDANTS'
  | 'INH_CAT_COLLATERALS'
  // Partnership Keys
  | 'PTN_MUSHARAKAH'
  | 'PTN_MUDARABAH'
  | 'PTN_DESC_MUSHARAKAH'
  | 'PTN_DESC_MUDARABAH'
  | 'PTN_PARTNER_A'
  | 'PTN_PARTNER_B'
  | 'PTN_CAPITAL'
  | 'PTN_PROFIT_RATIO'
  | 'PTN_TOTAL_PROFIT'
  | 'PTN_RESULT_PROFIT'
  | 'PTN_RESULT_LOSS'
  | 'PTN_RULE_PROFIT'
  | 'PTN_RULE_LOSS'
  | 'PTN_INVESTOR'
  | 'PTN_ENTREPRENEUR'
  | 'PTN_RAB_UL_MAAL'
  | 'PTN_MUDARIB'
  | 'PTN_AGREED_SPLIT'
  // Evidence Keys
  | 'EVD_4_11_SONS_DAUGHTERS'
  | 'EVD_4_11_PARENTS_WITH_CHILD'
  | 'EVD_4_11_MOTHER_NO_CHILD'
  | 'EVD_4_12_HUSBAND_NO_CHILD'
  | 'EVD_4_12_HUSBAND_WITH_CHILD'
  | 'EVD_4_12_WIFE_NO_CHILD'
  | 'EVD_4_12_WIFE_WITH_CHILD'
  | 'EVD_4_12_MAT_SIBLINGS'
  | 'EVD_4_176_SIBLINGS'
  | 'EVD_RESIDUE_HADITH'
  | 'EVD_IJMA_GRANDMOTHER'
  | 'EVD_HAJB_BLOCK';

export const TEXT: Record<Language, Record<TranslationKey, string>> = {
  en: {
    APP_TITLE: "Bayt Al-Mal",
    APP_SUBTITLE: "Islamic Economical Activities",
    RETURN_HOME: "Return to Hall",
    WELCOME_TITLE: "Welcome, Honored Guest",
    WELCOME_DESC: "Select a tool from the treasury below to manage your affairs according to the traditions of the faithful.",
    TOOL_ZAKAT: "Zakat Calculator",
    DESC_ZAKAT: "Purify your wealth by calculating the obligatory alms.",
    TOOL_INHERITANCE: "Inheritance",
    DESC_INHERITANCE: "Distribute estates according to divine laws.",
    TOOL_PARTNERSHIP: "Partnerships",
    DESC_PARTNERSHIP: "Structure Musharakah and Mudarabah contracts.",
    TOOL_FASTING: "Fasting Compensation",
    DESC_FASTING: "Calculate Fidya and Kaffarah for missed days.",
    TOOL_ANIMAL: "Animal Zakat",
    DESC_ANIMAL: "Calculate Zakat on livestock herds.",
    TOOL_HAJJ: "Hajj & Umrah",
    DESC_HAJJ: "Financial planning for pilgrimage.",
    TOOL_MAHR: "Mahr Calculator",
    DESC_MAHR: "Guidelines and recording of dowry.",
    TOOL_MORE: "More Tools",
    DESC_MORE: "Explore additional resources.",
    TOOL_ADVISOR: "AI Mufti Advisor",
    DESC_ADVISOR: "Consult our AI scholar for complex questions.",
    ADVISOR_GREETING: "As-salamu alaykum. How may I assist you regarding your finances today?",
    ZAKAT_WEALTH_TITLE: "My Wealth",
    ZAKAT_ASSET_CASH: "Cash on Hand & Bank",
    ZAKAT_ASSET_GOLD: "Gold & Silver Value",
    ZAKAT_ASSET_INVEST: "Stocks & Investments",
    ZAKAT_ASSET_DEBT: "Liabilities (Debts)",
    ZAKAT_RESULT_TITLE: "Zakat Summary",
    ZAKAT_RESULT_NISAB: "Nisab Threshold",
    ZAKAT_RESULT_NET: "Net Zakatable Assets",
    ZAKAT_RESULT_PAYABLE: "Zakat Due (2.5%)",
    ZAKAT_RESULT_BELOW: "Below Nisab Threshold (Not obligated)",
    MODAL_TITLE: "Welcome to Bayt Al-Mal",
    MODAL_SUBTITLE: "Please identify yourself to enter the treasury.",
    LBL_LANGUAGE: "Select Language",
    LBL_COUNTRY: "Your Country",
    LBL_CURRENCY: "Your Currency",
    BTN_ENTER: "Enter the Treasury",
    COMING_SOON: "Coming Soon",
    MSG_RATES_EDIT_HINT: "Market rates vary. You can edit the current market price above.",
    LBL_SELECT_NISAB: "Calculation Standard (Nisab)",
    LBL_GOLD: "Gold",
    LBL_SILVER: "Silver",
    
    // Inheritance
    INH_DECEASED: "Deceased Gender",
    INH_NET_ESTATE: "Net Estate Value",
    INH_RELATIVES: "Surviving Heirs",
    INH_HUSBAND: "Husband",
    INH_WIFE: "Wife",
    INH_FATHER: "Father",
    INH_MOTHER: "Mother",
    INH_PAT_GRANDFATHER: "Paternal Grandfather",
    INH_PAT_GRANDMOTHER: "Pat. Grandmother",
    INH_MAT_GRANDMOTHER: "Mat. Grandmother",
    INH_SON: "Son(s)",
    INH_DAUGHTER: "Daughter(s)",
    INH_FULL_BROTHER: "Full Brother(s)",
    INH_FULL_SISTER: "Full Sister(s)",
    INH_PAT_BROTHER: "Half-Bro (Father)",
    INH_PAT_SISTER: "Half-Sis (Father)",
    INH_MAT_SIBLING: "Maternal Sibling",
    INH_BTN_CALC: "Calculate Distribution",
    INH_RESULT_TITLE: "Shariah Distribution",
    INH_TABLE_HEIR: "Heir",
    INH_TABLE_SHARE: "Fraction",
    INH_TABLE_AMOUNT: "Amount",
    INH_TABLE_EVIDENCE: "Evidence",
    INH_NOTE_BLOCKED: "Excluded (Mahjoub)",
    INH_NOTE_RESIDUE: "Residue (Asaba)",
    INH_NOTE_AWAL: "Shares Reduced (Awal)",
    INH_NOTE_RADD: "Surplus Returned (Radd)",
    INH_CAT_ASCENDANTS: "Parents & Grandparents",
    INH_CAT_DESCENDANTS: "Children",
    INH_CAT_COLLATERALS: "Siblings",

    // Partnership
    PTN_MUSHARAKAH: "Musharakah (Joint Venture)",
    PTN_MUDARABAH: "Mudarabah (Trust Financing)",
    PTN_DESC_MUSHARAKAH: "A partnership where all partners provide capital and share profit/loss.",
    PTN_DESC_MUDARABAH: "A partnership where one provides capital and the other provides labor.",
    PTN_PARTNER_A: "Partner A",
    PTN_PARTNER_B: "Partner B",
    PTN_CAPITAL: "Capital Contribution",
    PTN_PROFIT_RATIO: "Agreed Profit Share (%)",
    PTN_TOTAL_PROFIT: "Total Profit/Revenue to Split",
    PTN_RESULT_PROFIT: "Profit Distribution",
    PTN_RESULT_LOSS: "Loss Liability",
    PTN_RULE_PROFIT: "Rule: Profit is distributed according to the agreed ratio, which may differ from capital ratio.",
    PTN_RULE_LOSS: "Rule: Financial loss MUST be borne strictly in proportion to capital contribution.",
    PTN_INVESTOR: "Investor",
    PTN_ENTREPRENEUR: "Entrepreneur",
    PTN_RAB_UL_MAAL: "Rab-ul-Maal (Capital Owner)",
    PTN_MUDARIB: "Mudarib (Manager)",
    PTN_AGREED_SPLIT: "Agreed Split",

    // Evidence
    EVD_4_11_SONS_DAUGHTERS: "Quran 4:11 - Male gets share of two females.",
    EVD_4_11_PARENTS_WITH_CHILD: "Quran 4:11 - Parents 1/6 each (Child exists).",
    EVD_4_11_MOTHER_NO_CHILD: "Quran 4:11 - Mother 1/3 (No Child/Siblings).",
    EVD_4_12_HUSBAND_NO_CHILD: "Quran 4:12 - Husband 1/2 (No Child).",
    EVD_4_12_HUSBAND_WITH_CHILD: "Quran 4:12 - Husband 1/4 (Child exists).",
    EVD_4_12_WIFE_NO_CHILD: "Quran 4:12 - Wife 1/4 (No Child).",
    EVD_4_12_WIFE_WITH_CHILD: "Quran 4:12 - Wife 1/8 (Child exists).",
    EVD_4_12_MAT_SIBLINGS: "Quran 4:12 - Maternal siblings share 1/3.",
    EVD_4_176_SIBLINGS: "Quran 4:176 - Kalala (Siblings) rules.",
    EVD_RESIDUE_HADITH: "Bukhari: Residue to nearest male kin.",
    EVD_IJMA_GRANDMOTHER: "Ijma: Grandmother 1/6 if Mother absent.",
    EVD_HAJB_BLOCK: "Excluded by closer relative."
  },
  ar: {
    APP_TITLE: "بيت المال",
    APP_SUBTITLE: "الأنشطة الاقتصادية الإسلامية",
    RETURN_HOME: "العودة للقاعة",
    WELCOME_TITLE: "أهلاً بك يا ضيفنا الكريم",
    WELCOME_DESC: "اختر أداة من الخزانة أدناه لإدارة شؤونك وفقاً للشريعة الغراء.",
    TOOL_ZAKAT: "حاسبة الزكاة",
    DESC_ZAKAT: "طهر أموالك بحساب الزكاة الواجبة بدقة.",
    TOOL_INHERITANCE: "المواريث",
    DESC_INHERITANCE: "توزيع التركات وفقاً للشرع الحنيف.",
    TOOL_PARTNERSHIP: "الشركات",
    DESC_PARTNERSHIP: "هيكلة عقود المضاربة والمشاركة.",
    TOOL_FASTING: "فدية الصيام",
    DESC_FASTING: "حساب الفدية والكفارة للأيام الفائتة.",
    TOOL_ANIMAL: "زكاة الأنعام",
    DESC_ANIMAL: "حساب الزكاة على الإبل والبقر والغنم.",
    TOOL_HAJJ: "الحج والعمرة",
    DESC_HAJJ: "التخطيط المالي لرحلة العمر.",
    TOOL_MAHR: "حاسبة المهر",
    DESC_MAHR: "إرشادات وتوثيق الصداق.",
    TOOL_MORE: "أدوات أخرى",
    DESC_MORE: "استكشف المزيد من الموارد.",
    TOOL_ADVISOR: "المستشار الذكي",
    DESC_ADVISOR: "استشر نموذج الذكاء الاصطناعي في المسائل المالية.",
    ADVISOR_GREETING: "السلام عليكم ورحمة الله. كيف يمكنني مساعدتك في شؤونك المالية اليوم؟",
    ZAKAT_WEALTH_TITLE: "أموالي",
    ZAKAT_ASSET_CASH: "النقد في اليد والبنك",
    ZAKAT_ASSET_GOLD: "قيمة الذهب والفضة",
    ZAKAT_ASSET_INVEST: "الأسهم والاستثمارات",
    ZAKAT_ASSET_DEBT: "الديون والالتزامات",
    ZAKAT_RESULT_TITLE: "ملخص الزكاة",
    ZAKAT_RESULT_NISAB: "حد النصاب",
    ZAKAT_RESULT_NET: "صافي الأموال الزكوية",
    ZAKAT_RESULT_PAYABLE: "الزكاة المستحقة (2.5%)",
    ZAKAT_RESULT_BELOW: "دون النصاب (لا تجب الزكاة)",
    MODAL_TITLE: "مرحباً بكم في بيت المال",
    MODAL_SUBTITLE: "يرجى تحديد هويتكم للدخول.",
    LBL_LANGUAGE: "اختر اللغة",
    LBL_COUNTRY: "دولتك",
    LBL_CURRENCY: "عملتك",
    BTN_ENTER: "دخول الخزانة",
    COMING_SOON: "قريباً",
    MSG_RATES_EDIT_HINT: "تختلف أسعار السوق. يمكنك تعديل السعر الحالي أعلاه.",
    LBL_SELECT_NISAB: "معيار حساب النصاب",
    LBL_GOLD: "ذهب",
    LBL_SILVER: "فضة",

    // Inheritance
    INH_DECEASED: "جنس المتوفى",
    INH_NET_ESTATE: "صافي التركة",
    INH_RELATIVES: "الورثة",
    INH_HUSBAND: "الزوج",
    INH_WIFE: "الزوجة",
    INH_FATHER: "الأب",
    INH_MOTHER: "الأم",
    INH_PAT_GRANDFATHER: "الجد (لأب)",
    INH_PAT_GRANDMOTHER: "الجدة (لأب)",
    INH_MAT_GRANDMOTHER: "الجدة (لأم)",
    INH_SON: "الابن",
    INH_DAUGHTER: "الابنة",
    INH_FULL_BROTHER: "أخ شقيق",
    INH_FULL_SISTER: "أخت شقيقة",
    INH_PAT_BROTHER: "أخ لأب",
    INH_PAT_SISTER: "أخت لأب",
    INH_MAT_SIBLING: "أخ/أخت لأم",
    INH_BTN_CALC: "حساب التوزيع",
    INH_RESULT_TITLE: "التوزيع الشرعي",
    INH_TABLE_HEIR: "الوارث",
    INH_TABLE_SHARE: "السهم",
    INH_TABLE_AMOUNT: "المقدار",
    INH_TABLE_EVIDENCE: "الدليل",
    INH_NOTE_BLOCKED: "محجوب",
    INH_NOTE_RESIDUE: "عصبة",
    INH_NOTE_AWAL: "نقص (عول)",
    INH_NOTE_RADD: "رد",
    INH_CAT_ASCENDANTS: "الأصول (آباء وأجداد)",
    INH_CAT_DESCENDANTS: "الفروع (أبناء)",
    INH_CAT_COLLATERALS: "الحواشي (إخوة)",

    // Partnership
    PTN_MUSHARAKAH: "المشاركة",
    PTN_MUDARABAH: "المضاربة",
    PTN_DESC_MUSHARAKAH: "شراكة يشترك فيها جميع الشركاء برأس المال والربح/الخسارة.",
    PTN_DESC_MUDARABAH: "شراكة يدفع فيها طرف المال (رب المال) وطرف العمل (المضارب).",
    PTN_PARTNER_A: "الشريك الأول",
    PTN_PARTNER_B: "الشريك الثاني",
    PTN_CAPITAL: "رأس المال المساهم",
    PTN_PROFIT_RATIO: "نسبة الربح المتفق عليها (%)",
    PTN_TOTAL_PROFIT: "إجمالي الربح للتوزيع",
    PTN_RESULT_PROFIT: "توزيع الأرباح",
    PTN_RESULT_LOSS: "تحمل الخسائر",
    PTN_RULE_PROFIT: "قاعدة: يوزع الربح حسب الاتفاق، وقد يختلف عن نسبة رأس المال.",
    PTN_RULE_LOSS: "قاعدة: الخسارة المالية تكون حصراً بقدر نسبة رأس المال.",
    PTN_INVESTOR: "المستثمر",
    PTN_ENTREPRENEUR: "رائد الأعمال",
    PTN_RAB_UL_MAAL: "رب المال",
    PTN_MUDARIB: "المضارب",
    PTN_AGREED_SPLIT: "النسبة المتفق عليها",

    EVD_4_11_SONS_DAUGHTERS: "النساء 11 - لِلذَّكَرِ مِثْلُ حَظِّ الْأُنثَيَيْنِ",
    EVD_4_11_PARENTS_WITH_CHILD: "النساء 11 - وَلِأَبَوَيْهِ لِكُلِّ وَاحِدٍ مِّنْهُمَا السُّدُسُ",
    EVD_4_11_MOTHER_NO_CHILD: "النساء 11 - فَلِأُمِّهِ الثُّلُثُ",
    EVD_4_12_HUSBAND_NO_CHILD: "النساء 12 - وَلَكُمْ نِصْفُ مَا تَرَكَ أَزْوَاجُكُمْ",
    EVD_4_12_HUSBAND_WITH_CHILD: "النساء 12 - فَلَكُمُ الرُّبُعُ",
    EVD_4_12_WIFE_NO_CHILD: "النساء 12 - وَلَهُنَّ الرُّبُعُ",
    EVD_4_12_WIFE_WITH_CHILD: "النساء 12 - فَلَهُنَّ الثُّمُنُ",
    EVD_4_12_MAT_SIBLINGS: "النساء 12 - فَهُمْ شُرَكَاءُ فِي الثُّلُثِ",
    EVD_4_176_SIBLINGS: "النساء 176 - يَسْتَفْتُونَكَ قُلِ اللَّهُ يُفْتِيكُمْ فِي الْكَلَالَةِ",
    EVD_RESIDUE_HADITH: "حديث: أَلْحِقُوا الْفَرَائِضَ بِأَهْلِهَا",
    EVD_IJMA_GRANDMOTHER: "إجماع: الجدة لها السدس",
    EVD_HAJB_BLOCK: "محجوب بمن هو أقرب"
  },
  hi: {
    APP_TITLE: "बैत अल-माल",
    APP_SUBTITLE: "इस्लामिक आर्थिक गतिविधियाँ",
    RETURN_HOME: "मुख्य हॉल में लौटें",
    WELCOME_TITLE: "आपका स्वागत है, सम्मानित अतिथि",
    WELCOME_DESC: "अपनी संपत्ति का प्रबंधन करने के लिए नीचे दिए गए टूल चुनें।",
    TOOL_ZAKAT: "ज़कात कैलकुलेटर",
    DESC_ZAKAT: "अनिवार्य दान की गणना करके अपने धन को शुद्ध करें।",
    TOOL_INHERITANCE: "विरासत (Inheritance)",
    DESC_INHERITANCE: "दिव्य कानूनों के अनुसार संपत्ति का वितरण।",
    TOOL_PARTNERSHIP: "साझेदारी (Partnership)",
    DESC_PARTNERSHIP: "मुशारका और मुदाराबा अनुबंधों की संरचना।",
    TOOL_FASTING: "रोज़ा मुआवजा",
    DESC_FASTING: "छूटे हुए रोज़ों के लिए फिदया और कफारा की गणना।",
    TOOL_ANIMAL: "पशु ज़कात",
    DESC_ANIMAL: "पशुधन पर ज़कात की गणना करें।",
    TOOL_HAJJ: "हज और उमराह",
    DESC_HAJJ: "तीर्थयात्रा के लिए वित्तीय योजना।",
    TOOL_MAHR: "महर कैलकुलेटर",
    DESC_MAHR: "दहेज (महर) के दिशा-निर्देश।",
    TOOL_MORE: "अधिक उपकरण",
    DESC_MORE: "अतिरिक्त संसाधनों का अन्वेषण करें।",
    TOOL_ADVISOR: "AI मुफ्ती सलाहकार",
    DESC_ADVISOR: "जटिल सवालों के लिए हमारे AI विद्वान से परामर्श करें।",
    ADVISOR_GREETING: "अस्सलाम वालेकुम। आज मैं आपके वित्त के संबंध में आपकी कैसे सहायता कर सकता हूँ?",
    ZAKAT_WEALTH_TITLE: "मेरी संपत्ति",
    ZAKAT_ASSET_CASH: "नकद और बैंक बैलेंस",
    ZAKAT_ASSET_GOLD: "सोना और चांदी का मूल्य",
    ZAKAT_ASSET_INVEST: "शेयर और निवेश",
    ZAKAT_ASSET_DEBT: "देनदारियां (ऋण)",
    ZAKAT_RESULT_TITLE: "ज़कात सारांश",
    ZAKAT_RESULT_NISAB: "निसाब सीमा",
    ZAKAT_RESULT_NET: "शुद्ध ज़कात योग्य संपत्ति",
    ZAKAT_RESULT_PAYABLE: "देय ज़कात (2.5%)",
    ZAKAT_RESULT_BELOW: "निसाब सीमा से नीचे",
    MODAL_TITLE: "बैत अल-माल में आपका स्वागत है",
    MODAL_SUBTITLE: "खजाने में प्रवेश करने के लिए कृपया अपनी जानकारी दें।",
    LBL_LANGUAGE: "भाषा चुनें",
    LBL_COUNTRY: "आपका देश",
    LBL_CURRENCY: "आपकी मुद्रा",
    BTN_ENTER: "प्रवेश करें",
    COMING_SOON: "जल्द आ रहा है",
    MSG_RATES_EDIT_HINT: "बाजार दरें भिन्न हो सकती हैं। आप ऊपर मौजूदा बाजार मूल्य को संपादित कर सकते हैं।",
    LBL_SELECT_NISAB: "गणना मानक (निसाब)",
    LBL_GOLD: "सोना",
    LBL_SILVER: "चांदी",

    // Inheritance
    INH_DECEASED: "मृतक का लिंग",
    INH_NET_ESTATE: "शुद्ध संपत्ति",
    INH_RELATIVES: "वारिस",
    INH_HUSBAND: "पति",
    INH_WIFE: "पत्नी",
    INH_FATHER: "पिता",
    INH_MOTHER: "मां",
    INH_PAT_GRANDFATHER: "दादा",
    INH_PAT_GRANDMOTHER: "दादी",
    INH_MAT_GRANDMOTHER: "नानी",
    INH_SON: "बेटा",
    INH_DAUGHTER: "बेटी",
    INH_FULL_BROTHER: "सगा भाई",
    INH_FULL_SISTER: "सगी बहन",
    INH_PAT_BROTHER: "सौतेला भाई (पिता)",
    INH_PAT_SISTER: "सौतेली बहन (पिता)",
    INH_MAT_SIBLING: "माँ की ओर से भाई/बहन",
    INH_BTN_CALC: "गणना करें",
    INH_RESULT_TITLE: "शरिया वितरण",
    INH_TABLE_HEIR: "वारिस",
    INH_TABLE_SHARE: "हिस्सा",
    INH_TABLE_AMOUNT: "राशि",
    INH_TABLE_EVIDENCE: "सबूत",
    INH_NOTE_BLOCKED: "बहिष्कृत (महजूब)",
    INH_NOTE_RESIDUE: "अवशेष (असाबा)",
    INH_NOTE_AWAL: "कम हिस्सा (अवल)",
    INH_NOTE_RADD: "वापसी (रद्द)",
    INH_CAT_ASCENDANTS: "माता-पिता और दादा-दादी",
    INH_CAT_DESCENDANTS: "बच्चे",
    INH_CAT_COLLATERALS: "भाई-बहन",

    // Partnership
    PTN_MUSHARAKAH: "मुशारका (संयुक्त उद्यम)",
    PTN_MUDARABAH: "मुदाराबा (ट्रस्ट फाइनेंसिंग)",
    PTN_DESC_MUSHARAKAH: "एक साझेदारी जहां सभी भागीदार पूंजी प्रदान करते हैं और लाभ/हानि साझा करते हैं।",
    PTN_DESC_MUDARABAH: "एक साझेदारी जहां एक पूंजी प्रदान करता है और दूसरा श्रम प्रदान करता है।",
    PTN_PARTNER_A: "पार्टनर A",
    PTN_PARTNER_B: "पार्टनर B",
    PTN_CAPITAL: "पूंजी योगदान",
    PTN_PROFIT_RATIO: "सहमत लाभ हिस्सा (%)",
    PTN_TOTAL_PROFIT: "कुल लाभ",
    PTN_RESULT_PROFIT: "लाभ वितरण",
    PTN_RESULT_LOSS: "हानि दायित्व",
    PTN_RULE_PROFIT: "नियम: लाभ सहमत अनुपात के अनुसार वितरित किया जाता है।",
    PTN_RULE_LOSS: "नियम: वित्तीय हानि को पूरी तरह से पूंजी योगदान के अनुपात में वहन किया जाना चाहिए।",
    PTN_INVESTOR: "निवेशक",
    PTN_ENTREPRENEUR: "उद्यमी",
    PTN_RAB_UL_MAAL: "रब-उल-माल (पूंजी स्वामी)",
    PTN_MUDARIB: "मुदारिब (प्रबंधक)",
    PTN_AGREED_SPLIT: "सहमत विभाजन",

    EVD_4_11_SONS_DAUGHTERS: "कुरान 4:11 - पुरुष को दो महिलाओं के बराबर।",
    EVD_4_11_PARENTS_WITH_CHILD: "कुरान 4:11 - माता-पिता को 1/6 (बच्चे होने पर)।",
    EVD_4_11_MOTHER_NO_CHILD: "कुरान 4:11 - माँ को 1/3 (बच्चे नहीं)।",
    EVD_4_12_HUSBAND_NO_CHILD: "कुरान 4:12 - पति को 1/2 (बच्चे नहीं)।",
    EVD_4_12_HUSBAND_WITH_CHILD: "कुरान 4:12 - पति को 1/4 (बच्चे हैं)।",
    EVD_4_12_WIFE_NO_CHILD: "कुरान 4:12 - पत्नी को 1/4 (बच्चे नहीं)।",
    EVD_4_12_WIFE_WITH_CHILD: "कुरान 4:12 - पत्नी को 1/8 (बच्चे हैं)।",
    EVD_4_12_MAT_SIBLINGS: "कुरान 4:12 - मातृ भाई-बहन 1/3 साझा करते हैं।",
    EVD_4_176_SIBLINGS: "कुरान 4:176 - कलाला (भाई-बहन) नियम।",
    EVD_RESIDUE_HADITH: "बुखारी: जो बचा है वह निकटतम पुरुष के लिए है।",
    EVD_IJMA_GRANDMOTHER: "इज्मा: दादी/नानी को 1/6।",
    EVD_HAJB_BLOCK: "करीबी रिश्तेदार द्वारा अवरुद्ध।"
  },
  ml: {
    APP_TITLE: "ബൈത്തുൽ മാൽ",
    APP_SUBTITLE: "ഇസ്ലാമിക സാമ്പത്തിക പ്രവർത്തനങ്ങൾ",
    RETURN_HOME: "തിരികെ പോകുക",
    WELCOME_TITLE: "സ്വാഗതം, ആദരണീയനായ അതിഥി",
    WELCOME_DESC: "ശരിയത്ത് അനുസരിച്ച് നിങ്ങളുടെ സമ്പത്ത് കൈകാര്യം ചെയ്യാൻ താഴെയുള്ള ടൂളുകൾ ഉപയോഗിക്കുക.",
    TOOL_ZAKAT: "സക്കാത്ത് കാൽക്കുലേറ്റർ",
    DESC_ZAKAT: "നിർബന്ധിത ദാനം കണക്കാക്കി സമ്പത്ത് ശുദ്ധീകരിക്കുക.",
    TOOL_INHERITANCE: "അനന്തരാവകാശം",
    DESC_INHERITANCE: "ഇസ്ലാമിക നിയമപ്രകാരം സ്വത്ത് വീതം വയ്ക്കുക.",
    TOOL_PARTNERSHIP: "പങ്കാളിത്തം",
    DESC_PARTNERSHIP: "മുഷാറക്ക, മുദാറബ കരാറുകൾ തയ്യാറാക്കുക.",
    TOOL_FASTING: "നോമ്പ് പരിഹാരം",
    DESC_FASTING: "ഫിദ്യയും കഫാറയും കണക്കാക്കുക.",
    TOOL_ANIMAL: "മൃഗങ്ങളുടെ സക്കാത്ത്",
    DESC_ANIMAL: "കന്നുകാലികളുടെ സക്കാത്ത് കണക്കാക്കുക.",
    TOOL_HAJJ: "ഹജ്ജ് & ഉംറ",
    DESC_HAJJ: "തീർത്ഥാടനത്തിനുള്ള സാമ്പത്തിക ആസൂത്രണം.",
    TOOL_MAHR: "മഹർ കാൽക്കുലേറ്റർ",
    DESC_MAHR: "മഹർ കണക്കാക്കുന്നതിനുള്ള മാർഗ്ഗനിർദ്ദേശങ്ങൾ.",
    TOOL_MORE: "കൂടുതൽ",
    DESC_MORE: "കൂടുതൽ സേവനങ്ങൾ കണ്ടെത്തുക.",
    TOOL_ADVISOR: "AI മുഫ്തി",
    DESC_ADVISOR: "സംശയങ്ങൾക്ക് AI പണ്ഡിതനോട് ചോദിക്കുക.",
    ADVISOR_GREETING: "അസ്സലാമു അലൈക്കും. സാമ്പത്തിക കാര്യങ്ങളിൽ നിങ്ങളെ എങ്ങനെ സഹായിക്കാം?",
    ZAKAT_WEALTH_TITLE: "എന്റെ സമ്പാദ്യം",
    ZAKAT_ASSET_CASH: "കയ്യിലുള്ള പണം",
    ZAKAT_ASSET_GOLD: "സ്വർണ്ണം/വെള്ളി മൂല്യം",
    ZAKAT_ASSET_INVEST: "നിക്ഷേപങ്ങൾ",
    ZAKAT_ASSET_DEBT: "കടബാധ്യതകൾ",
    ZAKAT_RESULT_TITLE: "സക്കാത്ത് സംഗ്രഹം",
    ZAKAT_RESULT_NISAB: "നിസാബ് പരിധി",
    ZAKAT_RESULT_NET: "സക്കാത്ത് നൽകേണ്ട ആസ്തി",
    ZAKAT_RESULT_PAYABLE: "നൽകേണ്ട സക്കാത്ത് (2.5%)",
    ZAKAT_RESULT_BELOW: "നിസാബ് പരിധിക്ക് താഴെ",
    MODAL_TITLE: "ബൈത്തുൽ മാലിലേക്ക് സ്വാഗതം",
    MODAL_SUBTITLE: "തുടരുന്നതിന് മുൻപ് വിവരങ്ങൾ നൽകുക.",
    LBL_LANGUAGE: "ഭാഷ തിരഞ്ഞെടുക്കുക",
    LBL_COUNTRY: "രാജ്യം",
    LBL_CURRENCY: "കറൻസി",
    BTN_ENTER: "പ്രവേശിക്കുക",
    COMING_SOON: "ഉടൻ വരുന്നു",
    MSG_RATES_EDIT_HINT: "വിപണി നിരക്കുകൾ വ്യത്യാസപ്പെടാം. നിങ്ങൾക്ക് മുകളിൽ വില തിരുത്താവുന്നതാണ്.",
    LBL_SELECT_NISAB: "നിസാബ് കണക്കാക്കുന്ന രീതി",
    LBL_GOLD: "സ്വർണ്ണം",
    LBL_SILVER: "വെള്ളി",

    // Inheritance
    INH_DECEASED: "മരണപ്പെട്ട വ്യക്തി",
    INH_NET_ESTATE: "ബാക്കിയുള്ള സ്വത്ത്",
    INH_RELATIVES: "അവകാശികൾ",
    INH_HUSBAND: "ഭർത്താവ്",
    INH_WIFE: "ഭാര്യ",
    INH_FATHER: "പിതാവ്",
    INH_MOTHER: "മാതാവ്",
    INH_PAT_GRANDFATHER: "പിതാവിന്റെ പിതാവ്",
    INH_PAT_GRANDMOTHER: "പിതാവിന്റെ മാതാവ്",
    INH_MAT_GRANDMOTHER: "മാതാവിന്റെ മാതാവ്",
    INH_SON: "മകൻ",
    INH_DAUGHTER: "മകൾ",
    INH_FULL_BROTHER: "സഹോദരൻ (ഒരേ പിതാവ്, മാതാവ്)",
    INH_FULL_SISTER: "സഹോദരി (ഒരേ പിതാവ്, മാതാവ്)",
    INH_PAT_BROTHER: "സഹോദരൻ (പിതാവ് വഴി)",
    INH_PAT_SISTER: "സഹോദരി (പിതാവ് വഴി)",
    INH_MAT_SIBLING: "മാതാവ് വഴിയുള്ള സഹോദരങ്ങൾ",
    INH_BTN_CALC: "കണക്കാക്കുക",
    INH_RESULT_TITLE: "ഇസ്ലാമിക അനന്തരാവകാശ കണക്ക്",
    INH_TABLE_HEIR: "അവകാശി",
    INH_TABLE_SHARE: "ഓഹരി",
    INH_TABLE_AMOUNT: "തുക",
    INH_TABLE_EVIDENCE: "പ്രമാണം",
    INH_NOTE_BLOCKED: "തടയപ്പെട്ടു (മഹ്ജൂബ്)",
    INH_NOTE_RESIDUE: "ശിഷ്ടം (അസബ)",
    INH_NOTE_AWAL: "ഓഹരി കുറവ് (അവൽ)",
    INH_NOTE_RADD: "മിച്ചം (റദ്ദ്)",
    INH_CAT_ASCENDANTS: "മാതാപിതാക്കൾ & മുത്തശ്ശീമുത്തശ്ശന്മാർ",
    INH_CAT_DESCENDANTS: "മക്കൾ",
    INH_CAT_COLLATERALS: "സഹോദരങ്ങൾ",

    // Partnership
    PTN_MUSHARAKAH: "മുഷാറക്ക (സംയുക്ത സംരംഭം)",
    PTN_MUDARABAH: "മുദാറബ",
    PTN_DESC_MUSHARAKAH: "എല്ലാ പങ്കാളികളും മൂലധനം നൽകി ലാഭവും നഷ്ടവും പങ്കിടുന്ന രീതി.",
    PTN_DESC_MUDARABAH: "ഒരാൾ പണവും മറ്റൊരാൾ അധ്വാനവും നൽകുന്ന രീതി.",
    PTN_PARTNER_A: "പങ്കാളി A",
    PTN_PARTNER_B: "പങ്കാളി B",
    PTN_CAPITAL: "മൂലധനം",
    PTN_PROFIT_RATIO: "ലാഭ വിഹിതം (%)",
    PTN_TOTAL_PROFIT: "ആകെ ലാഭം",
    PTN_RESULT_PROFIT: "ലാഭ വിഹിതം",
    PTN_RESULT_LOSS: "നഷ്ട ബാധ്യത",
    PTN_RULE_PROFIT: "നിയമം: ലാഭം കരാർ പ്രകാരം വീതിക്കാം.",
    PTN_RULE_LOSS: "നിയമം: സാമ്പത്തിക നഷ്ടം മൂലധനത്തിന്റെ തോതിൽ മാത്രമേ പാടുള്ളൂ.",
    PTN_INVESTOR: "നിക്ഷേപകൻ",
    PTN_ENTREPRENEUR: "സംരംഭകൻ",
    PTN_RAB_UL_MAAL: "റബ്ബുൽ മാൽ (നിക്ഷേപകൻ)",
    PTN_MUDARIB: "മുദാരിബ് (മാനേജർ)",
    PTN_AGREED_SPLIT: "കരാർ",

    EVD_4_11_SONS_DAUGHTERS: "ഖുർആൻ 4:11 - ആണിന് രണ്ട് പെണ്ണിന്റെ ഓഹരി.",
    EVD_4_11_PARENTS_WITH_CHILD: "ഖുർആൻ 4:11 - മാതാപിതാക്കൾക്ക് ആറിലൊന്ന് (മക്കളുണ്ടെങ്കിൽ).",
    EVD_4_11_MOTHER_NO_CHILD: "ഖുർആൻ 4:11 - മാതാവിന് മൂന്നിലൊന്ന് (മക്കളില്ലെങ്കിൽ).",
    EVD_4_12_HUSBAND_NO_CHILD: "ഖുർആൻ 4:12 - ഭർത്താവിന് പകുതി.",
    EVD_4_12_HUSBAND_WITH_CHILD: "ഖുർആൻ 4:12 - ഭർത്താവിന് നാലിലൊന്ന്.",
    EVD_4_12_WIFE_NO_CHILD: "ഖുർആൻ 4:12 - ഭാര്യക്ക് നാലിലൊന്ന്.",
    EVD_4_12_WIFE_WITH_CHILD: "ഖുർആൻ 4:12 - ഭാര്യക്ക് എട്ടിലൊന്ന്.",
    EVD_4_12_MAT_SIBLINGS: "ഖുർആൻ 4:12 - മാതൃ സഹോദരങ്ങൾ മൂന്നിലൊന്ന് പങ്കിടുന്നു.",
    EVD_4_176_SIBLINGS: "ഖുർആൻ 4:176 - സഹോദരങ്ങളുടെ അവകാശം.",
    EVD_RESIDUE_HADITH: "ബുഖാരി: ബാക്കിയുള്ളത് അടുത്തുള്ള പുരുഷന്.",
    EVD_IJMA_GRANDMOTHER: "ഇജ്മാഅ്: മുത്തശ്ശിക്ക് ആറിലൊന്ന്.",
    EVD_HAJB_BLOCK: "അടുത്ത ബന്ധു ഉള്ളതിനാൽ തടയപ്പെട്ടു."
  },
  ta: {
    APP_TITLE: "பைத்துல் மால்",
    APP_SUBTITLE: "இஸ்லாமிய பொருளாதார நடவடிக்கைகள்",
    RETURN_HOME: "முகப்புக்கு திரும்புக",
    WELCOME_TITLE: "வரவேற்கிறோம்",
    WELCOME_DESC: "ஷரியத் முறைப்படி உங்கள் செல்வத்தை நிர்வகிக்க கீழே உள்ள கருவிகளைத் தேர்ந்தெடுக்கவும்.",
    TOOL_ZAKAT: "ஜகாத் கால்குலேட்டர்",
    DESC_ZAKAT: "உங்கள் செல்வத்தை தூய்மைப்படுத்த ஜகாத்தை கணக்கிடுங்கள்.",
    TOOL_INHERITANCE: "சொத்துரிமை (Inheritance)",
    DESC_INHERITANCE: "இறை சட்டங்களின்படி சொத்து விநியோகம்.",
    TOOL_PARTNERSHIP: "கூட்டாண்மை",
    DESC_PARTNERSHIP: "முஷாரகா மற்றும் முதாரபா ஒப்பந்தங்கள்.",
    TOOL_FASTING: "நோன்பு பரிகாரம்",
    DESC_FASTING: "விடுபட்ட நோன்புகளுக்கான ஃபித்யா மற்றும் கஃபாராவை கணக்கிடுங்கள்.",
    TOOL_ANIMAL: "கால்நடை ஜகாத்",
    DESC_ANIMAL: "கால்நடைகளுக்கான ஜகாத் கணக்கீடு.",
    TOOL_HAJJ: "ஹஜ் & உம்ரா",
    DESC_HAJJ: "புனித பயணத்திற்கான நிதித் திட்டம்.",
    TOOL_MAHR: "மஹர் கால்குலேட்டர்",
    DESC_MAHR: "மஹர் வழிகாட்டுதல்கள்.",
    TOOL_MORE: "மேலும் கருவிகள்",
    DESC_MORE: "கூடுதல் வளங்களை ஆராயுங்கள்.",
    TOOL_ADVISOR: "AI முஃப்தி",
    DESC_ADVISOR: "சிக்கலான கேள்விகளுக்கு எங்கள் AI அறிஞரை அணுகவும்.",
    ADVISOR_GREETING: "அஸ்ஸலாமு அலைக்கும். இன்று உங்கள் நிதியில் நான் எவ்வாறு உதவ முடியும்?",
    ZAKAT_WEALTH_TITLE: "எனது செல்வம்",
    ZAKAT_ASSET_CASH: "கையிருப்பு பணம்",
    ZAKAT_ASSET_GOLD: "தங்கம்/வெள்ளி மதிப்பு",
    ZAKAT_ASSET_INVEST: "முதலீடுகள்",
    ZAKAT_ASSET_DEBT: "கடன்கள்",
    ZAKAT_RESULT_TITLE: "ஜகாத் சுருக்கம்",
    ZAKAT_RESULT_NISAB: "நிசாப் வரம்பு",
    ZAKAT_RESULT_NET: "ஜகாத் தகுதி வாய்ந்த சொத்து",
    ZAKAT_RESULT_PAYABLE: "செலுத்த வேண்டிய ஜகாத் (2.5%)",
    ZAKAT_RESULT_BELOW: "நிசாப் வரம்பிற்குக் கீழே",
    MODAL_TITLE: "பைத்துல் மாலுக்கு வரவேற்கிறோம்",
    MODAL_SUBTITLE: "கருவூலத்திற்குள் நுழைய உங்கள் விவரங்களைக் கூறவும்.",
    LBL_LANGUAGE: "மொழியைத் தேர்ந்தெடுக்கவும்",
    LBL_COUNTRY: "உங்கள் நாடு",
    LBL_CURRENCY: "உங்கள் நாணயம்",
    BTN_ENTER: "உள்ளே நுழைய",
    COMING_SOON: "விரைவில் வரும்",
    MSG_RATES_EDIT_HINT: "சந்தை விலைகள் மாறுபடலாம். மேலே உள்ள விலையை நீங்கள் திருத்தலாம்.",
    LBL_SELECT_NISAB: "கணக்கீடு தரநிலை (நிசாப்)",
    LBL_GOLD: "தங்கம்",
    LBL_SILVER: "வெள்ளி",

    // Inheritance
    INH_DECEASED: "இறந்தவர் பாலினம்",
    INH_NET_ESTATE: "நிகர சொத்து",
    INH_RELATIVES: "வாரிசுகள்",
    INH_HUSBAND: "கணவன்",
    INH_WIFE: "மனைவி",
    INH_FATHER: "தந்தை",
    INH_MOTHER: "தாய்",
    INH_PAT_GRANDFATHER: "தந்தை வழி தாத்தா",
    INH_PAT_GRANDMOTHER: "தந்தை வழி பாட்டி",
    INH_MAT_GRANDMOTHER: "தாய் வழி பாட்டி",
    INH_SON: "மகன்",
    INH_DAUGHTER: "மகள்",
    INH_FULL_BROTHER: "உடன் பிறந்த சகோதரன்",
    INH_FULL_SISTER: "உடன் பிறந்த சகோதரி",
    INH_PAT_BROTHER: "தந்தை வழி சகோதரன்",
    INH_PAT_SISTER: "தந்தை வழி சகோதரி",
    INH_MAT_SIBLING: "தாய் வழி சகோதரர்/சகோதரி",
    INH_BTN_CALC: "கணக்கிடவும்",
    INH_RESULT_TITLE: "ஷரியா விநியோகம்",
    INH_TABLE_HEIR: "வாரிசு",
    INH_TABLE_SHARE: "பங்கு",
    INH_TABLE_AMOUNT: "தொகை",
    INH_TABLE_EVIDENCE: "ஆதாரம்",
    INH_NOTE_BLOCKED: "விலக்கப்பட்டது (தடை)",
    INH_NOTE_RESIDUE: "மீதி (அசபா)",
    INH_NOTE_AWAL: "குறைப்பு (அவால்)",
    INH_NOTE_RADD: "திரும்பப் பெறுதல் (ராத்)",
    INH_CAT_ASCENDANTS: "பெற்றோர் & தாத்தா பாட்டி",
    INH_CAT_DESCENDANTS: "குழந்தைகள்",
    INH_CAT_COLLATERALS: "சகோதரர்கள் & சகோதரிகள்",

    // Partnership
    PTN_MUSHARAKAH: "முஷாரகா (கூட்டு முயற்சி)",
    PTN_MUDARABAH: "முதாரபா",
    PTN_DESC_MUSHARAKAH: "அனைத்து கூட்டாளர்களும் மூலதனத்தை வழங்கும் மற்றும் லாப/நஷ்டத்தைப் பகிர்ந்து கொள்ளும் கூட்டாண்மை.",
    PTN_DESC_MUDARABAH: "ஒருவர் மூலதனத்தை வழங்குகிறார், மற்றவர் உழைப்பை வழங்குகிறார்.",
    PTN_PARTNER_A: "கூட்டாளர் A",
    PTN_PARTNER_B: "கூட்டாளர் B",
    PTN_CAPITAL: "மூலதனப் பங்களிப்பு",
    PTN_PROFIT_RATIO: "ஒப்புக்கொள்ளப்பட்ட லாபப் பங்கு (%)",
    PTN_TOTAL_PROFIT: "மொத்த லாபம்",
    PTN_RESULT_PROFIT: "லாப விநியோகம்",
    PTN_RESULT_LOSS: "நஷ்டப் பொறுப்பு",
    PTN_RULE_PROFIT: "விதி: ஒப்புக்கொள்ளப்பட்ட விகிதத்தின்படி லாபம் விநியோகிக்கப்படுகிறது.",
    PTN_RULE_LOSS: "விதி: நிதி இழப்பு கண்டிப்பாக மூலதனப் பங்களிப்பு விகிதத்தில் ஏற்கப்பட வேண்டும்.",
    PTN_INVESTOR: "முதலீட்டாளர்",
    PTN_ENTREPRENEUR: "தொழில்முனைவோர்",
    PTN_RAB_UL_MAAL: "ரப்-உல்-மால் (மூலதன உரிமையாளர்)",
    PTN_MUDARIB: "முதாரிப் (மேலாளர்)",
    PTN_AGREED_SPLIT: "ஒப்புக்கொள்ளப்பட்ட பிரிவு",

    EVD_4_11_SONS_DAUGHTERS: "குர்ஆன் 4:11 - ஆணுக்கு இரண்டு பெண்களுக்கு சமமான பங்கு.",
    EVD_4_11_PARENTS_WITH_CHILD: "குர்ஆன் 4:11 - பெற்றோருக்கு 1/6 (குழந்தை இருந்தால்).",
    EVD_4_11_MOTHER_NO_CHILD: "குர்ஆன் 4:11 - தாய்க்கு 1/3 (குழந்தை இல்லை).",
    EVD_4_12_HUSBAND_NO_CHILD: "குர்ஆன் 4:12 - கணவருக்கு 1/2.",
    EVD_4_12_HUSBAND_WITH_CHILD: "குர்ஆன் 4:12 - கணவருக்கு 1/4.",
    EVD_4_12_WIFE_NO_CHILD: "குர்ஆன் 4:12 - மனைவிக்கு 1/4.",
    EVD_4_12_WIFE_WITH_CHILD: "குர்ஆன் 4:12 - மனைவிக்கு 1/8.",
    EVD_4_12_MAT_SIBLINGS: "குர்ஆன் 4:12 - தாய்வழி சகோதரர்கள் 1/3.",
    EVD_4_176_SIBLINGS: "குர்ஆன் 4:176 - கலாலா (சகோதரர்கள்).",
    EVD_RESIDUE_HADITH: "புகாரி: மீதமுள்ளவை அருகிலுள்ள ஆணுக்கு.",
    EVD_IJMA_GRANDMOTHER: "இஜ்மா: பாட்டிக்கு 1/6.",
    EVD_HAJB_BLOCK: "நெருங்கிய உறவினரால் தடுக்கப்பட்டது."
  }
};