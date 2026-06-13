window.askCharacter = async function() {
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

    // Используем CORS-прокси, который разрешает браузеру читать ответ
    const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
    const TARGET_URL = "https://text.pollinations.ai/" + encodeURIComponent(userText);

    try {
        // Склеиваем прокси и цель вместе
        let response = await fetch(CORS_PROXY + TARGET_URL);

        if (!response.ok) {
            throw new Error("Ошибка сети");
        }

        let aiResponse = await response.text();
        responseText.innerText = aiResponse;

        // Логика эмоций персонажа
        let lowerText = aiResponse.toLowerCase();
        if (aiResponse.includes("!") || lowerText.includes("нет") || lowerText.includes("ужас") || lowerText.includes("блин")) {
            spriteImage.src = "angry.png";
        } else {
            spriteImage.src = "happy.png";
        }

    } catch (error) {
        console.error("Критическая ошибка:", error);
        responseText.innerText = "Упс! Нужно активировать прокси-доступ. Нажми кнопку ниже.";
        spriteImage.src = "angry.png";
    }
}
