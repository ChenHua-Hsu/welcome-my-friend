// All spots data. Edit here to add/remove.
// Each text field has { zh, en } pair.
// travelMin = approximate door-to-door minutes from Saint-Genis Champ Fusy, departing ~8:00 AM
// score = 0–10 (placeholder values for now; will be edited manually)

const UI = {
  title:      { zh: "感謝你來瑞士找我玩 💖", en: "Thanks for coming to visit me in Switzerland 💖" },
  subtitle:   { zh: "挑幾個你想去的地方，我來安排", en: "Pick the places you want — I'll plan the rest" },
  tabDay:     { zh: "🌅 當天來回", en: "🌅 Day trips" },
  tabOvernight:{zh: "🌙 過夜行程", en: "🌙 Overnight trips" },
  tabPicks:   { zh: "💌 我的清單", en: "💌 My picks" },
  picksTitle: { zh: "你選的地方", en: "Your picks" },
  picksEmpty: { zh: "還沒選任何地方，去逛逛吧～", en: "No picks yet — go browse!" },
  footer:     { zh: "用愛 + GitHub Pages 製作 ♡", en: "Made with love + GitHub Pages ♡" },
  select:     { zh: "加入清單", en: "Add to list" },
  selected:   { zh: "已加入 ✓", en: "Added ✓" },
  travel:     { zh: "交通", en: "Travel" },
  highlight:  { zh: "亮點", en: "Highlight" },
  tip:        { zh: "提醒", en: "Tip" },
  cost:       { zh: "費用", en: "Cost" },
  stay:       { zh: "建議住", en: "Suggested stay" },
  hotels:     { zh: "住宿參考（2人/晚）", en: "Stays (for 2 / night)" },
  sendTitle:  { zh: "把選擇送給我", en: "Send your picks to me" },
  sendHint:   { zh: "選好後挑一個方式傳給我，振華將為您安排行程 ✨", en: "Pick a way to send me your list — Chen-Hua will plan the trip ✨" },
  btnCopy:    { zh: "📋 複製文字", en: "📋 Copy text" },
  btnLink:    { zh: "🔗 複製分享連結", en: "🔗 Copy share link" },
  btnEmail:   { zh: "✉️ 用 Email 寄", en: "✉️ Send by Email" },
  btnWa:      { zh: "💬 用 WhatsApp 傳", en: "💬 Send via WhatsApp" },
  copied:     { zh: "已複製！", en: "Copied!" },
  emailSubject:{zh: "我的 Saint-Genis 願望清單", en: "My Saint-Genis wishlist" },
  fromFriendBanner:{zh: "✨ 你的朋友選了這些 ✨", en: "✨ Your friend picked these ✨" },
  sortBy:     { zh: "排序", en: "Sort" },
  sortScore:  { zh: "分數 高→低", en: "Score (high → low)" },
  sortTime:   { zh: "交通時間 短→長", en: "Travel time (short → long)" },
  tabMap:     { zh: "🗺 地圖", en: "🗺 Map" },
  mapHome:    { zh: "家", en: "Home" },
  mapDay:     { zh: "當天來回", en: "Day trip" },
  mapOver:    { zh: "過夜", en: "Overnight" },
  staysHead:  { zh: "住宿 · 8/10–8/11 · 2 人 · ⭐≥8 · ≤NT$8000/晚",
                en: "Stays · Aug 10–11 · 2 ppl · ⭐≥8 · ≤NT$8000/night" },
  toMain:     { zh: "🚶 到主要景點", en: "🚶 To main spot" },
  staysBk:    { zh: "🔗 Booking", en: "🔗 Booking" },
  staysAg:    { zh: "🔗 Agoda", en: "🔗 Agoda" },
  staysSugg:  { zh: "幾個人氣選擇（在連結裡搜尋名字看價）",
                en: "Popular picks (search by name in the link)" }
};

const DAY_SPOTS = [
  {
    id: "cern",
    wiki: "The Globe of Science and Innovation",
    score: 9.3,
    personalNote: { zh: "我工作的地方，你敢不選就死定了 😤（不過他很近啦，找半天悠閒一點的時候去就好）",
                    en: "Where I work — don't you dare skip this 😤 (it's close though, save it for a chill half-day)" },
    travelMin: 15,
    name: { zh: "CERN Science Gateway", en: "CERN Science Gateway" },
    duration: { zh: "約 15 分鐘（步行或電車 18 一站）", en: "~15 min (walk or one tram-18 stop)" },
    transit: { zh: "電車 18 號直達（CERN 站）", en: "Tram 18 direct (CERN stop)" },
    desc: {
      zh: "免費的粒子物理科學中心，有互動展、迷你加速器模型。",
      en: "Free particle physics centre with interactive exhibits and a mini accelerator model."
    },
    tip: { zh: "最精彩的現場導覽要當天到櫃台排，名額少要趁早。週一休館。",
           en: "Best live guided tours are same-day sign-up at the desk — limited slots, go early. Closed Mondays." },
    cost: { zh: "免費", en: "Free" }
  },
  {
    id: "monts-jura",
    wiki: "Col de la Faucille",
    score: 6.0,
    travelMin: 90,
    name: { zh: "Monts Jura（La Faucille 隘口）", en: "Monts Jura (Col de la Faucille)" },
    duration: { zh: "約 1 小時 30 分（公車轉乘，班次少）", en: "~1h 30 (multiple bus changes, sparse schedule)" },
    transit: { zh: "公車 T81 / 814（Gex → La Faucille），班次少，需查時刻表",
               en: "Bus T81 / 814 (Gex → La Faucille); limited service, check timetable" },
    desc: {
      zh: "侏羅山隘口。冬天是家庭式滑雪場，其他季節上去就為了那個能看到整片阿爾卑斯山與白朗峰的全景觀景台。",
      en: "Mountain pass in the Jura range. Family ski area in winter; in other seasons people go for the panoramic terrace over the entire Alps and Mont Blanc."
    },
    tip: { zh: "沒車的話建議夏天上去散步、看景；冬天滑雪比較依賴自駕。",
           en: "Without a car, summer is easier (walk + view). Winter skiing usually needs driving." },
    cost: { zh: "免費（觀景台）", en: "Free (viewpoint)" }
  },
  {
    id: "lac-divonne",
    wiki: "Divonne-les-Bains",
    score: 6.0,
    travelMin: 50,
    name: { zh: "Lac de Divonne", en: "Lac de Divonne" },
    duration: { zh: "約 50 分鐘（單一公車）", en: "~50 min (single bus)" },
    transit: { zh: "公車 814（Saint-Genis ↔ Divonne-les-Bains）",
               en: "Bus 814 (Saint-Genis ↔ Divonne-les-Bains)" },
    desc: {
      zh: "悠閒小鎮，可繞湖散步或騎車，還有賭場和溫泉 spa，適合放鬆半天。",
      en: "Relaxed lakeside town: walk or bike around the lake, plus a casino and thermal spa. Half-day chill."
    },
    cost: { zh: "湖邊免費；spa 約 30 €+", en: "Lake free; spa ~30 €+" }
  },
  {
    id: "fort-lecluse",
    wiki: "Fort l'Écluse",
    score: 6.0,
    travelMin: 90,
    name: { zh: "Fort l'Écluse", en: "Fort l'Écluse" },
    duration: { zh: "約 1 小時 30 分（公車 + 計程車）", en: "~1h 30 (bus + taxi)" },
    transit: { zh: "公車不便，較推薦坐火車到 Bellegarde + 計程車，或揪人共乘",
               en: "Tricky by transit — train to Bellegarde + taxi works, or rideshare" },
    desc: {
      zh: "嵌進隆河峽谷岩壁的古堡要塞，下堡到上堡有一千多階的隧道樓梯，夏天有音樂與文化活動。",
      en: "Fortress carved into the Rhône gorge cliff. 1000+ tunnel stairs from lower to upper fort; summer music & culture events."
    },
    tip: { zh: "只有週末開放", en: "Open weekends only" }
  },
  {
    id: "geneva-un",
    wiki: "Palace of Nations",
    score: 8.0,
    travelMin: 50,
    hideInCard: true,
    name: { zh: "聯合國歐洲總部（Palais des Nations）", en: "Palais des Nations (UN)" },
    duration: { zh: "約 50 分鐘", en: "~50 min" },
    transit: { zh: "公車 Y/F 到 Cornavin + 電車 15 到 Nations",
               en: "Bus Y/F to Cornavin + tram 15 to Nations" },
    desc: {
      zh: "聯合國歐洲總部，需參加導覽（成人 25 CHF）。要帶護照預約。",
      en: "UN Europe HQ. Guided tours only (adults 25 CHF). Bring passport, pre-book."
    },
    cost: { zh: "25 CHF", en: "25 CHF" }
  },
  {
    id: "redcross",
    wiki: "International Red Cross and Red Crescent Museum",
    score: 9.0,
    travelMin: 50,
    hideInCard: true,
    name: { zh: "國際紅十字博物館", en: "Intl Red Cross & Red Crescent Museum" },
    duration: { zh: "約 50 分鐘", en: "~50 min" },
    transit: { zh: "公車 Y/F → Cornavin + 電車 15 → Appia 站（UN 隔壁）",
               en: "Bus Y/F → Cornavin + tram 15 → Appia (next to UN)" },
    desc: {
      zh: "非常震撼、互動性強的人道主義主題館，內容沉重但評價很高。",
      en: "Powerful, interactive humanitarian museum. Heavy themes, extremely well reviewed."
    },
    tip: { zh: "週一休", en: "Closed Mondays" },
    cost: { zh: "15 CHF", en: "15 CHF" }
  },
  {
    id: "jet-deau",
    wiki: "Jet d'Eau",
    score: 6.8,
    travelMin: 55,
    hideInCard: true,
    name: { zh: "Jet d'Eau 大噴泉", en: "Jet d'Eau" },
    duration: { zh: "約 55 分鐘", en: "~55 min" },
    transit: { zh: "公車 Y → Cornavin + 電車到 Quai Gustave-Ador",
               en: "Bus Y → Cornavin + tram to Quai Gustave-Ador" },
    desc: {
      zh: "日內瓦地標，140 公尺高的水柱。湖邊散步順便看。",
      en: "Geneva's icon — a 140 m water jet. Stroll along the lake."
    },
    cost: { zh: "免費", en: "Free" }
  },
  {
    id: "stpierre",
    wiki: "Geneva Cathedral",
    score: 8.9,
    hideInCard: true,
    travelMin: 55,
    name: { zh: "聖彼得大教堂 + 舊城", en: "St. Pierre Cathedral & Old Town" },
    duration: { zh: "約 55 分鐘", en: "~55 min" },
    transit: { zh: "公車 Y → Cornavin + 電車 18 → Bel-Air，步行上山",
               en: "Bus Y → Cornavin + tram 18 → Bel-Air, walk uphill" },
    desc: {
      zh: "登塔 157 階俯瞰全城、地下考古遺址；周邊石板巷與 Bourg-de-Four 廣場很好逛。",
      en: "Climb 157 steps for a city panorama; archaeology site below. Cobbled lanes and Bourg-de-Four square nearby."
    },
    cost: { zh: "塔 + 地下 約 12 CHF", en: "Tower + crypt ~12 CHF" }
  },
  {
    id: "flower-clock",
    wiki: "L'horloge fleurie",
    score: 6.5,
    travelMin: 55,
    hideInCard: true,
    name: { zh: "花鐘 L'Horloge Fleurie", en: "L'Horloge Fleurie (Flower Clock)" },
    duration: { zh: "約 55 分鐘", en: "~55 min" },
    transit: { zh: "英國花園內，靠近 Jet d'Eau", en: "Inside Jardin Anglais, near Jet d'Eau" },
    desc: {
      zh: "英國花園裡的網美打卡點，跟噴泉、舊城同一條湖岸線，順路。",
      en: "Insta-friendly flower clock in the Jardin Anglais — on the same lakeside line as Jet d'Eau and the Old Town."
    },
    cost: { zh: "免費", en: "Free" }
  },
  {
    id: "patek",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Patek_Philippe_Museum.JPG/500px-Patek_Philippe_Museum.JPG",
    score: 8.5,
    hideInCard: true,
    travelMin: 55,
    name: { zh: "百達翡麗鐘錶博物館", en: "Patek Philippe Museum" },
    duration: { zh: "約 55 分鐘", en: "~55 min" },
    transit: { zh: "公車 Y → Cornavin + 電車 15 → Plainpalais 站附近",
               en: "Bus Y → Cornavin + tram 15 → near Plainpalais" },
    desc: {
      zh: "橫跨四個世紀的製錶史與珠寶懷錶，鐘錶迷必看。",
      en: "Four centuries of watchmaking and jewelled pocket watches. A must for watch lovers."
    },
    tip: { zh: "每月第一個週日免費；週一、週三休。",
           en: "Free on the first Sunday of each month; closed Mon & Wed." },
    cost: { zh: "10 CHF（一般日）", en: "10 CHF (regular)" }
  },
  {
    id: "carouge",
    wiki: "Carouge",
    score: 6.0,
    hideInCard: true,
    travelMin: 55,
    name: { zh: "Carouge 卡魯日", en: "Carouge" },
    duration: { zh: "約 55 分鐘", en: "~55 min" },
    transit: { zh: "公車 Y → Cornavin + 電車 12 / 18 → Carouge",
               en: "Bus Y → Cornavin + tram 12 / 18 → Carouge" },
    desc: {
      zh: "義式風情的文青小區，低矮房子、工作室、咖啡與起司鍋餐廳，氣氛跟市中心很不一樣。",
      en: "Italianate artsy quarter: low houses, ateliers, cafés, fondue spots — totally different vibe from central Geneva."
    },
    cost: { zh: "免費逛", en: "Free to wander" }
  },
  {
    id: "jonction",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Gen%C3%A8ve_-_Jonction_Arve_Rh%C3%B4ne_150815-02.JPG/500px-Gen%C3%A8ve_-_Jonction_Arve_Rh%C3%B4ne_150815-02.JPG",
    score: 8.6,
    hideInCard: true,
    travelMin: 55,
    name: { zh: "La Jonction（兩河匯流）", en: "La Jonction (river confluence)" },
    duration: { zh: "約 55 分鐘", en: "~55 min" },
    transit: { zh: "公車 Y → Cornavin + 電車 14 / 公車到 Jonction 站",
               en: "Bus Y → Cornavin + tram 14 / bus to Jonction stop" },
    desc: {
      zh: "藍色隆河與灰綠色阿爾沃河相遇的奇景，分界線清楚可見。河邊步道輕鬆好走，可串 Carouge 一起逛。",
      en: "The dramatic spot where the blue Rhône meets the grey-green Arve — a clean colour line between them. Easy riverside walk, easy to pair with Carouge."
    },
    cost: { zh: "免費", en: "Free" }
  },
  {
    id: "yvoire",
    wiki: "Yvoire",
    score: 7.0,
    travelMin: 110,
    name: { zh: "Yvoire 中世紀花村", en: "Yvoire (medieval flower village)" },
    duration: { zh: "約 1 小時 50 分（公車 + 火車 + 船）", en: "~1h 50 (bus + train + boat)" },
    transit: { zh: "公車 + 火車到 Nyon → 船過湖（CGN 船公司）",
               en: "Bus + train to Nyon → ferry across (CGN)" },
    desc: {
      zh: "法國這側湖畔的中世紀花村，石屋爬滿鮮花，有「五感花園」。",
      en: "Medieval village on the French shore — stone houses draped in flowers, plus the Garden of Five Senses."
    },
    cost: { zh: "船票來回約 15 CHF", en: "Boat ~15 CHF return" }
  },
  {
    id: "annecy",
    wiki: "Annecy",
    score: 7.6,
    travelMin: 120,
    name: { zh: "Annecy 安錫", en: "Annecy" },
    duration: { zh: "約 2 小時（公車 + 火車經 La Roche-sur-Foron）",
                en: "~2h (bus + train via La Roche-sur-Foron)" },
    transit: { zh: "公車 → Cornavin + Léman Express → La Roche → Annecy",
               en: "Bus → Cornavin + Léman Express → La Roche → Annecy" },
    desc: {
      zh: "「阿爾卑斯的威尼斯」。運河老城 + 島宮 Palais de l'Île + 清澈見底的安錫湖，夏天可以游泳野餐。",
      en: "“Venice of the Alps.” Canal-laced old town, the Palais de l'Île island, and crystal-clear lake. Swim & picnic in summer."
    }
  },
  {
    id: "lausanne",
    wiki: "Lausanne Cathedral",
    score: 7.9,
    travelMin: 75,
    name: { zh: "Lausanne 洛桑", en: "Lausanne" },
    duration: { zh: "約 1 小時 15 分（公車 + 火車直達 40 分）",
                en: "~1h 15 (bus + direct 40 min train)" },
    transit: { zh: "公車 → Cornavin + 瑞士火車直達（每 30 分一班）",
               en: "Bus → Cornavin + direct Swiss train (every 30 min)" },
    desc: {
      zh: "瑞士最美的哥德式大教堂可登鐘樓看湖景，奧林匹克博物館，以及陡峭迷人的舊城。",
      en: "One of Switzerland's finest Gothic cathedrals (climb the bell tower for the lake view), the Olympic Museum, and a steep charming old town."
    }
  },
  {
    id: "evian",
    wiki: "Évian-les-Bains",
    score: 6.0,
    travelMin: 120,
    name: { zh: "Évian-les-Bains 依雲", en: "Évian-les-Bains" },
    duration: { zh: "約 2 小時（Léman Express 經 Annemasse）",
                en: "~2h (Léman Express via Annemasse)" },
    transit: { zh: "公車 → Cornavin + Léman Express → Évian-les-Bains",
               en: "Bus → Cornavin + Léman Express → Évian-les-Bains" },
    desc: {
      zh: "Evian 礦泉水的故鄉，法國湖畔的優雅溫泉度假鎮，有美麗的湖濱步道。",
      en: "Home of Evian water — an elegant French thermal town on the lake with a beautiful promenade."
    }
  },
  {
    id: "chillon",
    wiki: "Chillon Castle",
    score: 8.6,
    travelMin: 120,
    name: { zh: "Château de Chillon 西庸城堡", en: "Château de Chillon" },
    duration: { zh: "約 2 小時（火車經 Lausanne → Veytaux-Chillon）",
                en: "~2h (train via Lausanne → Veytaux-Chillon)" },
    transit: { zh: "公車 → Cornavin + 火車經 Lausanne → Veytaux-Chillon 站，步行 5 分",
               en: "Bus → Cornavin + train via Lausanne → Veytaux-Chillon, 5 min walk" },
    desc: {
      zh: "建在湖中岩石小島上的中世紀城堡，瑞士最知名也保存最好，拜倫《錫雍的囚徒》就寫這裡。",
      en: "Medieval castle on a tiny rocky island in the lake — Switzerland's most famous, best-preserved fortress (Byron wrote The Prisoner of Chillon here)."
    },
    cost: { zh: "13.50 CHF", en: "13.50 CHF" }
  },
  {
    id: "chamonix",
    image: "images/chamonix.jpg",
    score: 9.5,
    personalNote: { zh: "學長推薦的，看起來很讚，而且不遠 💖",
                    en: "Recommended by my senior — looks amazing and not far 💖" },
    travelMin: 150,
    name: { zh: "Chamonix-Mont-Blanc", en: "Chamonix-Mont-Blanc" },
    duration: { zh: "約 2 小時 30 分（公車 → Geneva + FlixBus / SAT 巴士直達）",
                en: "~2h 30 (bus → Geneva + direct FlixBus / SAT bus)" },
    transit: { zh: "公車到 Cornavin 或 Geneva 機場 + FlixBus / SAT 巴士",
               en: "Bus to Cornavin or Geneva Airport + FlixBus / SAT bus" },
    desc: {
      zh: "白朗峰山腳的登山小鎮。搭南針峰（Aiguille du Midi）纜車上到近 3800 公尺看白朗峰，以及白朗峰冰海（Mer de Glace）。",
      en: "Alpine town at the foot of Mont Blanc. Ride the Aiguille du Midi cable car to ~3800 m for the Mont Blanc view, and visit the Mer de Glace glacier."
    },
    cost: { zh: "纜車約 75 €", en: "Cable car ~75 €" }
  },
  {
    id: "gruyeres",
    wiki: "Gruyères",
    score: 7.3,
    travelMin: 150,
    name: { zh: "Gruyères 格律耶爾", en: "Gruyères" },
    duration: { zh: "約 2 小時 30 分（火車經 Lausanne + Bulle）",
                en: "~2h 30 (train via Lausanne + Bulle)" },
    transit: { zh: "公車 → Cornavin + 火車經 Lausanne / Bulle 轉乘",
               en: "Bus → Cornavin + train via Lausanne / Bulle" },
    desc: {
      zh: "起司之鄉，中世紀城堡小鎮，可看 Gruyère 起司製作、吃起司鍋，附近還有 HR Giger 異形博物館。",
      en: "Cheese country — medieval castle town. Watch Gruyère being made, eat fondue, and visit the nearby HR Giger (Alien) museum."
    }
  }
];

// Groups: shown as a single card in the day-trip list, but their members keep
// individual pins on the map (their entries above have hideInCard: true).
const DAY_GROUPS = [
  {
    id: "geneva-classic",
    wiki: "Jet d'Eau",
    score: 9.0,
    personalNote: { zh: "標準日內瓦行程！我有去過，超讚 💖",
                    en: "The classic Geneva day — I've been, loved it 💖" },
    travelMin: 55,
    name: { zh: "Geneva 經典徒步圈（Jet d'Eau + 花鐘 + 聖彼得大教堂 + 舊城）",
            en: "Geneva Classic Walk (Jet d'Eau + Flower Clock + St. Pierre Cathedral + Old Town)" },
    duration: { zh: "約 55 分鐘 + 半天步行（湖邊 → 舊城）",
                en: "~55 min + half-day walking (lakefront → old town)" },
    transit: { zh: "公車 Y → Cornavin，過 Mont-Blanc 橋沿湖走，再上山進舊城",
               en: "Bus Y → Cornavin, cross Mont-Blanc Bridge along the lake, then climb to the old town" },
    desc: {
      zh: "半天走完 Geneva 招牌路線：140 公尺的 Jet d'Eau 大噴泉 → 英國花園的花鐘 → 過橋上山到聖彼得大教堂登 157 階俯瞰全城、逛 Bourg-de-Four 廣場的石板巷。",
      en: "Half-day Geneva classic: the 140 m Jet d'Eau → the Flower Clock in Jardin Anglais → cross the bridge and climb to St. Pierre Cathedral (157 steps to the panorama) + Bourg-de-Four's cobbled lanes."
    },
    cost: { zh: "免費（教堂塔 + 地下約 12 CHF）", en: "Free (cathedral tower + crypt ~12 CHF)" }
  },
  {
    id: "geneva-south",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Gen%C3%A8ve_-_Jonction_Arve_Rh%C3%B4ne_150815-02.JPG/500px-Gen%C3%A8ve_-_Jonction_Arve_Rh%C3%B4ne_150815-02.JPG",
    score: 8.8,
    travelMin: 55,
    name: { zh: "Geneva 南邊文青圈（Jonction + Carouge + Patek Philippe）",
            en: "Geneva South Side (Jonction + Carouge + Patek Philippe)" },
    duration: { zh: "約 55 分鐘 + 半天散步", en: "~55 min + half-day stroll" },
    transit: { zh: "公車 Y → Cornavin + 電車 12 / 15 → Plainpalais / Carouge / Jonction",
               en: "Bus Y → Cornavin + tram 12 / 15 → Plainpalais / Carouge / Jonction" },
    desc: {
      zh: "三個 Geneva 南邊的本地點，走路 15 分鐘內互通：百達翡麗鐘錶博物館看四個世紀的製錶史，沿 Plainpalais 走到 Carouge 義式風情小區喝咖啡吃起司鍋，再延伸到 Jonction 看藍色隆河與灰綠阿爾沃河匯流。跟觀光客的湖邊舊城完全不同氣氛。",
      en: "Three local south-side stops within 15 min walk: Patek Philippe Museum for 4 centuries of watchmaking, then through Plainpalais to the Italianate Carouge quarter for coffee + fondue, ending at the colour-clashing Rhône-Arve confluence at Jonction. A totally different vibe from the lakefront/old-town."
    },
    tip: { zh: "Patek 週一、週三休；每月第一個週日免費",
           en: "Patek closed Mon & Wed; free first Sunday of the month" },
    cost: { zh: "Patek 10 CHF；Carouge / Jonction 免費",
            en: "Patek 10 CHF; Carouge / Jonction free" },
    personalNote: { zh: "我有去過 Jonction，算小眾私房景點，很好拍也很漂亮 💖",
                    en: "I've been to Jonction — a hidden local gem, very photogenic 💖" }
  },
  {
    id: "un-redcross",
    wiki: "Palace of Nations",
    score: 8.2,
    travelMin: 50,
    name: { zh: "聯合國 + 國際紅十字博物館", en: "UN + Red Cross Museum" },
    duration: { zh: "約 50 分鐘", en: "~50 min" },
    transit: { zh: "公車 Y → Cornavin + 電車 15 → Nations / Appia",
               en: "Bus Y → Cornavin + tram 15 → Nations / Appia" },
    desc: {
      zh: "兩個世界級的人道機構就在隔壁。聯合國要參加導覽（25 CHF，需護照），紅十字博物館非常震撼（15 CHF）。半天就能逛完。",
      en: "Two world-class humanitarian institutions next door to each other. The UN requires a guided tour (25 CHF, passport needed); the Red Cross Museum is deeply moving (15 CHF). Half a day."
    },
    tip: { zh: "紅十字博物館週一休", en: "Red Cross Museum closed Mondays" },
    cost: { zh: "UN 25 CHF + 紅十字 15 CHF", en: "UN 25 CHF + Red Cross 15 CHF" }
  }
];

// Approximate coordinates [lat, lng] for the map view
const HOME_COORDS = [46.2452, 6.0220]; // Saint-Genis-Pouilly area
const SPOT_COORDS = {
  // Day trips
  "cern":         [46.2333, 6.0556],
  "monts-jura":   [46.3700, 6.0917],
  "lac-divonne":  [46.3604, 6.1369],
  "fort-lecluse": [46.1393, 5.8211],
  "geneva-un":    [46.2261, 6.1408],
  "redcross":     [46.2263, 6.1421],
  "jet-deau":     [46.2074, 6.1556],
  "stpierre":     [46.2014, 6.1480],
  "flower-clock": [46.2056, 6.1494],
  "patek":        [46.1996, 6.1426],
  "carouge":      [46.1828, 6.1399],
  "jonction":     [46.1925, 6.1308],
  "yvoire":       [46.3712, 6.3253],
  "annecy":       [45.9000, 6.1280],
  "lausanne":     [46.5197, 6.6323],
  "evian":        [46.4019, 6.5876],
  "chillon":      [46.4143, 6.9275],
  "chamonix":     [45.9237, 6.8694],
  "gruyeres":     [46.5839, 7.0824],
  // Overnight
  "paris":        [48.8566, 2.3522],
  "lyon":         [45.7640, 4.8357],
  "bern":         [46.9480, 7.4474],
  "jungfrau":     [46.5474, 7.9851],
  "zermatt":      [46.0207, 7.7491],
  "lucerne":      [47.0502, 8.3093],
  "zurich":       [47.3769, 8.5417],
  "como-milano":  [45.9690, 9.2581],
  "colmar":       [48.0794, 7.3585]
};

const OVERNIGHT_SPOTS = [
  {
    id: "paris",
    wiki: "Eiffel Tower",
    score: 9.1,
    travelMin: 230,
    name: { zh: "巴黎 Paris", en: "Paris" },
    travel: { zh: "約 3 小時 45 分到 Paris Gare de Lyon（公車到 Cornavin ~35 分 + TGV Lyria 直達 3h11）",
              en: "~3h 45 to Paris Gare de Lyon (bus to Cornavin ~35 min + TGV Lyria direct 3h11)" },
    desc: {
      zh: "鐵塔、羅浮宮、塞納河、美食與時尚。",
      en: "Eiffel Tower, the Louvre, the Seine, food, fashion."
    },
    stay: { zh: "2–3 晚", en: "2–3 nights" },
    booking: { query: "Paris, France", budgetMax: 235, currency: "EUR" },
    timeToMain: { zh: "市中心到鐵塔約 20 分鐘地鐵",
                  en: "Center to Eiffel Tower ~20 min metro" },
    hotels: [
      { name: "Hôtel Bienvenue (9e)", note: { zh: "近 Opéra，步行可達北站", en: "Near Opéra, walkable to Gare du Nord" } },
      { name: "Hôtel Jeanne d'Arc Le Marais", note: { zh: "瑪黑區精緻小旅館", en: "Charming boutique in Le Marais" } },
      { name: "Generator Paris", note: { zh: "預算選擇，屋頂酒吧", en: "Budget pick with rooftop bar" } }
    ]
  },
  {
    id: "lyon",
    wiki: "Lyon",
    score: 8.5,
    personalNote: { zh: "其實也可以當天來回，會比較趕，建議早點出門 ☀️",
                    en: "Doable as a day trip if you leave early — it'll be tight though ☀️" },
    travelMin: 155,
    name: { zh: "Lyon 里昂", en: "Lyon" },
    travel: { zh: "約 2 小時 35 分到 Lyon Part-Dieu（公車 + TGV 直達 ~2h）",
              en: "~2h 35 to Lyon Part-Dieu (bus + direct TGV ~2h)" },
    desc: {
      zh: "法國美食之都（bouchon 里昂小館）、舊城 Vieux Lyon、富維耶聖母院、紅十字山丘絲織區，每年 12 月燈光節。",
      en: "France's food capital (bouchon bistros), Vieux Lyon old town, Fourvière basilica, the Croix-Rousse silk-weaver hill, and the Dec Festival of Lights."
    },
    stay: { zh: "1 晚", en: "1 night" },
    booking: { query: "Lyon, France", budgetMax: 235, currency: "EUR" },
    timeToMain: { zh: "Part-Dieu 到舊城 Vieux Lyon 約 15 分鐘地鐵",
                  en: "Part-Dieu to Vieux Lyon ~15 min metro" },
    hotels: [
      { name: "Mama Shelter Lyon", note: { zh: "設計感連鎖，活潑可愛", en: "Stylish boutique chain" } },
      { name: "Hôtel Silky by HappyCulture", note: { zh: "市中心步行方便", en: "Central, walkable" } },
      { name: "Hôtel des Artistes", note: { zh: "Bellecour 廣場附近", en: "Near Place Bellecour" } }
    ]
  },
  {
    id: "bern",
    wiki: "Bern",
    score: 8.8,
    personalNote: { zh: "其實也可以當天來回，會比較趕，建議早點出門 ☀️ 我應該最近會找時間去，到時補心得",
                    en: "Doable as a day trip if you leave early — it'll be tight though ☀️ I'll be visiting soon and report back" },
    travelMin: 140,
    name: { zh: "Bern 伯恩", en: "Bern" },
    travel: { zh: "約 2 小時 20 分（公車 → Cornavin + 火車直達 1h45）",
              en: "~2h 20 (bus → Cornavin + direct train 1h45)" },
    desc: {
      zh: "瑞士首都。UNESCO 中世紀拱廊老城、鐘樓 Zytglogge、熊公園、愛因斯坦故居。",
      en: "Swiss capital. UNESCO medieval arcaded old town, the Zytglogge clock tower, Bear Park, and Einstein's house."
    },
    stay: { zh: "1 晚", en: "1 night" },
    booking: { query: "Bern, Switzerland", budgetMax: 220, currency: "CHF" },
    timeToMain: { zh: "車站到老城步行約 5 分鐘",
                  en: "Station to old town ~5 min walk" },
    hotels: [
      { name: "Hotel Schweizerhof Bern", note: { zh: "古典五星，車站正對面", en: "Classic 5★ opposite the station" } },
      { name: "Hotel Bristol Bern", note: { zh: "舒適中價位", en: "Comfortable mid-range" } },
      { name: "Bern Backpackers Hotel Glocke", note: { zh: "預算選擇，老城內", en: "Budget pick inside the old town" } }
    ]
  },
  {
    id: "jungfrau",
    wiki: "Jungfraujoch",
    score: 9.5,
    personalNote: { zh: "我六月底去完回來再補上心得！⛰",
                    en: "I'm going late June — will add my notes after! ⛰" },
    travelMin: 225,
    name: { zh: "少女峰 Jungfraujoch", en: "Jungfraujoch" },
    travel: { zh: "Saint-Genis → Lauterbrunnen 約 3 小時 45 分；再轉齒軌列車上 Jungfraujoch 約 1 小時 30 分",
              en: "Saint-Genis → Lauterbrunnen ~3h 45; then cog railway up to Jungfraujoch ~1h 30" },
    desc: {
      zh: "「歐洲之巔」3454 公尺，全歐最高火車站、冰宮、阿萊奇冰河景觀。",
      en: "“Top of Europe” at 3454 m — Europe's highest train station, ice palace, Aletsch glacier view."
    },
    stay: { zh: "1–2 晚，住 Grindelwald 或 Lauterbrunnen", en: "1–2 nights in Grindelwald or Lauterbrunnen" },
    booking: { query: "Lauterbrunnen, Switzerland", budgetMax: 220, currency: "CHF" },
    timeToMain: { zh: "Lauterbrunnen 村內走到齒軌車站約 2 分鐘；上 Jungfraujoch 再 ~1h30",
                  en: "~2 min walk in Lauterbrunnen to cog station; then ~1h30 up to Jungfraujoch" },
    hotels: [
      { name: "Hotel Bernerhof Grindelwald", note: { zh: "中價位，車站近", en: "Mid-range, near station" } },
      { name: "Hotel Oberland Lauterbrunnen", note: { zh: "瀑布谷裡可愛家庭旅館", en: "Cosy family hotel in the waterfall valley" } },
      { name: "Valley Hostel Lauterbrunnen", note: { zh: "預算選擇", en: "Budget pick" } }
    ]
  },
  {
    id: "zermatt",
    wiki: "Matterhorn",
    score: 9.3,
    personalNote: { zh: "我六月底去完回來再補上心得！⛰",
                    en: "I'm going late June — will add my notes after! ⛰" },
    travelMin: 285,
    name: { zh: "Zermatt（馬特洪峰）", en: "Zermatt (Matterhorn)" },
    travel: { zh: "約 4 小時 45 分（公車 → Cornavin + 火車到 Visp 2h45 + Visp → Zermatt 約 1h05）。Zermatt 是無燃油車山城",
              en: "~4h 45 (bus → Cornavin + train to Visp 2h45 + Visp → Zermatt ~1h05). Zermatt is a car-free village" },
    desc: {
      zh: "教科書級的尖角名峰。搭 Gornergrat 齒軌登山看全景，夏天健行冬天滑雪。",
      en: "The iconic pointed Matterhorn. Ride the Gornergrat cog railway for the panorama; hike in summer, ski in winter."
    },
    stay: { zh: "1–2 晚", en: "1–2 nights" },
    booking: { query: "Zermatt, Switzerland", budgetMax: 220, currency: "CHF" },
    timeToMain: { zh: "村中心到 Gornergrat 齒軌站約 5 分鐘步行",
                  en: "Center to Gornergrat cog station ~5 min walk" },
    hotels: [
      { name: "Hotel Bahnhof Zermatt", note: { zh: "經濟實惠，車站正對面", en: "Affordable, opposite the station" } },
      { name: "Hotel Continental", note: { zh: "中價位，馬特洪峰景房", en: "Mid-range with Matterhorn views" } },
      { name: "The Omnia", note: { zh: "頂級設計酒店", en: "Luxury design hotel" } }
    ]
  },
  {
    id: "lucerne",
    wiki: "Chapel Bridge",
    score: 7.9,
    travelMin: 215,
    name: { zh: "Lucerne 琉森", en: "Lucerne" },
    travel: { zh: "約 3 小時 35 分（公車 → Cornavin + 火車經 Bern / Olten 約 3h）",
              en: "~3h 35 (bus → Cornavin + train via Bern / Olten ~3h)" },
    desc: {
      zh: "瑞士中部最上鏡的城市：花橋 Kapellbrücke、琉森湖、世界最陡的 Pilatus 齒軌或 Rigi 山纜車。",
      en: "Switzerland's most photogenic mid-country city: the Kapellbrücke chapel bridge, Lake Lucerne, plus the world's steepest cogwheel up Pilatus, or the Rigi cable car."
    },
    stay: { zh: "1 晚", en: "1 night" },
    booking: { query: "Lucerne, Switzerland", budgetMax: 220, currency: "CHF" },
    timeToMain: { zh: "車站到花橋約 5 分鐘步行",
                  en: "Station to Chapel Bridge ~5 min walk" },
    hotels: [
      { name: "Hotel des Alpes Lucerne", note: { zh: "湖邊位置好", en: "Lakefront location" } },
      { name: "Hotel Waldstätterhof", note: { zh: "車站對面", en: "Opposite the station" } },
      { name: "Backpackers Lucerne", note: { zh: "預算選擇，湖邊", en: "Budget pick by the lake" } }
    ]
  },
  {
    id: "zurich",
    wiki: "Zürich",
    score: 8.2,
    travelMin: 225,
    name: { zh: "Zürich 蘇黎世", en: "Zürich" },
    travel: { zh: "約 3 小時 45 分（公車 → Cornavin 約 35 分 + Cornavin → Zürich HB 直達 2h45 + 市區轉乘）",
              en: "~3h 45 (bus → Cornavin ~35 min + Cornavin → Zürich HB direct 2h45 + last-mile transit)" },
    desc: {
      zh: "瑞士最大城。班霍夫大街購物、利馬特河與蘇黎世湖、舊城教堂群與美術館，夜生活與餐廳熱鬧。",
      en: "Switzerland's biggest city. Bahnhofstrasse shopping, the Limmat & lake, old-town churches, museums — and the best food and nightlife scene."
    },
    stay: { zh: "1 晚", en: "1 night" },
    booking: { query: "Zurich, Switzerland", budgetMax: 220, currency: "CHF" },
    timeToMain: { zh: "車站即班霍夫大街起點；湖邊走路約 10 分鐘",
                  en: "Station = start of Bahnhofstrasse; ~10 min walk to the lake" },
    hotels: [
      { name: "25hours Hotel Langstrasse", note: { zh: "設計感旅店", en: "Stylish design hotel" } },
      { name: "Hotel Adler", note: { zh: "舊城核心", en: "Heart of the old town" } },
      { name: "Greulich Design Hotel", note: { zh: "安靜中價位", en: "Quiet mid-range" } }
    ]
  },
  {
    id: "como-milano",
    wiki: "Lake Como",
    score: 7.6,
    travelMin: 270,
    name: { zh: "Lake Como + Milano（義大利）", en: "Lake Como + Milano (Italy)" },
    travel: { zh: "約 4 小時 30 分（公車 → Cornavin + 火車經 Milano ~4h，再轉車到 Como 約 40 分）",
              en: "~4h 30 (bus → Cornavin + train via Milano ~4h, then ~40 min to Como)" },
    desc: {
      zh: "科莫湖是阿爾卑斯湖光別墅的代表，米蘭則是大教堂、時尚與購物。一次玩義大利北部。",
      en: "Lake Como is the dream of alpine lake villas; Milano is the Duomo, fashion and shopping. Two-for-one in northern Italy."
    },
    stay: { zh: "2 晚（1 晚湖區 + 1 晚 Milano）", en: "2 nights (1 lake + 1 Milano)" },
    booking: { query: "Como, Italy", budgetMax: 235, currency: "EUR" },
    timeToMain: { zh: "Como 火車站到湖邊約 10 分鐘步行；Bellagio 需搭船 ~30 分",
                  en: "Como station to lakeside ~10 min walk; ferry to Bellagio ~30 min" },
    hotels: [
      { name: "Hotel Posta Como", note: { zh: "Como 市中心", en: "Central Como" } },
      { name: "Il Perlo Panorama (Bellagio)", note: { zh: "Bellagio 湖景", en: "Bellagio with lake view" } },
      { name: "Room Mate Giulia (Milano)", note: { zh: "緊鄰 Duomo", en: "Next to the Duomo" } }
    ]
  },
  {
    id: "colmar",
    wiki: "Colmar",
    score: 7.3,
    travelMin: 245,
    name: { zh: "Colmar + 阿爾薩斯", en: "Colmar + Alsace" },
    travel: { zh: "約 4 小時（公車 → Cornavin + 火車經 Basel 約 3h，Basel → Colmar 約 30 分）",
              en: "~4h (bus → Cornavin + train via Basel ~3h, Basel → Colmar ~30 min)" },
    desc: {
      zh: "德法交界的童話小鎮群：Colmar、Riquewihr、Strasbourg。半木造彩色房子、運河小威尼斯、白葡萄酒產區，聖誕市集季最夢幻。",
      en: "Fairytale villages on the French-German border: Colmar, Riquewihr, Strasbourg. Half-timbered colourful houses, a “Little Venice” canal, white-wine country — magical at Christmas market time."
    },
    stay: { zh: "1–2 晚", en: "1–2 nights" },
    booking: { query: "Colmar, France", budgetMax: 235, currency: "EUR" },
    timeToMain: { zh: "車站到小威尼斯約 15 分鐘步行",
                  en: "Station to Little Venice ~15 min walk" },
    hotels: [
      { name: "Hôtel Le Colombier Colmar", note: { zh: "小威尼斯區邊上", en: "Right by Little Venice" } },
      { name: "James Boutique Hôtel", note: { zh: "Colmar 老城", en: "In Colmar old town" } },
      { name: "Cour du Bailli (Bergheim)", note: { zh: "葡萄酒小村", en: "Wine-route village" } }
    ]
  }
];
