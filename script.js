function askCharacter() {
    // Получаем то, что ввел пользователь
    let inputField = document.getElementById("user-input");
    let userText = inputField.value.trim();

    // Если пользователь ничего не написал, ничего не делаем
    if (userText === "") {
        alert("Сначала напиши вопрос!");
        return;
    }

    // База ответов нашего персонажа (текст + эмоция)
    let answers = [
        { text: "Ого, ну ты и гений конечно! Задавай еще!", image: "happy.png" },
        { text: "Что за глупый вопрос?! Больше не спрашивай такое!", image: "angry.png" },
        { text: "Хммм... Дай подумать. Сложно сказать однозначно.", image: "happy.png" }, // Если нет третьей картинки, пока используем happy
        { text: "Я без понятия, если честно. Спроси кого-нибудь другого.", image: "angry.png" }
    ];

    // Выбираем случайный ответ из списка
    let randomIndex = Math.floor(Math.random() * answers.length);
    let chosenAnswer = answers[randomIndex];

    // Находим элементы на странице
    let spriteImage = document.getElementById("sprite");
    let responseText = document.getElementById("response-text");

    // Меняем текст ответа и картинку персонажа
    responseText.innerText = chosenAnswer.text;
    spriteImage.src = chosenAnswer.image;

    // Очищаем поле ввода для следующего вопроса
    inputField.value = "";
}