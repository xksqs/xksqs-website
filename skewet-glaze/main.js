const colors = ["red", "blue", "#00ff00"];
let heartRate = 100;

function changeColor(color) {
    document.body.style.backgroundColor = color;
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function cycleColors() {
    while (true) {
        for (let color of colors) {
            changeColor(color);
            await delay(Math.max(100, 500 - (heartRate / 2)));
        }
    }
}

cycleColors();


//Heartrate randomiser
let intervalId;

function randomiseHeartRate() {
    heartRate = Math.floor(Math.random() * 30) + heartRate;
    document.getElementById("heartbeat-value").textContent = heartRate;

    clearInterval(intervalId);

    const delay = Math.max(100, 1000 - heartRate); // prevent negative or 0
    intervalId = setInterval(randomiseHeartRate, delay);
}

// start it
intervalId = setInterval(randomiseHeartRate, 1000);

//Skewet glaze spawner
function randomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

function randomText() {
    const texts = ["SKEWET IS LOVE", "SKEWET IS LIFE", "SKEWET IS THE BEST", "SKEWET IS AMAZING", "I WOULD GLAZEEEE SKEWET", "img"];
    return texts[Math.floor(Math.random() * texts.length)];
}

function spawnSkewetGlaze() {
    const skewetGlaze = document.createElement("div");
    skewetGlaze.classList.add("skewet-glaze");
    skewetGlaze.style.left = Math.random() * window.innerWidth + "px"; 
    skewetGlaze.style.top = Math.random() * window.innerHeight + "px";

    text = randomText();
    if (text == "img") {
        skewetGlaze.textContent = "";
        skewetGlaze.style.backgroundImage = "url('images/skewet.png')";
        skewetGlaze.style.opacity = "0.5";
        skewetGlaze.style.backgroundSize = "cover";
        skewetGlaze.style.width = "50px";
        skewetGlaze.style.height = "50px";
        document.body.appendChild(skewetGlaze);
        return
    } else {
        skewetGlaze.textContent = text;
        skewetGlaze.style.color = randomColor();   
        document.body.appendChild(skewetGlaze);
    }
}
setInterval(spawnSkewetGlaze, 100);


document.addEventListener("click", () => {
    const audio = new Audio("EFN.mp3");
    audio.loop = true;
    audio.play();
}, { once: true });