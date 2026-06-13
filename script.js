const API_KEY = "AIzaSyAg6LJQsV2S6m1Bg_fzBloxtodueke_Syw"; 
// Меняем 1.5 на 2.5
const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;
// Привязываем функцию к окну браузера, чтобы кнопка в HTML её видела
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
        let response = await fetch(API_URL, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: userText }]
                }]
            })
        });

        let data = await response.json();

        // Проверяем, прислал ли Google ошибку внутри ответа
        if (data.error) {
            console.error("Ошибка от Google:", data.error.message);
            responseText.innerText = "Google ругается: " + data.error.message;
            return;
        }
        
        // Достаем текст ответа
        let aiResponse = data.candidates[0].content.parts[0].text;
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
