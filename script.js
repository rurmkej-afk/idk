// Вставь сюда свой ключ, который начинается на AQ...
const API_KEY = "AQ.Ab8RN6LqWwFakfYLTOBJ3JBh4sELYh6XKCi9zSoxssptzXE2hA"; 
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
        // Новый формат запроса, который требует v1 с AQ-ключами
        let response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ role: "user", parts: [{ text: userText }] }]
            })
        });

        let data = await response.json();
        
        // Достаем ответ
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
        console.error(error);
        responseText.innerText = "Ой, что-то связь с моим мозгом оборвалась... Попробуй еще раз!";
        spriteImage.src = "angry.png";
    }
}
