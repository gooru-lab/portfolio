(function () {
  var KEY = "gooru-lang";
  var SUPPORTED = ["uk", "en", "de", "pl", "sk"];

  var SHARED = {
    kicker: "DevOps & Full-Stack · AI · market systems",
    ctaPdf: "PDF",
    ctaTelegram: "Telegram",
    live: "Live:",
    liveDemosJump: "ready demos ↓",
    figDash: "Dashboard",
    stackBe: "Backend",
    stackFe: "Frontend / Mobile",
    stackAi: "AI",
    stackDevops: "DevOps",
    case8Title: "Polymarket BTC Sniper (5m)",
    case9Title: "Polymarket copy-trading",
  };

  var T = {
    uk: Object.assign({}, SHARED, {
      metaDesc:
        "gooru — DevOps, Full-Stack, production AI для retail і market systems: боти, OpenAI/OCR, ERP, BI, Polymarket engines.",
      langAria: "Мова",
      themeLight: "Світла",
      themeDark: "Темна",
      lead:
        "Повний контур production для retail: каса → API / бот → Docker → адмінка → моніторинг. Паралельно — market engines (sniper / copy-trading) з paper-first і ризик-гейтами. AI лише на реальних даних.",
      ctaWrite: "Написати",
      workLabel: "Кейси",
      workTitle: "Проєкти й ready demos",
      case1Title: "Retail ops → автоматизація",
      case1Tag1: "1С",
      case1Tag2: "Накладні",
      case1Tag3: "Звіти",
      case1Tag4: "Акції",
      case1P1:
        "<strong>Бекграунд:</strong> довго працював оператором комп’ютерного набору — фізичний прийом товару, прихід, розцінка, звіти, аналіз акцій, прорахунок чеків під розіграші, організація свят у магазинах.",
      case1P2:
        "<strong>Зараз:</strong> керую операційним контуром і будую під нього IT (накладні/EDIN, боти замовлень, звіти, акції Happy Day, SMS/Viber) — один контур від полиці до системи.",
      case2Title: "Production AI: асистент + OCR / документи",
      case2P1:
        "<strong>Задача:</strong> AI у бізнесі має відповідати й дістати дані лише з реальних API / документів — без галюцинацій цін, наявності чи сум.",
      case2P2: "<strong>Зробив:</strong>",
      case2P3:
        "- Telegram-асистент → OpenAI → function calling / tools → зовнішні API та база знань; відповідь лише на перевірених даних.",
      case2P4:
        "- invoice-agent: LLM + OCR/vision → структуровані поля з накладних/рахунків → контур під 1С (FastAPI + React + Docker).",
      case2P5:
        "- Промпти, KB, обробка помилок API, деплой на VPS — як звичайний production-сервіс, не демо-чат.",
      case3Title: "Telegram-боти + замовлення / retail ops",
      case3P1:
        "<strong>Задача:</strong> прийняти замовлення з поля, сповістити власника, звіти й обмін з 1С без ручного Excel-хаосу.",
      case3P2:
        "<strong>Зробив:</strong> покрокові боти, веб-адмінка (маршрути, точки, товари), звіти HTML/CSV/XLSX/PDF, XML для 1С, інтеграції Nextcloud/CalDAV, моніторинг пошти та цін.",
      case4Title: "Payroll &amp; HR ERP",
      case4P1:
        "<strong>Задача:</strong> зарплата, табель, KPI й коригування в одній системі замість розрізнених таблиць.",
      case4P2:
        "<strong>Зробив:</strong> full-stack ERP (~80 точок мережі): працівники, розклад, розрахунок ЗП, KPI, перегляди й деталі нарахувань.",
      figPayDetails: "Деталі нарахувань",
      figPayView: "Перегляд ЗП",
      case5Title: "Loyalty: Admin + Android",
      case5P1:
        "<strong>Задача:</strong> повний контур лояльності: каса 1С → API → адмінка + мобільний клієнт для покупця (баланс, штрихкод, акції).",
      case5P2:
        "<strong>Зробив:</strong> web-admin (чеки, категорії, інтеграція 1С) + Android-додаток Ambar Loyalty (Compose): картка з балансом і barcode, профіль/транзакції, налаштування й push. Статус: пілот / ще не в публічному проді.",
      figChecks: "Моніторинг чеків",
      figCats: "Категорії",
      figLoyalHome: "Android · головна / картка",
      figLoyalProfile: "Android · профіль",
      figLoyalSettings: "Android · налаштування",
      case6Title: "SMS / Viber розсилки для retail",
      case6P1:
        "<strong>Задача:</strong> офіційні канали сповіщень мережі — не «з сірого номера», а узгоджений відправник під бренд.",
      case6P2:
        "<strong>Зробив:</strong> подав і провів реєстрацію офіційного SMS-відправника та окремо офіційного Viber-відправника для retail-мережі; налаштував і проводив розсилки через TurboSMS — альфа-імена / sender ID, шаблони, робочі кампанії.",
      case7Title: "BI + хмара + корпоративний сайт",
      case7P1:
        "<strong>Задача:</strong> аналітика продажів/залишків, файловий контур команди й публічний сайт мережі.",
      case7P2:
        "<strong>Зробив:</strong> ETL → PostgreSQL → Metabase/PostgREST; Nextcloud + OnlyOffice; сайт з локатором магазинів (Maps) і CMS. Деплой і моніторинг на VPS.",
      case8P1:
        "<strong>Задача:</strong> низьколатентний sniper для BTC 5m Up/Down на Polymarket — спочатку paper, live лише після жорстких метрик готовності.",
      case8P2:
        "<strong>Зробив:</strong> окремий engine (scalper): стратегія й сигнали, paper ledger, live-gate (кількість угод / WR / t-stat / PnL), headless 24/7 на Hetzner, dashboard /sniper, CI-тести, live вимкнений за замовчуванням.",
      case9P1:
        "<strong>Задача:</strong> дзеркало угод лідерів з ризик-лімітами й аналітикою — інженерний контур, а не «купи все підряд».",
      case9P2:
        "<strong>Зробив:</strong> watcher engine, discover/score лідерів, dashboard, auto-exit / scale-in, health-check, kill-switch, деплой Docker/systemd на VPS; спільний core з sniper (CLOB, HTTP, config).",
      case10Title: "AI Interiors (мокапи під фотошпалери)",
      case10P1: "<strong>Задача:</strong> сучасні інтер’єри під фотошпалери — світла порожня стіна в кадрі, щоб потім вирізати й підставляти шпалери.",
      case10P2: "<strong>Зробив:</strong> photoreal mockup-інтер’єри (bedroom / living) у мінімалістичному / Japandi стилі.",
      case11Title: "AI Lifestyle (чоловічі luxury-образи)",
      case11P1: "<strong>Задача:</strong> чоловічий персонаж у брендовій естетиці — photoreal кадри як реальні lifestyle-фото.",
      case11P2: "<strong>Зробив:</strong> тестову серію (private jet / bar).",
      case18Title: "1С ↔ API Bridge (mock)",
      case18P1: "<strong>Задача:</strong> показати міст сайт/бот ↔ 1С: залишки, замовлення, CommerceML, журнал обмінів.",
      case18P2: "<strong>Зробив:</strong> FastAPI mock-міст з REST/XML, UI обміну; приймає замовлення з Mini App і показує номер документа. Live на Hetzner.",
      linkOnec: "1C Bridge",
      case17Title: "Telegram Mini App + Bot",
      case17P1: "<strong>Задача:</strong> клікабельне демо Mini App магазину + бот з WebApp-кнопкою — каталог і замовлення без нативної розробки.",
      case17P2: "<strong>Зробив:</strong> каталог → кошик → замовлення з push у 1C Bridge, initData/demo bypass, адмінка, HTTPS (sslip.io). Live на Hetzner.",
      linkTma: "Telegram Mini App",
      case16Title: "Marketing Mini (SMS / Viber)",
      case16P1: "<strong>Задача:</strong> клікабельне демо розсилок SMS/Viber для retail — сегменти, sender, статуси доставки й відписка.",
      case16P2: "<strong>Зробив:</strong> FastAPI + SQLite + mock TurboSMS: контакти з opt-in/unsubscribe, кампанії, DLR, provider log. Live на Hetzner.",
      case15Title: "Telegram Bot Kit (ready demo)",
      case15P1: "<strong>Задача:</strong> універсальний шаблон бота-заявки, який можна показати клієнту одразу.",
      case15P2: "<strong>Зробив:</strong> web-симулятор + адмінка статусів; Telegram підключається токеном. Live на Hetzner.",
      linkBotKit: "Telegram Bot Kit",
      case14Title: "Local AI Box (LLM + RAG + Agent)",
      case14P1: "<strong>Задача:</strong> безпечна локальна AI — відповіді лише з документів, без відправки даних у хмару.",
      case14P2: "<strong>Зробив:</strong> FastAPI + Ollama + RAG/agent demo на Hetzner. Логін guest / demo123.",
      linkAiBox: "Local AI Box",
      case13Title: "Sales Bot (ready demo)",
      case13P1: "<strong>Задача:</strong> готове клікабельне демо sales-сценарію: каталог → замовлення → CRM, без очікування «зроблю з нуля».",
      case13P2: "<strong>Зробив:</strong> web-чат і адмінка; замовлення йде HTTP POST у mock CRM з логом відповіді. Live на Hetzner.",
      linkSalesBot: "Sales Bot",
      linkMarketing: "Marketing Mini",
      case12Title: "101stomatolog — іконки фільтрів UI",
      case12P1: "<strong>Задача:</strong> вивести на головну швидкі фільтри іконками з горизонтальним скролом (послуги, район, область, метро) + відео-пояснення.",
      case12P2: "<strong>Зробив:</strong> тестовий концепт стрічки іконок.",
      linkInteriors: "AI Interiors",
      linkLifestyle: "AI Lifestyle",
      linkStomatolog: "101stomatolog UI",
      intKicker: "AI interiors · wallpaper mockups",
      intTitle: "AI Interiors",
      intLead: "Сучасні інтер’єри під фотошпалери: світла порожня стіна в кадрі, чиста композиція, готові як мокапи. Нижче — приклади.",
      intBack: "← Портфоліо",
      intGalleryLabel: "Приклади",
      intGalleryTitle: "Готові інтер’єри",
      intCap1: "Bedroom · empty wall mockup",
      intCap2: "Living · Japandi mockup",
      lifeKicker: "AI lifestyle · male luxury looks",
      lifeTitle: "AI Lifestyle",
      lifeLead: "Чоловічий персонаж у брендовій естетиці: private jet, бар, аксесуари. Photoreal кадри під кампанії / соцмережі — як реальні фото.",
      lifeBack: "← Портфоліо",
      lifeGalleryLabel: "Тестові приклади",
      lifeGalleryTitle: "Чоловічий образ",
      lifeCap1: "Private jet · luxury look",
      lifeCap2: "Bar · evening look",
      stoKicker: "UI concept · 101stomatolog",
      stoTitle: "Filter icons",
      stoLead: "Тестовий концепт стрічки іконок на головну: послуги, район, область, метро, карта, відео-пояснення — з горизонтальним переглядом.",
      stoBack: "← Портфоліо",
      stoGalleryLabel: "Тест",
      stoGalleryTitle: "Стрічка фільтрів",
      stoCap1: "Homepage · quick filter icons",
      figGross: "Валовий прибуток",
      figSite: "Корпоративний сайт",
      figMap: "Карта магазинів",
      stackLabel: "Навички",
      stackTitle: "Чим збираю системи",
      stackAiBody:
        "OpenAI API · function calling / tool use · OCR / vision · KB і промпти · RAG-підхід до фактів · автоматизація документів і діалогів у проді",
      stackInt: "Інтеграції",
      stackIntBody:
        "Telegram · 1С / CommerceML · Nextcloud (CalDAV / WebDAV / Deck) · Firebase · Metabase / PostgREST · Google Maps · Polymarket CLOB",
      stackMsg: "Messaging / розсилки",
      stackMsgBody:
        "Офіційний SMS-відправник · офіційний Viber-відправник · TurboSMS · альфа-імена / sender ID · кампанії для retail",
      stackMarkets: "Markets / realtime",
      stackMarketsBody:
        "Polymarket CLOB · paper→live gates · copy-trading · sniper engines · FastAPI dashboards · Hetzner / systemd",
      linksLabel: "Посилання",
      linksTitle: "Готові демо й контакти",
      liveDemosJump: "готові демо ↓",
      linkPortfolio: "Портфоліо",
      linkDemo: "Demo",
      linkTelegramBot: "Telegram бот",
      linkGithub: "GitHub",
      linkEmail: "Email",
      linkPdf: "PDF",
      footerNda:
        "Внутрішні NDA-системи показані описом і sanitized-скрінами — без auth-URL і секретів.",
      nodePos: "Каса / точка",
      nodeHintPos: "POS · чеки · 1С",
      nodeApi: "API / бот",
      nodeHintApi: "Telegram · FastAPI",
      nodeDocker: "Docker",
      nodeHintDocker: "Compose · VPS",
      nodeAdmin: "Адмінка",
      nodeHintAdmin: "React · ERP",
      nodeMon: "Моніторинг",
      nodeHintMon: "Prometheus · Grafana",
    }),
    en: Object.assign({}, SHARED, {
      metaDesc:
        "gooru — DevOps, Full-Stack, production AI for retail and market systems: bots, OpenAI/OCR, ERP, BI, Polymarket engines.",
      langAria: "Language",
      themeLight: "Light",
      themeDark: "Dark",
      lead:
        "Full production loop for retail: POS → API / bot → Docker → admin → monitoring. Also market engines (sniper / copy-trading) with paper-first risk gates. AI only on real data.",
      ctaWrite: "Email me",
      workLabel: "Work",
      workTitle: "Projects & ready demos",
      case1Title: "Retail ops → automation",
      case1Tag1: "1C",
      case1Tag2: "Inbound",
      case1Tag3: "Reports",
      case1Tag4: "Promos",
      case1P1:
        "<strong>Background:</strong> long run as a data-entry / store ops operator — physical goods receiving, inbound posting, pricing, reports, promo analysis, raffle receipt counts, organizing in-store events.",
      case1P2:
        "<strong>Now:</strong> run the ops loop and build IT around it (invoices/EDI, order bots, reports, Happy Day promos, SMS/Viber) — one path from shelf to system.",
      case2Title: "Production AI: assistant + OCR / documents",
      case2P1:
        "<strong>Problem:</strong> business AI must answer and fetch data only from real APIs / documents — no hallucinated prices, stock, or totals.",
      case2P2: "<strong>Built:</strong>",
      case2P3:
        "- Telegram assistant → OpenAI → function calling / tools → external APIs and knowledge base; answers only on verified data.",
      case2P4:
        "- invoice-agent: LLM + OCR/vision → structured fields from invoices → 1C-oriented flow (FastAPI + React + Docker).",
      case2P5:
        "- Prompts, KB, API error handling, VPS deploy — as a normal production service, not a demo chat.",
      case3Title: "Telegram bots + retail ops",
      case3P1:
        "<strong>Problem:</strong> capture field orders, notify owners, report and sync with 1C without spreadsheet chaos.",
      case3P2:
        "<strong>Built:</strong> step-by-step bots, web admin (routes, points, products), HTML/CSV/XLSX/PDF reports, XML for 1C, Nextcloud/CalDAV, mail and price monitoring.",
      case4Title: "Payroll &amp; HR ERP",
      case4P1:
        "<strong>Problem:</strong> payroll, timesheets, KPI and adjustments in one system instead of scattered sheets.",
      case4P2:
        "<strong>Built:</strong> full-stack ERP (~80 retail locations): employees, schedule, salary calc, KPI, payroll views and details.",
      figPayDetails: "Payroll details",
      figPayView: "Payroll view",
      case5Title: "Loyalty: Admin + Android",
      case5P1:
        "<strong>Problem:</strong> full loyalty loop: POS/1C → API → admin + customer Android app (balance, barcode, promos).",
      case5P2:
        "<strong>Built:</strong> web-admin (checks, categories, 1C) + Ambar Loyalty Android (Compose): card with balance & barcode, profile/transactions, settings & push. Status: pilot / not in public prod yet.",
      figChecks: "Checks monitoring",
      figCats: "Categories",
      figLoyalHome: "Android · home / card",
      figLoyalProfile: "Android · profile",
      figLoyalSettings: "Android · settings",
      case6Title: "SMS / Viber messaging for retail",
      case6P1:
        "<strong>Problem:</strong> official notification channels for a retail chain — branded senders, not grey-route numbers.",
      case6P2:
        "<strong>Built:</strong> registered an official SMS sender and a separate official Viber sender for the retail network; set up and ran campaigns via TurboSMS — alpha names / sender IDs, templates, production mailings.",
      case7Title: "BI + cloud + corporate site",
      case7P1:
        "<strong>Problem:</strong> sales/inventory analytics, team file cloud, and public retail site.",
      case7P2:
        "<strong>Built:</strong> ETL → PostgreSQL → Metabase/PostgREST; Nextcloud + OnlyOffice; store locator (Maps) + CMS. VPS deploy and monitoring.",
      case8P1:
        "<strong>Problem:</strong> low-latency BTC 5m Up/Down sniper on Polymarket — paper first, live only after hard readiness metrics.",
      case8P2:
        "<strong>Built:</strong> dedicated scalper engine: strategy/signals, paper ledger, live-gate (trade count / WR / t-stat / PnL), headless 24/7 on Hetzner, /sniper dashboard, CI tests, live off by default.",
      case9P1:
        "<strong>Problem:</strong> mirror leader trades with risk limits and analytics — an engineering loop, not blind copy-all.",
      case9P2:
        "<strong>Built:</strong> watcher engine, leader discover/score, dashboard, auto-exit / scale-in, health-check, kill-switch, Docker/systemd on VPS; shared core with sniper (CLOB, HTTP, config).",
      case10Title: "AI Interiors (wallpaper mockups)",
      case10P1: "<strong>Problem:</strong> modern interiors for wallpaper mockups — a light empty wall in frame for cutout and wallpaper placement.",
      case10P2: "<strong>Built:</strong> photoreal mockup interiors (bedroom / living) in minimal / Japandi style.",
      case11Title: "AI Lifestyle (male luxury looks)",
      case11P1: "<strong>Problem:</strong> a male character in brand aesthetics — photoreal frames that read as real lifestyle photos.",
      case11P2: "<strong>Built:</strong> a test series (private jet / bar).",
      case18Title: "1C ↔ API Bridge (mock)",
      case18P1: "<strong>Problem:</strong> show a shop/bot ↔ 1C bridge: stock, orders, CommerceML, exchange log.",
      case18P2: "<strong>Built:</strong> FastAPI mock bridge with REST/XML + exchange UI; accepts Mini App orders and shows doc numbers. Live on Hetzner.",
      linkOnec: "1C Bridge",
      case17Title: "Telegram Mini App + Bot",
      case17P1: "<strong>Problem:</strong> clickable Mini App shop + bot with WebApp button — catalog and orders without a native app.",
      case17P2: "<strong>Built:</strong> catalog → cart → order with push to 1C Bridge, initData/demo bypass, admin, HTTPS (sslip.io). Live on Hetzner.",
      linkTma: "Telegram Mini App",
      case16Title: "Marketing Mini (SMS / Viber)",
      case16P1: "<strong>Problem:</strong> clickable SMS/Viber campaign demo for retail — segments, sender, delivery statuses, unsubscribe.",
      case16P2: "<strong>Built:</strong> FastAPI + SQLite + mock TurboSMS: contacts with opt-in/unsubscribe, campaigns, DLR, provider log. Live on Hetzner.",
      case15Title: "Telegram Bot Kit (ready demo)",
      case15P1: "<strong>Problem:</strong> a universal request-bot template you can show a client immediately.",
      case15P2: "<strong>Built:</strong> web simulator + status admin; Telegram via token. Live on Hetzner.",
      linkBotKit: "Telegram Bot Kit",
      case14Title: "Local AI Box (LLM + RAG + Agent)",
      case14P1: "<strong>Problem:</strong> secure local AI — answers only from your docs, no cloud leak.",
      case14P2: "<strong>Built:</strong> FastAPI + Ollama + RAG/agent demo on Hetzner. Login guest / demo123.",
      linkAiBox: "Local AI Box",
      case13Title: "Sales Bot (ready demo)",
      case13P1: "<strong>Problem:</strong> a clickable sales flow demo: catalog → order → CRM, without a build-from-scratch wait.",
      case13P2: "<strong>Built:</strong> web chat + admin; orders POST to a mock CRM with response logging. Live on Hetzner.",
      linkSalesBot: "Sales Bot",
      linkMarketing: "Marketing Mini",
      case12Title: "101stomatolog — filter icons UI",
      case12P1: "<strong>Problem:</strong> surface homepage filters as a horizontal icon strip (services, district, region, metro) + explainer video.",
      case12P2: "<strong>Built:</strong> a test concept for the filter icon strip.",
      linkInteriors: "AI Interiors",
      linkLifestyle: "AI Lifestyle",
      linkStomatolog: "101stomatolog UI",
      intKicker: "AI interiors · wallpaper mockups",
      intTitle: "AI Interiors",
      intLead: "Modern interiors for wallpaper mockups: light empty wall in frame, clean composition. Examples below.",
      intBack: "← Portfolio",
      intGalleryLabel: "Examples",
      intGalleryTitle: "Ready interiors",
      intCap1: "Bedroom · empty wall mockup",
      intCap2: "Living · Japandi mockup",
      lifeKicker: "AI lifestyle · male luxury looks",
      lifeTitle: "AI Lifestyle",
      lifeLead: "Male character in brand aesthetics: private jet, bar, accessories. Photoreal frames for campaigns / social — like real photos.",
      lifeBack: "← Portfolio",
      lifeGalleryLabel: "Test examples",
      lifeGalleryTitle: "Male look",
      lifeCap1: "Private jet · luxury look",
      lifeCap2: "Bar · evening look",
      stoKicker: "UI concept · 101stomatolog",
      stoTitle: "Filter icons",
      stoLead: "Test concept for a homepage icon strip: services, district, region, metro, map, explainer video — horizontally scrollable.",
      stoBack: "← Portfolio",
      stoGalleryLabel: "Test",
      stoGalleryTitle: "Filter strip",
      stoCap1: "Homepage · quick filter icons",
      figGross: "Gross profit",
      figSite: "Corporate site",
      figMap: "Store map",
      stackLabel: "Skills",
      stackTitle: "How I ship systems",
      stackAiBody:
        "OpenAI API · function calling / tool use · OCR / vision · KB &amp; prompts · fact-grounded answers · document &amp; dialog automation in production",
      stackInt: "Integrations",
      stackIntBody:
        "Telegram · 1C / CommerceML · Nextcloud (CalDAV / WebDAV / Deck) · Firebase · Metabase / PostgREST · Google Maps · Polymarket CLOB",
      stackMsg: "Messaging / campaigns",
      stackMsgBody:
        "Official SMS sender · official Viber sender · TurboSMS · alpha names / sender ID · retail campaigns",
      stackMarkets: "Markets / realtime",
      stackMarketsBody:
        "Polymarket CLOB · paper→live gates · copy-trading · sniper engines · FastAPI dashboards · Hetzner / systemd",
      linksLabel: "Links",
      linksTitle: "Ready demos & contacts",
      linkPortfolio: "Portfolio",
      linkDemo: "Demo",
      linkTelegramBot: "Telegram bot",
      linkGithub: "GitHub",
      linkEmail: "Email",
      linkPdf: "PDF",
      footerNda:
        "NDA systems are shown via description and sanitized screenshots — no auth URLs or secrets.",
      nodePos: "POS / store",
      nodeHintPos: "POS · receipts · 1C",
      nodeApi: "API / bot",
      nodeHintApi: "Telegram · FastAPI",
      nodeDocker: "Docker",
      nodeHintDocker: "Compose · VPS",
      nodeAdmin: "Admin",
      nodeHintAdmin: "React · ERP",
      nodeMon: "Monitoring",
      nodeHintMon: "Prometheus · Grafana",
    }),
    de: Object.assign({}, SHARED, {
      metaDesc:
        "gooru — DevOps, Full-Stack, Production-AI für Retail und Market Systems: Bots, OpenAI/OCR, ERP, BI, Polymarket-Engines.",
      langAria: "Sprache",
      themeLight: "Hell",
      themeDark: "Dunkel",
      lead:
        "Vollständiger Production-Loop für Retail: Kasse → API / Bot → Docker → Admin → Monitoring. Dazu Market-Engines (Sniper / Copy-Trading) mit Paper-first und Risk-Gates. AI nur auf echten Daten.",
      ctaWrite: "Schreiben",
      workLabel: "Cases",
      workTitle: "Projekte & Ready Demos",
      case1Title: "Retail-Ops → Automatisierung",
      case1Tag1: "1C",
      case1Tag2: "Wareneingang",
      case1Tag3: "Reports",
      case1Tag4: "Aktionen",
      case1P1:
        "<strong>Hintergrund:</strong> lange als Datenerfassungs-/Filial-Operator gearbeitet — Wareneingang, Buchung, Preisbildung, Reports, Aktionsanalyse, Bon-Berechnung für Gewinnspiele, Filial-Events.",
      case1P2:
        "<strong>Heute:</strong> ich führe den Ops-Loop und baue IT darum (Rechnungen/EDI, Bestellbots, Reports, Happy-Day-Aktionen, SMS/Viber) — ein Weg vom Regal zum System.",
      case2Title: "Production-AI: Assistent + OCR / Dokumente",
      case2P1:
        "<strong>Aufgabe:</strong> Business-AI darf nur aus echten APIs / Dokumenten antworten und Daten holen — keine Halluzinationen bei Preisen, Bestand oder Summen.",
      case2P2: "<strong>Gebaut:</strong>",
      case2P3:
        "- Telegram-Assistent → OpenAI → Function Calling / Tools → externe APIs und Wissensbasis; Antworten nur auf verifizierten Daten.",
      case2P4:
        "- invoice-agent: LLM + OCR/Vision → strukturierte Felder aus Rechnungen → 1C-Flow (FastAPI + React + Docker).",
      case2P5:
        "- Prompts, KB, API-Fehlerbehandlung, VPS-Deploy — als echter Production-Service, kein Demo-Chat.",
      case3Title: "Telegram-Bots + Retail-Ops",
      case3P1:
        "<strong>Aufgabe:</strong> Feldaufträge annehmen, Eigentümer benachrichtigen, Reports und 1C-Austausch ohne Excel-Chaos.",
      case3P2:
        "<strong>Gebaut:</strong> Schritt-für-Schritt-Bots, Web-Admin (Routen, Filialen, Produkte), HTML/CSV/XLSX/PDF-Reports, XML für 1C, Nextcloud/CalDAV, Mail- und Preis-Monitoring.",
      case4Title: "Payroll &amp; HR ERP",
      case4P1:
        "<strong>Aufgabe:</strong> Gehalt, Zeiterfassung, KPI und Korrekturen in einem System statt verstreuter Tabellen.",
      case4P2:
        "<strong>Gebaut:</strong> Full-Stack-ERP (~80 Filialen): Mitarbeiter, Schichtplan, Gehaltsberechnung, KPI, Ansichten und Details.",
      figPayDetails: "Abrechnungsdetails",
      figPayView: "Gehaltsansicht",
      case5Title: "Loyalty: Admin + Android",
      case5P1:
        "<strong>Aufgabe:</strong> voller Loyalty-Kreis: Kasse/1C → API → Admin + Kunden-App (Saldo, Barcode, Aktionen).",
      case5P2:
        "<strong>Gebaut:</strong> Web-Admin (Bons, Kategorien, 1C) + Ambar Loyalty Android (Compose): Karte mit Saldo & Barcode, Profil/Transaktionen, Einstellungen & Push. Status: Pilot / noch nicht öffentlich live.",
      figChecks: "Bon-Monitoring",
      figCats: "Kategorien",
      figLoyalHome: "Android · Start / Karte",
      figLoyalProfile: "Android · Profil",
      figLoyalSettings: "Android · Einstellungen",
      case6Title: "SMS / Viber für Retail",
      case6P1:
        "<strong>Aufgabe:</strong> offizielle Benachrichtigungskanäle der Kette — Marken-Absender, keine Grauzahlen.",
      case6P2:
        "<strong>Gebaut:</strong> offiziellen SMS-Absender und separaten Viber-Absender für die Retail-Kette registriert; Kampagnen über TurboSMS — Alpha-Namen / Sender-ID, Vorlagen, Produktivversand.",
      case7Title: "BI + Cloud + Firmenwebsite",
      case7P1:
        "<strong>Aufgabe:</strong> Verkaufs-/Bestandsanalytik, Team-Datei-Cloud und öffentliche Retail-Website.",
      case7P2:
        "<strong>Gebaut:</strong> ETL → PostgreSQL → Metabase/PostgREST; Nextcloud + OnlyOffice; Filialfinder (Maps) + CMS. VPS-Deploy und Monitoring.",
      case8P1:
        "<strong>Aufgabe:</strong> latenzarmer BTC-5m-Up/Down-Sniper auf Polymarket — zuerst Paper, Live nur nach harten Readiness-Metriken.",
      case8P2:
        "<strong>Gebaut:</strong> eigener Scalper-Engine: Strategie/Signale, Paper-Ledger, Live-Gate (Trades / WR / t-Stat / PnL), Headless 24/7 auf Hetzner, Dashboard /sniper, CI-Tests, Live standardmäßig aus.",
      case9P1:
        "<strong>Aufgabe:</strong> Leader-Trades mit Risk-Limits und Analytics spiegeln — Engineering-Loop, kein blindes Copy-all.",
      case9P2:
        "<strong>Gebaut:</strong> Watcher-Engine, Leader Discover/Score, Dashboard, Auto-Exit / Scale-in, Health-Check, Kill-Switch, Docker/systemd auf VPS; gemeinsamer Core mit Sniper (CLOB, HTTP, Config).",
      case10Title: "AI Interiors (Tapeten-Mockups)",
      case10P1: "<strong>Aufgabe:</strong> moderne Interieurs für Tapeten-Mockups — helle leere Wand im Bild für Freisteller.",
      case10P2: "<strong>Gebaut:</strong> photoreale Mockup-Interieurs (Schlafzimmer / Wohnzimmer) im Minimal-/Japandi-Stil.",
      case11Title: "AI Lifestyle (männliche Luxury-Looks)",
      case11P1: "<strong>Aufgabe:</strong> männliche Figur in Brand-Ästhetik — photoreale Frames wie echte Lifestyle-Fotos.",
      case11P2: "<strong>Gebaut:</strong> Testserie (Private Jet / Bar).",
      case18Title: "1C ↔ API Bridge (mock)",
      case18P1: "<strong>Aufgabe:</strong> Brücke Shop/Bot ↔ 1C: Bestand, Bestellungen, CommerceML, Log.",
      case18P2: "<strong>Gebaut:</strong> FastAPI-Mock mit REST/XML + UI; nimmt Mini-App-Bestellungen an und zeigt Belegnummern. Live auf Hetzner.",
      linkOnec: "1C Bridge",
      case17Title: "Telegram Mini App + Bot",
      case17P1: "<strong>Aufgabe:</strong> klickbares Mini-App-Shop-Demo + Bot mit WebApp-Button — ohne native App.",
      case17P2: "<strong>Gebaut:</strong> Katalog → Warenkorb → Bestellung mit Push an 1C Bridge, initData/Demo, Admin, HTTPS. Live auf Hetzner.",
      linkTma: "Telegram Mini App",
      case16Title: "Marketing Mini (SMS / Viber)",
      case16P1: "<strong>Aufgabe:</strong> klickbares SMS/Viber-Kampagnen-Demo — Segmente, Sender, Zustellstatus, Abmeldung.",
      case16P2: "<strong>Gebaut:</strong> FastAPI + SQLite + TurboSMS-Mock: Kontakte mit Opt-in/Unsubscribe, Kampagnen, DLR, Provider-Log. Live auf Hetzner.",
      case15Title: "Telegram Bot Kit (ready demo)",
      case15P1: "<strong>Aufgabe:</strong> universelles Anfrage-Bot-Template zum sofortigen Zeigen.",
      case15P2: "<strong>Gebaut:</strong> Web-Simulator + Status-Admin; Telegram per Token. Live auf Hetzner.",
      linkBotKit: "Telegram Bot Kit",
      case14Title: "Local AI Box (LLM + RAG + Agent)",
      case14P1: "<strong>Aufgabe:</strong> sichere lokale KI — Antworten nur aus Dokumenten.",
      case14P2: "<strong>Gebaut:</strong> FastAPI + Ollama + RAG/Agent-Demo auf Hetzner. Login guest / demo123.",
      linkAiBox: "Local AI Box",
      case13Title: "Sales Bot (ready demo)",
      case13P1: "<strong>Aufgabe:</strong> klickbares Sales-Demo: Katalog → Bestellung → CRM, ohne Wartezeit auf Neubau.",
      case13P2: "<strong>Gebaut:</strong> Web-Chat + Admin; Bestellungen per HTTP POST an Mock-CRM mit Response-Log. Live auf Hetzner.",
      linkSalesBot: "Sales Bot",
      linkMarketing: "Marketing Mini",
      case12Title: "101stomatolog — Filter-Icons UI",
      case12P1: "<strong>Aufgabe:</strong> Filter auf der Startseite als horizontale Icon-Leiste (Leistungen, Bezirk, Region, Metro) + Erklärvideo.",
      case12P2: "<strong>Gebaut:</strong> Testkonzept für die Filter-Icon-Leiste.",
      linkInteriors: "AI Interiors",
      linkLifestyle: "AI Lifestyle",
      linkStomatolog: "101stomatolog UI",
      intKicker: "AI interiors · wallpaper mockups",
      intTitle: "AI Interiors",
      intLead: "Moderne Interieurs für Tapeten-Mockups: helle leere Wand, klare Komposition. Beispiele unten.",
      intBack: "← Portfolio",
      intGalleryLabel: "Beispiele",
      intGalleryTitle: "Fertige Interieurs",
      intCap1: "Bedroom · empty wall mockup",
      intCap2: "Living · Japandi mockup",
      lifeKicker: "AI lifestyle · male luxury looks",
      lifeTitle: "AI Lifestyle",
      lifeLead: "Männliche Figur in Brand-Ästhetik: Private Jet, Bar, Accessoires. Photoreale Frames für Kampagnen / Social.",
      lifeBack: "← Portfolio",
      lifeGalleryLabel: "Testbeispiele",
      lifeGalleryTitle: "Männlicher Look",
      lifeCap1: "Private jet · luxury look",
      lifeCap2: "Bar · evening look",
      stoKicker: "UI concept · 101stomatolog",
      stoTitle: "Filter icons",
      stoLead: "Testkonzept einer Icon-Leiste: Leistungen, Bezirk, Region, Metro, Karte, Video — horizontal scrollbar.",
      stoBack: "← Portfolio",
      stoGalleryLabel: "Test",
      stoGalleryTitle: "Filterleiste",
      stoCap1: "Homepage · quick filter icons",
      figGross: "Bruttogewinn",
      figSite: "Firmenwebsite",
      figMap: "Filialkarte",
      stackLabel: "Skills",
      stackTitle: "Womit ich Systeme baue",
      stackAiBody:
        "OpenAI API · Function Calling / Tool Use · OCR / Vision · KB &amp; Prompts · faktenbasierte Antworten · Dokument- &amp; Dialog-Automation in Produktion",
      stackInt: "Integrationen",
      stackIntBody:
        "Telegram · 1C / CommerceML · Nextcloud (CalDAV / WebDAV / Deck) · Firebase · Metabase / PostgREST · Google Maps · Polymarket CLOB",
      stackMsg: "Messaging / Kampagnen",
      stackMsgBody:
        "Offizieller SMS-Absender · offizieller Viber-Absender · TurboSMS · Alpha-Namen / Sender-ID · Retail-Kampagnen",
      stackMarkets: "Markets / realtime",
      stackMarketsBody:
        "Polymarket CLOB · Paper→Live-Gates · Copy-Trading · Sniper-Engines · FastAPI-Dashboards · Hetzner / systemd",
      linksLabel: "Links",
      linksTitle: "Ready Demos & Kontakt",
      linkPortfolio: "Portfolio",
      linkDemo: "Demo",
      linkTelegramBot: "Telegram bot",
      linkGithub: "GitHub",
      linkEmail: "Email",
      linkPdf: "PDF",
      footerNda:
        "NDA-Systeme werden über Beschreibung und bereinigte Screenshots gezeigt — ohne Auth-URLs oder Secrets.",
      nodePos: "Kasse / Filiale",
      nodeHintPos: "POS · Bons · 1C",
      nodeApi: "API / Bot",
      nodeHintApi: "Telegram · FastAPI",
      nodeDocker: "Docker",
      nodeHintDocker: "Compose · VPS",
      nodeAdmin: "Admin",
      nodeHintAdmin: "React · ERP",
      nodeMon: "Monitoring",
      nodeHintMon: "Prometheus · Grafana",
    }),
    pl: Object.assign({}, SHARED, {
      metaDesc:
        "gooru — DevOps, Full-Stack, production AI dla retail i market systems: boty, OpenAI/OCR, ERP, BI, silniki Polymarket.",
      langAria: "Język",
      themeLight: "Jasny",
      themeDark: "Ciemny",
      lead:
        "Pełny kontur production dla retail: kasa → API / bot → Docker → admin → monitoring. Równolegle — market engines (sniper / copy-trading) z paper-first i risk-gate’ami. AI tylko na realnych danych.",
      ctaWrite: "Napisz",
      workLabel: "Case’y",
      workTitle: "Projekty i ready demos",
      case1Title: "Retail ops → automatyzacja",
      case1Tag1: "1C",
      case1Tag2: "Przyjęcia",
      case1Tag3: "Raporty",
      case1Tag4: "Promocje",
      case1P1:
        "<strong>Tło:</strong> długo pracowałem jako operator wprowadzania danych / ops sklepu — przyjęcie towaru, przychód, wycena, raporty, analiza promocji, wyliczanie paragonów pod losowania, organizacja eventów w sklepach.",
      case1P2:
        "<strong>Dziś:</strong> prowadzę kontur operacyjny i buduję pod niego IT (faktury/EDI, boty zamówień, raporty, promocje Happy Day, SMS/Viber) — jedna ścieżka od półki do systemu.",
      case2Title: "Production AI: asystent + OCR / dokumenty",
      case2P1:
        "<strong>Problem:</strong> AI w biznesie musi odpowiadać i brać dane tylko z realnych API / dokumentów — bez halucynacji cen, stanów czy sum.",
      case2P2: "<strong>Zrobiłem:</strong>",
      case2P3:
        "- Asystent Telegram → OpenAI → function calling / tools → zewnętrzne API i baza wiedzy; odpowiedzi tylko na zweryfikowanych danych.",
      case2P4:
        "- invoice-agent: LLM + OCR/vision → strukturyzowane pola z faktur → przepływ pod 1C (FastAPI + React + Docker).",
      case2P5:
        "- Prompty, KB, obsługa błędów API, deploy na VPS — jak zwykły serwis production, nie demo-chat.",
      case3Title: "Boty Telegram + retail ops",
      case3P1:
        "<strong>Problem:</strong> przyjąć zamówienie z pola, powiadomić właściciela, raporty i wymiana z 1C bez chaosu w Excelu.",
      case3P2:
        "<strong>Zrobiłem:</strong> boty krok po kroku, web-admin (trasy, punkty, produkty), raporty HTML/CSV/XLSX/PDF, XML dla 1C, Nextcloud/CalDAV, monitoring poczty i cen.",
      case4Title: "Payroll &amp; HR ERP",
      case4P1:
        "<strong>Problem:</strong> pensje, ewidencja czasu, KPI i korekty w jednym systemie zamiast rozproszonych tabel.",
      case4P2:
        "<strong>Zrobiłem:</strong> full-stack ERP (~80 punktów sieci): pracownicy, grafik, kalkulacja pensji, KPI, widoki i szczegóły.",
      figPayDetails: "Szczegóły wypłat",
      figPayView: "Widok pensji",
      case5Title: "Loyalty: Admin + Android",
      case5P1:
        "<strong>Problem:</strong> pełny kontur lojalności: kasa/1C → API → admin + aplikacja klienta (saldo, kod kreskowy, promocje).",
      case5P2:
        "<strong>Zrobiłem:</strong> web-admin (paragony, kategorie, 1C) + Ambar Loyalty Android (Compose): karta z saldem i barcode, profil/transakcje, ustawienia i push. Status: pilot / jeszcze nie w publicznym prodzie.",
      figChecks: "Monitoring paragonów",
      figCats: "Kategorie",
      figLoyalHome: "Android · start / karta",
      figLoyalProfile: "Android · profil",
      figLoyalSettings: "Android · ustawienia",
      case6Title: "SMS / Viber dla retail",
      case6P1:
        "<strong>Problem:</strong> oficjalne kanały powiadomień sieci — nadawca pod markę, nie szare numery.",
      case6P2:
        "<strong>Zrobiłem:</strong> rejestracja oficjalnego nadawcy SMS i osobno Viber dla sieci retail; kampanie przez TurboSMS — nazwy alfa / sender ID, szablony, wysyłki produkcyjne.",
      case7Title: "BI + chmura + strona firmowa",
      case7P1:
        "<strong>Problem:</strong> analityka sprzedaży/stanów, chmura plików zespołu i publiczna strona sieci.",
      case7P2:
        "<strong>Zrobiłem:</strong> ETL → PostgreSQL → Metabase/PostgREST; Nextcloud + OnlyOffice; lokalizator sklepów (Maps) + CMS. Deploy i monitoring na VPS.",
      case8P1:
        "<strong>Problem:</strong> niskolatencyjny sniper BTC 5m Up/Down na Polymarket — najpierw paper, live dopiero po twardych metrykach gotowości.",
      case8P2:
        "<strong>Zrobiłem:</strong> osobny silnik scalper: strategia/sygnały, paper ledger, live-gate (liczba transakcji / WR / t-stat / PnL), headless 24/7 na Hetzner, dashboard /sniper, testy CI, live domyślnie wyłączony.",
      case9P1:
        "<strong>Problem:</strong> lustro transakcji liderów z limitami ryzyka i analityką — kontur inżynierski, nie ślepe copy-all.",
      case9P2:
        "<strong>Zrobiłem:</strong> watcher engine, discover/score liderów, dashboard, auto-exit / scale-in, health-check, kill-switch, deploy Docker/systemd na VPS; wspólny core ze sniperem (CLOB, HTTP, config).",
      case10Title: "AI Interiors (mockupy fototapet)",
      case10P1: "<strong>Problem:</strong> nowoczesne wnętrza pod mockupy fototapet — jasna pusta ściana w kadrze do wycinania.",
      case10P2: "<strong>Zrobiłem:</strong> photoreal mockupy wnętrz (sypialnia / salon) w stylu minimal / Japandi.",
      case11Title: "AI Lifestyle (męskie luxury looki)",
      case11P1: "<strong>Problem:</strong> męska postać w estetyce brandowej — photoreal kadry jak prawdziwe zdjęcia lifestyle.",
      case11P2: "<strong>Zrobiłem:</strong> serię testową (private jet / bar).",
      case18Title: "1C ↔ API Bridge (mock)",
      case18P1: "<strong>Problem:</strong> most sklep/bot ↔ 1C: stany, zamowienia, CommerceML, log wymiany.",
      case18P2: "<strong>Zrobilem:</strong> FastAPI mock z REST/XML + UI; przyjmuje zamowienia z Mini App i pokazuje numery dokumentow. Live na Hetzner.",
      linkOnec: "1C Bridge",
      case17Title: "Telegram Mini App + Bot",
      case17P1: "<strong>Problem:</strong> klikalne demo Mini App sklepu + bot z przyciskiem WebApp — bez natywnej aplikacji.",
      case17P2: "<strong>Zrobilem:</strong> katalog → koszyk → zamowienie z push do 1C Bridge, initData/demo, admin, HTTPS. Live na Hetzner.",
      linkTma: "Telegram Mini App",
      case16Title: "Marketing Mini (SMS / Viber)",
      case16P1: "<strong>Problem:</strong> klikalne demo kampanii SMS/Viber — segmenty, sender, statusy doreczenia, wypisanie.",
      case16P2: "<strong>Zrobilem:</strong> FastAPI + SQLite + mock TurboSMS: kontakty z opt-in/unsubscribe, kampanie, DLR, log providera. Live na Hetzner.",
      case15Title: "Telegram Bot Kit (ready demo)",
      case15P1: "<strong>Problem:</strong> uniwersalny szablon bota-zgloszenia do pokazania od razu.",
      case15P2: "<strong>Zrobilem:</strong> web-symulator + admin statusow; Telegram przez token. Live na Hetzner.",
      linkBotKit: "Telegram Bot Kit",
      case14Title: "Local AI Box (LLM + RAG + Agent)",
      case14P1: "<strong>Problem:</strong> bezpieczne lokalne AI — odpowiedzi tylko z dokumentow.",
      case14P2: "<strong>Zrobilem:</strong> FastAPI + Ollama + RAG/agent demo na Hetzner. Login guest / demo123.",
      linkAiBox: "Local AI Box",
      case13Title: "Sales Bot (ready demo)",
      case13P1: "<strong>Problem:</strong> klikalne demo sprzedazy: katalog → zamowienie → CRM, bez czekania na budowe od zera.",
      case13P2: "<strong>Zrobilem:</strong> web-czat + admin; zamowienia HTTP POST do mock CRM z logiem odpowiedzi. Live na Hetzner.",
      linkSalesBot: "Sales Bot",
      linkMarketing: "Marketing Mini",
      case12Title: "101stomatolog — ikony filtrów UI",
      case12P1: "<strong>Problem:</strong> pokazać filtry na stronie głównej jako poziomy pasek ikon (usługi, dzielnica, region, metro) + wideo.",
      case12P2: "<strong>Zrobiłem:</strong> testowy koncept paska ikon filtrów.",
      linkInteriors: "AI Interiors",
      linkLifestyle: "AI Lifestyle",
      linkStomatolog: "101stomatolog UI",
      intKicker: "AI interiors · wallpaper mockups",
      intTitle: "AI Interiors",
      intLead: "Nowoczesne wnętrza pod mockupy fototapet: jasna pusta ściana, czysta kompozycja. Przykłady poniżej.",
      intBack: "← Portfolio",
      intGalleryLabel: "Przykłady",
      intGalleryTitle: "Gotowe wnętrza",
      intCap1: "Bedroom · empty wall mockup",
      intCap2: "Living · Japandi mockup",
      lifeKicker: "AI lifestyle · male luxury looks",
      lifeTitle: "AI Lifestyle",
      lifeLead: "Męska postać w estetyce brandowej: private jet, bar, akcesoria. Photoreal kadry pod kampanie / social.",
      lifeBack: "← Portfolio",
      lifeGalleryLabel: "Przykłady testowe",
      lifeGalleryTitle: "Męski look",
      lifeCap1: "Private jet · luxury look",
      lifeCap2: "Bar · evening look",
      stoKicker: "UI concept · 101stomatolog",
      stoTitle: "Filter icons",
      stoLead: "Testowy koncept paska ikon: usługi, dzielnica, region, metro, mapa, wideo — przewijanie w poziomie.",
      stoBack: "← Portfolio",
      stoGalleryLabel: "Test",
      stoGalleryTitle: "Pasek filtrów",
      stoCap1: "Homepage · quick filter icons",
      figGross: "Zysk brutto",
      figSite: "Strona firmowa",
      figMap: "Mapa sklepów",
      stackLabel: "Umiejętności",
      stackTitle: "Czym buduję systemy",
      stackAiBody:
        "OpenAI API · function calling / tool use · OCR / vision · KB i prompty · odpowiedzi oparte na faktach · automatyzacja dokumentów i dialogów w produkcji",
      stackInt: "Integracje",
      stackIntBody:
        "Telegram · 1C / CommerceML · Nextcloud (CalDAV / WebDAV / Deck) · Firebase · Metabase / PostgREST · Google Maps · Polymarket CLOB",
      stackMsg: "Messaging / kampanie",
      stackMsgBody:
        "Oficjalny nadawca SMS · oficjalny nadawca Viber · TurboSMS · nazwy alfa / sender ID · kampanie retail",
      stackMarkets: "Markets / realtime",
      stackMarketsBody:
        "Polymarket CLOB · paper→live gates · copy-trading · sniper engines · FastAPI dashboards · Hetzner / systemd",
      linksLabel: "Linki",
      linksTitle: "Gotowe demo i kontakt",
      linkPortfolio: "Portfolio",
      linkDemo: "Demo",
      linkTelegramBot: "Telegram bot",
      linkGithub: "GitHub",
      linkEmail: "Email",
      linkPdf: "PDF",
      footerNda:
        "Systemy NDA pokazuję opisem i oczyszczonymi zrzutami — bez auth-URL i sekretów.",
      nodePos: "Kasa / punkt",
      nodeHintPos: "POS · paragony · 1C",
      nodeApi: "API / bot",
      nodeHintApi: "Telegram · FastAPI",
      nodeDocker: "Docker",
      nodeHintDocker: "Compose · VPS",
      nodeAdmin: "Admin",
      nodeHintAdmin: "React · ERP",
      nodeMon: "Monitoring",
      nodeHintMon: "Prometheus · Grafana",
    }),
    sk: Object.assign({}, SHARED, {
      metaDesc:
        "gooru — DevOps, Full-Stack, production AI pre retail a market systems: boty, OpenAI/OCR, ERP, BI, Polymarket engines.",
      langAria: "Jazyk",
      themeLight: "Svetlá",
      themeDark: "Tmavá",
      lead:
        "Celý production kontúr pre retail: pokladňa → API / bot → Docker → admin → monitoring. Paralelne — market engines (sniper / copy-trading) s paper-first a risk gateami. AI len na reálnych dátach.",
      ctaWrite: "Napísať",
      workLabel: "Príklady",
      workTitle: "Projekty a ready demos",
      case1Title: "Retail ops → automatizácia",
      case1Tag1: "1C",
      case1Tag2: "Príjem",
      case1Tag3: "Reporty",
      case1Tag4: "Akcie",
      case1P1:
        "<strong>Pozadie:</strong> dlho som pracoval ako operátor zadávania dát / store ops — fyzický príjem tovaru, príjemka, precenenie, reporty, analýza akcií, prepočet bločkov na súťaže, organizácia eventov v predajniach.",
      case1P2:
        "<strong>Teraz:</strong> vediem operačný kontúr a staviam pod neho IT (faktúry/EDI, boty objednávok, reporty, Happy Day akcie, SMS/Viber) — jedna cesta z regálu do systému.",
      case2Title: "Production AI: asistent + OCR / dokumenty",
      case2P1:
        "<strong>Úloha:</strong> AI v biznise musí odpovedať a brať dáta len z reálnych API / dokumentov — bez halucinácií cien, skladov či súm.",
      case2P2: "<strong>Urobil som:</strong>",
      case2P3:
        "- Telegram asistent → OpenAI → function calling / tools → externé API a knowledge base; odpovede len na overených dátach.",
      case2P4:
        "- invoice-agent: LLM + OCR/vision → štruktúrované polia z faktúr → tok pod 1C (FastAPI + React + Docker).",
      case2P5:
        "- Promptty, KB, spracovanie chýb API, deploy na VPS — ako bežný production servis, nie demo chat.",
      case3Title: "Telegram boty + retail ops",
      case3P1:
        "<strong>Úloha:</strong> prijať objednávku z poľa, upovedomiť majiteľa, reporty a výmena s 1C bez Excel chaosu.",
      case3P2:
        "<strong>Urobil som:</strong> krokové boty, web admin (trasy, body, produkty), reporty HTML/CSV/XLSX/PDF, XML pre 1C, Nextcloud/CalDAV, monitoring pošty a cien.",
      case4Title: "Payroll &amp; HR ERP",
      case4P1:
        "<strong>Úloha:</strong> mzdy, evidencia času, KPI a korekcie v jednom systéme namiesto roztrúsených tabuliek.",
      case4P2:
        "<strong>Urobil som:</strong> full-stack ERP (~80 predajní): zamestnanci, rozvrh, výpočet miezd, KPI, pohľady a detaily.",
      figPayDetails: "Detaily výplat",
      figPayView: "Pohľad na mzdy",
      case5Title: "Loyalty: Admin + Android",
      case5P1:
        "<strong>Úloha:</strong> plný kontúr vernosti: pokladňa/1C → API → admin + mobilná appka (zostatok, barcode, akcie).",
      case5P2:
        "<strong>Urobil som:</strong> web-admin (bločky, kategórie, 1C) + Ambar Loyalty Android (Compose): karta so zostatkom a barcode, profil/transakcie, nastavenia a push. Status: pilot / ešte nie vo verejnom prode.",
      figChecks: "Monitoring bločkov",
      figCats: "Kategórie",
      figLoyalHome: "Android · domov / karta",
      figLoyalProfile: "Android · profil",
      figLoyalSettings: "Android · nastavenia",
      case6Title: "SMS / Viber pre retail",
      case6P1:
        "<strong>Úloha:</strong> oficiálne kanály notifikácií siete — odosielateľ pod značku, nie sivé čísla.",
      case6P2:
        "<strong>Urobil som:</strong> registrácia oficiálneho SMS odosielateľa a samostatne Viber odosielateľa pre retail sieť; kampane cez TurboSMS — alfa mená / sender ID, šablóny, produkčné rozosielky.",
      case7Title: "BI + cloud + firemný web",
      case7P1:
        "<strong>Úloha:</strong> analytika predaja/skladov, cloud súborov tímu a verejný web siete.",
      case7P2:
        "<strong>Urobil som:</strong> ETL → PostgreSQL → Metabase/PostgREST; Nextcloud + OnlyOffice; lokátor predajní (Maps) + CMS. Deploy a monitoring na VPS.",
      case8P1:
        "<strong>Úloha:</strong> nízkolatenčný sniper BTC 5m Up/Down na Polymarket — najprv paper, live až po tvrdých metriách pripravenosti.",
      case8P2:
        "<strong>Urobil som:</strong> samostatný scalper engine: stratégia/signály, paper ledger, live-gate (počet obchodov / WR / t-stat / PnL), headless 24/7 na Hetzner, dashboard /sniper, CI testy, live predvolene vypnutý.",
      case9P1:
        "<strong>Úloha:</strong> zrkadlo obchodov lídrov s risk limitmi a analytikou — inžiniersky kontúr, nie slepé copy-all.",
      case9P2:
        "<strong>Urobil som:</strong> watcher engine, discover/score lídrov, dashboard, auto-exit / scale-in, health-check, kill-switch, deploy Docker/systemd na VPS; spoločný core so sniperom (CLOB, HTTP, config).",
      case10Title: "AI Interiors (mockupy fototapiet)",
      case10P1: "<strong>Úloha:</strong> moderné interiéry pre mockupy fototapiet — svetlá prázdna stena v zábere na vystrihnutie.",
      case10P2: "<strong>Urobil som:</strong> photoreal mockupy interiérov (spálňa / obývačka) v štýle minimal / Japandi.",
      case11Title: "AI Lifestyle (mužské luxury looky)",
      case11P1: "<strong>Úloha:</strong> mužská postava v brandovej estetike — photoreal zábery ako skutočné lifestyle fotky.",
      case11P2: "<strong>Urobil som:</strong> testovaciu sériu (private jet / bar).",
      case18Title: "1C ↔ API Bridge (mock)",
      case18P1: "<strong>Uloha:</strong> most shop/bot ↔ 1C: zasoby, objednavky, CommerceML, log.",
      case18P2: "<strong>Urobil som:</strong> FastAPI mock s REST/XML + UI; priima objednavky z Mini App a ukazuje cisla dokumentov. Live na Hetzner.",
      linkOnec: "1C Bridge",
      case17Title: "Telegram Mini App + Bot",
      case17P1: "<strong>Uloha:</strong> klikatelne demo Mini App obchodu + bot s WebApp tlacidlom — bez natívnej appky.",
      case17P2: "<strong>Urobil som:</strong> katalog → kosik → objednavka s push do 1C Bridge, initData/demo, admin, HTTPS. Live na Hetzner.",
      linkTma: "Telegram Mini App",
      case16Title: "Marketing Mini (SMS / Viber)",
      case16P1: "<strong>Uloha:</strong> klikatelne demo kampani SMS/Viber — segmenty, sender, stavy dorucenia, odhlasenie.",
      case16P2: "<strong>Urobil som:</strong> FastAPI + SQLite + mock TurboSMS: kontakty s opt-in/unsubscribe, kampane, DLR, provider log. Live na Hetzner.",
      case15Title: "Telegram Bot Kit (ready demo)",
      case15P1: "<strong>Uloha:</strong> univerzalna sablona bota-ziadosti na okamzite ukazanie.",
      case15P2: "<strong>Urobil som:</strong> web simulator + admin stavov; Telegram cez token. Live na Hetzner.",
      linkBotKit: "Telegram Bot Kit",
      case14Title: "Local AI Box (LLM + RAG + Agent)",
      case14P1: "<strong>Uloha:</strong> bezpecne lokalne AI — odpovede len z dokumentov.",
      case14P2: "<strong>Urobil som:</strong> FastAPI + Ollama + RAG/agent demo na Hetzner. Login guest / demo123.",
      linkAiBox: "Local AI Box",
      case13Title: "Sales Bot (ready demo)",
      case13P1: "<strong>Uloha:</strong> klikatelne sales demo: katalog → objednavka → CRM, bez cakania na stavbu od nuly.",
      case13P2: "<strong>Urobil som:</strong> web chat + admin; objednavky HTTP POST do mock CRM s logom odpovede. Live na Hetzner.",
      linkSalesBot: "Sales Bot",
      linkMarketing: "Marketing Mini",
      case12Title: "101stomatolog — ikony filtrov UI",
      case12P1: "<strong>Úloha:</strong> dať filtre na homepage ako vodorovný pás ikon (služby, okres, región, metro) + video.",
      case12P2: "<strong>Urobil som:</strong> testovací koncept pásu ikon filtrov.",
      linkInteriors: "AI Interiors",
      linkLifestyle: "AI Lifestyle",
      linkStomatolog: "101stomatolog UI",
      intKicker: "AI interiors · wallpaper mockups",
      intTitle: "AI Interiors",
      intLead: "Moderné interiéry pre mockupy fototapiet: svetlá prázdna stena, čistá kompozícia. Príklady nižšie.",
      intBack: "← Portfólio",
      intGalleryLabel: "Príklady",
      intGalleryTitle: "Hotové interiéry",
      intCap1: "Bedroom · empty wall mockup",
      intCap2: "Living · Japandi mockup",
      lifeKicker: "AI lifestyle · male luxury looks",
      lifeTitle: "AI Lifestyle",
      lifeLead: "Mužská postava v brandovej estetike: private jet, bar, doplnky. Photoreal zábery pre kampane / social.",
      lifeBack: "← Portfólio",
      lifeGalleryLabel: "Testovacie príklady",
      lifeGalleryTitle: "Mužský look",
      lifeCap1: "Private jet · luxury look",
      lifeCap2: "Bar · evening look",
      stoKicker: "UI concept · 101stomatolog",
      stoTitle: "Filter icons",
      stoLead: "Testovací koncept pásu ikon: služby, okres, región, metro, mapa, video — horizontálne posúvanie.",
      stoBack: "← Portfólio",
      stoGalleryLabel: "Test",
      stoGalleryTitle: "Pás filtrov",
      stoCap1: "Homepage · quick filter icons",
      figGross: "Hrubý zisk",
      figSite: "Firemný web",
      figMap: "Mapa predajní",
      stackLabel: "Zručnosti",
      stackTitle: "Čím skladám systémy",
      stackAiBody:
        "OpenAI API · function calling / tool use · OCR / vision · KB a promptty · odpovede založené na faktoch · automatizácia dokumentov a dialógov v produkcii",
      stackInt: "Integrácie",
      stackIntBody:
        "Telegram · 1C / CommerceML · Nextcloud (CalDAV / WebDAV / Deck) · Firebase · Metabase / PostgREST · Google Maps · Polymarket CLOB",
      stackMsg: "Messaging / kampane",
      stackMsgBody:
        "Oficiálny SMS odosielateľ · oficiálny Viber odosielateľ · TurboSMS · alfa mená / sender ID · retail kampane",
      stackMarkets: "Markets / realtime",
      stackMarketsBody:
        "Polymarket CLOB · paper→live gates · copy-trading · sniper engines · FastAPI dashboards · Hetzner / systemd",
      linksLabel: "Odkazy",
      linksTitle: "Hotové demá a kontakt",
      linkPortfolio: "Portfólio",
      linkDemo: "Demo",
      linkTelegramBot: "Telegram bot",
      linkGithub: "GitHub",
      linkEmail: "Email",
      linkPdf: "PDF",
      footerNda:
        "NDA systémy ukazujem popisom a sanitize screenshotmi — bez auth-URL a sekretov.",
      nodePos: "Pokladňa / bod",
      nodeHintPos: "POS · bločky · 1C",
      nodeApi: "API / bot",
      nodeHintApi: "Telegram · FastAPI",
      nodeDocker: "Docker",
      nodeHintDocker: "Compose · VPS",
      nodeAdmin: "Admin",
      nodeHintAdmin: "React · ERP",
      nodeMon: "Monitoring",
      nodeHintMon: "Prometheus · Grafana",
    }),
  };

  function detect() {
    try {
      var q = new URLSearchParams(window.location.search).get("lang");
      if (q && SUPPORTED.indexOf(q) !== -1) return q;
    } catch (e) {}
    try {
      var saved = localStorage.getItem(KEY);
      if (saved && SUPPORTED.indexOf(saved) !== -1) return saved;
      if (saved === "ru") return "uk";
    } catch (e) {}
    var nav = (navigator.language || "uk").toLowerCase();
    if (nav.indexOf("de") === 0) return "de";
    if (nav.indexOf("pl") === 0) return "pl";
    if (nav.indexOf("sk") === 0) return "sk";
    if (nav.indexOf("en") === 0) return "en";
    return "uk";
  }

  function apply(lang) {
    if (SUPPORTED.indexOf(lang) === -1) lang = "uk";
    var dict = T[lang];
    document.documentElement.lang = lang === "uk" ? "uk" : lang;
    document.documentElement.setAttribute("data-lang", lang);

    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", dict.metaDesc);

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (!key || dict[key] == null) return;
      if (el.getAttribute("data-i18n-html") === "1") el.innerHTML = dict[key];
      else el.textContent = dict[key];
    });

    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-aria");
      if (key && dict[key] != null) el.setAttribute("aria-label", dict[key]);
    });

    var pdf = document.getElementById("cta-pdf");
    if (pdf) pdf.setAttribute("href", lang === "en" ? "portfolio-en.pdf" : "portfolio.pdf");

    document.querySelectorAll(".lang [data-lang]").forEach(function (btn) {
      var on = btn.getAttribute("data-lang") === lang;
      if (on) btn.setAttribute("aria-current", "page");
      else btn.removeAttribute("aria-current");
    });

    try {
      localStorage.setItem(KEY, lang);
    } catch (e) {}

    if (window.GooruTheme && typeof window.GooruTheme.refreshLabel === "function") {
      window.GooruTheme.refreshLabel();
    }
    if (window.GooruContour && typeof window.GooruContour.setLabels === "function") {
      window.GooruContour.setLabels({
        nodes: [
          { label: dict.nodePos, hint: dict.nodeHintPos },
          { label: dict.nodeApi, hint: dict.nodeHintApi },
          { label: dict.nodeDocker, hint: dict.nodeHintDocker },
          { label: dict.nodeAdmin, hint: dict.nodeHintAdmin },
          { label: dict.nodeMon, hint: dict.nodeHintMon },
        ],
      });
    }

    try {
      var url = new URL(window.location.href);
      url.searchParams.set("lang", lang);
      window.history.replaceState({}, "", url.pathname + url.search + url.hash);
    } catch (e) {}
  }

  window.GooruI18n = {
    apply: apply,
    detect: detect,
    t: function (key) {
      var lang = document.documentElement.getAttribute("data-lang") || "uk";
      return (T[lang] && T[lang][key]) || (T.uk && T.uk[key]) || key;
    },
  };

  var initial = detect();
  document.documentElement.setAttribute("data-lang", initial);
  document.addEventListener("DOMContentLoaded", function () {
    apply(initial);
    document.querySelectorAll(".lang [data-lang]").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        apply(btn.getAttribute("data-lang"));
      });
    });
  });
})();
