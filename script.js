import { GoogleGenAI } from "@google/generative-ai";

// Твой рабочий ключ
const API_KEY = "AIzaSyAg6LJQsV2S6m1Bg_fzBloxtodueke_Syw";
const ai = new GoogleGenAI({ apiKey: API_KEY });

// Делаем функцию доступной для кнопки HTML, так как у нас теперь type="module"
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
        // Официальный и самый стабильный вызов модели
        const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(userText);
        const aiResponse = result.response.text();

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
        console.error("Ошибка ИИ:", error);
        responseText.innerText = "Ой, что-то связь с моим мозгом оборвалась... Попробуй еще раз!";
        spriteImage.src = "angry.png";
    }
}
