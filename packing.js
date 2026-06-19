// Packing list for a ~9-day August trip to Switzerland / France
// Designed for a female traveler; mixes city + mountain weather (Mont Blanc / Jungfrau can be cold even in August)
// Each item: { id: unique, name: { zh, en }, note?: { zh, en } }

const PACKING_CATEGORIES = [
  {
    id: "docs",
    title: { zh: "📄 重要文件", en: "📄 Documents" },
    items: [
      { id: "passport", name: { zh: "護照（效期 6 個月以上）", en: "Passport (valid 6+ months)" } },
      { id: "passport-copy", name: { zh: "護照影本 2-3 份（分開放在不同行李）", en: "Passport copies x2-3 (kept in separate bags)" } },
      { id: "insurance", name: { zh: "海外旅遊保險證明（確定有保就好）", en: "Travel insurance proof (just confirm you've bought it)" } },
      { id: "emergency", name: { zh: "緊急聯絡人 + 振華電話（+33 0674938931）", en: "Emergency contacts + Chen-Hua's number (+33 0674938931)" } }
    ]
  },
  {
    id: "money",
    title: { zh: "💳 錢與卡", en: "💳 Money & Cards" },
    items: [
      { id: "visa-card", name: { zh: "信用卡（已開通海外）", en: "Credit card (international enabled)" } },
      { id: "wallet", name: { zh: "小錢包（每天用，貼身放）", en: "Small wallet (daily use, on body)" } }
    ]
  },
  {
    id: "electronics",
    title: { zh: "📱 電子產品", en: "📱 Electronics" },
    items: [
      { id: "phone", name: { zh: "手機", en: "Phone" } },
      { id: "phone-cable", name: { zh: "手機充電線", en: "Phone charging cable" } },
      { id: "power-bank", name: { zh: "行動電源（記得航空法規容量上限）", en: "Power bank (mind airline limits)" } },
      { id: "adapter-universal", name: { zh: "萬用轉接頭（可切換瑞士 Type J / 法國 Type E）", en: "Universal travel adapter (covers Swiss Type J & French Type E)" } },
      { id: "camera", name: { zh: "相機 + 充電器 + 記憶卡（若帶）", en: "Camera + charger + memory card (if bringing)" } },
      { id: "earphones", name: { zh: "耳機", en: "Earphones" } },
      { id: "esim", name: { zh: "歐洲 eSIM（Holafly / Airalo，行前開通）", en: "Europe eSIM (Holafly / Airalo, activate before departure)" } }
    ]
  },
  {
    id: "clothing",
    title: { zh: "👗 衣物（8 月夏天，但高山會涼）", en: "👗 Clothing (Aug summer + cold mountain trips)" },
    items: [
      { id: "tops-short", name: { zh: "短袖上衣", en: "Short-sleeve tops" } },
      { id: "tops-long", name: { zh: "薄長袖上衣（高山降溫用）", en: "Light long-sleeve tops (for cool mountains)" } },
      { id: "pants", name: { zh: "長褲", en: "Long pants" } },
      { id: "shorts", name: { zh: "短褲 / 短裙", en: "Shorts / skirts" } },
      { id: "dress", name: { zh: "好看衣服（若有需要）", en: "A nicer outfit (if needed)" } },
      { id: "underwear", name: { zh: "內衣褲", en: "Underwear" } },
      { id: "socks", name: { zh: "襪子", en: "Socks" } },
      { id: "pajamas", name: { zh: "睡衣", en: "Pajamas" } },
      { id: "jacket-rain", name: { zh: "防風防水外套（薄款，Gore-Tex 尤佳）", en: "Light windproof / waterproof shell (Gore-Tex ideal)" } },
      { id: "sweater", name: { zh: "薄毛衣 / 連帽外套（少女峰 / Chamonix 高山保暖）", en: "Light sweater / hoodie (warmth at Jungfrau / Chamonix)" } },
      { id: "indoor-slippers", name: { zh: "室內拖鞋", en: "Indoor slippers" } },
      { id: "sandals", name: { zh: "涼鞋 / 拖鞋", en: "Sandals / flip-flops" } },
      { id: "scarf", name: { zh: "圍巾或披肩（進教堂遮肩 + 加減保暖）", en: "Scarf / shawl (for churches + warmth)" } },
      { id: "hat", name: { zh: "太陽帽（高山紫外線強）", en: "Sun hat (strong UV at altitude)" } },
      { id: "sunglasses", name: { zh: "太陽眼鏡", en: "Sunglasses" } },
      { id: "umbrella", name: { zh: "折疊雨傘（小，隨身）", en: "Folding umbrella" } },
      { id: "swimsuit", name: { zh: "泳衣（湖區可能下水 / Spa）", en: "Swimsuit (lake swimming / spa)" } }
    ]
  },
  {
    id: "personal",
    title: { zh: "💄 個人保養 / 化妝", en: "💄 Personal Care / Makeup" },
    items: [
      { id: "makeup", name: { zh: "慣用化妝品（依個人）", en: "Daily makeup (personal selection)" } },
      { id: "makeup-remover",
        name: { zh: "卸妝產品", en: "Makeup remover" },
        note: { zh: "我這裡有", en: "I have this here" } },
      { id: "moisturizer",
        name: { zh: "保濕乳液 / 面霜", en: "Moisturizer / face cream" },
        note: { zh: "我這裡有，怕你不習慣可以自己帶", en: "I have this here — bring your own if you prefer" } },
      { id: "facewash",
        name: { zh: "洗面乳", en: "Facial cleanser" },
        note: { zh: "我這裡有，怕你不習慣可以自己帶", en: "I have this here — bring your own if you prefer" } },
      { id: "sunscreen", name: { zh: "防曬乳 SPF 30+（高山必備）", en: "Sunscreen SPF 30+ (essential in mountains)" } },
      { id: "lip-balm", name: { zh: "護唇膏（飛機 + 高山很乾）", en: "Lip balm (dry on planes & at altitude)" } },
      { id: "toothbrush", name: { zh: "牙刷", en: "Toothbrush" } },
      { id: "shampoo",
        name: { zh: "洗髮乳 / 沐浴乳", en: "Shampoo / body wash" },
        note: { zh: "我這裡有，怕你不習慣可以自己帶（旅行裝）", en: "I have this here — bring your own travel size if you prefer" } },
      { id: "conditioner", name: { zh: "護髮素 / 髮油", en: "Conditioner / hair oil" } },
      { id: "hairpins", name: { zh: "髮圈 / 髮夾", en: "Hair ties / clips" } },
      { id: "cotton-pads", name: { zh: "化妝棉", en: "Cotton pads" } },
      { id: "nail-clipper", name: { zh: "指甲剪（托運！）", en: "Nail clippers (CHECKED LUGGAGE!)" } },
      { id: "contacts", name: { zh: "隱形眼鏡（含備用 + 藥水）", en: "Contact lenses (extras + solution)" } }
    ]
  },
  {
    id: "feminine",
    title: { zh: "🌸 生理 / 私密用品", en: "🌸 Feminine Care" },
    items: [
      { id: "pads", name: { zh: "衛生棉（依個人習慣量 + 多帶幾天）", en: "Sanitary pads (extras just in case)" } },
      { id: "period-meds", name: { zh: "經痛藥（如有需要）", en: "Period pain meds (if needed)" } }
    ]
  },
  {
    id: "medicine",
    title: { zh: "💊 藥品", en: "💊 Medicine" },
    note: { zh: "以下這些除了暈船藥以外我這裡都有，不一定要帶",
            en: "I already have all of these except motion-sickness pills — bring only what you really want" },
    items: [
      { id: "personal-meds", name: { zh: "個人慣用藥（充足量，原包裝）", en: "Personal prescriptions (enough supply, original packaging)" } },
      { id: "painkillers", name: { zh: "普拿疼 / 止痛藥", en: "Painkillers (Tylenol / Panadol)" } },
      { id: "tummy", name: { zh: "腸胃藥（換水土很常見）", en: "Stomach meds (water/food adjustment is common)" } },
      { id: "cold", name: { zh: "綜合感冒藥", en: "Cold medicine" } },
      { id: "allergy", name: { zh: "過敏藥", en: "Allergy meds" } },
      { id: "motion", name: { zh: "暈車 / 暈船藥（湖區搭船會用）", en: "Motion sickness pills (helpful for lake boats)" } },
      { id: "bandaid", name: { zh: "OK 繃 + 水泡貼（走多會磨腳）", en: "Bandaids + blister patches (long walking days)" } },
      { id: "ointment", name: { zh: "外傷藥膏（曼秀雷敦 / Bepanthen）", en: "Antiseptic ointment" } }
    ]
  },
  {
    id: "daypack",
    title: { zh: "🎒 日常隨身包（每天出門帶）", en: "🎒 Daily Daypack" },
    items: [
      { id: "small-bag", name: { zh: "輕便小後背包 / 斜背包", en: "Light daypack / crossbody" } },
      { id: "water-bottle", name: { zh: "環保水瓶（瑞士自來水可直飲）", en: "Reusable water bottle (Swiss tap water is drinkable)" } },
      { id: "small-umbrella", name: { zh: "折疊小傘", en: "Folding umbrella" } },
      { id: "tissues",
        name: { zh: "面紙 / 濕紙巾", en: "Tissues / wet wipes" },
        note: { zh: "我這裡也有，帶飛機上夠用就好", en: "I have this here — just bring enough for the flight" } },
      { id: "anti-theft", name: { zh: "貼身防盜包（人多時用）", en: "Anti-theft pouch (for crowded places)" } }
    ]
  },
  {
    id: "carryon",
    title: { zh: "✈️ 機上隨身包", en: "✈️ Carry-on Essentials" },
    note: { zh: "要搭很久飛機的話可以考慮準備", en: "Worth packing only if your flight is long-haul" },
    items: [
      { id: "co-docs", name: { zh: "護照 + 重要文件（不要托運！）", en: "Passport + important docs (NEVER check in!)" } },
      { id: "co-clothes", name: { zh: "換洗衣物一套（萬一行李延遲）", en: "One outfit change (in case of delayed luggage)" } },
      { id: "co-toothbrush", name: { zh: "輕便牙刷", en: "Travel toothbrush" } },
      { id: "co-moisturizer", name: { zh: "保濕品（機艙乾）", en: "Moisturizer (planes are dry)" } },
      { id: "co-lipbalm", name: { zh: "護唇膏", en: "Lip balm" } },
      { id: "co-eyemask", name: { zh: "眼罩 + 耳塞（長途助眠）", en: "Eye mask + earplugs" } },
      { id: "co-feminine", name: { zh: "1-2 份衛生用品（以防經期提早）", en: "1-2 feminine products (in case period starts early)" } },
      { id: "co-charger", name: { zh: "充電線 + 萬用轉接頭（轉機備用）", en: "Charging cable + universal adapter (for layover)" } }
    ]
  }
];
