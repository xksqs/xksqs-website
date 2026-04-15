// Typewriter effect for the title text
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
            setTimeout(() => reverseTypeEffect(elementId, 130), 3000);
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
            setTimeout(() => typeEffect(elementId, 'Hello, World!', 70), 1400);
        }
    }

    deleteChar();
}

typeEffect('title-text', 'Hello, World!', 70);

// Title change depending on visibility
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    document.title = "See you next time!";
  } else {
    document.title = "xksqs";
  }
});

// Mobile Warning
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

if (isMobile) {
    alert("This website is NOT meant for mobile devices, I promise to you this site will not work on mobile. Please use a desktop or laptop to view this site.");
}

// Fix scroll snapping 
if (!window.location.href.includes("#")) {
    window.location.href += "#";
}