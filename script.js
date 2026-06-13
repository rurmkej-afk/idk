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
        // Переключаемся на ультра-стабильный бесплатный ИИ от DuckDuckGo
        let response = await fetch("https://nexra.aryahcr.cc/api/chat/gpt", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                messages: [{ role: "user", content: userText }],
                stream: false
            })
        });

        if (!response.ok) {
            throw new Error("Ошибка сервера");
        }

        let data = await response.json();
        
        // Достаем чистый текст ответа
        let aiResponse = data.gpt || data.gpt4 || data.text || "Привет!";
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
