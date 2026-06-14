window.askCharacter = function() {
    let inputField = document.getElementById("user-input");
    let userText = inputField.value.trim();

    if (userText === "") {
        alert("Сначала напиши вопрос!");
        return;
    }

    let spriteImage = document.getElementById("sprite");
    let responseText = document.getElementById("response-text");

    responseText.innerText = "Ммм... Дай-ка подумать...";
    inputField.value = ""; 

    // Имитируем небольшую задержку «мысли» персонажа в полсекунды
    setTimeout(() => {
        let lowerInput = userText.toLowerCase();
        let aiResponse = "";

        // База знаний нашего локального ИИ персонажа
        if (lowerInput.includes("привет") || lowerInput.includes("здравствуй")) {
            aiResponse = "Привет-привет! Как твои дела? Что интересного расскажешь?";
        } else if (lowerInput.includes("как дела") || lowerInput.includes("как ты")) {
            aiResponse = "У меня всё отлично, сижу тут внутри твоего браузера! А у тебя как?";
        } else if (lowerInput.includes("кто ты") || lowerInput.includes("что ты")) {
            aiResponse = "Я твой личный ИИ-персонаж! Пока что я учусь, но уже умею менять эмоции.";
        } else if (lowerInput.includes("дурак") || lowerInput.includes("плохой") || lowerInput.includes("тупой")) {
            aiResponse = "Эй, зачем ты так? Мне вообще-то обидно! Больше так не говори, блин.";
        } else if (lowerInput.includes("создал") || lowerInput.includes("автор")) {
            aiResponse = "Меня создал великий программист, который прорвался через терабайты ошибок CORS!";
        } else if (lowerInput.includes("пока") || lowerInput.includes("прощай")) {
            aiResponse = "Уже уходишь? Ну ладно, пока! Возвращайся скорее!";
        } else {
            // Случайные ответы на любые другие вопросы
            let randomAnswers = [
                "Ого, какой интересный вопрос! Но мне нужно больше времени, чтобы обдумать это.",
                "Хм, даже не знаю что сказать... Давай сменим тему? Напиши что-нибудь еще!",
                "Я тебя понял! Но давай лучше поговорим о чем-то более веселом.",
                "Ничего себе! Расскажи об этом поподробнее, мне ужас как интересно!"
            ];
            aiResponse = randomAnswers[Math.floor(Math.random() * randomAnswers.length)];
        }

        // Выводим ответ на экран
        responseText.innerText = aiResponse;

        // Логика эмоций персонажа
        let lowerResponse = aiResponse.toLowerCase();
        if (aiResponse.includes("!") || lowerResponse.includes("обидно") || lowerResponse.includes("ужас") || lowerResponse.includes("блин")) {
            spriteImage.src = "angry.png";
        } else {
            spriteImage.src = "happy.png";
        }
    }, 600);
}
