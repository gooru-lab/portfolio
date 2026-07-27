(function () {
  var KEY = "gooru-lang";
  var SUPPORTED = ["uk", "en", "de", "pl", "sk"];

  var SHARED = {
    kicker: "DevOps & Full-Stack · AI for retail",
    ctaPdf: "PDF",
    live: "Live:",
    figDash: "Dashboard",
    stackBe: "Backend",
    stackFe: "Frontend / Mobile",
    stackAi: "AI",
    stackDevops: "DevOps",
  };

  var T = {
    uk: Object.assign({}, SHARED, {
      metaDesc:
        "gooru — DevOps, Full-Stack і production AI для retail: боти, OpenAI/OCR, ERP, BI, інфраструктура.",
      langAria: "Мова",
      themeLight: "Світла",
      themeDark: "Темна",
      lead:
        "Повний контур production для retail: каса → API / бот → Docker → адмінка → моніторинг. Будую AI у проді на реальних даних — без «вигадок» моделі.",
      ctaWrite: "Написати",
      workLabel: "Кейси",
      workTitle: "Вибрані production-проєкти",
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
      case5Title: "Loyalty Admin",
      case5P1:
        "<strong>Задача:</strong> контроль чеків і балів лояльності з інтеграцією облікової системи.",
      case5P2:
        "<strong>Зробив:</strong> адмін-панель: моніторинг чеків, категорії, зв’язок з 1С.",
      figChecks: "Моніторинг чеків",
      figCats: "Категорії",
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
      figGross: "Валовий прибуток",
      figSite: "Корпоративний сайт",
      figMap: "Карта магазинів",
      stackLabel: "Навички",
      stackTitle: "Чим збираю системи",
      stackAiBody:
        "OpenAI API · function calling / tool use · OCR / vision · KB і промпти · RAG-підхід до фактів · автоматизація документів і діалогів у проді",
      stackInt: "Інтеграції",
      stackIntBody:
        "Telegram · 1С / CommerceML · Nextcloud (CalDAV / WebDAV / Deck) · Firebase · Metabase / PostgREST · Google Maps",
      stackMsg: "Messaging / розсилки",
      stackMsgBody:
        "Офіційний SMS-відправник · офіційний Viber-відправник · TurboSMS · альфа-імена / sender ID · кампанії для retail",
      linksLabel: "Посилання",
      linksTitle: "Де подивитись наживо",
      linkPortfolio: "Портфоліо",
      linkDemo: "Demo",
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
        "gooru — DevOps, Full-Stack and production AI for retail: bots, OpenAI/OCR, ERP, BI, infrastructure.",
      langAria: "Language",
      themeLight: "Light",
      themeDark: "Dark",
      lead:
        "Full production loop for retail: POS → API / bot → Docker → admin → monitoring. I ship production AI on real data — no model-made-up prices or stock.",
      ctaWrite: "Email me",
      workLabel: "Work",
      workTitle: "Selected production projects",
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
      case5Title: "Loyalty Admin",
      case5P1:
        "<strong>Problem:</strong> monitor receipts and loyalty points with accounting integration.",
      case5P2:
        "<strong>Built:</strong> admin panel: checks monitoring, categories, 1C integration.",
      figChecks: "Checks monitoring",
      figCats: "Categories",
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
      figGross: "Gross profit",
      figSite: "Corporate site",
      figMap: "Store map",
      stackLabel: "Skills",
      stackTitle: "How I ship systems",
      stackAiBody:
        "OpenAI API · function calling / tool use · OCR / vision · KB &amp; prompts · fact-grounded answers · document &amp; dialog automation in production",
      stackInt: "Integrations",
      stackIntBody:
        "Telegram · 1C / CommerceML · Nextcloud (CalDAV / WebDAV / Deck) · Firebase · Metabase / PostgREST · Google Maps",
      stackMsg: "Messaging / campaigns",
      stackMsgBody:
        "Official SMS sender · official Viber sender · TurboSMS · alpha names / sender ID · retail campaigns",
      linksLabel: "Links",
      linksTitle: "See it live",
      linkPortfolio: "Portfolio",
      linkDemo: "Demo",
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
        "gooru — DevOps, Full-Stack und Production-AI für Retail: Bots, OpenAI/OCR, ERP, BI, Infrastruktur.",
      langAria: "Sprache",
      themeLight: "Hell",
      themeDark: "Dunkel",
      lead:
        "Vollständiger Production-Loop für Retail: Kasse → API / Bot → Docker → Admin → Monitoring. Production-AI auf echten Daten — ohne erfundene Preise oder Bestände.",
      ctaWrite: "Schreiben",
      workLabel: "Cases",
      workTitle: "Ausgewählte Production-Projekte",
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
      case5Title: "Loyalty Admin",
      case5P1:
        "<strong>Aufgabe:</strong> Bons und Treuepunkte mit Anbindung an die Buchhaltung steuern.",
      case5P2:
        "<strong>Gebaut:</strong> Admin-Panel: Bon-Monitoring, Kategorien, 1C-Anbindung.",
      figChecks: "Bon-Monitoring",
      figCats: "Kategorien",
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
      figGross: "Bruttogewinn",
      figSite: "Firmenwebsite",
      figMap: "Filialkarte",
      stackLabel: "Skills",
      stackTitle: "Womit ich Systeme baue",
      stackAiBody:
        "OpenAI API · Function Calling / Tool Use · OCR / Vision · KB &amp; Prompts · faktenbasierte Antworten · Dokument- &amp; Dialog-Automation in Produktion",
      stackInt: "Integrationen",
      stackIntBody:
        "Telegram · 1C / CommerceML · Nextcloud (CalDAV / WebDAV / Deck) · Firebase · Metabase / PostgREST · Google Maps",
      stackMsg: "Messaging / Kampagnen",
      stackMsgBody:
        "Offizieller SMS-Absender · offizieller Viber-Absender · TurboSMS · Alpha-Namen / Sender-ID · Retail-Kampagnen",
      linksLabel: "Links",
      linksTitle: "Live ansehen",
      linkPortfolio: "Portfolio",
      linkDemo: "Demo",
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
        "gooru — DevOps, Full-Stack i production AI dla retail: boty, OpenAI/OCR, ERP, BI, infrastruktura.",
      langAria: "Język",
      themeLight: "Jasny",
      themeDark: "Ciemny",
      lead:
        "Pełny kontur production dla retail: kasa → API / bot → Docker → admin → monitoring. AI w produkcji na realnych danych — bez wymyślonych cen i stanów.",
      ctaWrite: "Napisz",
      workLabel: "Case’y",
      workTitle: "Wybrane projekty production",
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
      case5Title: "Loyalty Admin",
      case5P1:
        "<strong>Problem:</strong> kontrola paragonów i punktów lojalności z integracją księgową.",
      case5P2:
        "<strong>Zrobiłem:</strong> panel admina: monitoring paragonów, kategorie, powiązanie z 1C.",
      figChecks: "Monitoring paragonów",
      figCats: "Kategorie",
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
      figGross: "Zysk brutto",
      figSite: "Strona firmowa",
      figMap: "Mapa sklepów",
      stackLabel: "Umiejętności",
      stackTitle: "Czym buduję systemy",
      stackAiBody:
        "OpenAI API · function calling / tool use · OCR / vision · KB i prompty · odpowiedzi oparte na faktach · automatyzacja dokumentów i dialogów w produkcji",
      stackInt: "Integracje",
      stackIntBody:
        "Telegram · 1C / CommerceML · Nextcloud (CalDAV / WebDAV / Deck) · Firebase · Metabase / PostgREST · Google Maps",
      stackMsg: "Messaging / kampanie",
      stackMsgBody:
        "Oficjalny nadawca SMS · oficjalny nadawca Viber · TurboSMS · nazwy alfa / sender ID · kampanie retail",
      linksLabel: "Linki",
      linksTitle: "Zobacz na żywo",
      linkPortfolio: "Portfolio",
      linkDemo: "Demo",
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
        "gooru — DevOps, Full-Stack a production AI pre retail: boty, OpenAI/OCR, ERP, BI, infraštruktúra.",
      langAria: "Jazyk",
      themeLight: "Svetlá",
      themeDark: "Tmavá",
      lead:
        "Celý production kontúr pre retail: pokladňa → API / bot → Docker → admin → monitoring. AI v produkcii na reálnych dátach — bez vymyslených cien a stavov.",
      ctaWrite: "Napísať",
      workLabel: "Príklady",
      workTitle: "Vybrané production projekty",
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
      case5Title: "Loyalty Admin",
      case5P1:
        "<strong>Úloha:</strong> kontrola bločkov a vernostných bodov s napojením na účtovníctvo.",
      case5P2:
        "<strong>Urobil som:</strong> admin panel: monitoring bločkov, kategórie, väzba na 1C.",
      figChecks: "Monitoring bločkov",
      figCats: "Kategórie",
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
      figGross: "Hrubý zisk",
      figSite: "Firemný web",
      figMap: "Mapa predajní",
      stackLabel: "Zručnosti",
      stackTitle: "Čím skladám systémy",
      stackAiBody:
        "OpenAI API · function calling / tool use · OCR / vision · KB a promptty · odpovede založené na faktoch · automatizácia dokumentov a dialógov v produkcii",
      stackInt: "Integrácie",
      stackIntBody:
        "Telegram · 1C / CommerceML · Nextcloud (CalDAV / WebDAV / Deck) · Firebase · Metabase / PostgREST · Google Maps",
      stackMsg: "Messaging / kampane",
      stackMsgBody:
        "Oficiálny SMS odosielateľ · oficiálny Viber odosielateľ · TurboSMS · alfa mená / sender ID · retail kampane",
      linksLabel: "Odkazy",
      linksTitle: "Pozrieť naživo",
      linkPortfolio: "Portfólio",
      linkDemo: "Demo",
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
