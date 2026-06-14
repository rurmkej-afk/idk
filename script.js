window.askCharacter = function() {
    let inputField = document.getElementById("user-input");
    let originalText = inputField.value.trim();
    
    if (originalText === "") {
        alert("Сначала напиши вопрос!");
        return;
    }

    // Подготовка текста для проверки триггеров: убираем знаки препинания и приводим к нижнему регистру
    let cleanText = originalText.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?\u2014]/g, "").trim();

    let spriteImage = document.getElementById("sprite");
    let responseText = document.getElementById("response-text");

    // Очищаем поле ввода сразу после отправки
    inputField.value = ""; 

    // --- 1. СПИСКИ СЛОВ ДЛЯ ПРОВЕРКИ ЕДИНОЧНЫХ ВВОДОВ ---
    const hellos = ["привет", "здравствуй", "здравствуйте", "добрый день", "доброе утро", "добрый вечер", "салют", "приветик", "прив", "приве", "хелло", "hello", "хай", "хайо", "хайки", "здарова", "здорово", "здоров", "здрасьте", "здрасте", "дарова", "даров", "дратути", "драсьте", "ку", "ку-ку", "qq", "q", "кукусики", "привки", "привки-пистолетики", "йо", "йоу", "ёу", "sup", "wassup", "sup bro", "сап", "сапчик", "сапе", "хей", "хэй", "хехей", "о/", "\\o", "о7", "шалом", "бонжур", "алоха", "хауди", "салам", "ассаламу алейкум", "йоу бро", "че каво", "че как", "как оно", "чо как", "ку народ", "вечер в хату", "мир вашему дому", "здарова заебал", "ебааа привет", "ну здаров", "опа", "опачки", "опа-на", "хоба", "кути", "мур", "мяу", "пинг", "пинганул", "тут", "alive", "живой", "доброго времени суток", "категорически приветствую", "моё почтение", "приветствую категорически", "салам пополам", "шалом православные", "приветствую путник", "здарова бандиты", "даров бродяги", "кукус", "хоба-на", "ну че народ погнали", "everyone say hiiii", "здравия желаю", "физкульт-привет", "бонсуар", "нихао", "konnichiwa", "ахой", "приветствую вас смертные", "добрейшего вечерочка", "утра доброго", "vietnam", "вечер добрый господа", "приветствую на борту", "ping", "pong", "01101000 01101001", "hi there", "general kenobi", "greetings", "gm", "gn", "heya", "yo", "ойясу", "яхо", "яппи", "ня", "нялоха", "коннитива", "ой", "охаё", "куеба", "привец", "дароу", "здароу", "халоу", "хеллоу", "йоук", "хаи", "хелоуки", "пр"];
    
    const byes = ["пока", "пока-пока", "покааа", "покедова", "покедос", "поки", "поки-доки", "покасики", "покас", "прощай", "прощайте", "до свидания", "досвидос", "досвидули", "досвидули-пули", "до встречи", "бывай", "бывайте", "счастливо", "всего хорошего", "всего доброго", "всего", "удачи", "удачки", "хорошего дня", "доброй ночи", "спокойной ночи", "сладких снов", "чао", "чаос", "чао-какао", "адьос", "гудбай", "goodbye", "bye", "bye-bye", "bb", "cya", "see ya", "see ya later", "later", "gn", "gnight", "bai", "бай", "байбай", "байки", "байос", "аривидерчи", "ариведерчи", "аревуар", "салам пополам", "ну я пошел", "ну бывай", "ну все давай", "давай", "давай-давай", "давай брат", "давай удачи", "давай счастливо", "бывай здоров", "не скучай", "не теряйся", "до скорого", "до связи", "спишемся", "увидимся", "созвонимся", "услышимся", "хорошего вечерочка", "береги себя", "берегися", "обнял", "обнял-приподнял", "чмоки", "чмок", "цем", "целую", "ушел в закат", "я ливнул", "ливаю", "откланяюсь", "разрешите откланяться", "честь имею", "исчезаю", "испаряюсь", "ретируюсь", "удаляюсь", "отчаливаю", "отчаливаю в туман", "отбой", "отлетаю", "откисаю", "я спать", "я афк", "afk", "gtg", "gotta go", "im out", "peace", "peace out", "one love", "gl hf", "всем пока", "всем бай", "народ пока", "ну все народ", "всем удачи", "бывайте ихтиандры", "до новых встреч", "увидимся на просторах интернета", "до следующего вайпа", "до следующего созвона", "пока котятки", "мур", "мяф", "ня", "ня-пока", "сайонара", "матане", "оясуми", "good night", "farewell", "so long", "adios amigos", "hasta la vista", "всем чмоки в этом чатике", "поки-чмоки", "досвиданья господа", "ну все я в небытие", "ладно исчезаю", "все растворился", "я пошуршал", "я поплыл", "ну все счастья-здоровья", "всем бобра", "всем добра", "бывай тигр", "давай бро", "до талого", "увидимся если выживем", "не поминай лихом"];

    // Вспомогательная функция для случайного выбора спрайта
    function getRandomSprite(spriteA, spriteB) {
        return Math.random() < 0.5 ? spriteA : spriteB;
    }

    // --- 2. ЛОГИКА ПРОВЕРКИ ТРИГГЕРОВ (ОТ ПРИОРИТЕТНЫХ К ОБЩИМ) ---

    // Модуль 3: Вопрос "мне нужно что-то знать, Верити?"
    if (cleanText.includes("мне нужно чтото знать верити") || cleanText.includes("мне нужно что то знать верити")) {
        const predictions = [
            { text: "Что-то случится через 3 дня.", sprite: "angryverity.png" },
            { text: "Ровно через 1 час и 7 минут пойдет дождь. Что-то ещё?", sprite: "happyverity.png" },
            { text: "Сегодня все спокойно.", sprite: "happyverity.png" },
            { text: "У тебя почти закончились ресурсы. Ты можешь добыть их по координатам -97214, 67, -1598 !", sprite: "happyverity.png" }
        ];
        let choice = predictions[Math.floor(Math.random() * predictions.length)];
        responseText.innerText = choice.text;
        spriteImage.src = choice.sprite;
        return;
    }

    // Модуль 5: "Что ты знаешь обо мне?" / "Ты знаешь кто я?"
    if (cleanText.includes("что ты знаешь обо мне") || cleanText.includes("ты знаешь кто я")) {
        responseText.innerText = "Я знаю всё.";
        spriteImage.src = "obsessedverity.png";
        return;
    }

    // Модуль 6: Упоминание Создателя ("Моб", "Mob", "ThatMob")
    if (cleanText.includes("моб") || cleanText.includes("mob") || cleanText.includes("thatmob")) {
        responseText.innerText = "...";
        spriteImage.src = getRandomSprite("obsessedverity.png", "angryverity.png");
        return;
    }

    // Модуль 4: "кто ты?" / "как тебя зовут?"
    if (cleanText.includes("кто ты") || cleanText.includes("как тебя зовут") || cleanText.includes("твое имя")) {
        responseText.innerText = "Я Верити, твой друг помощник!";
        spriteImage.src = "happyverity.png";
        return;
    }

    // Модуль 8: "Верити, брось кубик"
    if (cleanText.includes("брось кубик") || cleanText.includes("кинь кубик")) {
        let diceResult = Math.floor(Math.random() * 6) + 1;
        responseText.innerText = diceResult.toString();
        spriteImage.src = getRandomSprite("happyverity.png", "neutralverity.png");
        return;
    }

    // Модуль 7: Математический калькулятор
    // Ищем любые математические выражения, например: 5+5, 230*4, 1050/2, 45-12
    let mathMatch = originalText.replace(/\s+/g, "").match(/^(\d+)([\+\-\*\/])(\d+)$/);
    if (mathMatch) {
        let num1 = parseFloat(mathMatch[1]);
        let operator = mathMatch[2];
        let num2 = parseFloat(mathMatch[3]);
        let result = 0;

        if (operator === "+") result = num1 + num2;
        else if (operator === "-") result = num1 - num2;
        else if (operator === "*") result = num1 * num2;
        else if (operator === "/") {
            if (num2 === 0) {
                responseText.innerText = "Ошибка. Мой код ломается, если делить на пустоту...";
                spriteImage.src = "glitchverity.png";
                return;
            }
            result = num1 / num2;
        }
        
        responseText.innerText = `Это слишком просто, ответ будет ${result}.`;
        spriteImage.src = getRandomSprite("happyverity.png", "neutralverity.png");
        return;
    }

    // Модуль 1: Приветствие (Срабатывает, ТОЛЬКО если введено одиночное приветствие)
    if (hellos.includes(cleanText)) {
        responseText.innerText = "Привет! Я Верити, твой друг помощник! Спрашивай что хочешь, я знаю всё.";
        spriteImage.src = "happyverity.png";
        return;
    }

    // Модуль 2: Прощание (Срабатывает, ТОЛЬКО если введено одиночное прощание)
    if (byes.includes(cleanText)) {
        responseText.innerText = "...";
        spriteImage.src = "neutralverity.png";
        return;
    }

    // Модуль 9: Атмосферная заглушка (Если ни один триггер не подошел)
    let defaultAnswers = [
        "...",
        "Спроси по другому."
    ];
    responseText.innerText = defaultAnswers[Math.floor(Math.random() * defaultAnswers.length)];
    spriteImage.src = "neutralverity.png";
};
