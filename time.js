var isTimer = true;
var countDownInterval;
var remainingTime;

function play() {
    let audio = new Audio("sound/AlarmSound.mp3");
    setTimeout(() => {
        audio.play();
        setTimeout(() => {
            audio.pause();
            audio.currentTime = 0;
            alert("Time's up!");
        }, 3000);
    }, 0);
}

function resetInputs() {
    document.querySelector("#hours input").value = "00";
    document.querySelector("#minutes input").value = "00";
    document.querySelector("#seconds input").value = "00";
}

function startTimer(startHour, startMinute, startSecond) {
    let totalSeconds = startHour * 3600 + startMinute * 60 + startSecond;

    countDownInterval = setInterval(() => {
        let remainingHours = Math.floor(totalSeconds / 3600);
        let remainingMinutes = Math.floor((totalSeconds % 3600) / 60);
        let remainingSeconds = Math.floor((totalSeconds % 3600) % 60);
        remainingMinutes = remainingMinutes < 10 ? "0" + remainingMinutes : remainingMinutes;
        remainingSeconds = remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;

        document.querySelector("#hours input").value = remainingHours;
        document.querySelector("#minutes input").value = remainingMinutes;
        document.querySelector("#seconds input").value = remainingSeconds;

        if (totalSeconds === 0) {
            clearInterval(countDownInterval);
            resetInputs();
            play();
        }
        totalSeconds--;
    }, 1000);
}

function startStopwatch(startHour, startMinute, startSecond) {
    let totalSeconds = startHour * 3600 + startMinute * 60 + startSecond;

    countDownInterval = setInterval(() => {
        let remainingHours = Math.floor(totalSeconds / 3600);
        let remainingMinutes = Math.floor((totalSeconds % 3600) / 60);
        let remainingSeconds = Math.floor((totalSeconds % 3600) % 60);
        remainingMinutes = remainingMinutes < 10 ? "0" + remainingMinutes : remainingMinutes;
        remainingSeconds = remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;

        document.querySelector("#hours input").value = remainingHours;
        document.querySelector("#minutes input").value = remainingMinutes;
        document.querySelector("#seconds input").value = remainingSeconds;

        totalSeconds++;
    }, 1000);
}

function switchToTimer() {
    isTimer = true;
    document.querySelector("#img-container").innerHTML = "<img src='images/clock.png' alt='clock' width='170px'>";
    document.querySelector("#stopWatch").style.backgroundColor= "#007bff";
    document.querySelector("#timer").style.backgroundColor=  "rgb(0, 86, 179)";
    resetInputs();
    clearInterval(countDownInterval);
    remainingTime = null;
}

function switchToStopwatch() {
    isTimer = false;
    document.querySelector("#img-container").innerHTML = "<img src='images/stopwatch2.png' alt='stopwatch' width='180px' height='170px'>";
    document.querySelector("#stopWatch").style.backgroundColor= "rgb(0, 86, 179)";
    document.querySelector("#timer").style.backgroundColor= "#007bff";
    resetInputs();
    clearInterval(countDownInterval);
    remainingTime = null;
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#reset").addEventListener("click", function (event) {
        clearInterval(countDownInterval);
        resetInputs();
        remainingTime = null;
    });

    document.querySelector("#stop").addEventListener("click", function (event) {
        clearInterval(countDownInterval);
    });

    document.querySelector("#start").addEventListener("click", function (event) {
        if (isTimer) {
            let startHour = parseInt(document.querySelector("#hours input").value);
            let startMinute = parseInt(document.querySelector("#minutes input").value);
            let startSecond = parseInt(document.querySelector("#seconds input").value);
            if (remainingTime === null) {
                remainingTime = startHour * 3600 + startMinute * 60 + startSecond;
            }
            startTimer(startHour, startMinute, startSecond);
        } else {
            let startHour = parseInt(document.querySelector("#hours input").value);
            let startMinute = parseInt(document.querySelector("#minutes input").value);
            let startSecond = parseInt(document.querySelector("#seconds input").value);
            if (remainingTime === null) {
                remainingTime = startHour * 3600 + startMinute * 60 + startSecond;
            }
            startStopwatch(startHour, startMinute, startSecond);
        }
    });

    document.querySelector("#stopWatch").addEventListener("click", function (event) {
        switchToStopwatch();
    });

    document.querySelector("#timer").addEventListener("click", function (event) {
        switchToTimer();
    });


    //Make Timer as default on page load
    switchToTimer();
});
