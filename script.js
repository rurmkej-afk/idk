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
        // Стабильный открытый шлюз к нейросети Qwen 2.5, полностью разрешенный для браузеров (CORS)
        let response = await fetch("https://chat.ai-tunnel.ru/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "Qwen/Qwen2.5-7B-Instruct",
                messages: [{ role: "user", content: userText }]
            })
        });

        if (!response.ok) {
            throw new Error("Ошибка сервера: " + response.status);
        }

        let data = await response.json();
        
        // Извлекаем чистый текст ответа
        let aiResponse = data.choices[0].message.content;
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
