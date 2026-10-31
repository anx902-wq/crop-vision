/**
 * CropWeather.ai - Farmer Weather, ML Crop Advisory & Disease Vision Studio
 * Vanilla JavaScript Frontend Module
 */

import { TRANSLATIONS } from './translations.js';

// Hindi Localization Dictionaries for Crops, Stages, Pathologies, and Regions
const CROP_NAMES_HI = {
  wheat: '🌾 गेहूं (Wheat)',
  rice: '🍚 धान / चावल (Rice)',
  maize: '🌽 मक्का (Maize)',
  cotton: '☁️ कपास (Cotton)',
  tomato: '🍅 टमाटर (Tomato)',
  potato: '🥔 आलू (Potato)',
  mustard: '🌼 सरसों (Mustard)',
  soybean: '🌱 सोयाबीन (Soybean)',
  sugarcane: '🎋 गन्ना (Sugarcane)',
  onion: '🧅 प्याज (Onion)',
  apple: '🍎 सेब (Apple)',
  chickpea: '🫘 चना (Chickpea)',
  mango: '🥭 आम (Mango)',
  citrus: '🍋 नींबू / संतरा (Citrus)',
  lemon: '🍋 नींबू (Lemon)',
  orange: '🍊 संतरा (Orange)',
  banana: '🍌 केला (Banana)',
  grape: '🍇 अंगूर (Grape)',
  grapes: '🍇 अंगूर (Grape)',
  papaya: '🍈 पपीता (Papaya)',
  guava: '🍈 अमरूद (Guava)',
  pomegranate: '🍎 अनार (Pomegranate)',
  chili: '🌶️ मिर्च (Chili)',
  chilli: '🌶️ मिर्च (Chili)',
  pepper: '🌶️ मिर्च (Pepper)',
  brinjal: '🍆 बैंगन (Brinjal)',
  eggplant: '🍆 बैंगन (Eggplant)',
  cucumber: '🥒 खीरा (Cucumber)',
  cabbage: '🥬 पत्तागोभी (Cabbage)',
  cauliflower: '🥦 फूलगोभी (Cauliflower)',
  groundnut: '🥜 मूंगफली (Groundnut)',
  peanut: '🥜 मूंगफली (Peanut)',
  garlic: '🧄 लहसुन (Garlic)',
  ginger: '🫚 अदरक (Ginger)',
  tea: '🍵 चाय (Tea)',
  coffee: '☕ कॉफी (Coffee)',
};

const STAGES_HI = {
  'Seedling (CRI)': 'अंकुरण एवं ताज जड़ अवस्था (CRI)',
  'Tillering': 'कल्ले फूटना (टिलरिंग अवस्था)',
  'Jointing': 'गांठें बनना (जॉइंटिंग अवस्था)',
  'Booting / Heading': 'गोभ अवस्था एवं बालियां निकलना',
  'Milking / Grain Filling': 'दुग्धावस्था एवं दाना भराव',
  'Maturity / Ready to Harvest': 'परिपक्वता (कटाई हेतु पूर्ण तैयार)',
  'Transplanting': 'पौध रोपाई (ट्रांसप्लांटिंग)',
  'Active Tillering': 'सक्रिय फुटाव एवं कल्ले निकलना',
  'Panicle Initiation': 'बाली का निर्माण (पैनिकल इनीशिएशन)',
  'Booting / Flowering': 'गोभ अवस्था एवं फूल आना',
  'Milk / Dough Stage': 'दुग्धावस्था व दाना सख्त होना',
  'Harvest Maturity (80% golden straw)': 'कटाई परिपक्वता (80% सुनहरी फसल)',
  'Vegetative (V4-V8)': 'वानस्पतिक पत्ती वृद्धि (V4-V8)',
  'Tasseling & Silking': 'जीरा एवं भुट्टे के बाल निकलना',
  'Grain Dent & Dough': 'दाना भराव व सख्त होना',
  'Maturity & Black Layer': 'परिपक्वता (काली परत व कटाई योग्य)',
  'Vegetative Branching': 'शाखाएं निकलना व वानस्पतिक फैलाव',
  'Square & Flower Bud Formation': 'फूल कलियां बनना (स्क्वायर अवस्था)',
  'Boll Development': 'कपास के टिंडे बनना व बढ़ना',
  'Boll Opening & Defoliation': 'टिंडे खिलना व कपास चुनाई',
  'Sprouting & Emergence': 'अंकुरण व फुटाव',
  'Vegetative & Stolon Initiation': 'वानस्पतिक फैलाव व स्टोलन बनना',
  'Tuber Bulking': 'आलू कंद का आकार बढ़ना (बल्किंग)',
  'Tuber Maturation': 'कंद परिपक्वता',
  'Haulm Senescence / De-haulming': 'बेल कटाई / डीहौल्मिंग',
  'Skin Hardening & Harvest': 'छिलका सख्त होना व आलू खुदाई',
  'Emergence': 'अंकुरण',
  'Flowering (R1-R2)': 'फूल आना (R1-R2)',
  'Pod Development (R3-R4)': 'फलियां बनना (R3-R4)',
  'Seed Filling (R5-R6)': 'दाना भराव (R5-R6)',
  'Maturity (R8 - 95% brown pods)': 'कटाई परिपक्वता (95% भूरी फलियां)',
  'Rosette Stage': 'रोजेट अवस्था (पत्तियां फैलना)',
  'Stem Elongation': 'तना वृद्धि अवस्था',
  'Flowering': 'फूल खिलने की अवस्था',
  'Siliquae (Pod) Formation': 'फलियां (सिलिकुआ) बनना',
  'Pod Ripening': 'फलियां पकना',
  'Harvest Maturity (75% yellow pods)': 'कटाई परिपक्वता (75% पीली फलियां)',
  'Germination & Sprouting': 'अंकुरण व फुटाव',
  'Tillering & Formative Stage': 'कल्ले निकलना व प्रारंभिक वृद्धि',
  'Grand Growth Stage (Elongation)': 'तीव्र तना बढ़वार अवस्था',
  'Ripening & Sugar Accumulation': 'गन्ना पकना व मिठास संचय',
  'Harvest Maturity (Brix > 18%)': 'कटाई परिपक्वता (ब्रिक्स > 18%)',
  'Bulb Initiation': 'गांठ / कंद बनना शुरू होना',
  'Bulb Development & Swelling': 'प्याज की गांठ बढ़ना व फूलना',
  'Maturity (50% neck fall)': 'परिपक्वता (50% गर्दन गिरना)',
  'Pink Bud & Blossom': 'गुलाबी कली व फूल खिलना',
  'Fruit Set & Cell Division': 'फल बनना व कोशिका विभाजन',
  'Fruit Development & Color Break': 'फल वृद्धि व रंग बदलना',
  'Harvest Maturity (Color & Starch-Index)': 'कटाई परिपक्वता (रंग व मिठास)',
  'Branching': 'शाखाएं निकलना',
  'Pod Development': 'फलियां बनना व बढ़ना',
  'Pod Maturity & Harvest': 'फलियां पकना व कटाई योग्य',
  'Seedling': 'अंकुरण / छोटा पौधा (Seedling)',
  'Vegetative': 'वानस्पतिक बढ़वार (Vegetative)',
  'Flowering / Bloom': 'फूल खिलने की अवस्था (Bloom)',
  'Fruiting': 'फल लगने की अवस्था (Fruiting)',
  'Fruit Set': 'फल बनना व सेट होना (Fruit Set)',
  'Fruit Development': 'फल वृद्धि एवं विकास',
  'Fruit Enlargement': 'फल का आकार बढ़ना',
  'Tuber Bulking': 'कंद / आलू बढ़ने की अवस्था',
  'Pod Formation': 'फलियां बनने की अवस्था',
  'Grain Filling': 'दाना भराव अवस्था',
  'Ripening': 'फल / दाना पकने की अवस्था',
  'Harvest Maturity': 'कटाई परिपक्वता (Harvest Ready)',
};

const DISEASES_HI = {
  'wheat-stripe-rust': {
    name: 'पीला रतुआ / हल्दी रोग (Stripe Rust - Puccinia striiformis)',
    symptoms: 'पत्तियों की शिराओं के समानांतर चमकीले पीले-नारंगी पाउडर जैसे धब्बेदार पट्टियां।',
    chemical: 'प्रोपिकोनाज़ोल 25% ईसी (टिल्ट - Propiconazole 25% EC)',
    dosageAcre: '200 मिली दवा 200 लीटर पानी में प्रति एकड़',
    dosageLiter: '1.0 मिली प्रति लीटर पानी',
    phi: '30 दिन',
    bio: 'सल्फर 80% डब्ल्यूपी @ 2.5 ग्राम/लीटर या ट्राइकोडर्मा विरिडी पर्ण छिड़काव',
    sprayTiming: 'कल सुबह 7:00 से 10:00 बजे हवा की गति 12 किमी/घंटा से कम होने पर छिड़काव करें।',
  },
  'wheat-karnal-bunt': {
    name: 'करनाल बंट एवं काला कंडुआ (Karnal Bunt - Tilletia indica)',
    symptoms: 'गेहूं के दानों का सड़े हुए काले चूर्ण में बदलना तथा सड़ी मछली जैसी दुर्गंध आना।',
    chemical: 'टेबुकोनाज़ोल 25.9% ईसी (फॉलिकुर - Tebuconazole 25.9% EC)',
    dosageAcre: '200 मिली दवा 200 लीटर पानी में प्रति एकड़',
    dosageLiter: '1.0 मिली प्रति लीटर पानी',
    phi: '35 दिन',
    bio: 'स्यूडोमोनास फ्लोरेसेंस @ 10 ग्राम प्रति किलो बीज उपचार',
    sprayTiming: 'बालियां निकलने के समय मौसम साफ होने पर स्प्रे करें।',
  },
  'wheat-aphids': {
    name: 'गेहूं का माहू / चेपा कीट (Aphids - Sitobion avenae)',
    symptoms: 'निकलती बालियों और पत्तियों से रस चूसते काले-हरे माहू कीट, जिससे दाना सिकुड़ जाता है।',
    chemical: 'थियामेथॉक्सम 25% डब्ल्यूजी (Thiamethoxam 25% WG)',
    dosageAcre: '40 ग्राम दवा 150 लीटर पानी में प्रति एकड़',
    dosageLiter: '0.25 ग्राम प्रति लीटर पानी',
    phi: '21 दिन',
    bio: 'नीम का तेल 10,000 पीपीएम @ 3 मिली/लीटर या लेडीबर्ड बीटल का संरक्षण',
    sprayTiming: 'शाम के समय हल्की हवा में छिड़काव करें।',
  },
  'wheat-healthy': {
    name: 'स्वस्थ गेहूं का पत्ता (Healthy Wheat Flag Leaf)',
    symptoms: 'पूरी तरह हरा, चमकदार और प्रकाश संश्लेषण हेतु स्वस्थ पत्ता, किसी रोग के लक्षण नहीं।',
    chemical: 'किसी रासायनिक दवा की आवश्यकता नहीं है',
    dosageAcre: 'शून्य कीटनाशक',
    dosageLiter: '0 मिली',
    phi: '0 दिन',
    bio: 'संतुलित सूक्ष्म पोषक तत्वों (जिंक सल्फेट 0.5%) का पोषण छिड़काव करें',
    sprayTiming: 'सामान्य सिंचाई व पोषण बनाए रखें।',
  },
  'rice-blast': {
    name: 'धान का झुलसा रोग (Rice Leaf & Neck Blast - Magnaporthe oryzae)',
    symptoms: 'पत्तियों पर आंख या नाव के आकार के भूरे धब्बे जिनके केंद्र भूरे-सफेद होते हैं तथा बाली की गर्दन सड़ना।',
    chemical: 'ट्राइसाइक्लाज़ोल 75% डब्ल्यूपी (बीम - Tricyclazole 75% WP)',
    dosageAcre: '140 ग्राम दवा 200 लीटर पानी में प्रति एकड़',
    dosageLiter: '0.7 ग्राम प्रति लीटर पानी',
    phi: '30 दिन',
    bio: 'स्यूडोमोनास फ्लोरेसेंस @ 2.5 किलो प्रति एकड़ 200 लीटर पानी में',
    sprayTiming: 'सुबह ओस सूखने के तुरंत बाद हवा शांत होने पर छिड़काव करें।',
  },
  'rice-bacterial-blight': {
    name: 'जीवाणु पत्ती झुलसा रोग (Bacterial Leaf Blight - Xanthomonas oryzae)',
    symptoms: 'पत्तियों के किनारों से शुरू होकर अंदर की ओर बढ़ती लहरदार पीली-सफेद सूखती धारियां।',
    chemical: 'स्ट्रेप्टोसाइक्लिन + कॉपर ऑक्सीक्लोराइड 50% डब्ल्यूपी',
    dosageAcre: '6 ग्राम स्ट्रेप्टोसाइक्लिन + 400 ग्राम सीओसी 200 लीटर पानी में',
    dosageLiter: '0.03 ग्राम स्ट्रेप्टो + 2 ग्राम सीओसी प्रति लीटर',
    phi: '25 दिन',
    bio: 'खेत से अतिरिक्त पानी निकालें, यूरिया का अत्यधिक उपयोग तुरंत रोकें',
    sprayTiming: 'धूप निकलने पर दोपहर से पूर्व छिड़काव करें।',
  },
  'tomato-early-blight': {
    name: 'टमाटर अगेती झुलसा (Early Blight - Alternaria solani)',
    symptoms: 'निचली पत्तियों पर गोल छल्लेदार गहरे कत्थई धब्बे और चारों ओर पीला घेरा।',
    chemical: 'मैंकोज़ेब 75% डब्ल्यूपी या क्लोरोथैलोनिल 75% डब्ल्यूपी',
    dosageAcre: '600 ग्राम दवा 200 लीटर पानी में प्रति एकड़',
    dosageLiter: '2.5 - 3.0 ग्राम प्रति लीटर पानी',
    phi: '7 दिन',
    bio: 'ट्राइकोडर्मा हार्ज़ियानम @ 2.5 ग्राम प्रति लीटर पर्ण छिड़काव',
    sprayTiming: 'मौसम साफ होने पर सुबह 8 से 11 बजे छिड़काव करें।',
  },
  'tomato-late-blight': {
    name: 'टमाटर पछेती झुलसा (Late Blight - Phytophthora infestans)',
    symptoms: 'पत्तियों पर जल-सिक्त तेजी से फैलते गहरे जामुनी धब्बे और नीचे सफेद फफूंद।',
    chemical: 'मैंडीप्रोपामिड 23.4% एससी (Revus) या साइमोक्सानिल + मैंकोज़ेब',
    dosageAcre: '200 मिली रेवस 200 लीटर पानी में प्रति एकड़',
    dosageLiter: '1.0 मिली प्रति लीटर पानी',
    phi: '3 दिन',
    bio: 'कॉपर हाइड्रॉक्साइड 53.8% डीएफ (कोसाइड 3000) @ 2 ग्राम/लीटर',
    sprayTiming: 'बारिश के बाद तुरंत सुरक्षात्मक छिड़काव करें।',
  },
  'tomato-fruit-borer': {
    name: 'टमाटर फल छेदक सुंडी (Fruit Borer - Helicoverpa armigera)',
    symptoms: 'हरे और पकते फलों में गोल छेद कर गूदा खाती हुई सुंडी।',
    chemical: 'क्लोरेंट्रानिलिप्रोल 18.5% एससी (कोराजन) @ 60 मिली प्रति एकड़',
    dosageAcre: '60 मिली 150 लीटर पानी में',
    dosageLiter: '0.35 मिली / लीटर',
    phi: '3 दिन',
    bio: 'हेलिकोवर्पा एनपीवी @ 250 एलई/एकड़ या फेरोमोन ट्रैप',
    sprayTiming: 'फूल खिलने व फल बनने के समय शाम को छिड़काव करें।',
  },
  'potato-late-blight': {
    name: 'आलू पछेती झुलसा (Potato Late Blight - Phytophthora infestans)',
    symptoms: 'पत्तियों पर पानी से भीगे भूरे-काले धब्बे, कंदों में सूखा सड़न रोग और दुर्गंध।',
    chemical: 'डाइमेथोमोर्फ 50% डब्ल्यूपी + मैंकोज़ेब 75% डब्ल्यूपी',
    dosageAcre: '400 ग्राम डाइमेथोमोर्फ + 400 ग्राम मैंकोज़ेब 200 लीटर पानी में',
    dosageLiter: '2.0 ग्राम प्रति लीटर पानी',
    phi: '7 दिन',
    bio: 'बोर्डो मिश्रण 1% या कॉपर ऑक्सीक्लोराइड @ 3 ग्राम/लीटर',
    sprayTiming: 'बादल छाए रहने व नमी अधिक होने पर तुरंत छिड़काव करें।',
  },
  'potato-early-blight': {
    name: 'आलू अगेती झुलसा (Potato Early Blight - Alternaria solani)',
    symptoms: 'पत्तियों पर छोटे सूखे कत्थई धब्बे जिनमें छल्ले बने होते हैं।',
    chemical: 'डिफेनोकोनाज़ोल 25% ईसी (स्कोर - Difenoconazole)',
    dosageAcre: '150 मिली दवा 200 लीटर पानी में प्रति एकड़',
    dosageLiter: '0.75 मिली प्रति लीटर पानी',
    phi: '10 दिन',
    bio: 'ट्राइकोडर्मा विरिडी @ 2.5 ग्राम प्रति लीटर',
    sprayTiming: 'हवा शांत होने पर सुबह 8-10 बजे स्प्रे करें।',
  },
  'cotton-bollworm': {
    name: 'कपास गुलाबी सुंडी (Pink Bollworm - Pectinophora gossypiella)',
    symptoms: 'फूलों का गुलाब की तरह बंद होना (रोसेट फूल) तथा टिंडों में छेद कर बिनौले खाना।',
    chemical: 'इमामेक्टिन बेंजोएट 5% एसजी या प्रोफेनोफॉस 50% ईसी',
    dosageAcre: '100 ग्राम इमामेक्टिन या 400 मिली प्रोफेनोफॉस 200 लीटर पानी में',
    dosageLiter: '0.5 ग्राम इमामेक्टिन / लीटर',
    phi: '14 दिन',
    bio: 'फेरोमोन ट्रैप @ 8-10 प्रति एकड़ व ट्राइकोग्रामा परजीवी ततैया छोड़ना',
    sprayTiming: 'शाम के समय कीट की सक्रियता के समय छिड़काव करें।',
  },
  'cotton-aphids': {
    name: 'कपास का माहू कीट एवं फफूंद (Cotton Aphids & Sooty Mold)',
    symptoms: 'पत्तियों पर चिपचिपा मधुरस और उस पर काली फफूंद की परत, पत्तियां मुड़ना।',
    chemical: 'डाइनोटेफ्यूरान 20% एसजी (ओशिन - Dinotefuran 20% SG)',
    dosageAcre: '60 ग्राम दवा 200 लीटर पानी में प्रति एकड़',
    dosageLiter: '0.3 ग्राम प्रति लीटर पानी',
    phi: '15 दिन',
    bio: 'वर्टिसिलियम लेकानी @ 5 ग्राम/लीटर या नीम तेल 10,000 पीपीएम',
    sprayTiming: 'तेज धूप न होने पर सुबह या शाम स्प्रे करें।',
  },
  'maize-armyworm': {
    name: 'मक्का फॉल आर्मीवर्म (Fall Armyworm - Spodoptera frugiperda)',
    symptoms: 'पत्तियों पर जालीदार छलनी जैसे कटे हुए छेद तथा गोभ में सुंडी की भूरी विष्ठा (frass)।',
    chemical: 'क्लोरेंट्रानिलिप्रोल 18.5% एससी (कोराजन - Coragen)',
    dosageAcre: '80 मिली दवा 200 लीटर पानी में प्रति एकड़ सीधे गोभ में स्प्रे करें',
    dosageLiter: '0.4 मिली प्रति लीटर पानी',
    phi: '14 दिन',
    bio: 'नीम बाण 10,000 पीपीएम या बैसिलस थुरिंजिएंसिस (Bt) @ 2 ग्राम/लीटर',
    sprayTiming: 'दवा का नोजल सीधे गोभ (whorl) की तरफ रखकर छिड़काव करें।',
  },
  'mustard-white-rust': {
    name: 'सरसों का सफेद रतुआ (White Rust - Albugo candida)',
    symptoms: 'पत्तियों की निचली सतह पर सफेद चीनी मिट्टी जैसे उभरे हुए फफोले व डंठल का मुड़ना।',
    chemical: 'मेटालैक्सिल 8% + मैंकोज़ेब 64% डब्ल्यूपी (रिडोमिल एमजेड)',
    dosageAcre: '400 ग्राम दवा 200 लीटर पानी में प्रति एकड़',
    dosageLiter: '2.0 ग्राम प्रति लीटर पानी',
    phi: '21 दिन',
    bio: 'ट्राइकोडर्मा विरिडी @ 2.5 ग्राम प्रति लीटर पानी',
    sprayTiming: 'सुबह के समय धूप खिलने पर हवा मंद होने पर छिड़काव करें।',
  },
  'mustard-aphids': {
    name: 'सरसों का चेपा / माहू कीट (Mustard Aphids - Lipaphis erysimi)',
    symptoms: 'पीले फूलों और फलियों पर हरे-काले कीटों का भारी जमावड़ा जो रस चूसते हैं।',
    chemical: 'डाइमेथोएट 30% ईसी या इमिडाक्लोप्रिड 17.8% एसएल',
    dosageAcre: '250 मिली डाइमेथोएट 200 लीटर पानी में',
    dosageLiter: '1.25 मिली प्रति लीटर पानी',
    phi: '15 दिन',
    bio: 'नीम तेल 10,000 पीपीएम @ 3 मिली/लीटर शाम को स्प्रे करें',
    sprayTiming: 'मधुमक्खियों के बचाव के लिए देर शाम छिड़काव करें।',
  },
  'soybean-rust': {
    name: 'सोयाबीन का रतुआ रोग (Asian Soybean Rust - Phakopsora pachyrhizi)',
    symptoms: 'पत्तियों की निचली सतह पर छोटे कत्थई बहुभुज फफोले जिससे पत्तियां समय से पूर्व झड़ जाती हैं।',
    chemical: 'पायराक्लोस्ट्रोबिन 20% डब्ल्यूजी या हेक्साकोनाज़ोल 5% एससी',
    dosageAcre: '200 ग्राम दवा 200 लीटर पानी में',
    dosageLiter: '1.0 ग्राम / लीटर',
    phi: '25 दिन',
    bio: 'जैव कवकनाशी ट्राइकोडर्मा विरिडी @ 2.5 ग्राम/लीटर',
    sprayTiming: 'निचली पत्तियों पर लक्षण दिखते ही तुरंत छिड़काव करें।',
  },
  'onion-purple-blotch': {
    name: 'प्याज का बैंगनी धब्बा रोग (Purple Blotch - Alternaria porri)',
    symptoms: 'पत्तियों पर धंसे हुए बैंगनी-कत्थई अंडाकार धब्बे जिनके किनारे पीले होते हैं।',
    chemical: 'टेबुकोनाज़ोल 25.9% ईसी या मैंकोज़ेब 75% डब्ल्यूपी',
    dosageAcre: '250 मिली टेबुकोनाज़ोल 200 लीटर पानी में प्रति एकड़ (चिपको के साथ)',
    dosageLiter: '1.25 मिली प्रति लीटर पानी',
    phi: '15 दिन',
    bio: 'स्यूडोमोनास फ्लोरेसेंस @ 5 मिली प्रति लीटर पानी',
    sprayTiming: 'प्याज की मोमी पत्तियों के लिए स्टिकर (चिपको) मिलाकर स्प्रे करें।',
  },
  'sugarcane-red-rot': {
    name: 'गन्ने का लाल सड़न रोग (Red Rot - Colletotrichum falcatum)',
    symptoms: 'तीसरी-चौथी पत्ती का पीला पड़ना, गन्ने को चीरने पर अंदर लाल गूदा व सफेद पट्टियां दिखना।',
    chemical: 'कार्बेन्डाजिम 50% डब्ल्यूपी (बाविस्टिन - Carbendazim 50% WP)',
    dosageAcre: '500 ग्राम दवा 200 लीटर पानी में (जड़ों के पास ड्रेन्चिंग)',
    dosageLiter: '2.5 ग्राम प्रति लीटर पानी',
    phi: '45 दिन',
    bio: 'ट्राइकोडर्मा विरिडी संवर्धित गोबर की खाद 2 टन प्रति एकड़ डालें',
    sprayTiming: 'रोगग्रस्त थान को जड़ सहित उखाड़कर नष्ट करें व गड्ढे में चूना डालें।',
  },
};

// Default Location: Uttar Pradesh (Lucknow Central Agri-Belt - PIN 226001)
const DEFAULT_UP_LOCATION = {
  pincode: '226001',
  name: 'Uttar Pradesh (Central Agri-Belt - PIN 226001)',
  lat: 26.8467,
  lon: 80.9462,
};

// Comprehensive Indian PIN Code Directory with High-Precision Uttar Pradesh Coverage
const PINCODE_DIRECTORY = {
  // --- UTTAR PRADESH DISTRICTS ---
  // Lucknow (Capital & Central Agri-Belt)
  '226': { name: 'Lucknow, Uttar Pradesh', lat: 26.8467, lon: 80.9462, region: 'UP' },
  // Kanpur Nagar & Kanpur Dehat
  '208': { name: 'Kanpur, Uttar Pradesh', lat: 26.4499, lon: 80.3319, region: 'UP' },
  '209': { name: 'Kanpur Rural / Fatehpur, Uttar Pradesh', lat: 26.4300, lon: 79.9500, region: 'UP' },
  // Varanasi & Surrounding
  '221': { name: 'Varanasi, Uttar Pradesh', lat: 25.3176, lon: 82.9739, region: 'UP' },
  '222': { name: 'Jaunpur, Uttar Pradesh', lat: 25.7500, lon: 82.6800, region: 'UP' },
  '223': { name: 'Azamgarh Rural, Uttar Pradesh', lat: 26.0684, lon: 83.1839, region: 'UP' },
  '224': { name: 'Ayodhya (Faizabad), Uttar Pradesh', lat: 26.7922, lon: 82.1998, region: 'UP' },
  '225': { name: 'Barabanki, Uttar Pradesh', lat: 26.9274, lon: 81.1843, region: 'UP' },
  '227': { name: 'Amethi, Uttar Pradesh', lat: 26.1554, lon: 81.8159, region: 'UP' },
  '228': { name: 'Sultanpur, Uttar Pradesh', lat: 26.2648, lon: 82.0727, region: 'UP' },
  '229': { name: 'Rae Bareli, Uttar Pradesh', lat: 26.2300, lon: 81.2400, region: 'UP' },
  '230': { name: 'Pratapgarh, Uttar Pradesh', lat: 25.9200, lon: 81.9900, region: 'UP' },
  '231': { name: 'Mirzapur & Sonbhadra, Uttar Pradesh', lat: 25.1337, lon: 82.5644, region: 'UP' },
  '232': { name: 'Chandauli, Uttar Pradesh', lat: 25.2600, lon: 83.2700, region: 'UP' },
  '233': { name: 'Ghazipur, Uttar Pradesh', lat: 25.5800, lon: 83.5800, region: 'UP' },
  // Prayagraj & Bundelkhand
  '211': { name: 'Prayagraj (Allahabad), Uttar Pradesh', lat: 25.4358, lon: 81.8463, region: 'UP' },
  '212': { name: 'Kaushambi / Fatehpur, Uttar Pradesh', lat: 25.5312, lon: 81.4285, region: 'UP' },
  '210': { name: 'Banda / Chitrakoot / Mahoba, Uttar Pradesh', lat: 25.4754, lon: 80.3347, region: 'UP' },
  '284': { name: 'Jhansi / Lalitpur, Uttar Pradesh', lat: 25.4484, lon: 78.5685, region: 'UP' },
  '285': { name: 'Jalaun (Orai), Uttar Pradesh', lat: 25.9900, lon: 79.4500, region: 'UP' },
  // Western UP & Braj
  '282': { name: 'Agra, Western Uttar Pradesh', lat: 27.1767, lon: 78.0081, region: 'UP' },
  '281': { name: 'Mathura, Uttar Pradesh', lat: 27.4924, lon: 77.6737, region: 'UP' },
  '283': { name: 'Firozabad / Mainpuri, Uttar Pradesh', lat: 27.1593, lon: 78.3957, region: 'UP' },
  '202': { name: 'Aligarh, Uttar Pradesh', lat: 27.8974, lon: 78.0880, region: 'UP' },
  '203': { name: 'Bulandshahr, Uttar Pradesh', lat: 28.4069, lon: 77.8498, region: 'UP' },
  '204': { name: 'Hathras, Uttar Pradesh', lat: 27.6000, lon: 78.0500, region: 'UP' },
  '205': { name: 'Mainpuri / Etawah, Uttar Pradesh', lat: 27.2300, lon: 79.0300, region: 'UP' },
  '206': { name: 'Etawah / Auraiya, Uttar Pradesh', lat: 26.7800, lon: 79.0300, region: 'UP' },
  '207': { name: 'Etah / Kasganj, Uttar Pradesh', lat: 27.5600, lon: 78.6700, region: 'UP' },
  '201': { name: 'Ghaziabad / Noida, Uttar Pradesh', lat: 28.6692, lon: 77.4538, region: 'UP' },
  '250': { name: 'Meerut / Baghpat, Uttar Pradesh', lat: 28.9845, lon: 77.7064, region: 'UP' },
  '251': { name: 'Muzaffarnagar / Shamli, Uttar Pradesh', lat: 29.4727, lon: 77.7085, region: 'UP' },
  '247': { name: 'Saharanpur, Uttar Pradesh', lat: 29.9679, lon: 77.5452, region: 'UP' },
  '245': { name: 'Hapur, Uttar Pradesh', lat: 28.7300, lon: 77.7800, region: 'UP' },
  '246': { name: 'Bijnor, Uttar Pradesh', lat: 29.3732, lon: 78.1352, region: 'UP' },
  // Rohilkhand & Northern UP
  '243': { name: 'Bareilly / Badaun, Uttar Pradesh', lat: 28.3670, lon: 79.4304, region: 'UP' },
  '244': { name: 'Moradabad / Rampur / Sambhal, Uttar Pradesh', lat: 28.8386, lon: 78.7733, region: 'UP' },
  '241': { name: 'Hardoi, Uttar Pradesh', lat: 27.3951, lon: 80.1311, region: 'UP' },
  '242': { name: 'Shahjahanpur, Uttar Pradesh', lat: 27.8804, lon: 79.9122, region: 'UP' },
  '261': { name: 'Sitapur, Uttar Pradesh', lat: 27.5684, lon: 80.6811, region: 'UP' },
  '262': { name: 'Pilibhit / Lakhimpur Kheri, Uttar Pradesh', lat: 28.6312, lon: 79.8044, region: 'UP' },
  // Eastern & Terai UP
  '271': { name: 'Gonda / Bahraich / Balrampur, Uttar Pradesh', lat: 27.1300, lon: 81.9600, region: 'UP' },
  '272': { name: 'Basti / Siddharthnagar, Uttar Pradesh', lat: 26.8000, lon: 82.7600, region: 'UP' },
  '273': { name: 'Gorakhpur / Maharajganj, Uttar Pradesh', lat: 26.7606, lon: 83.3732, region: 'UP' },
  '274': { name: 'Deoria / Kushinagar, Uttar Pradesh', lat: 26.5000, lon: 83.7800, region: 'UP' },
  '275': { name: 'Mau, Uttar Pradesh', lat: 25.9400, lon: 83.5600, region: 'UP' },
  '276': { name: 'Azamgarh, Uttar Pradesh', lat: 26.0684, lon: 83.1839, region: 'UP' },
  '277': { name: 'Ballia, Uttar Pradesh', lat: 25.7600, lon: 84.1500, region: 'UP' },

  // --- NATIONAL METRO & AGRI CENTERS ---
  '110': { name: 'Delhi NCR', lat: 28.6139, lon: 77.2090, region: 'DL' },
  '121': { name: 'Faridabad, Haryana', lat: 28.4089, lon: 77.3178, region: 'HR' },
  '122': { name: 'Gurugram, Haryana', lat: 28.4595, lon: 77.0266, region: 'HR' },
  '132': { name: 'Karnal Agri-Belt, Haryana', lat: 29.6857, lon: 76.9905, region: 'HR' },
  '141': { name: 'Ludhiana, Punjab', lat: 30.9010, lon: 75.8573, region: 'PB' },
  '151': { name: 'Bathinda Agri-Belt, Punjab', lat: 30.2110, lon: 74.9455, region: 'PB' },
  '160': { name: 'Chandigarh', lat: 30.7333, lon: 76.7794, region: 'CH' },
  '248': { name: 'Dehradun, Uttarakhand', lat: 30.3165, lon: 78.0322, region: 'UK' },
  '302': { name: 'Jaipur, Rajasthan', lat: 26.9124, lon: 75.7873, region: 'RJ' },
  '380': { name: 'Ahmedabad, Gujarat', lat: 23.0225, lon: 72.5714, region: 'GJ' },
  '400': { name: 'Mumbai, Maharashtra', lat: 18.9220, lon: 72.8347, region: 'MH' },
  '422': { name: 'Nashik Agri-Zone, Maharashtra', lat: 19.9975, lon: 73.7898, region: 'MH' },
  '440': { name: 'Nagpur Vidarbha Belt, Maharashtra', lat: 21.1458, lon: 79.0882, region: 'MH' },
  '462': { name: 'Bhopal, Madhya Pradesh', lat: 23.2599, lon: 77.4126, region: 'MP' },
  '500': { name: 'Hyderabad, Telangana', lat: 17.3850, lon: 78.4867, region: 'TS' },
  '522': { name: 'Guntur Agri-Belt, Andhra Pradesh', lat: 16.3067, lon: 80.4365, region: 'AP' },
  '560': { name: 'Bengaluru, Karnataka', lat: 12.9716, lon: 77.5946, region: 'KA' },
  '600': { name: 'Chennai, Tamil Nadu', lat: 13.0827, lon: 80.2707, region: 'TN' },
  '700': { name: 'Kolkata, West Bengal', lat: 22.5726, lon: 88.3639, region: 'WB' },
  '800': { name: 'Patna Agri-Belt, Bihar', lat: 25.5941, lon: 85.1376, region: 'BR' },
};

// Application State (Defaults strictly to Uttar Pradesh with manual PIN code option)
const savedLang = localStorage.getItem('cropweather_lang');
const initialLang = savedLang === 'hi' ? 'hi' : 'en';

const state = {
  currentLang: initialLang,
  currentPage: 'weather', // 'weather' | 'crop-advisory' | 'history' | 'ai-search' | 'pesticides' | 'print-report'
  locationName: DEFAULT_UP_LOCATION.name,
  pincode: DEFAULT_UP_LOCATION.pincode,
  lat: DEFAULT_UP_LOCATION.lat,
  lon: DEFAULT_UP_LOCATION.lon,
  weatherData: null,
  allCrops: [],
  selectedCropId: 'wheat',
  selectedStage: 'Milking / Grain Filling',
  currentAdvisory: null,
  
  // 30-Day Crop History State
  cropHistoryData: null,
  historyRangeDays: 30,

  // AI Picture Search State
  aiCameraStream: null,
  isCameraActive: false,
  currentAiAnalysis: null,

  // Location Crop Recommendations & Seasonality State
  recommendationsFilter: 'ALL',
  cropRecommendations: [],
  currentSeason: null,
};

// Helper: Localize severe alerts for Hindi
function localizeAlert(a, lang) {
  if (lang !== 'hi') return a;
  let headline = a.headline;
  let cropImpact = a.cropImpact;
  let action = a.action;
  let type = a.type;

  if (a.id === 'alert-rain') {
    type = 'भारी बारिश चेतावनी';
    headline = headline.replace('Heavy Rain Alert for', 'के लिए भारी बारिश की चेतावनी').replace('Probability', 'संभावना').replace('expected', 'अनुमानित');
    cropImpact = 'बारिश से फसल में नमी बढ़ेगी, जिससे कटाई पूर्व अंकुरण व भीगने से दाने के खराब होने का भारी जोखिम है।';
    action = 'कटाई कार्य तुरंत रोकें; थ्रेशर व कटी फसल को तिरपाल से ढकें और खेत से जल निकासी सुनिश्चित करें।';
  } else if (a.id === 'alert-wind') {
    type = 'तेज हवा व फसल गिरने का खतरा';
    headline = headline.replace('Gusty Winds', 'तेज आंधी हवाएं').replace('Threatening', 'से फसल को खतरा');
    cropImpact = 'तेज हवाओं से फसल गिरने (लॉजिंग) तथा कीटनाशक छिड़काव के उड़ने (ड्रिफ्ट) का गंभीर खतरा है।';
    action = 'जब तक हवा की गति 15 किमी/घंटा से अधिक हो, किसी भी दवा का छिड़काव न करें।';
  } else if (a.id === 'alert-heat') {
    type = 'अत्यधिक तापमान व लू तनाव चेतावनी';
    headline = headline.replace('Extreme Heat Stress', 'अत्यधिक गर्मी व ताप तनाव');
    cropImpact = 'उच्च तापमान से परागकण सूखने व दाना भराव बाधित होने का खतरा है।';
    action = 'देर शाम के समय खेत में हल्की सिंचाई करके मिट्टी और फसल को ठंडा रखें।';
  } else if (a.id === 'alert-clear') {
    type = 'अनुकूल मौसम सक्रिय';
    headline = 'कटाई एवं खेत कार्य हेतु सर्वोत्तम मौसम';
    cropImpact = 'मौसम साफ और शुष्क है, फसल कटाई, गहाई, सुखाने या छिड़काव के लिए आदर्श परिस्थितियां हैं।';
    action = 'आगामी 72 घंटों की खिड़की का पूरा लाभ उठाकर खेत के सभी कार्य समय पर पूरे करें।';
  }
  return { ...a, headline, cropImpact, action, type };
}

// Toast notification
function showToast(message) {
  const toast = document.getElementById('toast');
  const msgEl = document.getElementById('toastMessage');
  if (!toast || !msgEl) return;
  msgEl.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

// Regional Language Translation Engine (English & Hindi)
function setLanguage(langCode) {
  if (langCode !== 'hi') langCode = 'en';
  state.currentLang = langCode;
  localStorage.setItem('cropweather_lang', langCode);

  const t = TRANSLATIONS[langCode] || TRANSLATIONS['en'];

  // Update all elements with .i18n-text and data-key attribute
  document.querySelectorAll('.i18n-text').forEach((el) => {
    const key = el.getAttribute('data-key');
    if (key && t[key]) {
      el.textContent = t[key];
    }
  });

  // Update PIN code input placeholder
  const pinInput = document.getElementById('pincodeInput');
  if (pinInput && t.pincodePlaceholder) {
    pinInput.placeholder = t.pincodePlaceholder;
  }

  // Update station status text if at default UP location
  const statusEl = document.getElementById('locationStatusText');
  if (statusEl && (!state.pincode || state.pincode === DEFAULT_UP_LOCATION.pincode)) {
    statusEl.textContent = langCode === 'hi'
      ? `मौसम केंद्र: उत्तर प्रदेश (26.85°N, 80.95°E - पिन 226001)`
      : `Station: Uttar Pradesh (26.85°N, 80.95°E - PIN 226001)`;
  }

  // Update specific known elements
  const appTitle = document.getElementById('lblAppTitle');
  if (appTitle) {
    appTitle.innerHTML = `${t.appTitle} <span class="brand-tag">AGRI-ML</span>`;
  }
  const appSub = document.getElementById('lblAppSubtitle');
  if (appSub) appSub.textContent = t.appSubtitle;

  const searchInput = document.getElementById('guideSearchInput');
  if (searchInput) searchInput.placeholder = t.guideSearchPlaceholder;

  // Re-populate dropdowns with localized labels
  populateCropDropdowns();
  populateBenchmarkDropdowns();

  // Re-render components with translated terms
  if (state.weatherData) {
    renderWeather(state.weatherData);
  }
  if (state.currentAdvisory) {
    renderAdvisoryCard(state.currentAdvisory);
  }
  if (state.allCrops.length > 0) {
    renderPesticideGuide();
  }
  if (state.currentAiAnalysis) {
    renderAiOutputCard(state.currentAiAnalysis);
  }
  if (state.cropHistoryData) {
    renderCropHistory(state.cropHistoryData, state.historyRangeDays);
  }
  if (state.cropRecommendations.length > 0) {
    renderCropRecommendations(state.cropRecommendations, state.currentSeason);
  }
  updatePrintSheet();
}

// Page Navigation Switcher
function switchPage(pageId) {
  state.currentPage = pageId;

  // Update tab buttons
  document.querySelectorAll('#mainNavTabs .tab-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.page === pageId);
  });

  // Update page sections
  document.querySelectorAll('.page-view').forEach((sec) => {
    sec.classList.toggle('active', sec.id === `page-${pageId}`);
  });

  if (pageId === 'print-report') {
    updatePrintSheet();
  } else if (pageId === 'pesticides') {
    renderPesticideGuide();
  } else if (pageId === 'history') {
    loadCropHistory(state.historyRangeDays);
  }
}

// Fetch Weather from Server with Crop Awareness
async function loadWeatherData(lat, lon, locName, cropId, cropStage) {
  try {
    let url = '/api/weather';
    const params = new URLSearchParams();
    if (lat && lon) {
      params.append('lat', lat.toString());
      params.append('lon', lon.toString());
    }
    if (locName) {
      params.append('location', locName);
    }
    params.append('cropId', cropId || state.selectedCropId || 'wheat');
    params.append('cropStage', cropStage || state.selectedStage || '');
    if (params.toString()) url += `?${params.toString()}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error('Weather fetch failed');
    const data = await res.json();
    state.weatherData = data;
    renderWeather(data);
    updatePrintSheet();
  } catch (err) {
    console.error('Weather error:', err);
    showToast('Weather fetch error: ' + err.message);
  }
}

// Render Weather Page Components
function renderWeather(data) {
  const t = TRANSLATIONS[state.currentLang] || TRANSLATIONS['en'];

  // Current stats
  const tempNum = document.getElementById('currentTempNum');
  const condText = document.getElementById('currentConditionText');
  const feelsLike = document.getElementById('currentFeelsLike');
  const humidity = document.getElementById('currentHumidity');
  const wind = document.getElementById('currentWind');
  const rainProb = document.getElementById('currentRainProb');
  const soilM = document.getElementById('currentSoilMoisture');
  const solar = document.getElementById('currentSolarRad');
  const spray = document.getElementById('currentSpraySuitability');
  const iconAnim = document.getElementById('weatherIconAnim');

  if (tempNum) tempNum.textContent = data.current.temp;
  if (feelsLike) feelsLike.textContent = `${data.current.feelsLike}°C`;
  if (humidity) humidity.textContent = `${data.current.humidity}%`;
  if (wind) wind.textContent = `${data.current.windSpeedKmh} km/h (${data.current.windDirection})`;
  if (rainProb) rainProb.textContent = `${data.current.rainProbability}%`;
  if (soilM) soilM.textContent = data.current.soilMoistureEstimate;
  if (solar) solar.textContent = data.current.solarRadiation;

  // Condition mapping
  let condLabel = data.current.condition;
  if (data.current.condition.includes('Sun') || data.current.condition.includes('Clear')) {
    condLabel = t.condSunny;
    if (iconAnim) iconAnim.textContent = '☀️';
  } else if (data.current.condition.includes('Partly')) {
    condLabel = t.condPartlyCloudy;
    if (iconAnim) iconAnim.textContent = '⛅';
  } else if (data.current.condition.includes('Overcast')) {
    condLabel = t.condOvercast;
    if (iconAnim) iconAnim.textContent = '☁️';
  } else if (data.current.condition.includes('Heavy')) {
    condLabel = t.condHeavyRain;
    if (iconAnim) iconAnim.textContent = '🌧️';
  } else if (data.current.condition.includes('Rain') || data.current.condition.includes('Shower')) {
    condLabel = t.condRain;
    if (iconAnim) iconAnim.textContent = '🌧️';
  }
  if (condText) condText.textContent = condLabel;

  // Spray suitability
  const isSprayOk = data.current.windSpeedKmh <= 15 && data.current.rainProbability <= 25 && data.current.temp <= 33;
  if (spray) {
    spray.textContent = isSprayOk ? t.spraySuitable : t.sprayUnsuitable;
    spray.style.color = isSprayOk ? 'var(--emerald-400)' : 'var(--accent-rose)';
  }

  // Render Real-Time Severe Alerts
  const alertsBox = document.getElementById('severeAlertsBox');
  if (alertsBox && data.alerts) {
    alertsBox.innerHTML = data.alerts
      .map((rawAlert) => {
        const a = localizeAlert(rawAlert, state.currentLang);
        let alertClass = 'alert-emerald';
        let alertIcon = '✔';
        if (a.severity === 'Severe' || a.severity === 'Critical') {
          alertClass = 'alert-rose';
          alertIcon = '⚠️';
        } else if (a.severity === 'High' || a.severity === 'Moderate') {
          alertClass = 'alert-amber';
          alertIcon = '⚡';
        }

        return `
        <div class="severe-alert-card ${alertClass}">
          <div style="font-size: 1.5rem; line-height: 1;">${alertIcon}</div>
          <div style="flex: 1;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
              <h4 style="font-size: 0.95rem; font-weight: 800;">${a.headline}</h4>
              <span style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase;">${a.type}</span>
            </div>
            <p style="font-size: 0.825rem; margin-bottom: 0.25rem;"><b>${t.cropTab || 'Crop Advisory'}:</b> ${a.cropImpact}</p>
            <p style="font-size: 0.8rem; opacity: 0.9;"><b>${t.sprayTimingLabel || 'Action'}:</b> ${a.action}</p>
          </div>
        </div>
      `;
      })
      .join('');
  }

  // Render 24-Hour Hourly Timeline
  const hourlyWrap = document.getElementById('hourlyTimeline');
  if (hourlyWrap && data.hourly) {
    hourlyWrap.innerHTML = data.hourly
      .map((h) => {
        const sprayClass = h.spraySuitable ? 'spray-safe' : 'spray-unsafe';
        const sprayText = h.spraySuitable ? t.spraySuitable : t.sprayUnsuitable;
        let hIcon = '⛅';
        if (h.rainProbability > 60) hIcon = '🌧️';
        else if (h.rainProbability < 20) hIcon = '☀️';

        return `
        <div class="hourly-item-card">
          <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted);">${h.time}</div>
          <div style="font-size: 1.5rem; margin: 0.25rem 0;">${hIcon}</div>
          <div style="font-size: 1.15rem; font-weight: 800; color: #0f172a;">${h.temp}°C</div>
          <div style="font-size: 0.72rem; color: var(--accent-cyan);">💧 ${h.rainProbability}%</div>
          <div style="font-size: 0.7rem; color: var(--text-muted);">${h.windSpeedKmh} km/h</div>
          <div class="spray-pill ${sprayClass}">${sprayText}</div>
        </div>
      `;
      })
      .join('');
  }

  // Render 7-Day Precision Forecast with ML Suitability & Climate Risk Score
  const sevenDayGrid = document.getElementById('sevenDayGrid');
  if (sevenDayGrid && data.daily) {
    sevenDayGrid.innerHTML = data.daily
      .map((d) => {
        let pillClass = 'pill-emerald';
        if (d.harvestBadgeColor === 'rose') pillClass = 'pill-rose';
        else if (d.harvestBadgeColor === 'amber') pillClass = 'pill-amber';

        let dIcon = '⛅';
        if (d.rainProbability > 60) dIcon = '🌧️';
        else if (d.rainProbability < 20) dIcon = '☀️';

        // Translate day name
        let dayNameTranslated = d.day;
        const dl = (d.day || '').toLowerCase();
        if (dl.includes('sun')) dayNameTranslated = t.sunday || d.day;
        else if (dl.includes('mon')) dayNameTranslated = t.monday || d.day;
        else if (dl.includes('tue')) dayNameTranslated = t.tuesday || d.day;
        else if (dl.includes('wed')) dayNameTranslated = t.wednesday || d.day;
        else if (dl.includes('thu')) dayNameTranslated = t.thursday || d.day;
        else if (dl.includes('fri')) dayNameTranslated = t.friday || d.day;
        else if (dl.includes('sat')) dayNameTranslated = t.saturday || d.day;

        // Translate condition
        let condTrans = d.condition;
        if (d.condition.includes('Sun') || d.condition.includes('Clear')) condTrans = t.condSunny;
        else if (d.condition.includes('Partly')) condTrans = t.condPartlyCloudy;
        else if (d.condition.includes('Overcast')) condTrans = t.condOvercast;
        else if (d.condition.includes('Heavy')) condTrans = t.condHeavyRain;
        else if (d.condition.includes('Rain') || d.condition.includes('Shower')) condTrans = t.condRain;

        // Crop Suitability Score according to active crop
        const suitPct = d.harvestSuitabilityPercent !== undefined ? d.harvestSuitabilityPercent : Math.max(5, 100 - (d.rainProbability || 20));

        return `
        <div class="daily-forecast-card">
          <div>
            <div style="font-size: 0.95rem; font-weight: 800; color: #0f172a;">${dayNameTranslated}</div>
            <div style="font-size: 0.75rem; color: #15803d; font-family: var(--font-mono); font-weight: 700;">${d.date}</div>
            <div style="font-size: 2.2rem; margin: 0.4rem 0;">${dIcon}</div>
            <div style="font-size: 0.8rem; font-weight: 600; color: #334155;">${condTrans}</div>
          </div>
          <div style="margin: 0.4rem 0;">
            <div style="font-size: 1.1rem; font-weight: 800; color: #0f172a;">
              ${d.maxTemp}°C <span style="font-size: 0.85rem; color: #64748b; font-weight: 500;">/ ${d.minTemp}°C</span>
            </div>
            <div style="font-size: 0.75rem; color: #0284c7; font-weight: 600; margin-top: 0.15rem;">
              💧 ${d.rainProbability}% (${d.rainMm} mm)
            </div>
            <div style="font-size: 0.72rem; color: #64748b;">
              💨 ${d.windSpeedKmh} km/h
            </div>
          </div>

          <!-- Clean Crop Suitability Score according to Crop -->
          <div class="crop-suitability-box">
            <div class="crop-suit-label">
              <span>${t.cropSuitabilityScoreLabel || 'Suitability Score'}:</span>
              <span class="crop-suit-val">${suitPct}%</span>
            </div>
            <div class="crop-suit-bar-bg">
              <div class="crop-suit-bar-fill" style="width: ${suitPct}%; background: ${suitPct >= 75 ? '#16a34a' : suitPct >= 50 ? '#f59e0b' : '#ef4444'};"></div>
            </div>
          </div>
        </div>
      `;
      })
      .join('');
  }

  // Update Live Station Telemetry Badge
  const updateTime = document.getElementById('weatherUpdateTime');
  if (updateTime) {
    if (data.liveStation && data.liveStation.isLive) {
      updateTime.textContent = state.currentLang === 'hi' 
        ? `लाइव: ${data.liveStation.updatedAt || 'सक्रिय'} (${data.liveStation.coordinates || ''})`
        : `Live: ${data.liveStation.updatedAt || 'Active'} (${data.liveStation.coordinates || ''})`;
    } else {
      updateTime.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  }

  const stationTag = document.getElementById('lblStationNameTag');
  if (stationTag) {
    stationTag.textContent = state.locationName;
  }

  // Render Location Crop Recommendations & Agricultural Season
  if (data.cropRecommendations) {
    state.cropRecommendations = data.cropRecommendations;
  }
  if (data.currentSeason) {
    state.currentSeason = data.currentSeason;
  }
  renderCropRecommendations(state.cropRecommendations, state.currentSeason);
}

// Render Location Crop Recommendations & Seasonal Suitability Card
function renderCropRecommendations(recommendations, seasonInfo) {
  const t = TRANSLATIONS[state.currentLang] || TRANSLATIONS['en'];

  // 1. Update Agricultural Season Banner
  if (seasonInfo) {
    const seasonNameEl = document.getElementById('seasonNameDisplay');
    const seasonStatusEl = document.getElementById('seasonStatusTag');
    const seasonDescEl = document.getElementById('seasonDescDisplay');
    const seasonPeriodEl = document.getElementById('seasonPeriodDisplay');

    if (seasonNameEl) {
      seasonNameEl.textContent = state.currentLang === 'hi' ? seasonInfo.nameHi : seasonInfo.nameEn;
    }
    if (seasonStatusEl) {
      seasonStatusEl.textContent = state.currentLang === 'hi' ? seasonInfo.statusHi : seasonInfo.statusEn;
    }
    if (seasonDescEl) {
      seasonDescEl.textContent = state.currentLang === 'hi' ? seasonInfo.descriptionHi : seasonInfo.descriptionEn;
    }
    if (seasonPeriodEl) {
      seasonPeriodEl.textContent = seasonInfo.period;
    }
  }

  // 2. Filter Recommendations
  const container = document.getElementById('cropRecommendationsGrid');
  if (!container || !recommendations) return;

  const filter = state.recommendationsFilter || 'ALL';
  const filtered = recommendations.filter((c) => {
    if (filter === 'ALL') return true;
    if (filter === 'Rabi') return c.season === 'Rabi' || (c.seasonalStatus || '').includes('Sowing');
    if (filter === 'Vegetables') return c.category === 'Vegetables' || c.category === 'Fruits';
    if (filter === 'Cash') return c.category === 'Cash Crops' || c.category === 'Pulses' || c.category === 'Cereals';
    return true;
  });

  if (filtered.length === 0) {
    container.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: var(--text-muted);">No crops match this filter.</div>`;
    return;
  }

  container.innerHTML = filtered
    .map((c, idx) => {
      const isSelected = c.cropId === state.selectedCropId;
      const cropName = state.currentLang === 'hi' ? (CROP_NAMES_HI[c.cropId] || c.name) : `${c.icon} ${c.name}`;
      const seasonTag = state.currentLang === 'hi' ? c.seasonTagHi : c.seasonTag;
      const seasonalStatus = state.currentLang === 'hi' ? c.seasonalStatusHi : c.seasonalStatus;
      const rating = state.currentLang === 'hi' ? c.ratingHi : c.rating;
      const reason = state.currentLang === 'hi' ? c.recommendationReasonHi : c.recommendationReason;
      const waterNeed = state.currentLang === 'hi' ? c.waterNeedHi : c.waterNeed;

      const score = c.suitabilityScore || 85;
      const scoreColor = score >= 85 ? '#15803d' : (score >= 70 ? '#16a34a' : (score >= 55 ? '#d97706' : '#dc2626'));
      const scoreBg = score >= 85 ? '#dcfce7' : (score >= 70 ? '#f0fdf4' : (score >= 55 ? '#fef3c7' : '#fee2e2'));

      return `
      <div class="crop-rec-card ${isSelected ? 'active-crop-card' : ''}" style="background: #ffffff; border: 1.5px solid ${isSelected ? '#16a34a' : 'var(--border-color)'}; border-radius: 12px; padding: 1.15rem; display: flex; flex-direction: column; justify-content: space-between; box-shadow: ${isSelected ? '0 4px 12px rgba(22, 163, 74, 0.12)' : '0 1px 3px rgba(0,0,0,0.04)'}; position: relative; transition: all 0.2s ease;">
        <div>
          <!-- Card Header: Rank, Name & Seasonal Tag -->
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem; gap: 0.5rem;">
            <div>
              <div style="display: flex; align-items: center; gap: 0.4rem; flex-wrap: wrap;">
                <span style="font-size: 0.7rem; font-weight: 800; color: #475569; background: #f1f5f9; padding: 0.15rem 0.4rem; border-radius: 4px;">#${idx + 1}</span>
                <span style="font-size: 0.72rem; font-weight: 700; color: #166534; background: #dcfce7; padding: 0.15rem 0.5rem; border-radius: 999px; border: 1px solid #86efac;">
                  ${seasonTag}
                </span>
                <span style="font-size: 0.7rem; color: #64748b; font-weight: 600;">${c.category}</span>
              </div>
              <h4 style="font-size: 1.05rem; font-weight: 800; color: #0f172a; margin-top: 0.35rem;">
                ${cropName}
              </h4>
            </div>

            <!-- Big Suitability Score Badge -->
            <div style="text-align: right; background: ${scoreBg}; padding: 0.35rem 0.65rem; border-radius: 8px; border: 1px solid ${scoreColor}33;">
              <div style="font-size: 1.25rem; font-weight: 900; color: ${scoreColor}; line-height: 1;">
                ${score}%
              </div>
              <div style="font-size: 0.68rem; font-weight: 700; color: ${scoreColor}; margin-top: 0.15rem; white-space: nowrap;">
                ${rating}
              </div>
            </div>
          </div>

          <!-- Suitability Progress Bar -->
          <div style="width: 100%; height: 6px; background: #e2e8f0; border-radius: 999px; overflow: hidden; margin-bottom: 0.85rem;">
            <div style="width: ${score}%; height: 100%; background: ${scoreColor}; border-radius: 999px; transition: width 0.4s ease;"></div>
          </div>

          <!-- Seasonal Status & Climate Matching Reason -->
          <div style="background: #f8fafc; border-radius: 8px; padding: 0.65rem 0.75rem; margin-bottom: 0.75rem; border: 1px solid #e2e8f0;">
            <div style="font-size: 0.75rem; font-weight: 700; color: #15803d; margin-bottom: 0.25rem;">
              📅 ${seasonalStatus}
            </div>
            <p style="font-size: 0.78rem; color: #334155; line-height: 1.4; margin: 0;">
              ${reason}
            </p>
          </div>

          <!-- Agronomic Specs -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.4rem; font-size: 0.72rem; color: #475569; margin-bottom: 0.85rem;">
            <div>🌡️ <b>${t.idealTempLabel || 'Ideal Temp:'}</b> ${c.idealTempRange}</div>
            <div>💧 <b>${t.waterReqLabel || 'Water Need:'}</b> ${waterNeed}</div>
          </div>
        </div>

        <!-- Action Button -->
        <div style="margin-top: 0.5rem; padding-top: 0.5rem; border-top: 1px solid #f1f5f9;">
          ${isSelected 
            ? `<div style="display: flex; align-items: center; justify-content: center; gap: 0.35rem; font-size: 0.8rem; font-weight: 800; color: #15803d; background: #dcfce7; padding: 0.45rem; border-radius: 6px; border: 1px solid #86efac;">
                ✓ ${t.activeCropTag || 'Currently Monitored Crop'}
               </div>`
            : `<button onclick="window.selectAndMonitorCrop('${c.cropId}')" class="btn-primary" style="width: 100%; padding: 0.45rem 0.75rem; font-size: 0.8rem; display: flex; align-items: center; justify-content: center; gap: 0.4rem; border-radius: 6px;">
                <span>🌱 ${t.switchToCropBtn || 'Select This Crop'}</span>
               </button>`
          }
        </div>
      </div>
    `;
    })
    .join('');
}

// Window Global: Select Crop from Recommendations
window.selectAndMonitorCrop = function(cropId) {
  if (!cropId) return;
  state.selectedCropId = cropId;

  // Update dropdown
  const cropSelect = document.getElementById('cropSelector');
  if (cropSelect) cropSelect.value = cropId;

  // Update growth stages
  const currentCrop = state.allCrops.find((c) => c.id === cropId);
  const stageSelect = document.getElementById('stageSelector');
  if (currentCrop && stageSelect) {
    stageSelect.innerHTML = currentCrop.stages
      .map((s, idx) => {
        const sName = state.currentLang === 'hi' ? (STAGES_HI[s] || s) : s;
        return `<option value="${s}" ${idx === currentCrop.stages.length - 2 ? 'selected' : ''}>${sName}</option>`;
      })
      .join('');
    state.selectedStage = stageSelect.value;
  }

  // Update advisory and weather
  updateCropAdvisory();
  loadWeatherData(state.lat, state.lon, state.locationName, cropId, state.selectedStage);

  const t = TRANSLATIONS[state.currentLang] || TRANSLATIONS['en'];
  const cName = state.currentLang === 'hi' ? (CROP_NAMES_HI[cropId] || cropId) : cropId.toUpperCase();
  showToast(`${t.selectCropLabel || 'Selected Crop'}: ${cName}`);

  // Re-render recommendations to reflect active selection
  renderCropRecommendations(state.cropRecommendations, state.currentSeason);

  // Smooth scroll up to weather / advisory
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Auto-Location GPS Handler
function handleAutoLocation() {
  const statusEl = document.getElementById('locationStatusText');
  const t = TRANSLATIONS[state.currentLang] || TRANSLATIONS['en'];

  if (!navigator.geolocation) {
    if (statusEl) statusEl.textContent = 'Geolocation is not supported by your browser.';
    showToast('Geolocation not supported');
    return;
  }

  if (statusEl) statusEl.textContent = t.locationSearching;

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      state.lat = position.coords.latitude;
      state.lon = position.coords.longitude;
      state.locationName = `Auto GPS (${state.lat.toFixed(2)}°N, ${state.lon.toFixed(2)}°E)`;

      if (statusEl) {
        statusEl.textContent = `${t.locationFound} ${state.lat.toFixed(3)}°N, ${state.lon.toFixed(3)}°E`;
      }
      showToast('Farm GPS location acquired!');
      await loadWeatherData(state.lat, state.lon, state.locationName);
    },
    (err) => {
      console.warn('Geolocation error:', err);
      if (statusEl) statusEl.textContent = t.locationError;
      showToast(t.locationError);
    },
    { timeout: 10000 }
  );
}

// Resolve 6-digit Indian PIN Code with offline database & online postal fallback
async function resolvePincode(pin) {
  const cleanPin = pin.trim();
  if (!/^[1-9][0-9]{5}$/.test(cleanPin)) {
    return { error: 'invalid' };
  }

  // 1. Check offline dictionary for exact 3-digit prefix
  const prefix3 = cleanPin.substring(0, 3);
  const prefix2 = cleanPin.substring(0, 2);
  const matched = PINCODE_DIRECTORY[prefix3];

  // 2. Query Postal PIN code API (with fast 1.5s timeout for snappy UI)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1500);
    const resp = await fetch(`https://api.postalpincode.in/pincode/${cleanPin}`, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (resp.ok) {
      const data = await resp.json();
      if (Array.isArray(data) && data[0]?.Status === 'Success' && data[0]?.PostOffice?.length > 0) {
        const po = data[0].PostOffice[0];
        const poName = po.Name;
        const district = po.District;
        const stateName = po.State;
        const lat = matched ? matched.lat : 26.85;
        const lon = matched ? matched.lon : 80.95;

        return {
          pincode: cleanPin,
          name: `${district} (${poName}), ${stateName} - PIN ${cleanPin}`,
          district,
          state: stateName,
          lat,
          lon,
          isUP: stateName.toLowerCase().includes('uttar pradesh') || cleanPin.startsWith('2'),
        };
      }
    }
  } catch (e) {
    // Graceful offline fallback
  }

  // 3. Fallback to built-in verified registry
  if (matched) {
    return {
      pincode: cleanPin,
      name: `${matched.name} - PIN ${cleanPin}`,
      district: matched.name.split(',')[0],
      state: matched.region === 'UP' ? 'Uttar Pradesh' : matched.name.split(',')[1]?.trim() || '',
      lat: matched.lat,
      lon: matched.lon,
      isUP: matched.region === 'UP',
    };
  }

  // 4. Default for UP PIN codes (20xxxx to 28xxxx)
  if (prefix2 >= '20' && prefix2 <= '28') {
    return {
      pincode: cleanPin,
      name: `Uttar Pradesh Agri-Zone - PIN ${cleanPin}`,
      district: 'Uttar Pradesh',
      state: 'Uttar Pradesh',
      lat: 26.85,
      lon: 80.95,
      isUP: true,
    };
  }

  return {
    pincode: cleanPin,
    name: `India Postal Station - PIN ${cleanPin}`,
    district: 'Agri-Station',
    state: 'India',
    lat: 26.85,
    lon: 80.95,
    isUP: false,
  };
}

// Manual PIN Code Handler
async function applyPincode(pinValue) {
  const t = TRANSLATIONS[state.currentLang] || TRANSLATIONS['en'];
  const inputEl = document.getElementById('pincodeInput');
  const statusEl = document.getElementById('locationStatusText');
  const pin = (pinValue || inputEl?.value || '').trim();

  if (!pin || !/^[1-9][0-9]{5}$/.test(pin)) {
    showToast(t.pincodeInvalidError);
    if (inputEl) {
      inputEl.focus();
      inputEl.style.borderColor = '#ef4444';
      setTimeout(() => {
        if (inputEl) inputEl.style.borderColor = '#cbd5e1';
      }, 2500);
    }
    return;
  }

  if (statusEl) statusEl.textContent = t.pincodeSearching;

  const result = await resolvePincode(pin);
  if (result.error) {
    showToast(t.pincodeInvalidError);
    if (statusEl) statusEl.textContent = `Station: ${state.locationName}`;
    return;
  }

  state.pincode = result.pincode;
  state.lat = result.lat;
  state.lon = result.lon;
  state.locationName = result.name;

  if (inputEl) inputEl.value = result.pincode;
  if (statusEl) {
    statusEl.textContent = `Station: ${result.name} (${state.lat.toFixed(2)}°N, ${state.lon.toFixed(2)}°E)`;
  }

  showToast(`${t.pincodeFound} ${result.pincode} (${result.district || 'UP'})`);
  await loadWeatherData(state.lat, state.lon, state.locationName, state.selectedCropId, state.selectedStage);
  if (state.currentPage === 'history') {
    loadCropHistory(state.historyRangeDays);
  }
}

// Reset to Uttar Pradesh Default Location
function resetToDefaultUP() {
  const t = TRANSLATIONS[state.currentLang] || TRANSLATIONS['en'];
  const inputEl = document.getElementById('pincodeInput');
  const statusEl = document.getElementById('locationStatusText');

  state.pincode = DEFAULT_UP_LOCATION.pincode;
  state.lat = DEFAULT_UP_LOCATION.lat;
  state.lon = DEFAULT_UP_LOCATION.lon;
  state.locationName = DEFAULT_UP_LOCATION.name;

  if (inputEl) inputEl.value = DEFAULT_UP_LOCATION.pincode;
  if (statusEl) {
    statusEl.textContent = state.currentLang === 'hi'
      ? `मौसम केंद्र: उत्तर प्रदेश (26.85°N, 80.95°E - पिन 226001)`
      : `Station: Uttar Pradesh (26.85°N, 80.95°E - PIN 226001)`;
  }

  showToast(t.defaultUpRestored);
  loadWeatherData(state.lat, state.lon, state.locationName, state.selectedCropId, state.selectedStage);
  if (state.currentPage === 'history') {
    loadCropHistory(state.historyRangeDays);
  }
}

// Load All Crops Master Registry
async function loadCrops() {
  try {
    const res = await fetch('/api/crops');
    const data = await res.json();
    state.allCrops = data.crops || [];

    populateCropDropdowns();
    populateBenchmarkDropdowns();
    renderPesticideGuide();
    await updateCropAdvisory();
  } catch (err) {
    console.error('Crops load error:', err);
  }
}

// Populate Crop & Growth Stage Dropdowns
function populateCropDropdowns() {
  const cropSelect = document.getElementById('cropSelector');
  const stageSelect = document.getElementById('stageSelector');
  const categoryFilter = document.getElementById('cropCategoryFilter');
  const t = TRANSLATIONS[state.currentLang] || TRANSLATIONS['en'];

  if (!cropSelect || !stageSelect) return;

  // Localize category filter options
  if (categoryFilter) {
    const prevCatVal = categoryFilter.value;
    categoryFilter.innerHTML = `
      <option value="ALL">${t.catAll || 'All Categories'}</option>
      <option value="Cereals">${t.catCereals || 'Cereals & Grains'}</option>
      <option value="Vegetables">${t.catVegetables || 'Vegetables'}</option>
      <option value="Oilseeds">${t.catOilseeds || 'Oilseeds'}</option>
      <option value="Cash Crops">${t.catCash || 'Cash Crops'}</option>
      <option value="Pulses">${t.catPulses || 'Pulses'}</option>
      <option value="Fruits">${t.catFruits || 'Fruits'}</option>
    `;
    if (prevCatVal) categoryFilter.value = prevCatVal;
  }

  const currentCategory = categoryFilter ? categoryFilter.value : 'ALL';
  const filteredCrops = currentCategory === 'ALL'
    ? state.allCrops
    : state.allCrops.filter((c) => c.category === currentCategory);

  cropSelect.innerHTML = filteredCrops
    .map((c) => {
      const cName = state.currentLang === 'hi' ? (CROP_NAMES_HI[c.id] || c.name) : `${c.icon} ${c.name} (${c.category})`;
      return `<option value="${c.id}" ${c.id === state.selectedCropId ? 'selected' : ''}>${cName}</option>`;
    })
    .join('');

  const currentCrop = state.allCrops.find((c) => c.id === state.selectedCropId) || filteredCrops[0] || state.allCrops[0];
  if (currentCrop) {
    state.selectedCropId = currentCrop.id;
    stageSelect.innerHTML = currentCrop.stages
      .map((s, idx) => {
        const sName = state.currentLang === 'hi' ? (STAGES_HI[s] || s) : s;
        return `<option value="${s}" ${s === state.selectedStage || idx === currentCrop.stages.length - 2 ? 'selected' : ''}>${sName}</option>`;
      })
      .join('');
    state.selectedStage = stageSelect.value;
  }
}

// Update ML Crop Harvesting Advisory
async function updateCropAdvisory() {
  try {
    const res = await fetch('/api/crop-advisory', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cropId: state.selectedCropId,
        currentStage: state.selectedStage,
        lat: state.lat,
        lon: state.lon,
        locationName: state.locationName,
      }),
    });

    if (!res.ok) throw new Error('Advisory fetch failed');
    const data = await res.json();
    state.currentAdvisory = data;
    renderAdvisoryCard(data);
    updatePrintSheet();

    // Re-sync weather alerts and 7-day forecast on Page 1 for this crop
    loadWeatherData(state.lat, state.lon, state.locationName, state.selectedCropId, state.selectedStage);
  } catch (err) {
    console.error('Crop advisory error:', err);
  }
}

// Render Crop Advisory Details Card with Real-Time Crop-Specific Alerts
function renderAdvisoryCard(data) {
  const t = TRANSLATIONS[state.currentLang] || TRANSLATIONS['en'];

  const tag = document.getElementById('advisoryCropTag');
  const name = document.getElementById('advisoryCropName');
  const statusTitle = document.getElementById('harvestStatusTitle');
  const statusReason = document.getElementById('harvestStatusReason');
  const banner = document.getElementById('harvestStatusBanner');
  const moisture = document.getElementById('advisoryMoisture');
  const dryDays = document.getElementById('advisoryDryDays');
  const windLimit = document.getElementById('advisoryWindLimit');
  const diseaseList = document.getElementById('advisoryDiseaseList');
  const cropAlertsBox = document.getElementById('advisoryCropAlerts');

  // ML Suitability & Climate Risk Score elements
  const suitPctEl = document.getElementById('advisorySuitabilityPercent');
  const riskPctEl = document.getElementById('advisoryRiskPercent');
  const riskLvlEl = document.getElementById('advisoryRiskLevel');
  const suitBar = document.getElementById('advisorySuitabilityBar');
  const riskBar = document.getElementById('advisoryRiskBar');
  const precipRiskEl = document.getElementById('advisoryPrecipRisk');
  const windRiskEl = document.getElementById('advisoryWindRisk');
  const soilSatEl = document.getElementById('advisorySoilSat');
  const disPressureEl = document.getElementById('advisoryDiseasePressure');

  const cropKey = (state.selectedCropId || 'wheat').toLowerCase();
  const cropLocalized = state.currentLang === 'hi' ? (CROP_NAMES_HI[cropKey] || data.crop) : data.crop;
  if (tag) tag.textContent = cropLocalized;
  if (name) name.textContent = cropLocalized;
  if (moisture) moisture.textContent = data.idealMoisture;
  if (dryDays) dryDays.textContent = state.currentLang === 'hi' ? `${data.minDryDays || 3} दिन` : `${data.minDryDays || 3} Days`;
  if (windLimit) windLimit.textContent = state.currentLang === 'hi' ? `${data.maxWindSpeedKmh || 20} किमी/घंटा` : `${data.maxWindSpeedKmh || 20} km/h`;

  // Populate ML Scores
  const suitPct = data.harvestSuitabilityPercent !== undefined ? data.harvestSuitabilityPercent : 94;
  const riskPct = data.climateRiskScore !== undefined ? data.climateRiskScore : (100 - suitPct);
  if (suitPctEl) suitPctEl.textContent = `${suitPct}%`;
  if (riskPctEl) riskPctEl.textContent = `${riskPct}%`;
  if (suitBar) suitBar.style.width = `${suitPct}%`;
  if (riskBar) riskBar.style.width = `${riskPct}%`;

  let riskLvlTrans = t.riskLow || 'Low Risk';
  if (riskPct > 60) riskLvlTrans = t.riskSevere || 'Severe Risk';
  else if (riskPct > 30) riskLvlTrans = t.riskModerate || 'Moderate Risk';
  if (riskLvlEl) riskLvlEl.textContent = riskLvlTrans;

  if (data.riskBreakdown) {
    if (precipRiskEl) precipRiskEl.textContent = `${data.riskBreakdown.precipitationRisk}%`;
    if (windRiskEl) windRiskEl.textContent = `${data.riskBreakdown.windRisk}%`;
    if (soilSatEl) soilSatEl.textContent = `${data.riskBreakdown.soilMoistureSaturation}%`;
    if (disPressureEl) disPressureEl.textContent = `${data.riskBreakdown.foliarDiseasePressure}%`;
  }

  // Translate Status Title & Reason
  let statusTitleText = data.harvestWindowStatus;
  let statusReasonText = data.harvestReason;

  if (state.currentLang === 'hi') {
    if (data.harvestWindowStatus.includes('Optimal') || data.harvestWindowStatus.includes('Safe')) {
      statusTitleText = t.harvestSafe || 'कटाई के लिए सुरक्षित व उत्तम समय सक्रिय';
      statusReasonText = `आगामी 72 घंटों में मौसम पूरी तरह साफ और शुष्क रहेगा। हवा की अनुकूल गति से फसल गिरने का कोई खतरा नहीं है। दोपहर 11 से 4 बजे के बीच कटाई करें।`;
    } else if (data.harvestWindowStatus.includes('Delay') || data.harvestWindowStatus.includes('Hazardous') || data.harvestWindowStatus.includes('Rain')) {
      statusTitleText = t.harvestDelay || 'कटाई रोकें - बारिश आने की संभावना';
      statusReasonText = `आगामी 72 घंटों में वर्षा के कारण दाने में नमी बढ़ जाएगी जिससे दाने में अंकुरण या फफूंद लग सकती है। मौसम साफ होने तक कटाई रोकें।`;
    } else if (data.harvestWindowStatus.includes('Maturation') || data.harvestWindowStatus.includes('Still')) {
      statusTitleText = t.harvestMaturing || 'फसल अभी पक रही है';
      const stageHi = STAGES_HI[state.selectedStage] || state.selectedStage;
      statusReasonText = `फसल वर्तमान में ${stageHi} में है। कटाई तभी करें जब दाने में नमी आदर्श स्तर (${data.idealMoisture}) पर आ जाए।`;
    }
  } else {
    if (data.harvestWindowStatus.includes('Optimal') || data.harvestWindowStatus.includes('Safe')) {
      statusTitleText = t.harvestSafe || data.harvestWindowStatus;
    } else if (data.harvestWindowStatus.includes('Delay') || data.harvestWindowStatus.includes('Hazardous') || data.harvestWindowStatus.includes('Rain')) {
      statusTitleText = t.harvestDelay || data.harvestWindowStatus;
    } else if (data.harvestWindowStatus.includes('Maturation') || data.harvestWindowStatus.includes('Still')) {
      statusTitleText = t.harvestMaturing || data.harvestWindowStatus;
    }
  }

  if (statusTitle) statusTitle.textContent = statusTitleText;
  if (statusReason) statusReason.textContent = statusReasonText;

  if (banner) {
    if (data.harvestWindowStatus.includes('Hazardous') || data.harvestWindowStatus.includes('Delay')) {
      banner.style.background = 'rgba(244, 63, 94, 0.15)';
      banner.style.borderColor = 'rgba(244, 63, 94, 0.4)';
    } else {
      banner.style.background = 'rgba(16, 185, 129, 0.12)';
      banner.style.borderColor = 'rgba(16, 185, 129, 0.4)';
    }
  }

  // Render Real-Time Crop-Specific Severe Alerts inside the Harvesting Advisory Card
  if (cropAlertsBox) {
    if (data.severeAlerts && data.severeAlerts.length > 0) {
      cropAlertsBox.innerHTML = data.severeAlerts
        .map((rawAlert) => {
          const a = localizeAlert(rawAlert, state.currentLang);
          let alertClass = 'advisory-alert-emerald';
          let alertIcon = '✔';
          if (a.severity === 'Severe' || a.severity === 'Critical') {
            alertClass = 'advisory-alert-rose';
            alertIcon = '⚠️';
          } else if (a.severity === 'High' || a.severity === 'Moderate') {
            alertClass = 'advisory-alert-amber';
            alertIcon = '⚡';
          }

          return `
          <div class="advisory-crop-alert ${alertClass}">
            <div style="font-size: 1.4rem; line-height: 1;">${alertIcon}</div>
            <div style="flex: 1;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.2rem; flex-wrap: wrap; gap: 0.35rem;">
                <h4 style="font-size: 0.95rem; font-weight: 800; color: #0f172a;">${a.headline}</h4>
                <span style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase;">${a.type}</span>
              </div>
              <p style="font-size: 0.825rem; margin-bottom: 0.2rem; color: #334155;"><b>${t.cropTab || 'Crop Risk'}:</b> ${a.cropImpact}</p>
              <p style="font-size: 0.8rem; font-weight: 600; color: #92400e;"><b>${t.sprayTimingLabel || 'Action'}:</b> ${a.action}</p>
            </div>
          </div>
        `;
        })
        .join('');
    } else {
      cropAlertsBox.innerHTML = '';
    }
  }

  if (diseaseList && data.commonDiseases) {
    diseaseList.innerHTML = data.commonDiseases
      .map((d) => {
        const disHi = (state.currentLang === 'hi' && DISEASES_HI[d.id]) ? DISEASES_HI[d.id] : null;
        const dName = disHi ? disHi.name : d.name;
        const dChem = disHi ? disHi.chemical : d.chemicalPesticide;
        const dDosage = disHi ? `${disHi.dosageAcre} | ${disHi.dosageLiter}` : `${d.dosagePerAcre} | Knapsack: ${d.dosagePerLiter}`;
        const dBio = disHi ? disHi.bio : d.organicBio;
        const phiText = state.currentLang === 'hi' ? `${d.phiDays} दिन` : `${d.phiDays} Days`;

        return `
        <div style="background: #ffffff; border: 1px solid var(--border-color); border-radius: 10px; padding: 0.85rem;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.35rem;">
            <b style="color: #0f172a; font-size: 0.9rem;">${dName}</b>
            <span style="font-size: 0.72rem; color: var(--accent-amber); font-family: var(--font-mono); font-weight: 700;">
              PHI: ${phiText}
            </span>
          </div>
          <div style="font-size: 0.8rem; color: #15803d; font-weight: 600; margin-bottom: 0.35rem;">
            <b>${t.chemicalFormula || 'Chemical Formulation'}:</b> ${dChem}
          </div>
          <div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.25rem;">
            <b>${t.dosageAcreLabel || 'Dosage'}:</b> ${dDosage}
          </div>
          <div style="font-size: 0.75rem; color: #166534; font-weight: 600;">
            <b>${t.bioAlternativeLabel || 'Organic Bio'}:</b> ${dBio}
          </div>
        </div>
      `;
      })
      .join('');
  }
}

// Render Master Pesticide Guide Table
function renderPesticideGuide(filterText = '') {
  const tbody = document.getElementById('pesticideTableBody');
  if (!tbody || !state.allCrops) return;

  const query = filterText.toLowerCase();
  const rows = [];

  state.allCrops.forEach((crop) => {
    crop.commonDiseases.forEach((dis) => {
      const match =
        crop.name.toLowerCase().includes(query) ||
        dis.name.toLowerCase().includes(query) ||
        dis.chemicalPesticide.toLowerCase().includes(query) ||
        dis.symptoms.toLowerCase().includes(query);

      if (!query || match) {
        const disHi = (state.currentLang === 'hi' && DISEASES_HI[dis.id]) ? DISEASES_HI[dis.id] : null;
        const cName = state.currentLang === 'hi' ? (CROP_NAMES_HI[crop.id] || crop.name) : `${crop.icon} ${crop.name}`;
        const dName = disHi ? disHi.name : dis.name;
        const dSym = disHi ? disHi.symptoms : dis.symptoms;
        const dChem = disHi ? disHi.chemical : dis.chemicalPesticide;
        const dDose = disHi ? `${disHi.dosageAcre}<br><span style="color: var(--text-muted);">${disHi.dosageLiter}</span>` : `${dis.dosagePerAcre}<br><span style="color: var(--text-muted);">${dis.dosagePerLiter}</span>`;
        const dPhi = state.currentLang === 'hi' ? `${dis.phiDays} दिन` : `${dis.phiDays} d`;
        const dBio = disHi ? disHi.bio : dis.organicBio;

        rows.push(`
          <tr>
            <td style="font-weight: 700; color: #0f172a;">${cName}</td>
            <td style="font-weight: 600; color: #15803d;">${dName}</td>
            <td style="font-size: 0.8rem; max-width: 240px; color: #334155;">${dSym}</td>
            <td style="font-weight: 600; color: #15803d;">${dChem}</td>
            <td style="font-family: var(--font-mono); font-size: 0.78rem; color: #1e293b;">${dDose}</td>
            <td style="font-family: var(--font-mono); font-weight: 700; color: #b45309;">${dPhi}</td>
            <td style="font-size: 0.75rem; color: #166534; font-weight: 600; max-width: 200px;">${dBio}</td>
          </tr>
        `);
      }
    });
  });

  tbody.innerHTML = rows.join('') || `<tr><td colspan="7" style="text-align: center; color: var(--text-muted);">No matching crop diseases found.</td></tr>`;
}

// Populate Interactive Benchmark Selector & 1-Click Chips
function populateBenchmarkDropdowns() {
  const benchCropSelect = document.getElementById('benchmarkCropSelect');
  const benchDiseaseSelect = document.getElementById('benchmarkDiseaseSelect');
  const chipsContainer = document.getElementById('benchmarkQuickChips');
  if (!benchCropSelect || !benchDiseaseSelect || state.allCrops.length === 0) return;

  const prevCropVal = benchCropSelect.value;
  benchCropSelect.innerHTML = state.allCrops
    .map((c) => {
      const cName = state.currentLang === 'hi' ? (CROP_NAMES_HI[c.id] || c.name) : `${c.icon} ${c.name} (${c.category})`;
      return `<option value="${c.id}" ${c.id === prevCropVal ? 'selected' : ''}>${cName}</option>`;
    })
    .join('');

  function updateDiseaseOptions(cropId) {
    const crop = state.allCrops.find((c) => c.id === cropId) || state.allCrops[0];
    if (!crop) return;
    benchDiseaseSelect.innerHTML = crop.commonDiseases
      .map((d) => {
        const disHi = (state.currentLang === 'hi' && DISEASES_HI[d.id]) ? DISEASES_HI[d.id] : null;
        const dName = disHi ? disHi.name : d.name;
        return `<option value="${d.id}">${dName}</option>`;
      })
      .join('');
  }

  benchCropSelect.onchange = (e) => {
    updateDiseaseOptions(e.target.value);
  };

  updateDiseaseOptions(benchCropSelect.value || state.allCrops[0].id);

  const btnRun = document.getElementById('btnRunBenchmark');
  if (btnRun) {
    btnRun.onclick = () => {
      window.testAiBenchmark(benchCropSelect.value, benchDiseaseSelect.value);
    };
  }

  // Populate quick benchmark chips covering diverse crops and pathologies
  if (chipsContainer) {
    const sampleChips = [
      { crop: 'wheat', diseaseId: 'wheat-stripe-rust', en: '🌾 Wheat Stripe Rust', hi: '🌾 गेहूं पीला रतुआ' },
      { crop: 'wheat', diseaseId: 'wheat-karnal-bunt', en: '🌾 Wheat Karnal Bunt', hi: '🌾 गेहूं करनाल बंट' },
      { crop: 'wheat', diseaseId: 'wheat-aphids', en: '🌾 Wheat Aphid Colony', hi: '🌾 गेहूं माहू / चेपा' },
      { crop: 'rice', diseaseId: 'rice-blast', en: '🍚 Rice Leaf Blast', hi: '🍚 धान झुलसा रोग' },
      { crop: 'rice', diseaseId: 'rice-bacterial-blight', en: '🍚 Rice Bacterial Blight', hi: '🍚 धान जीवाणु झुलसा' },
      { crop: 'tomato', diseaseId: 'tomato-early-blight', en: '🍅 Tomato Early Blight', hi: '🍅 टमाटर अगेती झुलसा' },
      { crop: 'tomato', diseaseId: 'tomato-late-blight', en: '🍅 Tomato Late Blight', hi: '🍅 टमाटर पछेती झुलसा' },
      { crop: 'potato', diseaseId: 'potato-late-blight', en: '🥔 Potato Late Blight', hi: '🥔 आलू पछेती झुलसा' },
      { crop: 'potato', diseaseId: 'potato-early-blight', en: '🥔 Potato Early Blight', hi: '🥔 आलू अगेती झुलसा' },
      { crop: 'cotton', diseaseId: 'cotton-bollworm', en: '☁️ Cotton Pink Bollworm', hi: '☁️ कपास गुलाबी सुंडी' },
      { crop: 'cotton', diseaseId: 'cotton-aphids', en: '☁️ Cotton Aphids & Mold', hi: '☁️ कपास माहू कीट' },
      { crop: 'maize', diseaseId: 'maize-armyworm', en: '🌽 Maize Fall Armyworm', hi: '🌽 मक्का फॉल आर्मीवर्म' },
      { crop: 'mustard', diseaseId: 'mustard-white-rust', en: '🌼 Mustard White Rust', hi: '🌼 सरसों सफेद रतुआ' },
      { crop: 'soybean', diseaseId: 'soybean-rust', en: '🌱 Asian Soybean Rust', hi: '🌱 सोयाबीन रतुआ' },
      { crop: 'onion', diseaseId: 'onion-purple-blotch', en: '🧅 Onion Purple Blotch', hi: '🧅 प्याज बैंगनी धब्बा' },
      { crop: 'sugarcane', diseaseId: 'sugarcane-red-rot', en: '🎋 Sugarcane Red Rot', hi: '🎋 गन्ना लाल सड़न' },
    ];

    chipsContainer.innerHTML = sampleChips
      .map(
        (s) => `
      <button class="bench-chip-btn" data-crop="${s.crop}" data-disease="${s.diseaseId}">
        ${state.currentLang === 'hi' ? s.hi : s.en}
      </button>
    `
      )
      .join('');

    chipsContainer.querySelectorAll('.bench-chip-btn').forEach((btn) => {
      btn.onclick = () => {
        chipsContainer.querySelectorAll('.bench-chip-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        benchCropSelect.value = btn.dataset.crop;
        updateDiseaseOptions(btn.dataset.crop);
        benchDiseaseSelect.value = btn.dataset.disease;
        window.testAiBenchmark(btn.dataset.crop, btn.dataset.disease);
      };
    });
  }
}

// Render AI Output Card with Comprehensive Localization
function renderAiOutputCard(data) {
  if (!data) return;
  const t = TRANSLATIONS[state.currentLang] || TRANSLATIONS['en'];

  const resDiagnosis = document.getElementById('resDiagnosis');
  const resCrop = document.getElementById('resCropName');
  const resStage = document.getElementById('resStageName');
  const resConfidence = document.getElementById('resConfidence');
  const resSeverity = document.getElementById('resSeverity');
  const resSymptoms = document.getElementById('resSymptomsList');
  const resPesticide = document.getElementById('resPesticideName');
  const resDosageAcre = document.getElementById('resDosageAcre');
  const resDosageLiter = document.getElementById('resDosageLiter');
  const resPhi = document.getElementById('resPhiDays');
  const resBio = document.getElementById('resBioOption');
  const resTiming = document.getElementById('resSprayTiming');

  // Match against Hindi disease dictionary
  let matchedDiseaseKey = '';
  for (const [key, val] of Object.entries(DISEASES_HI)) {
    const slug = key.replace(/^[a-z]+-/, '');
    if (data.diagnosis && data.diagnosis.toLowerCase().includes(slug)) {
      matchedDiseaseKey = key;
      break;
    }
  }
  const disHi = (state.currentLang === 'hi' && matchedDiseaseKey) ? DISEASES_HI[matchedDiseaseKey] : null;

  const cropKey = (data.cropIdentified || '').toLowerCase();
  const cropText = state.currentLang === 'hi' ? (CROP_NAMES_HI[cropKey] || data.cropIdentified) : data.cropIdentified;
  const stageText = state.currentLang === 'hi' ? (STAGES_HI[data.cropStage] || data.cropStage) : data.cropStage;
  const diagText = disHi ? disHi.name : data.diagnosis;
  const chemText = disHi ? disHi.chemical : data.chemicalPesticide;
  const doseAcreText = disHi ? disHi.dosageAcre : data.dosagePerAcre;
  const doseLiterText = disHi ? disHi.dosageLiter : data.dosagePerLiter;
  const phiText = state.currentLang === 'hi' ? `${data.phiDays} दिन` : `${data.phiDays} Days`;
  const bioText = disHi ? disHi.bio : data.organicAlternative;
  const timingText = disHi ? disHi.sprayTiming : data.weatherSprayTiming;

  if (resCrop) resCrop.textContent = cropText;
  if (resStage) resStage.textContent = stageText;
  if (resDiagnosis) resDiagnosis.textContent = diagText;
  if (resConfidence) resConfidence.textContent = `${(data.confidence || 98.4).toFixed(1)}%`;

  if (resSeverity) {
    let sevClass = 'sev-severe';
    let sevText = data.severity;
    if (data.severity === 'None' || data.severity === 'Healthy') {
      sevClass = 'sev-safe';
      sevText = t.sevNormal || 'Healthy / Normal';
    } else if (data.severity === 'Low') {
      sevClass = 'sev-safe';
      sevText = t.sevLow || 'Low';
    } else if (data.severity === 'Moderate') {
      sevClass = 'sev-moderate';
      sevText = t.sevModerate || 'Moderate';
    } else {
      sevClass = 'sev-severe';
      sevText = t.sevSevere || 'Severe';
    }
    resSeverity.className = `severity-pill ${sevClass}`;
    resSeverity.textContent = sevText;
  }

  if (resSymptoms) {
    if (disHi) {
      resSymptoms.innerHTML = `• ${disHi.symptoms}`;
    } else if (Array.isArray(data.symptoms)) {
      resSymptoms.innerHTML = data.symptoms.map((s) => `• ${s}`).join('<br>');
    } else {
      resSymptoms.textContent = data.symptoms;
    }
  }

  if (resPesticide) resPesticide.textContent = chemText;
  if (resDosageAcre) resDosageAcre.textContent = doseAcreText;
  if (resDosageLiter) resDosageLiter.textContent = doseLiterText;
  if (resPhi) resPhi.textContent = phiText;
  if (resBio) resBio.textContent = bioText;
  if (resTiming) resTiming.textContent = timingText;

  const resSourceBadge = document.getElementById('resSourceBadge');
  const resAutonomousTag = document.getElementById('resAutonomousTag');
  if (resSourceBadge) {
    resSourceBadge.textContent = data.source || (state.currentLang === 'hi' ? 'जेमिनी 3.8 विजन एपीआई' : 'Gemini 3.8 Flash Vision');
  }
  if (resAutonomousTag) {
    resAutonomousTag.textContent = state.currentLang === 'hi' ? 'स्वायत्त एआई खोज' : 'Autonomous AI Discovery';
  }
}

// AI Picture Search Execution (Autonomous Vision API for Any Crop, Fruit or Plant)
async function analyzeCropPicture(dataUrl, sampleCrop, diseaseId) {
  const dropzone = document.getElementById('aiDropzone');
  const scanningInd = document.getElementById('aiScanningIndicator');
  if (dropzone) dropzone.style.opacity = '0.5';
  if (scanningInd) scanningInd.style.display = 'flex';

  try {
    const payload = {
      image: dataUrl,
    };
    // Only pass benchmark crop and disease if explicitly testing a known specimen
    if (diseaseId) {
      payload.sampleCrop = sampleCrop;
      payload.diseaseId = diseaseId;
    }

    const res = await fetch('/api/crop-vision/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error('AI analysis error');
    const data = await res.json();
    state.currentAiAnalysis = data;

    renderAiOutputCard(data);

    const detectedMsg = state.currentLang === 'hi' 
      ? `एआई पहचान: ${CROP_NAMES_HI[data.cropIdentified.toLowerCase()] || data.cropIdentified} - ${data.diagnosis}`
      : `AI Detected: ${data.cropIdentified} - ${data.diagnosis}`;
    showToast(detectedMsg);
    updatePrintSheet();
  } catch (err) {
    console.error('AI picture search failed:', err);
    showToast('AI analysis failed: ' + err.message);
  } finally {
    if (dropzone) dropzone.style.opacity = '1';
    if (scanningInd) scanningInd.style.display = 'none';
  }
}

// High-Precision Visual Specimen Generator for Multi-Crop Pathologies
window.testAiBenchmark = function (cropKey, diseaseId) {
  const canvas = document.getElementById('aiVisionCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;

  // Clear background
  ctx.fillStyle = '#06130b';
  ctx.fillRect(0, 0, w, h);

  ctx.save();
  ctx.translate(w / 2, h / 2);

  const dKey = (diseaseId || '').toLowerCase();
  const cKey = (cropKey || 'wheat').toLowerCase();

  if (dKey.includes('stripe-rust') || (cKey === 'wheat' && !diseaseId)) {
    // Wheat blade with parallel linear yellow-orange rust pustules
    ctx.rotate(0.08);
    ctx.fillStyle = '#15803d';
    ctx.fillRect(-w * 0.12, -h * 0.44, w * 0.24, h * 0.88);
    // Yellow linear pustules along veins
    ctx.fillStyle = '#f59e0b';
    for (let x = -30; x <= 30; x += 15) {
      for (let y = -h * 0.38; y <= h * 0.38; y += 11) {
        ctx.beginPath();
        ctx.ellipse(x, y, 3.5, 7, 0, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  } else if (dKey.includes('karnal-bunt')) {
    // Wheat ear with black powdery bunted kernels
    ctx.fillStyle = '#ca8a04';
    ctx.fillRect(-w * 0.14, -h * 0.42, w * 0.28, h * 0.84);
    // Dark black sooty grain patches
    ctx.fillStyle = '#18181b';
    for (let y = -h * 0.3; y <= h * 0.3; y += 22) {
      ctx.beginPath();
      ctx.ellipse(-15, y, 14, 9, 0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(15, y + 10, 14, 9, -0.3, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (dKey.includes('aphid')) {
    // Foliage with sap-sucking aphid colonies
    ctx.fillStyle = '#16a34a';
    ctx.beginPath();
    ctx.ellipse(0, 0, w * 0.25, h * 0.4, 0, 0, Math.PI * 2);
    ctx.fill();
    // Clustered dark greenish aphids
    ctx.fillStyle = '#14532d';
    for (let i = 0; i < 40; i++) {
      const rx = (Math.random() - 0.5) * 80;
      const ry = (Math.random() - 0.5) * 140;
      ctx.beginPath();
      ctx.arc(rx, ry, 3.5, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (dKey.includes('rice-blast')) {
    // Rice blade with diamond spindle lesions and necrotic gray eyes
    ctx.fillStyle = '#22c55e';
    ctx.fillRect(-w * 0.14, -h * 0.45, w * 0.28, h * 0.9);
    // Diamond spindle lesions
    [-50, 20, 90].forEach((yPos) => {
      ctx.fillStyle = '#78350f';
      ctx.beginPath();
      ctx.ellipse(0, yPos, 42, 16, 0.15, 0, Math.PI * 2);
      ctx.fill();
      // Gray necrotic center
      ctx.fillStyle = '#e2e8f0';
      ctx.beginPath();
      ctx.ellipse(0, yPos, 22, 8, 0.15, 0, Math.PI * 2);
      ctx.fill();
    });
  } else if (dKey.includes('bacterial-blight')) {
    // Rice leaf with wavy yellow-white chlorotic margins
    ctx.fillStyle = '#15803d';
    ctx.fillRect(-w * 0.15, -h * 0.45, w * 0.3, h * 0.9);
    // Wavy marginal chlorosis
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.moveTo(w * 0.05, -h * 0.4);
    ctx.bezierCurveTo(w * 0.15, -h * 0.2, w * 0.05, 0, w * 0.15, h * 0.3);
    ctx.lineTo(w * 0.15, -h * 0.4);
    ctx.fill();
  } else if (dKey.includes('early-blight')) {
    // Leaf with concentric bullseye target rings
    ctx.beginPath();
    ctx.ellipse(0, 0, w * 0.28, h * 0.36, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#166534';
    ctx.fill();
    // Bullseye lesion
    ctx.beginPath();
    ctx.arc(15, -15, 38, 0, Math.PI * 2);
    ctx.fillStyle = '#451a03';
    ctx.fill();
    // Rings
    ctx.strokeStyle = '#b45309';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(15, -15, 26, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(15, -15, 14, 0, Math.PI * 2);
    ctx.stroke();
  } else if (dKey.includes('late-blight')) {
    // Rapid purplish water-soaked decay with white margins
    ctx.beginPath();
    ctx.ellipse(0, 0, w * 0.28, h * 0.36, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#15803d';
    ctx.fill();
    // Water-soaked purple decay
    ctx.beginPath();
    ctx.ellipse(10, 10, 48, 65, 0.3, 0, Math.PI * 2);
    ctx.fillStyle = '#3b0764';
    ctx.fill();
    // White downy mildew margin
    ctx.strokeStyle = '#f8fafc';
    ctx.lineWidth = 2.5;
    ctx.stroke();
  } else if (dKey.includes('bollworm')) {
    // Cotton boll with circular entry hole
    ctx.fillStyle = '#15803d';
    ctx.beginPath();
    ctx.ellipse(0, 15, w * 0.24, h * 0.32, 0, 0, Math.PI * 2);
    ctx.fill();
    // Entry borehole
    ctx.fillStyle = '#18181b';
    ctx.beginPath();
    ctx.arc(10, 0, 16, 0, Math.PI * 2);
    ctx.fill();
    // Frass granular debris
    ctx.fillStyle = '#92400e';
    for (let i = 0; i < 16; i++) {
      ctx.fillRect(10 + (Math.random() - 0.5) * 35, (Math.random() - 0.5) * 35, 3, 3);
    }
  } else if (dKey.includes('armyworm')) {
    // Maize leaf with ragged skeletonized chewing holes
    ctx.fillStyle = '#15803d';
    ctx.fillRect(-w * 0.16, -h * 0.45, w * 0.32, h * 0.9);
    // Chewed jagged holes
    ctx.fillStyle = '#06130b';
    ctx.beginPath();
    ctx.ellipse(-10, -30, 24, 38, 0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(15, 40, 20, 32, -0.2, 0, Math.PI * 2);
    ctx.fill();
    // Frass
    ctx.fillStyle = '#78350f';
    for (let i = 0; i < 20; i++) {
      ctx.fillRect((Math.random() - 0.5) * 60, (Math.random() - 0.5) * 120, 4, 4);
    }
  } else if (dKey.includes('white-rust')) {
    // Mustard leaf with porcelain-white blister pustules
    ctx.beginPath();
    ctx.ellipse(0, 0, w * 0.28, h * 0.38, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#15803d';
    ctx.fill();
    // White blisters
    ctx.fillStyle = '#f8fafc';
    for (let i = 0; i < 25; i++) {
      const rx = (Math.random() - 0.5) * 100;
      const ry = (Math.random() - 0.5) * 140;
      ctx.beginPath();
      ctx.arc(rx, ry, 5 + Math.random() * 4, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (dKey.includes('purple-blotch')) {
    // Onion tubular leaf with purple elliptical lesion
    ctx.fillStyle = '#15803d';
    ctx.fillRect(-25, -h * 0.45, 50, h * 0.9);
    // Purple sunken elliptical lesion
    ctx.fillStyle = '#581c87';
    ctx.beginPath();
    ctx.ellipse(0, -10, 20, 50, 0, 0, Math.PI * 2);
    ctx.fill();
    // Yellow halo
    ctx.strokeStyle = '#fde047';
    ctx.lineWidth = 3;
    ctx.stroke();
  } else if (dKey.includes('red-rot')) {
    // Sugarcane stalk lesion
    ctx.fillStyle = '#ca8a04';
    ctx.fillRect(-35, -h * 0.45, 70, h * 0.9);
    // Blood red internal pith lesion
    ctx.fillStyle = '#991b1b';
    ctx.fillRect(-22, -80, 44, 160);
    // White transverse patches
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(-15, -40, 30, 8);
    ctx.fillRect(-15, 20, 30, 8);
  } else {
    // General foliage with distinct localized necrotic spot
    ctx.beginPath();
    ctx.ellipse(0, 0, w * 0.28, h * 0.36, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#15803d';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(10, 0, 35, 0, Math.PI * 2);
    ctx.fillStyle = '#78350f';
    ctx.fill();
  }

  ctx.restore();

  const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
  analyzeCropPicture(dataUrl, cropKey, diseaseId);
};

// Backward-compatibility alias
window.testAiSample = function (cropKey) {
  window.testAiBenchmark(cropKey);
};

// Update Official Printable Field Sheet
function updatePrintSheet() {
  const pDate = document.getElementById('printDate');
  const pLoc = document.getElementById('printLocation');
  const pCrop = document.getElementById('printCrop');
  const pTemp = document.getElementById('printTemp');
  const pHum = document.getElementById('printHumidity');
  const pWind = document.getElementById('printWind');
  const pRain = document.getElementById('printRainProb');
  const pTable = document.getElementById('printSevenDayTable');
  const pRxCrop = document.getElementById('printRxCrop');
  const pRxDis = document.getElementById('printRxDisease');
  const pRxChem = document.getElementById('printRxChemical');

  if (pDate) pDate.textContent = new Date().toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' });
  if (pLoc) pLoc.textContent = state.locationName;
  const cropText = state.currentLang === 'hi' ? (CROP_NAMES_HI[state.selectedCropId] || state.selectedCropId) : state.selectedCropId.toUpperCase();
  const stageText = state.currentLang === 'hi' ? (STAGES_HI[state.selectedStage] || state.selectedStage) : state.selectedStage;
  if (pCrop) pCrop.textContent = `${cropText} (${stageText})`;

  if (state.weatherData) {
    if (pTemp) pTemp.textContent = `${state.weatherData.current.temp}°C`;
    if (pHum) pHum.textContent = `${state.weatherData.current.humidity}%`;
    if (pWind) pWind.textContent = `${state.weatherData.current.windSpeedKmh} km/h`;
    if (pRain) pRain.textContent = `${state.weatherData.current.rainProbability}%`;

    if (pTable && state.weatherData.daily) {
      const t = TRANSLATIONS[state.currentLang] || TRANSLATIONS['en'];
      pTable.innerHTML = state.weatherData.daily
        .map(
          (d) => {
            let dayName = d.day;
            const dl = (d.day || '').toLowerCase();
            if (dl.includes('sun')) dayName = t.sunday || d.day;
            else if (dl.includes('mon')) dayName = t.monday || d.day;
            else if (dl.includes('tue')) dayName = t.tuesday || d.day;
            else if (dl.includes('wed')) dayName = t.wednesday || d.day;
            else if (dl.includes('thu')) dayName = t.thursday || d.day;
            else if (dl.includes('fri')) dayName = t.friday || d.day;
            else if (dl.includes('sat')) dayName = t.saturday || d.day;

            const suitPct = d.harvestSuitabilityPercent !== undefined ? d.harvestSuitabilityPercent : 92;

            return `
        <tr>
          <td><b>${dayName}</b></td>
          <td>${d.date}</td>
          <td>${d.condition}</td>
          <td>${d.maxTemp}°C / ${d.minTemp}°C</td>
          <td>${d.rainMm} mm (${d.rainProbability}%)</td>
          <td><b>${suitPct}%</b></td>
        </tr>
      `;
          }
        )
        .join('');
    }
  }

  const cropRef = state.allCrops.find((c) => c.id === state.selectedCropId);
  if (cropRef && cropRef.commonDiseases[0]) {
    const dis = cropRef.commonDiseases[0];
    const disHi = (state.currentLang === 'hi' && DISEASES_HI[dis.id]) ? DISEASES_HI[dis.id] : null;
    if (pRxCrop) pRxCrop.textContent = state.currentLang === 'hi' ? (CROP_NAMES_HI[cropRef.id] || cropRef.name) : cropRef.name;
    if (pRxDis) pRxDis.textContent = disHi ? disHi.name : dis.name;
    if (pRxChem) pRxChem.textContent = disHi ? `${disHi.chemical} (${disHi.dosageAcre})` : `${dis.chemicalPesticide} @ ${dis.dosagePerAcre}`;
  }
}

// Camera Controls for Picture Search
async function startAiCamera() {
  const video = document.getElementById('aiCameraVideo');
  const canvas = document.getElementById('aiVisionCanvas');
  const btnTrigger = document.getElementById('btnAiCameraTrigger');

  if (!video || !canvas) return;

  if (state.isCameraActive) {
    // Snap photo
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    stopAiCamera();
    const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
    analyzeCropPicture(dataUrl, null, null);
    return;
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment', width: { ideal: 1280 } },
      audio: false,
    });
    state.aiCameraStream = stream;
    video.srcObject = stream;
    video.style.display = 'block';
    state.isCameraActive = true;
    if (btnTrigger) btnTrigger.textContent = '📸 Click to Snap Photo';
    showToast('Camera feed live - focus on leaf or crop');
  } catch (err) {
    console.error('Camera error:', err);
    showToast('Camera error: ' + err.message);
  }
}

function stopAiCamera() {
  if (state.aiCameraStream) {
    state.aiCameraStream.getTracks().forEach((track) => track.stop());
    state.aiCameraStream = null;
  }
  const video = document.getElementById('aiCameraVideo');
  const btnTrigger = document.getElementById('btnAiCameraTrigger');
  if (video) video.style.display = 'none';
  state.isCameraActive = false;
  if (btnTrigger) btnTrigger.textContent = 'Capture Camera Photo';
}

// ========================================================
// 30-DAY CROP RESULTS & HISTORY MODULE
// ========================================================

// Load 30-day Agrometeorological Data for Active Crop
async function loadCropHistory(rangeDays = state.historyRangeDays || 30) {
  state.historyRangeDays = rangeDays;
  const cropId = state.selectedCropId || 'wheat';
  try {
    const res = await fetch(`/api/crop-history?cropId=${encodeURIComponent(cropId)}&days=30`);
    if (!res.ok) throw new Error('Failed to fetch crop history');
    const data = await res.json();
    state.cropHistoryData = data;
    renderCropHistory(data, rangeDays);
  } catch (err) {
    console.error('Error loading crop history:', err);
    showToast('Failed to load crop history');
  }
}

// Render 30-day Agrometeorological KPIs, Trend Bars, and Log Table
function renderCropHistory(data, rangeDays = 30) {
  const historyList = data?.historyLogs || data?.history;
  if (!data || !historyList) return;

  // Normalize crop object
  const cropObj = data.crop || {
    id: data.cropId || state.selectedCropId || 'wheat',
    name: data.cropName || 'Wheat',
    emoji: data.icon || '🌾',
  };

  // Update crop badge in header
  const badgeEl = document.getElementById('histCropBadge');
  if (badgeEl) {
    const cropName = state.currentLang === 'hi' ? (CROP_NAMES_HI[cropObj.id] || cropObj.name) : `${cropObj.emoji} ${cropObj.name}`;
    badgeEl.textContent = cropName;
  }

  // Filter items by selected range
  const items = historyList.slice(-rangeDays);

  // Compute 4 KPI values across the active period
  const totalRain = items.reduce((sum, d) => sum + (d.rainMm !== undefined ? d.rainMm : (d.precipMm || 0)), 0);
  const avgSuitability = Math.round(items.reduce((sum, d) => sum + (d.suitabilityScore || 0), 0) / items.length);
  const favorableDays = items.filter((d) => d.suitabilityScore >= 75).length;
  const stressDays = items.filter((d) => {
    const note = d.conditionNote || d.stressFlag || '';
    return note && !note.includes('Favorable') && note !== 'Normal' && note !== 'None';
  }).length;

  // 1. KPI: Average Suitability
  const avgSuitEl = document.getElementById('histAvgSuitability');
  const avgSuitStatus = document.getElementById('histAvgSuitabilityStatus');
  const avgSuitBar = document.getElementById('histAvgSuitabilityBar');
  if (avgSuitEl) avgSuitEl.textContent = `${avgSuitability}%`;
  if (avgSuitStatus) {
    if (avgSuitability >= 80) {
      avgSuitStatus.textContent = 'Highly Favorable';
      avgSuitStatus.style.color = '#15803d';
    } else if (avgSuitability >= 60) {
      avgSuitStatus.textContent = 'Moderate';
      avgSuitStatus.style.color = '#d97706';
    } else {
      avgSuitStatus.textContent = 'Stress / Risky';
      avgSuitStatus.style.color = '#dc2626';
    }
  }
  if (avgSuitBar) {
    avgSuitBar.style.width = `${avgSuitability}%`;
    avgSuitBar.style.background = avgSuitability >= 75 ? '#16a34a' : avgSuitability >= 55 ? '#f59e0b' : '#ef4444';
  }

  // 2. KPI: Total Rain
  const totalRainEl = document.getElementById('histTotalRain');
  if (totalRainEl) totalRainEl.textContent = totalRain.toFixed(1);

  // 3. KPI: Favorable Days
  const favorableDaysEl = document.getElementById('histFavorableDays');
  if (favorableDaysEl) favorableDaysEl.textContent = `${favorableDays}`;

  // 4. KPI: Stress Days
  const stressDaysEl = document.getElementById('histStressDays');
  if (stressDaysEl) stressDaysEl.textContent = `${stressDays}`;

  // Render Bar Visualizer
  const trendBarsEl = document.getElementById('historyTrendBars');
  if (trendBarsEl) {
    trendBarsEl.innerHTML = items
      .map((d) => {
        let barColor = '#16a34a';
        if (d.suitabilityScore < 50) barColor = '#ef4444';
        else if (d.suitabilityScore < 75) barColor = '#f59e0b';

        const heightPct = Math.max(14, d.suitabilityScore);
        const dayLabel = d.date.split(' ').slice(0, 2).join(' ');
        const rMm = d.rainMm !== undefined ? d.rainMm : (d.precipMm || 0);
        const impactNote = d.conditionNote || d.stressFlag || 'Normal';

        return `
        <div class="hist-bar-col">
          <div class="hist-bar-tooltip">
            <b>${d.date} (${d.day})</b><br/>
            Suitability: <b>${d.suitabilityScore}%</b><br/>
            Temp: ${d.maxTemp}°C / ${d.minTemp}°C<br/>
            Rain: ${rMm} mm<br/>
            Impact: ${impactNote}
          </div>
          <div class="hist-bar-inner" style="height: ${heightPct}%; background: ${barColor};"></div>
          <div class="hist-bar-date">${dayLabel}</div>
        </div>
      `;
      })
      .join('');
  }

  // Render Agrometeorological Data Table
  const tableBody = document.getElementById('historyTableBody');
  if (tableBody) {
    tableBody.innerHTML = items
      .slice()
      .reverse()
      .map((d) => {
        let suitColor = '#15803d';
        let suitBg = '#dcfce7';
        if (d.suitabilityScore < 50) {
          suitColor = '#991b1b';
          suitBg = '#fee2e2';
        } else if (d.suitabilityScore < 75) {
          suitColor = '#92400e';
          suitBg = '#fef3c7';
        }

        const rMm = d.rainMm !== undefined ? d.rainMm : (d.precipMm || 0);
        const sM = d.soilMoisturePercent !== undefined ? d.soilMoisturePercent : (d.soilMoisturePct || 40);
        const impactNote = d.conditionNote || d.stressFlag || 'Normal';

        let stressBadge = `<span style="display: inline-block; padding: 0.15rem 0.5rem; border-radius: 999px; font-size: 0.75rem; font-weight: 600; background: #f0fdf4; color: #166534;">✔ Normal</span>`;
        if (impactNote.includes('Rain') || rMm > 15) {
          stressBadge = `<span style="display: inline-block; padding: 0.15rem 0.5rem; border-radius: 999px; font-size: 0.75rem; font-weight: 700; background: #eff6ff; color: #1d4ed8;">💧 ${impactNote}</span>`;
        } else if (impactNote.includes('Heat') || impactNote.includes('Thermal')) {
          stressBadge = `<span style="display: inline-block; padding: 0.15rem 0.5rem; border-radius: 999px; font-size: 0.75rem; font-weight: 700; background: #fff7ed; color: #c2410c;">🔥 ${impactNote}</span>`;
        } else if (impactNote.includes('Wind') || impactNote.includes('Lodging')) {
          stressBadge = `<span style="display: inline-block; padding: 0.15rem 0.5rem; border-radius: 999px; font-size: 0.75rem; font-weight: 700; background: #fef2f2; color: #b91c1c;">💨 ${impactNote}</span>`;
        }

        return `
        <tr>
          <td>
            <div style="font-weight: 700; color: #0f172a;">${d.date}</div>
            <div style="font-size: 0.75rem; color: #64748b;">${d.day}</div>
          </td>
          <td>
            <span style="font-weight: 700; color: #0f172a;">${d.maxTemp}°C</span>
            <span style="font-size: 0.75rem; color: #64748b;"> / ${d.minTemp}°C</span>
          </td>
          <td>
            <span style="font-weight: 700; color: ${rMm > 0 ? '#0284c7' : '#64748b'};">${rMm} mm</span>
          </td>
          <td>
            <span style="color: #475569;">${d.windSpeedKmh} km/h</span>
          </td>
          <td>
            <span style="color: #166534; font-weight: 600;">${sM}%</span>
          </td>
          <td>
            <span style="background: ${suitBg}; color: ${suitColor}; font-weight: 800; padding: 0.2rem 0.55rem; border-radius: 6px; font-family: var(--font-mono);">
              ${d.suitabilityScore}%
            </span>
          </td>
          <td>
            ${stressBadge}
          </td>
        </tr>
      `;
      })
      .join('');
  }
}

// Export 30-Day Agrometeorological Results to CSV
function exportCropHistoryCsv() {
  const historyList = state.cropHistoryData?.historyLogs || state.cropHistoryData?.history;
  if (!state.cropHistoryData || !historyList) {
    showToast('No history data available to export');
    return;
  }
  const cropName = state.cropHistoryData.cropName || state.cropHistoryData.crop?.name || state.selectedCropId;
  const cropId = state.cropHistoryData.cropId || state.cropHistoryData.crop?.id || state.selectedCropId;

  let csv = 'Date,Day,MaxTemp_C,MinTemp_C,Precipitation_mm,WindSpeed_kmh,SoilMoisture_pct,SuitabilityScore_pct,StressEvent\n';
  historyList.forEach((d) => {
    const rMm = d.rainMm !== undefined ? d.rainMm : (d.precipMm || 0);
    const sM = d.soilMoisturePercent !== undefined ? d.soilMoisturePercent : (d.soilMoisturePct || 40);
    const impactNote = d.conditionNote || d.stressFlag || 'Normal';
    csv += `"${d.date}","${d.day}",${d.maxTemp},${d.minTemp},${rMm},${d.windSpeedKmh},${sM},${d.suitabilityScore},"${impactNote}"\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `AgroCast_${cropId}_30Day_History.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast(`Exported 30-day records for ${cropName} to CSV`);
}

// Initialize Application DOM Events
function initApp() {
  // Navigation Tabs (6 Distinct Pages)
  document.querySelectorAll('#mainNavTabs .tab-btn').forEach((btn) => {
    btn.addEventListener('click', () => switchPage(btn.dataset.page));
  });

  // History Range Filter Buttons
  const filterGroup = document.getElementById('historyFilterGroup');
  if (filterGroup) {
    filterGroup.querySelectorAll('.filter-pill-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        filterGroup.querySelectorAll('.filter-pill-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const range = parseInt(btn.dataset.range, 10) || 30;
        if (state.cropHistoryData) {
          renderCropHistory(state.cropHistoryData, range);
        } else {
          loadCropHistory(range);
        }
      });
    });
  }

  // Seasonal Crop Recommendations Filter Group
  const recFilterGroup = document.getElementById('recFilterGroup');
  if (recFilterGroup) {
    recFilterGroup.querySelectorAll('.filter-pill-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        recFilterGroup.querySelectorAll('.filter-pill-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        state.recommendationsFilter = btn.dataset.recfilter || 'ALL';
        renderCropRecommendations(state.cropRecommendations, state.currentSeason);
      });
    });
  }

  // Export CSV Button
  const btnExportCsv = document.getElementById('btnExportHistoryCsv');
  if (btnExportCsv) {
    btnExportCsv.addEventListener('click', exportCropHistoryCsv);
  }

  // Language Selector
  const langSelect = document.getElementById('languageSelector');
  if (langSelect) {
    langSelect.value = state.currentLang;
    langSelect.addEventListener('change', (e) => setLanguage(e.target.value));
  }

  // Auto-Detect Location GPS
  const btnAutoLoc = document.getElementById('btnAutoLocation');
  if (btnAutoLoc) btnAutoLoc.addEventListener('click', handleAutoLocation);

  // Manual PIN Code Input & Default UP Handler
  const pinInput = document.getElementById('pincodeInput');
  const btnApplyPin = document.getElementById('btnApplyPincode');
  const btnDefaultUp = document.getElementById('btnDefaultUP');

  if (pinInput) {
    pinInput.value = state.pincode || DEFAULT_UP_LOCATION.pincode;
    pinInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        applyPincode(pinInput.value);
      }
    });
  }

  if (btnApplyPin) {
    btnApplyPin.addEventListener('click', () => {
      applyPincode(pinInput ? pinInput.value : '');
    });
  }

  if (btnDefaultUp) {
    btnDefaultUp.addEventListener('click', resetToDefaultUP);
  }

  // Crop Selector & Category Filter
  const categoryFilter = document.getElementById('cropCategoryFilter');
  if (categoryFilter) {
    categoryFilter.addEventListener('change', () => {
      populateCropDropdowns();
      updateCropAdvisory();
    });
  }

  const cropSelect = document.getElementById('cropSelector');
  if (cropSelect) {
    cropSelect.addEventListener('change', (e) => {
      state.selectedCropId = e.target.value;
      const currentCrop = state.allCrops.find((c) => c.id === state.selectedCropId);
      const stageSelect = document.getElementById('stageSelector');
      if (currentCrop && stageSelect) {
        stageSelect.innerHTML = currentCrop.stages
          .map((s, idx) => {
            const sName = state.currentLang === 'hi' ? (STAGES_HI[s] || s) : s;
            return `<option value="${s}" ${idx === currentCrop.stages.length - 2 ? 'selected' : ''}>${sName}</option>`;
          })
          .join('');
        state.selectedStage = stageSelect.value;
      }
      updateCropAdvisory();
      loadWeatherData(state.lat, state.lon, state.locationName, state.selectedCropId, state.selectedStage);
      if (state.currentPage === 'history') {
        loadCropHistory(state.historyRangeDays);
      }
    });
  }

  const stageSelect = document.getElementById('stageSelector');
  if (stageSelect) {
    stageSelect.addEventListener('change', (e) => {
      state.selectedStage = e.target.value;
      updateCropAdvisory();
    });
  }

  const btnRecalc = document.getElementById('btnRecalculateAdvisory');
  if (btnRecalc) btnRecalc.addEventListener('click', updateCropAdvisory);

  // File Upload Dropzone
  const fileInput = document.getElementById('aiFileInput');
  const dropzone = document.getElementById('aiDropzone');
  const btnUpload = document.getElementById('btnTriggerUpload');

  if (dropzone && fileInput) {
    dropzone.addEventListener('click', () => fileInput.click());
    if (btnUpload) btnUpload.addEventListener('click', () => fileInput.click());

    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.style.borderColor = 'var(--emerald-400)';
    });

    dropzone.addEventListener('dragleave', () => {
      dropzone.style.borderColor = 'rgba(52, 211, 153, 0.35)';
    });

    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.style.borderColor = 'rgba(52, 211, 153, 0.35)';
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        processUploadedFile(e.dataTransfer.files[0]);
      }
    });

    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        processUploadedFile(e.target.files[0]);
      }
    });
  }

  function processUploadedFile(file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.getElementById('aiVisionCanvas');
        if (canvas) {
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          analyzeCropPicture(event.target.result, null, null);
        }
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }

  // Camera Trigger
  const btnCamera = document.getElementById('btnAiCameraTrigger');
  if (btnCamera) {
    btnCamera.addEventListener('click', () => {
      if (state.isCameraActive) {
        startAiCamera(); // Snaps photo
      } else {
        startAiCamera(); // Starts stream
      }
    });
  }

  // Pesticide Guide Search Input
  const searchInput = document.getElementById('guideSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      renderPesticideGuide(e.target.value);
    });
  }

  // Execute Print Button
  const btnPrint = document.getElementById('btnExecutePrint');
  if (btnPrint) {
    btnPrint.addEventListener('click', () => {
      updatePrintSheet();
      window.print();
    });
  }

  // Initial Data Bootstrap
  loadCrops();
  loadWeatherData(state.lat, state.lon, state.locationName);
  setLanguage(state.currentLang);
}

// Kickstart when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
