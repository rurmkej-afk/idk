const API_KEY = "AIzaSyAg6LJQsV2S6m1Bg_fzBloxtodueke_Syw"; 
// Переключаемся на стабильную v1
const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

async function askCharacter() {
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
        // Запрос подстроен под жесткие стандарты v1
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

        if (!response.ok) {
            // Если гугл вернет ошибку, мы увидим её текст в консоли, а не просто 404
            let errorData = await response.json();
            console.error("Ошибка от Google:", errorData);
            throw new Error("Сервер вернул ошибку");
        }

        let data = await response.json();
        
        let aiResponse = data.candidates[0].content.parts[0].text;
        responseText.innerText = aiResponse;

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
