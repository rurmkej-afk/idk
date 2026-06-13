// Импортируем официальный браузерный модуль Gemini от Google
import { GoogleGenAI } from "https://esm.run/@google/generative-ai";

// Твой рабочий ключ нового поколения
const API_KEY = "AQ.Ab8RN6Kkrn08agSFd_3eZy5a8432Vz_IHn_tDm5MNpWPxZDpWQ";

// Инициализируем ИИ через официальный класс
const ai = new GoogleGenAI({ apiKey: API_KEY });

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
        // Подключаем актуальную модель gemini-2.5-flash через официальный метод
        const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });
        const result = await model.generateContent(userText);
        
        // Получаем чистый текст ответа
        const aiResponse = result.response.text();
        responseText.innerText = aiResponse;

        // Эмоции персонажа
        let lowerText = aiResponse.toLowerCase();
        if (aiResponse.includes("!") || lowerText.includes("нет") || lowerText.includes("ужас") || lowerText.includes("блин")) {
            spriteImage.src = "angry.png";
        } else {
            spriteImage.src = "happy.png";
        }

    } catch (error) {
        console.error("Ошибка Gemini SDK:", error);
        responseText.innerText = "Ой, что-то связь с моим мозгом оборвалась... Попробуй еще раз!";
        spriteImage.src = "angry.png";
    }
}
