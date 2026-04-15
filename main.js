function typeEffect(elementId, text, speed) {
    const element = document.getElementById(elementId);
    const cursor = document.querySelector('.cursor');
    element.textContent = '';
    let index = 0;
    cursor.classList.add('typing');      // stop blinking

    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        } else {
            cursor.classList.remove('typing');  // start blinking during pause
            setTimeout(() => reverseTypeEffect(elementId, 100), 3000);
        }
    }

    type();
}

function reverseTypeEffect(elementId, speed) {
    const element = document.getElementById(elementId);
    const cursor = document.querySelector('.cursor');
    cursor.classList.add('typing');      // stop blinking

    function deleteChar() {
        if (element.textContent.length > 0) {
            element.textContent = element.textContent.slice(0, -1);
            setTimeout(deleteChar, speed);
        } else {
            cursor.classList.remove('typing');  // start blinking during pause
            setTimeout(() => typeEffect(elementId, 'Hello, World!', 50), 1000);
        }
    }

    deleteChar();
}

typeEffect('title-text', 'Hello, World!', 50);