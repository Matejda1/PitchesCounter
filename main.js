// Const
const menuIcon = document.querySelector(".menu-icon")
const menu = document.querySelector(".menu")
const pitches = document.querySelector("#pitches")
const strikes = document.querySelector("#strikes")
const balls = document.querySelector("#balls")
const strikeDots = document.querySelector(".dots--strike")
const ballDots = document.querySelector(".dots--ball")
const innings = document.querySelector("#innings")

const strikeBtn = document.querySelector("#strike-btn")
const ballBtn = document.querySelector("#ball-btn")
const foulBtn = document.querySelector("#foul-btn")
const resetBtn = document.querySelector("#reset-btn")

// Alert
const alert = document.querySelector(".alert")
const yesBtn = document.querySelector("#yes-btn")
const noBtn = document.querySelector("#no-btn")

// Main code
let pitch = parseInt(localStorage.getItem("pitch")) || 0
let strike = parseInt(localStorage.getItem("strike")) || 0
let ball = parseInt(localStorage.getItem("ball")) || 0
let strikeCount = parseInt(localStorage.getItem("strikeCount")) || 0
let ballCount = parseInt(localStorage.getItem("ballCount")) || 0
let inning = parseInt(localStorage.getItem("inning")) || 1

function updateUI() {
    pitches.innerHTML = pitch
    strikes.innerHTML = strike
    balls.innerHTML = ball
    innings.innerHTML = inning

    if (strikeCount < 3) {
        setCount(strikeDots, strikeCount)
    } else {
        strikeCount = 0
        ballCount = 0
        setCount(strikeDots, strikeCount)
        setCount(ballDots, ballCount)
    }

    if (ballCount < 4) {
        setCount(ballDots, ballCount)
    } else {
        ballCount = 0
        strikeCount = 0
        setCount(ballDots, ballCount)
        setCount(strikeDots, strikeCount)
    }
}

updateUI()

function saveData() {
    localStorage.setItem("pitch", pitch)
    localStorage.setItem("strike", strike)
    localStorage.setItem("ball", ball)
    localStorage.setItem("strikeCount", strikeCount)
    localStorage.setItem("ballCount", ballCount)
    localStorage.setItem("inning", inning)
}

function setCount(conatiner, count) {
    conatiner.querySelectorAll("i").forEach((dot, index) => {
        dot.classList.toggle("on", index < count)
    });

}

strikeBtn.addEventListener("click", () => {
    pitch++
    strike++
    strikeCount++

    saveData()
    updateUI()
})

ballBtn.addEventListener("click", () => {
    pitch++
    ball++
    ballCount++

    saveData()
    updateUI()
})

foulBtn.addEventListener("click", () => {
    pitch++
    strike++

    if (strikeCount < 2) {
        strikeCount++
    } 
    saveData()
    updateUI()
})

resetBtn.addEventListener("click", () => {
    alert.style.display = "flex"

    yesBtn.addEventListener("click", () => {
        alert.style.display = "none"

        pitch = 0
        strike = 0
        ball = 0

        saveData()
        updateUI()
    })

    noBtn.addEventListener("click", () => {
        alert.style.display = "none"
    })
})

// Zooming
document.addEventListener('touchend', function (event) {
    var now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now
}, false);

var lastTouchEnd = 0

// Alert

// Menu
menuIcon.addEventListener("click", () => {
    menu.style.display = "block"
})