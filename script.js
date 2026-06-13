// Ждем, пока компонент Google отрендерится на странице
customElements.whenDefined('gm-ai-text-sandwich').then(() => {
    const aiComponent = document.querySelector('gm-ai-text-sandwich');
    const spriteImage = document.getElementById('sprite');

    // Слушаем, когда ИИ сгенерирует ответ
    aiComponent.addEventListener('approve', (event) => {
        // Достаем текст ответа из компонента
        let aiResponse = event.detail.text; 
        
        // Логика смены эмоций картинки
        let lowerText = aiResponse.toLowerCase();
        if (aiResponse.includes("!") || lowerText.includes("нет") || lowerText.includes("ужас") || lowerText.includes("блин")) {
            spriteImage.src = "angry.png";
        } else {
            spriteImage.src = "happy.png";
        }
    });
});
