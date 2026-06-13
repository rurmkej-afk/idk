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
        // Используем бесплатный, стабильный текстовый ИИ-интерфейс без ключей
        let response = await fetch(`https://text.pollinations.ai/${encodeURIComponent(userText)}`);

        if (!response.ok) {
            throw new Error("Ошибка сети");
        }

        let aiResponse = await response.text();
        
        // Выводим ответ на экран
        responseText.innerText = aiResponse;

        // Эмоции персонажа
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
