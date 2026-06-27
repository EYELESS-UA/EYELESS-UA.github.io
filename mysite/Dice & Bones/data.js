// Translations
const translations = {
    ua: {
        searchPlaceholder: "Шукати все...",
        collections: "Колекції",
        heroTitle: "СТВОРЮЙТЕ ЧУДЕСА У ЕБЕРРОНІ<br>СЬОГОДНІ З РАННІМ ДОСТУПОМ",
        buyNow: "КУПИТИ ЗАРАЗ",
        newBadge: "НОВИНКА",
        vampireDesc: "Розкрийте свого внутрішнього вампіра з Книгою Голоду Астаріона",
        holidayDesc: "Святкуйте з магічно-новорічною пригодою!",
        createCharacter: "СТВОРИТИ",
        character: "ПЕРСОНАЖА",
        browseMarket: "ПЕРЕГЛЯНУТИ",
        marketplace: "МАГАЗИН",
        subscription: "ПІДПИСКА",
        benefits: "ПЕРЕВАГИ",
        discoverMaps: "ДОСЛІДИТИ МАПИ",
        mapsVTT: "Мапи VTT",
        wrapUpTitle: "Dice & Bones Підсумки 2025",
        readArticle: "Читати статтю",
        wrapUpText: "Dice & Bones створений пристрасною командою дизайнерів, інженерів та продакт-менеджерів з роботою, яка іноді вимагає зусиль! Ознайомтеся з оглядом року та заглядом у майбутнє для Dice & Bones від команди розробників гравців та Майстрів Підземель.",
        seeAllPosts: "ПЕРЕГЛЯНУТИ ВСІ ПУБЛІКАЦІЇ",
        noResults: "Результатів не знайдено",
        searchResults: "Результати пошуку для",
        supportTitle: "ПІДТРИМКА",
        aboutTitle: "ПРО НАС",
        socialTitle: "ЗНАЙДІТЬ НАС У СОЦІАЛЬНИХ МЕРЕЖАХ"
    },
    en: {
        searchPlaceholder: "Search Everything...",
        collections: "Collections",
        heroTitle: "FORGE WONDERS IN EBERRON<br>TODAY WITH EARLY ACCESS",
        buyNow: "BUY NOW",
        newBadge: "NEW",
        vampireDesc: "Unleash your inner vampire with Astarion's Book of Hungers",
        holidayDesc: "Get festive with a magic-ho-ho Holiday-themed adventure!",
        createCharacter: "CREATE A",
        character: "CHARACTER",
        browseMarket: "BROWSE THE",
        marketplace: "MARKETPLACE",
        subscription: "SUBSCRIPTION",
        benefits: "BENEFITS",
        discoverMaps: "DISCOVER MAPS",
        mapsVTT: "Maps VTT",
        wrapUpTitle: "Dice & Bones 2025 Wrap-Up",
        readArticle: "Read Article",
        wrapUpText: "Dice & Bones is built by a passionate team of designers, engineers, and product managers with jobs that sometimes draw blood! Relax and give the lore that's on the site. We're clear the year in review and a look ahead for Dice & Bones, straight from the development team of players and Dungeon Masters.",
        seeAllPosts: "SEE ALL POSTS",
        noResults: "No results found",
        searchResults: "Search results for",
        supportTitle: "SUPPORT",
        aboutTitle: "ABOUT",
        socialTitle: "FIND US ON SOCIAL MEDIA"
    },
    pl: {
        searchPlaceholder: "Szukaj wszystkiego...",
        collections: "Kolekcje",
        heroTitle: "TWÓRZ CUDA W EBERRON<br>DZIŚ Z WCZESNYM DOSTĘPEM",
        buyNow: "KUP TERAZ",
        newBadge: "NOWOŚĆ",
        vampireDesc: "Uwolnij swojego wewnętrznego wampira z Księgą Głodów Astariona",
        holidayDesc: "Świętuj z magiczną przygodą świąteczną!",
        createCharacter: "STWÓRZ",
        character: "POSTAĆ",
        browseMarket: "PRZEGLĄDAJ",
        marketplace: "SKLEP",
        subscription: "SUBSKRYPCJA",
        benefits: "KORZYŚCI",
        discoverMaps: "ODKRYJ MAPY",
        mapsVTT: "Mapy VTT",
        wrapUpTitle: "Dice & Bones Podsumowanie 2025",
        readArticle: "Czytaj artykuł",
        wrapUpText: "Dice & Bones jest tworzony przez pasjonatów projektantów, inżynierów i menedżerów produktu, których praca czasami wymaga krwi! Zrelaksuj się i zapoznaj się z historią na stronie. Przedstawiamy przegląd roku i spojrzenie w przyszłość dla Dice & Bones, bezpośrednio od zespołu programistów graczy i Mistrzów Lochów.",
        seeAllPosts: "ZOBACZ WSZYSTKIE POSTY",
        noResults: "Nie znaleziono wyników",
        searchResults: "Wyniki wyszukiwania dla",
        supportTitle: "WSPARCIE",
        aboutTitle: "O NAS",
        socialTitle: "ZNAJDŹ NAS W MEDIACH SPOŁECZNOŚCIOWYCH"
    }
};

// Articles data array
const articlesData = [
    {
        id: 1,
        image: 'assets/638997030130013443.jpeg',
        category: {
            ua: 'Списки • Dice & Bones',
            en: 'Lists • Dice & Bones',
            pl: 'Listy • Dice & Bones'
        },
        title: {
            ua: 'Найкращі подарунки Dungeons & Dragons на свята (2025)',
            en: 'The Best Dungeons & Dragons Gifts for the Holidays (2025)',
            pl: 'Najlepsze prezenty Dungeons & Dragons na święta (2025)'
        },
        description: {
            ua: 'Шукаєте ідеальний подарунок для фаната D&D у вашому житті? Перегляньте цей святковий путівник подарунків для рекомендацій!',
            en: 'Looking to find that perfect gift for the D&D fan in your life? Check out this holiday gift guide for recommendations!',
            pl: 'Szukasz idealnego prezentu dla fana D&D w twoim życiu? Sprawdź ten przewodnik po świątecznych prezentach!'
        },
        fullContent: {
            ua: 'Святкові свята — це чудовий час, щоб порадувати своїх друзів та близьких подарунками, пов\'язаними з їхніми улюбленими хобі. Якщо у вашому житті є фанат Dungeons & Dragons, ми підготували список найкращих подарунків на 2025 рік!\n\n1. **Набори кубиків преміум-класу** — красиві металеві або кам\'яні кубики, які додадуть стилю будь-якій грі.\n\n2. **Книги правил та доповнення** — нові офіційні книги з правилами, описами монстрів та магічних предметів.\n\n3. **Фігурки персонажів** — детальні мініатюри героїв та монстрів для використання на ігровому полі.\n\n4. **Аксесуари для DM** — ширми майстра, органайзери для нотаток, спеціальні блокноти.\n\n5. **Ігрові мапи та terrain** — детальні мапи підземель та елементи місцевості для створення атмосфери.\n\nОберіть подарунок, який найкраще підходить для вашого друга-авантюриста!',
            en: 'The holiday season is a great time to delight your friends and loved ones with gifts related to their favorite hobbies. If you have a Dungeons & Dragons fan in your life, we\'ve prepared a list of the best gifts for 2025!\n\n1. **Premium Dice Sets** — beautiful metal or stone dice that will add style to any game.\n\n2. **Rulebooks and Supplements** — new official books with rules, monster descriptions, and magic items.\n\n3. **Character Miniatures** — detailed miniatures of heroes and monsters for use on the game board.\n\n4. **DM Accessories** — DM screens, note organizers, special notebooks.\n\n5. **Game Maps and Terrain** — detailed dungeon maps and terrain elements to create atmosphere.\n\nChoose the gift that best suits your adventurer friend!',
            pl: 'Sezon świąteczny to wspaniały czas, aby ucieszyć swoich przyjaciół i bliskich prezentami związanymi z ich ulubionymi hobby. Jeśli masz w swoim życiu fana Dungeons & Dragons, przygotowaliśmy listę najlepszych prezentów na rok 2025!\n\n1. **Zestawy kości premium** — piękne metalowe lub kamienne kości, które dodadzą stylu każdej grze.\n\n2. **Książki zasad i dodatki** — nowe oficjalne książki z zasadami, opisami potworów i magicznych przedmiotów.\n\n3. **Figurki postaci** — szczegółowe miniatury bohaterów i potworów do użycia na planszy.\n\n4. **Akcesoria dla DM** — ekrany mistrza gry, organizery notatek, specjalne notatniki.\n\n5. **Mapy gry i terrain** — szczegółowe mapy lochów i elementy terenu do tworzenia atmosfery.\n\nWybierz prezent, który najlepiej pasuje do Twojego przyjaciela-poszukiwacza przygód!'
        },
        link: '#'
    },
    {
        id: 2,
        image: 'assets/638997030130013443.jpeg',
        category: {
            ua: 'Новини • Dice & Bones',
            en: 'News • Dice & Bones',
            pl: 'Nowości • Dice & Bones'
        },
        title: {
            ua: 'Нові правила для майстрів підземель',
            en: 'New Rules for Dungeon Masters',
            pl: 'Nowe zasady dla mistrzów lochów'
        },
        description: {
            ua: 'Відкрийте для себе нові правила та інструменти для створення незабутніх пригод для ваших гравців!',
            en: 'Discover new rules and tools to create unforgettable adventures for your players!',
            pl: 'Odkryj nowe zasady i narzędzia do tworzenia niezapomnianych przygód dla swoich graczy!'
        },
        fullContent: {
            ua: 'У новому оновленні правил D&D майстри підземель отримають доступ до розширених інструментів для створення складних та захоплюючих пригод!\n\n**Основні нововведення:**\n\n• **Динамічні енкаунтери** — система автоматичного балансування складності битв залежно від дій гравців.\n\n• **Розширені соціальні взаємодії** — нові правила для переговорів, інтриг та дипломатії.\n\n• **Система репутації** — відстежування впливу партії на світ та реакції NPC.\n\n• **Покращені інструменти для світобудови** — шаблони для створення міст, організацій та конфліктів.\n\n• **Альтернативні системи відпочинку** — нові варіанти для різних стилів гри.\n\nЦі правила допоможуть створювати більш глибокі та імерсивні ігрові сесії!',
            en: 'In the new D&D rules update, dungeon masters will gain access to enhanced tools for creating complex and engaging adventures!\n\n**Key Features:**\n\n• **Dynamic Encounters** — automatic difficulty balancing system based on player actions.\n\n• **Enhanced Social Interactions** — new rules for negotiations, intrigue, and diplomacy.\n\n• **Reputation System** — tracking the party\'s influence on the world and NPC reactions.\n\n• **Improved Worldbuilding Tools** — templates for creating cities, organizations, and conflicts.\n\n• **Alternative Rest Systems** — new options for different play styles.\n\nThese rules will help create deeper and more immersive game sessions!',
            pl: 'W nowej aktualizacji zasad D&D mistrzowie lochów otrzymają dostęp do rozszerzonych narzędzi do tworzenia złożonych i wciągających przygód!\n\n**Główne funkcje:**\n\n• **Dynamiczne spotkania** — system automatycznego równoważenia trudności bitew w zależności od działań graczy.\n\n• **Rozszerzone interakcje społeczne** — nowe zasady negocjacji, intryg i dyplomacji.\n\n• **System reputacji** — śledzenie wpływu drużyny na świat i reakcji NPC.\n\n• **Ulepszone narzędzia do budowy świata** — szablony do tworzenia miast, organizacji i konfliktów.\n\n• **Alternatywne systemy odpoczynku** — nowe opcje dla różnych stylów gry.\n\nTe zasady pomogą tworzyć głębsze i bardziej immersyjne sesje!'
        },
        link: '#'
    },
    {
        id: 3,
        image: 'assets/638997030130013443.jpeg',
        category: {
            ua: 'Гайди • Dice & Bones',
            en: 'Guides • Dice & Bones',
            pl: 'Przewodniki • Dice & Bones'
        },
        title: {
            ua: 'Як створити епічного персонажа',
            en: 'How to Create an Epic Character',
            pl: 'Jak stworzyć epicką postać'
        },
        description: {
            ua: 'Покроковий гайд для створення персонажа, який запам\'ятається надовго. Від концепції до реалізації!',
            en: 'A step-by-step guide to creating a character that will be remembered. From concept to implementation!',
            pl: 'Przewodnik krok po kroku do tworzenia postaci, która zostanie zapamiętana. Od koncepcji do realizacji!'
        },
        fullContent: {
            ua: 'Створення незабутнього персонажа — це мистецтво, яке поєднує механіку гри з творчістю та рольовою грою.\n\n**Крок 1: Концепція**\nПочніть з простої ідеї: хто ваш персонаж? Звідки він прийшов? Що його мотивує?\n\n**Крок 2: Передісторія**\nСтворіть багату історію, яка пояснює навички та особистість персонажа. Додайте особистих NPC, ворогів та цілі.\n\n**Крок 3: Особистість**\nВизначте риси характеру, ідеали, прив\'язаності та слабкості. Це допоможе у рольовій грі.\n\n**Крок 4: Механіка**\nВиберіть расу, клас та здібності, які підтримують вашу концепцію, а не навпаки.\n\n**Крок 5: Розвиток**\nЗалиште простір для зростання — найкращі персонажі змінюються протягом кампанії.\n\nПам\'ятайте: найважливіше — це створити персонажа, з яким вам буде цікаво грати!',
            en: 'Creating a memorable character is an art that combines game mechanics with creativity and roleplaying.\n\n**Step 1: Concept**\nStart with a simple idea: who is your character? Where did they come from? What motivates them?\n\n**Step 2: Backstory**\nCreate a rich history that explains your character\'s skills and personality. Add personal NPCs, enemies, and goals.\n\n**Step 3: Personality**\nDefine personality traits, ideals, bonds, and flaws. This helps with roleplaying.\n\n**Step 4: Mechanics**\nChoose race, class, and abilities that support your concept, not the other way around.\n\n**Step 5: Development**\nLeave room for growth — the best characters change throughout the campaign.\n\nRemember: the most important thing is to create a character you\'ll enjoy playing!',
            pl: 'Tworzenie niezapomnianej postaci to sztuka łącząca mechanikę gry z kreatywnością i grą fabularną.\n\n**Krok 1: Koncepcja**\nZacznij od prostego pomysłu: kim jest twoja postać? Skąd pochodzi? Co ją motywuje?\n\n**Krok 2: Historia**\nStwórz bogatą historię wyjaśniającą umiejętności i osobowość postaci. Dodaj osobiste NPC, wrogów i cele.\n\n**Krok 3: Osobowość**\nOkreśl cechy osobowości, ideały, więzi i wady. To pomoże w grze fabularnej.\n\n**Krok 4: Mechanika**\nWybierz rasę, klasę i zdolności wspierające twoją koncepcję, a nie odwrotnie.\n\n**Krok 5: Rozwój**\nZostaw miejsce na wzrost — najlepsze postacie zmieniają się podczas kampanii.\n\nPamiętaj: najważniejsze to stworzyć postać, którą będziesz lubić grać!'
        },
        link: '#'
    },
    {
        id: 4,
        image: 'assets/638997030130013443.jpeg',
        category: {
            ua: 'Огляди • Dice & Bones',
            en: 'Reviews • Dice & Bones',
            pl: 'Recenzje • Dice & Bones'
        },
        title: {
            ua: 'Огляд нових доповнень до гри',
            en: 'Review of New Game Supplements',
            pl: 'Przegląd nowych dodatków do gry'
        },
        description: {
            ua: 'Детальний огляд останніх доповнень, які змінять ваш ігровий досвід назавжди!',
            en: 'A detailed review of the latest supplements that will change your gaming experience forever!',
            pl: 'Szczegółowy przegląd najnowszych dodatków, które na zawsze zmienią Twoje doświadczenie z gry!'
        },
        fullContent: {
            ua: 'Цього року вийшло кілька видатних доповнень для D&D, які варті вашої уваги!\n\n**1. Bigby Presents: Glory of the Giants**\nДетальний гайд по гігантах з новими підкласами, заклинаннями та варварськими шляхами. Ідеально для епічних кампаній!\n\n**2. The Book of Many Things**\nРозширення легендарної Колоди Багатьох Речей з новими картами, пригодами та магічними предметами.\n\n**3. Planescape: Adventures in the Multiverse**\nПовернення до класичного сетингу з трьома книгами: гайд по Сигілу, бестіарій та пригода "Turn of Fortune\'s Wheel".\n\n**Висновок:**\nКожне доповнення додає унікальні елементи до гри. Найбільше рекомендуємо Planescape для досвідчених гравців, які хочуть дослідити мультивсесвіт!\n\n**Рейтинг: 9/10**',
            en: 'This year saw several outstanding D&D supplements worthy of your attention!\n\n**1. Bigby Presents: Glory of the Giants**\nDetailed guide to giants with new subclasses, spells, and barbarian paths. Perfect for epic campaigns!\n\n**2. The Book of Many Things**\nExpansion of the legendary Deck of Many Things with new cards, adventures, and magic items.\n\n**3. Planescape: Adventures in the Multiverse**\nReturn to the classic setting with three books: Sigil guide, bestiary, and "Turn of Fortune\'s Wheel" adventure.\n\n**Conclusion:**\nEach supplement adds unique elements to the game. We most recommend Planescape for experienced players wanting to explore the multiverse!\n\n**Rating: 9/10**',
            pl: 'W tym roku ukazało się kilka wybitnych dodatków do D&D wartych uwagi!\n\n**1. Bigby Presents: Glory of the Giants**\nSzczegółowy przewodnik po gigantach z nowymi podklasami, zaklęciami i ścieżkami barbarzyńcy. Idealny do epickich kampanii!\n\n**2. The Book of Many Things**\nRozszerzenie legendarnej Talii Wielu Rzeczy o nowe karty, przygody i magiczne przedmioty.\n\n**3. Planescape: Adventures in the Multiverse**\nPowrót do klasycznego settingu z trzema książkami: przewodnik po Sigil, bestiariusz i przygoda "Turn of Fortune\'s Wheel".\n\n**Wniosek:**\nKażdy dodatek dodaje unikalne elementy do gry. Najbardziej polecamy Planescape dla doświadczonych graczy chcących eksplorować multiwszechświat!\n\n**Ocena: 9/10**'
        },
        link: '#'
    }
];

// Articles display settings
const INITIAL_ARTICLES_COUNT = 3;
let showAllArticles = false;

// Current language
let currentLanguage = localStorage.getItem('language') || 'ua';