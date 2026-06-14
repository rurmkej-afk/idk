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

    // Твой личный ключ нового поколения
    const API_KEY = "AQ.Ab8RN6Kkrn08agSFd_3eZy5a8432Vz_IHn_tDm5MNpWPxZDpWQ";
    
    // Используем универсальный эндпоинт v1beta
    const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

    try {
        let response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Передаем AQ-ключ как Bearer-токен, обходя блокировку браузерного API
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: userText }]
                }]
            })
        });

        let data = await response.json();

        if (data.error) {
            console.error("Ошибка от Google:", data.error.message);
            responseText.innerText = "Google ругается: " + data.error.message;
            return;
        }
        
        // Достаем текст ответа Gemini
        let aiResponse = data.candidates[0].content.parts[0].text;
        responseText.innerText = aiResponse;

        // Логика эмоций твоего персонажа
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
