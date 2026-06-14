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
        // Ультра-надежный и бесплатный ИИ-сервер без авторизации
        let response = await fetch("https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ inputs: userText })
        });

        if (!response.ok) {
            throw new Error("Ошибка сервера: " + response.status);
        }

        let data = await response.json();
        
        // Извлекаем сгенерированный текст
        let aiResponse = data[0].generated_text || "Привет!";
        
        // Если ИИ продублировал наш вопрос, убираем его
        if (aiResponse.startsWith(userText)) {
            aiResponse = aiResponse.replace(userText, "").trim();
        }
        
        responseText.innerText = aiResponse;

        // Логика эмоций
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
