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
        // Используем супер-стабильный глобальный сервер Cloudflare ИИ
        let response = await fetch("https://those-cloudflare-ai.glitch.me/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                messages: [{ role: "user", content: userText }]
            })
        });

        // Если это зеркало устало, переключаемся на резервное текстовое API
        if (!response.ok) {
            response = await fetch(`https://text.pollinations.ai/${encodeURIComponent(userText)}?model=openai`);
        }

        let aiResponse = "";
        
        if (response.headers.get("content-type")?.includes("application/json")) {
            let data = await response.json();
            aiResponse = data.choices[0].message.content;
        } else {
            aiResponse = await response.text();
        }
        
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
        // Запасной план: если сеть вообще упала, бот ответит сам локально!
        let localAnswers = [
            "Что-то интернет барахлит, но я всё равно рад тебя видеть!",
            "Ой, связь прервалась! Но ты пиши еще, я попробую поймать сигнал.",
            "Мой искусственный мозг ушел на перезагрузку, повтори вопрос!"
        ];
        let randomAnswer = localAnswers[Math.floor(Math.random() * localAnswers.length)];
        
        responseText.innerText = randomAnswer;
        spriteImage.src = "happy.png";
    }
}
