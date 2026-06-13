// Вставь свой настоящий API-ключ между кавычками:
const API_KEY = "AIzaSyAg6LJQsV2S6m1Bg_fzBloxtodueke_Syw"; 
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

async function askCharacter() {
    let inputField = document.getElementById("user-input");
    let userText = inputField.value.trim();

    if (userText === "") {
        alert("Сначала напиши вопрос!");
        return;
    }

    let spriteImage = document.getElementById("sprite");
    let responseText = document.getElementById("response-text");

    // Шаг 1: Персонаж «задумался». Включаем happy (или thinking, если создашь такую картинку)
    responseText.innerText = "Ммм... Дай-ка подумать...";
    // Очищаем поле ввода сразу, чтобы пользователь видел, что процесс пошел
    inputField.value = ""; 

    try {
        // Шаг 2: Отправляем запрос к ИИ через интернет
        let response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: userText }] }]
            })
        });

        let data = await response.json();
        
        // Достаем чистый текст ответа ИИ
        let aiResponse = data.candidates[0].content.parts[0].text;

        // Шаг 3: Выводим ответ на экран
        responseText.innerText = aiResponse;

        // Шаг 4: Проверяем настроение ответа
        // Если в тексте ИИ есть восклицательный знак, капс или грустные слова — он злится
        let lowerText = aiResponse.toLowerCase();
        if (aiResponse.includes("!") || lowerText.includes("нет") || lowerText.includes("ужас") || lowerText.includes("блин")) {
            spriteImage.src = "angry.png";
        } else {
            spriteImage.src = "happy.png";
        }

    } catch (error) {
        // Если что-то пошло не так (например, кончился интернет или ключ не работает)
        console.error(error);
        responseText.innerText = "Ой, что-то связь с моим мозгом оборвалась... Попробуй еще раз!";
        spriteImage.src = "angry.png";
    }
}
