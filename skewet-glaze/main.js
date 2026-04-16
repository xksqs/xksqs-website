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

//Heartrate randomiser
let intervalId;
let alr_played = false

function randomiseHeartRate() {
    heartRate = Math.floor(Math.random() * 30) + heartRate;
    document.getElementById("heartbeat-value").textContent = heartRate.toString() + " BPM";

    clearInterval(intervalId);

    const delay = Math.max(100, 1000 - heartRate); // prevent negative or 0
    intervalId = setInterval(randomiseHeartRate, delay);

    if (heartRate >= 200 && !alr_played) {
        const audio = new Audio("vent-err.mp3");
        audio.loop = true;
        alr_played = true
        audio.play();
    }
}

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
    skewetGlaze.style.left = Math.random() * (window.innerWidth-10) + "px"; 
    skewetGlaze.style.top = Math.random() * (window.innerHeight-10) + "px";

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

const jumpscare = document.getElementById("jumpscare")
let interval

function mIS_Opacity() {
    if ((jumpscare.style.opacity) > 0) {
        jumpscare.style.opacity -= 0.02
    } else {
        jumpscare.style.display = "none";
        clearInterval(interval)
    }
}

function makeItStop() {
    jumpscare.style.opacity = 1
    interval = setInterval(mIS_Opacity, 50)

    const jumpscare_audio = new Audio("jumpscare.mp3")
    jumpscare_audio.play();
}

const btn = document.getElementById("make-it-stop")

document.addEventListener('DOMContentLoaded', () => {
    btn.style.left = Math.random() * (window.innerWidth-10) + "px"; 
    btn.style.top = Math.random() * (window.innerHeight-10) + "px";
});

btn.addEventListener("click", () => {
    btn.style.left = Math.random() * (window.innerWidth-10) + "px"; 
    btn.style.top = Math.random() * (window.innerHeight-10) + "px";
    jumpscare.style.display = "block";
    makeItStop()
});

document.addEventListener("click", () => {
    const audio = new Audio("EFN.mp3");
    audio.loop = true;
    audio.play();

    intervalId = setInterval(randomiseHeartRate, 1000);
    setInterval(spawnSkewetGlaze, 100);
    cycleColors();

    document.getElementById("bait").style.display = "none";
}, { once: true });