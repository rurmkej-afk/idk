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

    try {
        // Простой GET-запрос через обычную ссылку. 
        // Добавляем кэш-брейкер &cb=, чтобы запросы не повторялись.
        let response = await fetch(`https://text.pollinations.ai/${encodeURIComponent(userText)}?json=false&cb=${Date.now()}`);

        if (!response.ok) {
            throw new Error("Ошибка сервера");
        }

        // Получаем чистый текст ответа напрямую
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
        responseText.innerText = "Ой, что-то связь с моим мозгом оборвалась... Попробуй еще раз!";
        spriteImage.src = "angry.png";
    }
}
