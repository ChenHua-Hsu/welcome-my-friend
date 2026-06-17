// All spots data. Edit here to add/remove.
// Each text field has { zh, en } pair.

const UI = {
  title:      { zh: "感謝你來瑞士找我玩 ♡", en: "Thanks for coming to visit me in Switzerland ♡" },
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
  sendTitle:  { zh: "把選擇送給 Ken", en: "Send your picks to Ken" },
  sendHint:   { zh: "選好後挑一個方式傳給我，我就會準備驚喜 ✨", en: "When you're ready, pick a way to send me your list ✨" },
  btnCopy:    { zh: "📋 複製文字", en: "📋 Copy text" },
  btnLink:    { zh: "🔗 複製分享連結", en: "🔗 Copy share link" },
  btnEmail:   { zh: "✉️ 用 Email 寄", en: "✉️ Send by Email" },
  btnWa:      { zh: "💬 用 WhatsApp 傳", en: "💬 Send via WhatsApp" },
  copied:     { zh: "已複製！", en: "Copied!" },
  emailSubject:{zh: "我的 Saint-Genis 願望清單", en: "My Saint-Genis wishlist" },
  fromFriendBanner:{zh: "✨ 你的朋友選了這些 ✨", en: "✨ Your friend picked these ✨" }
};

const DAY_SPOTS = [
  {
    id: "cern",
    name: { zh: "CERN Science Gateway", en: "CERN Science Gateway" },
    duration: { zh: "10 分鐘", en: "10 min" },
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
    name: { zh: "Monts Jura（La Faucille 隘口）", en: "Monts Jura (Col de la Faucille)" },
    duration: { zh: "30 分鐘", en: "30 min" },
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
    name: { zh: "Lac de Divonne", en: "Lac de Divonne" },
    duration: { zh: "25 分鐘", en: "25 min" },
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
    name: { zh: "Fort l'Écluse", en: "Fort l'Écluse" },
    duration: { zh: "25 分鐘", en: "25 min" },
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
    name: { zh: "聯合國歐洲總部（Palais des Nations）", en: "Palais des Nations (UN)" },
    duration: { zh: "20 分鐘", en: "20 min" },
    transit: { zh: "電車 18 → Nations 站", en: "Tram 18 → Nations stop" },
    desc: {
      zh: "聯合國歐洲總部，需參加導覽（成人 25 CHF）。要帶護照預約。",
      en: "UN Europe HQ. Guided tours only (adults 25 CHF). Bring passport, pre-book."
    },
    cost: { zh: "25 CHF", en: "25 CHF" }
  },
  {
    id: "redcross",
    name: { zh: "國際紅十字博物館", en: "Intl Red Cross & Red Crescent Museum" },
    duration: { zh: "20 分鐘", en: "20 min" },
    transit: { zh: "電車 18 → Appia 站（UN 隔壁）", en: "Tram 18 → Appia (next to UN)" },
    desc: {
      zh: "非常震撼、互動性強的人道主義主題館，內容沉重但評價很高。",
      en: "Powerful, interactive humanitarian museum. Heavy themes, extremely well reviewed."
    },
    tip: { zh: "週一休", en: "Closed Mondays" },
    cost: { zh: "15 CHF", en: "15 CHF" }
  },
  {
    id: "jet-deau",
    name: { zh: "Jet d'Eau 大噴泉", en: "Jet d'Eau" },
    duration: { zh: "25 分鐘", en: "25 min" },
    transit: { zh: "電車 + 公車到 Quai Gustave-Ador", en: "Tram + bus to Quai Gustave-Ador" },
    desc: {
      zh: "日內瓦地標，140 公尺高的水柱。湖邊散步順便看。",
      en: "Geneva's icon — a 140 m water jet. Stroll along the lake."
    },
    cost: { zh: "免費", en: "Free" }
  },
  {
    id: "stpierre",
    name: { zh: "聖彼得大教堂 + 舊城", en: "St. Pierre Cathedral & Old Town" },
    duration: { zh: "25 分鐘", en: "25 min" },
    transit: { zh: "電車 18 → Bel-Air，步行上山", en: "Tram 18 → Bel-Air, walk uphill" },
    desc: {
      zh: "登塔 157 階俯瞰全城、地下考古遺址；周邊石板巷與 Bourg-de-Four 廣場很好逛。",
      en: "Climb 157 steps for a city panorama; archaeology site below. Cobbled lanes and Bourg-de-Four square nearby."
    },
    cost: { zh: "塔 + 地下 約 12 CHF", en: "Tower + crypt ~12 CHF" }
  },
  {
    id: "flower-clock",
    name: { zh: "花鐘 L'Horloge Fleurie", en: "L'Horloge Fleurie (Flower Clock)" },
    duration: { zh: "25 分鐘", en: "25 min" },
    transit: { zh: "英國花園內，靠近 Jet d'Eau", en: "Inside Jardin Anglais, near Jet d'Eau" },
    desc: {
      zh: "英國花園裡的網美打卡點，跟噴泉、舊城同一條湖岸線，順路。",
      en: "Insta-friendly flower clock in the Jardin Anglais — on the same lakeside line as Jet d'Eau and the Old Town."
    },
    cost: { zh: "免費", en: "Free" }
  },
  {
    id: "patek",
    name: { zh: "百達翡麗鐘錶博物館", en: "Patek Philippe Museum" },
    duration: { zh: "25 分鐘", en: "25 min" },
    transit: { zh: "電車 15 → Plainpalais 站附近", en: "Tram 15 → near Plainpalais" },
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
    name: { zh: "Carouge 卡魯日", en: "Carouge" },
    duration: { zh: "25 分鐘", en: "25 min" },
    transit: { zh: "電車 12 / 18 → Carouge", en: "Tram 12 / 18 → Carouge" },
    desc: {
      zh: "義式風情的文青小區，低矮房子、工作室、咖啡與起司鍋餐廳，氣氛跟市中心很不一樣。",
      en: "Italianate artsy quarter: low houses, ateliers, cafés, fondue spots — totally different vibe from central Geneva."
    },
    cost: { zh: "免費逛", en: "Free to wander" }
  },
  {
    id: "jonction",
    name: { zh: "La Jonction（兩河匯流）", en: "La Jonction (river confluence)" },
    duration: { zh: "25 分鐘", en: "25 min" },
    transit: { zh: "電車 14 / 公車到 Jonction 站", en: "Tram 14 / bus to Jonction stop" },
    desc: {
      zh: "藍色隆河與灰綠色阿爾沃河相遇的奇景，分界線清楚可見。河邊步道輕鬆好走，可串 Carouge 一起逛。",
      en: "The dramatic spot where the blue Rhône meets the grey-green Arve — a clean colour line between them. Easy riverside walk, easy to pair with Carouge."
    },
    cost: { zh: "免費", en: "Free" }
  },
  {
    id: "yvoire",
    name: { zh: "Yvoire 中世紀花村", en: "Yvoire (medieval flower village)" },
    duration: { zh: "50 分鐘", en: "50 min" },
    transit: { zh: "可從 Nyon 搭船過湖（CGN 船公司）", en: "Boat across from Nyon (CGN ferries)" },
    desc: {
      zh: "法國這側湖畔的中世紀花村，石屋爬滿鮮花，有「五感花園」。",
      en: "Medieval village on the French shore — stone houses draped in flowers, plus the Garden of Five Senses."
    },
    cost: { zh: "船票來回約 15 CHF", en: "Boat ~15 CHF return" }
  },
  {
    id: "annecy",
    name: { zh: "Annecy 安錫", en: "Annecy" },
    duration: { zh: "50 分鐘", en: "50 min" },
    transit: { zh: "公車 / 火車（經 La Roche-sur-Foron）",
               en: "Bus or train (via La Roche-sur-Foron)" },
    desc: {
      zh: "「阿爾卑斯的威尼斯」。運河老城 + 島宮 Palais de l'Île + 清澈見底的安錫湖，夏天可以游泳野餐。",
      en: "“Venice of the Alps.” Canal-laced old town, the Palais de l'Île island, and crystal-clear lake. Swim & picnic in summer."
    }
  },
  {
    id: "lausanne",
    name: { zh: "Lausanne 洛桑", en: "Lausanne" },
    duration: { zh: "50 分鐘", en: "50 min" },
    transit: { zh: "瑞士火車直達（每 30 分一班）",
               en: "Direct Swiss train (every 30 min)" },
    desc: {
      zh: "瑞士最美的哥德式大教堂可登鐘樓看湖景，奧林匹克博物館，以及陡峭迷人的舊城。",
      en: "One of Switzerland's finest Gothic cathedrals (climb the bell tower for the lake view), the Olympic Museum, and a steep charming old town."
    }
  },
  {
    id: "evian",
    name: { zh: "Évian-les-Bains 依雲", en: "Évian-les-Bains" },
    duration: { zh: "1 小時 15 分", en: "1h 15" },
    transit: { zh: "從 Lausanne 搭船過湖最美", en: "Most scenic via boat from Lausanne" },
    desc: {
      zh: "Evian 礦泉水的故鄉，法國湖畔的優雅溫泉度假鎮，有美麗的湖濱步道。",
      en: "Home of Evian water — an elegant French thermal town on the lake with a beautiful promenade."
    }
  },
  {
    id: "chillon",
    name: { zh: "Château de Chillon 西庸城堡", en: "Château de Chillon" },
    duration: { zh: "1 小時 10 分", en: "1h 10" },
    transit: { zh: "火車到 Veytaux-Chillon 站，步行 5 分", en: "Train to Veytaux-Chillon, 5 min walk" },
    desc: {
      zh: "建在湖中岩石小島上的中世紀城堡，瑞士最知名也保存最好，拜倫《錫雍的囚徒》就寫這裡。",
      en: "Medieval castle on a tiny rocky island in the lake — Switzerland's most famous, best-preserved fortress (Byron wrote The Prisoner of Chillon here)."
    },
    cost: { zh: "13.50 CHF", en: "13.50 CHF" }
  },
  {
    id: "chamonix",
    name: { zh: "Chamonix-Mont-Blanc", en: "Chamonix-Mont-Blanc" },
    duration: { zh: "1 小時 15 分", en: "1h 15" },
    transit: { zh: "公車（FlixBus / SAT）或火車（經 St-Gervais）", en: "Bus (FlixBus / SAT) or train (via St-Gervais)" },
    desc: {
      zh: "白朗峰山腳的登山小鎮。搭南針峰（Aiguille du Midi）纜車上到近 3800 公尺看白朗峰，以及白朗峰冰海（Mer de Glace）。",
      en: "Alpine town at the foot of Mont Blanc. Ride the Aiguille du Midi cable car to ~3800 m for the Mont Blanc view, and visit the Mer de Glace glacier."
    },
    cost: { zh: "纜車約 75 €", en: "Cable car ~75 €" }
  },
  {
    id: "gruyeres",
    name: { zh: "Gruyères 格律耶爾", en: "Gruyères" },
    duration: { zh: "1 小時 20 分", en: "1h 20" },
    transit: { zh: "火車經 Lausanne / Bulle 轉乘", en: "Train via Lausanne / Bulle" },
    desc: {
      zh: "起司之鄉，中世紀城堡小鎮，可看 Gruyère 起司製作、吃起司鍋，附近還有 HR Giger 異形博物館。",
      en: "Cheese country — medieval castle town. Watch Gruyère being made, eat fondue, and visit the nearby HR Giger (Alien) museum."
    }
  }
];

const OVERNIGHT_SPOTS = [
  {
    id: "paris",
    name: { zh: "巴黎 Paris", en: "Paris" },
    travel: { zh: "TGV Lyria 從 Geneva Cornavin 直達 Gare de Lyon，約 3 小時 11 分，每 2 小時一班",
              en: "TGV Lyria from Geneva Cornavin direct to Gare de Lyon, ~3h11, every 2h" },
    desc: {
      zh: "鐵塔、羅浮宮、塞納河、美食與時尚。",
      en: "Eiffel Tower, the Louvre, the Seine, food, fashion."
    },
    stay: { zh: "2–3 晚", en: "2–3 nights" },
    hotels: [
      { name: "Hôtel Bienvenue (9e)", price: "140–180 €", note: { zh: "近 Opéra，步行可達北站", en: "Near Opéra, walkable to Gare du Nord" } },
      { name: "Hôtel Jeanne d'Arc Le Marais", price: "160–220 €", note: { zh: "瑪黑區精緻小旅館", en: "Charming boutique in Le Marais" } },
      { name: "Generator Paris", price: "100–150 €", note: { zh: "預算選擇，屋頂酒吧", en: "Budget pick with rooftop bar" } }
    ]
  },
  {
    id: "lyon",
    name: { zh: "Lyon 里昂", en: "Lyon" },
    travel: { zh: "TGV 約 2 小時直達 Lyon Part-Dieu",
              en: "TGV ~2h direct to Lyon Part-Dieu" },
    desc: {
      zh: "法國美食之都（bouchon 里昂小館）、舊城 Vieux Lyon、富維耶聖母院、紅十字山丘絲織區，每年 12 月燈光節。",
      en: "France's food capital (bouchon bistros), Vieux Lyon old town, Fourvière basilica, the Croix-Rousse silk-weaver hill, and the Dec Festival of Lights."
    },
    stay: { zh: "1 晚", en: "1 night" },
    hotels: [
      { name: "Mama Shelter Lyon", price: "90–140 €", note: { zh: "設計感連鎖，活潑可愛", en: "Stylish boutique chain" } },
      { name: "Hôtel Silky by HappyCulture", price: "110–160 €", note: { zh: "市中心步行方便", en: "Central, walkable" } },
      { name: "Hôtel des Artistes", price: "100–150 €", note: { zh: "Bellecour 廣場附近", en: "Near Place Bellecour" } }
    ]
  },
  {
    id: "bern",
    name: { zh: "Bern 伯恩", en: "Bern" },
    travel: { zh: "火車直達約 1 小時 45 分 – 2 小時",
              en: "Direct train ~1h45 – 2h" },
    desc: {
      zh: "瑞士首都。UNESCO 中世紀拱廊老城、鐘樓 Zytglogge、熊公園、愛因斯坦故居。",
      en: "Swiss capital. UNESCO medieval arcaded old town, the Zytglogge clock tower, Bear Park, and Einstein's house."
    },
    stay: { zh: "1 晚", en: "1 night" },
    hotels: [
      { name: "Hotel Schweizerhof Bern", price: "320–450 CHF", note: { zh: "古典五星，車站正對面", en: "Classic 5★ opposite the station" } },
      { name: "Hotel Bristol Bern", price: "200–280 CHF", note: { zh: "舒適中價位", en: "Comfortable mid-range" } },
      { name: "Bern Backpackers Hotel Glocke", price: "140–180 CHF", note: { zh: "預算選擇，老城內", en: "Budget pick inside the old town" } }
    ]
  },
  {
    id: "jungfrau",
    name: { zh: "少女峰 Jungfraujoch", en: "Jungfraujoch" },
    travel: { zh: "先到 Interlaken（約 2h45–3h），再轉齒軌列車上山約 1.5h",
              en: "Train to Interlaken (~2h45–3h), then cog railway up ~1h30" },
    desc: {
      zh: "「歐洲之巔」3454 公尺，全歐最高火車站、冰宮、阿萊奇冰河景觀。",
      en: "“Top of Europe” at 3454 m — Europe's highest train station, ice palace, Aletsch glacier view."
    },
    stay: { zh: "1–2 晚，住 Grindelwald 或 Lauterbrunnen", en: "1–2 nights in Grindelwald or Lauterbrunnen" },
    hotels: [
      { name: "Hotel Bernerhof Grindelwald", price: "240–320 CHF", note: { zh: "中價位，車站近", en: "Mid-range, near station" } },
      { name: "Hotel Oberland Lauterbrunnen", price: "200–280 CHF", note: { zh: "瀑布谷裡可愛家庭旅館", en: "Cosy family hotel in the waterfall valley" } },
      { name: "Valley Hostel Lauterbrunnen", price: "120–160 CHF", note: { zh: "預算選擇", en: "Budget pick" } }
    ]
  },
  {
    id: "zermatt",
    name: { zh: "Zermatt（馬特洪峰）", en: "Zermatt (Matterhorn)" },
    travel: { zh: "火車約 3h40–4h，經 Visp 轉車。Zermatt 是無燃油車山城",
              en: "~3h40–4h via Visp. Zermatt is a car-free mountain village" },
    desc: {
      zh: "教科書級的尖角名峰。搭 Gornergrat 齒軌登山看全景，夏天健行冬天滑雪。",
      en: "The iconic pointed Matterhorn. Ride the Gornergrat cog railway for the panorama; hike in summer, ski in winter."
    },
    stay: { zh: "1–2 晚", en: "1–2 nights" },
    hotels: [
      { name: "Hotel Bahnhof Zermatt", price: "180–240 CHF", note: { zh: "經濟實惠，車站正對面", en: "Affordable, opposite the station" } },
      { name: "Hotel Continental", price: "280–380 CHF", note: { zh: "中價位，馬特洪峰景房", en: "Mid-range with Matterhorn views" } },
      { name: "The Omnia", price: "650 CHF+", note: { zh: "頂級設計酒店", en: "Luxury design hotel" } }
    ]
  },
  {
    id: "lucerne",
    name: { zh: "Lucerne 琉森", en: "Lucerne" },
    travel: { zh: "火車約 3 小時（經 Bern / Olten）",
              en: "Train ~3h (via Bern / Olten)" },
    desc: {
      zh: "瑞士中部最上鏡的城市：花橋 Kapellbrücke、琉森湖、世界最陡的 Pilatus 齒軌或 Rigi 山纜車。",
      en: "Switzerland's most photogenic mid-country city: the Kapellbrücke chapel bridge, Lake Lucerne, plus the world's steepest cogwheel up Pilatus, or the Rigi cable car."
    },
    stay: { zh: "1 晚", en: "1 night" },
    hotels: [
      { name: "Hotel des Alpes Lucerne", price: "240–320 CHF", note: { zh: "湖邊位置好", en: "Lakefront location" } },
      { name: "Hotel Waldstätterhof", price: "200–280 CHF", note: { zh: "車站對面", en: "Opposite the station" } },
      { name: "Backpackers Lucerne", price: "120–160 CHF", note: { zh: "預算選擇，湖邊", en: "Budget pick by the lake" } }
    ]
  },
  {
    id: "zurich",
    name: { zh: "Zürich 蘇黎世", en: "Zürich" },
    travel: { zh: "火車約 2h45 直達",
              en: "Direct train ~2h45" },
    desc: {
      zh: "瑞士最大城。班霍夫大街購物、利馬特河與蘇黎世湖、舊城教堂群與美術館，夜生活與餐廳熱鬧。",
      en: "Switzerland's biggest city. Bahnhofstrasse shopping, the Limmat & lake, old-town churches, museums — and the best food and nightlife scene."
    },
    stay: { zh: "1 晚", en: "1 night" },
    hotels: [
      { name: "25hours Hotel Langstrasse", price: "240–340 CHF", note: { zh: "設計感旅店", en: "Stylish design hotel" } },
      { name: "Hotel Adler", price: "220–300 CHF", note: { zh: "舊城核心", en: "Heart of the old town" } },
      { name: "Greulich Design Hotel", price: "200–280 CHF", note: { zh: "安靜中價位", en: "Quiet mid-range" } }
    ]
  },
  {
    id: "como-milano",
    name: { zh: "Lake Como + Milano（義大利）", en: "Lake Como + Milano (Italy)" },
    travel: { zh: "火車約 4 小時（經 Milano 轉）",
              en: "~4h by train (via Milano)" },
    desc: {
      zh: "科莫湖是阿爾卑斯湖光別墅的代表，米蘭則是大教堂、時尚與購物。一次玩義大利北部。",
      en: "Lake Como is the dream of alpine lake villas; Milano is the Duomo, fashion and shopping. Two-for-one in northern Italy."
    },
    stay: { zh: "2 晚（1 晚湖區 + 1 晚 Milano）", en: "2 nights (1 lake + 1 Milano)" },
    hotels: [
      { name: "Hotel Posta Como", price: "120–180 €", note: { zh: "Como 市中心", en: "Central Como" } },
      { name: "Il Perlo Panorama (Bellagio)", price: "150–220 €", note: { zh: "Bellagio 湖景", en: "Bellagio with lake view" } },
      { name: "Room Mate Giulia (Milano)", price: "180–260 €", note: { zh: "緊鄰 Duomo", en: "Next to the Duomo" } }
    ]
  },
  {
    id: "colmar",
    name: { zh: "Colmar + 阿爾薩斯", en: "Colmar + Alsace" },
    travel: { zh: "火車約 4 小時（經 Basel / Strasbourg）",
              en: "~4h by train (via Basel / Strasbourg)" },
    desc: {
      zh: "德法交界的童話小鎮群：Colmar、Riquewihr、Strasbourg。半木造彩色房子、運河小威尼斯、白葡萄酒產區，聖誕市集季最夢幻。",
      en: "Fairytale villages on the French-German border: Colmar, Riquewihr, Strasbourg. Half-timbered colourful houses, a “Little Venice” canal, white-wine country — magical at Christmas market time."
    },
    stay: { zh: "1–2 晚", en: "1–2 nights" },
    hotels: [
      { name: "Hôtel Le Colombier Colmar", price: "130–190 €", note: { zh: "小威尼斯區邊上", en: "Right by Little Venice" } },
      { name: "James Boutique Hôtel", price: "150–220 €", note: { zh: "Colmar 老城", en: "In Colmar old town" } },
      { name: "Cour du Bailli (Bergheim)", price: "120–170 €", note: { zh: "葡萄酒小村", en: "Wine-route village" } }
    ]
  }
];
