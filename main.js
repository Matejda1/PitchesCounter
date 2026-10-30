// Const
// Menu
const menuIcon = document.querySelector(".menu-icon")
const menu = document.querySelector(".menu")
const body = document.querySelector(".body")
const header = document.querySelector(".header")
const main = document.querySelector(".main")
const footer = document.querySelector(".footer")
const menuCloseIcon = document.querySelector(".menu-close-icon")
// Alert
const alertContainer = document.querySelector(".alert")
const alertHeading = document.querySelector("#alert-heading")
const alertContent = document.querySelector("#alert-content")
const alertYesBtn = document.querySelector("#yes-btn")
const alertNoBtn = document.querySelector("#no-btn")
// Name & Number input
const pitcherNameInput = document.querySelector("#pitcherName")
const pitcherJerseyInput = document.querySelector("#pitcherJersey")
const pitcherNameBtn = document.querySelector(".name-svg")
const pitcherJerseyBtn = document.querySelector(".number-svg")
const nameOfPitcher = document.querySelector(".nameOfPitcher")
const nameOfPitcherMenu = document.querySelector(".nameOfPitcherMenu")
const numberOfPitcher = document.querySelector(".numberOfPitcher")
const numberOfPitcherMenu = document.querySelector(".numberOfPitcherMenu")
// Main app
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
const backBtn = document.querySelector("#back-btn")
const inningBtn = document.querySelector("#inning-btn")
const fullResetBtn = document.querySelector("#fullReset")

// Main code
let pitch = parseInt(localStorage.getItem("pitch")) || 0
let strike = parseInt(localStorage.getItem("strike")) || 0
let ball = parseInt(localStorage.getItem("ball")) || 0
let strikeCount = parseInt(localStorage.getItem("strikeCount")) || 0
let ballCount = parseInt(localStorage.getItem("ballCount")) || 0
let prevCounts = JSON.parse(localStorage.getItem("prevCounts")) || { strikeCount: 0, ballCount: 0 }
let inning = parseInt(localStorage.getItem("inning")) || 1
let lastTouch = localStorage.getItem("lastTouch") || " "
let pitcherName = localStorage.getItem("pitcherName") || "Add pitcher"
let pitcherJersey = localStorage.getItem("pitcherJersey") || ""

function snapshot() {
    prevCounts = { strikeCount, ballCount }
}

function updateUI() {
    pitches.innerHTML = pitch
    strikes.innerHTML = strike
    balls.innerHTML = ball
    innings.innerHTML = inning
    nameOfPitcher.innerHTML = pitcherName
    nameOfPitcherMenu.innerHTML = pitcherName
    numberOfPitcher.innerHTML = pitcherJersey
    numberOfPitcherMenu.innerHTML = pitcherJersey

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

    strikeDots.setAttribute('aria-label', strikeCount + " strikes from 3")
    ballDots.setAttribute('aria-label', ballCount + " balls from 4")
}

updateUI()

function saveData() {
    localStorage.setItem("pitch", pitch)
    localStorage.setItem("strike", strike)
    localStorage.setItem("ball", ball)
    localStorage.setItem("strikeCount", strikeCount)
    localStorage.setItem("ballCount", ballCount)
    localStorage.setItem("inning", inning)
    localStorage.setItem("lastTouch", lastTouch)
    localStorage.setItem("pitcherName", pitcherName)
    localStorage.setItem("pitcherJersey", pitcherJersey)
    localStorage.setItem("prevCounts", JSON.stringify(prevCounts))
}

function setCount(conatiner, count) {
    conatiner.querySelectorAll("i").forEach((dot, index) => {
        dot.classList.toggle("on", index < count)
    });

}

strikeBtn.addEventListener("click", () => {
    snapshot()
    pitch++
    strike++
    strikeCount++

    lastTouch = "strike"

    saveData()
    updateUI()
})

ballBtn.addEventListener("click", () => {
    snapshot()
    pitch++
    ball++
    ballCount++

    lastTouch = "ball"

    saveData()
    updateUI()
})

foulBtn.addEventListener("click", () => {
    snapshot()
    pitch++
    strike++
    lastTouch = "foul"

    if (strikeCount < 2) {
        strikeCount++
    }

    saveData()
    updateUI()
})

resetBtn.addEventListener("click", () => {
    showAlert("Reset pitch count?", "This will reset the whole pitch count.", "Reset", "Cancel", () => {
        pitch = 0
        strike = 0
        ball = 0
        strikeCount = 0
        ballCount = 0

        lastTouch = " "

        saveData()
        updateUI()
    })
})

inningBtn.addEventListener("click", () => {
    snapshot()
    inning++

    strikeCount = 0
    ballCount = 0

    lastTouch = "inning"

    saveData()
    updateUI()
})

backBtn.addEventListener("click", () => {
    if (lastTouch == "strike" || lastTouch == "foul") {
        pitch--
        strike--
    } else if (lastTouch == "ball") {
        pitch--
        ball--
    } else if (lastTouch == "inning") {
        inning--
    }

    if (["strike", "ball", "foul", "inning"].includes(lastTouch)) {
        strikeCount = prevCounts.strikeCount
        ballCount = prevCounts.ballCount
    }

    lastTouch = " "

    saveData()
    updateUI()
})

fullResetBtn.addEventListener("click", () => {
    showAlert("Reset whole pitch count?", "This will reset all innings and pitches, And name,number of pitcher", "Reset", "Cancel", () => {
        pitch = 0
        strike = 0
        ball = 0
        strikeCount = 0
        ballCount = 0
        lastTouch = " "
        inning = 1
        pitcherName = "Add pitcher"
        pitcherJersey = ""
        saveData()
        updateUI()
    })
})
// Name & number functions 
pitcherNameBtn.addEventListener("click", () => {
    showAlert("Change pitcher name", "", "Confirm", "Cancel")
    pitcherNameInput.style.display = "block"

    alertYesBtn.onclick = () => {
        if (pitcherNameInput.value.trim() === "") {
            alertContent.innerHTML = "Please type name of pitcher"
            return
        }
        pitcherName = pitcherNameInput.value.trim()
        pitcherNameInput.value = ""
        pitcherNameInput.style.display = "none"
        alertContainer.style.display = "none"
        saveData()
        updateUI()
    }
})

pitcherJerseyBtn.addEventListener("click", () => {
    showAlert("Change pitcher number", "", "Confirm", "Cancel")
    pitcherJerseyInput.style.display = "block"

    alertYesBtn.onclick = () => {
        if (pitcherJerseyInput.value.trim() === "") {
            alertContent.innerHTML = "Please type number of pitcher"
            return
        }
        pitcherJersey = "#" + pitcherJerseyInput.value.trim()
        pitcherJerseyInput.value = ""
        pitcherJerseyInput.style.display = "none"
        alertContainer.style.display = "none"
        saveData()
        updateUI()
    }
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

// Alert function
function showAlert(heading, content, yesBtn, noBtn, onYes) {
    alertHeading.innerHTML = heading
    alertContent.innerHTML = content
    alertYesBtn.innerHTML = yesBtn
    alertNoBtn.innerHTML = noBtn

    pitcherNameInput.style.display = "none"
    pitcherJerseyInput.style.display = "none"

    alertContainer.style.display = "flex"

    alertYesBtn.onclick = () => {
        alertContainer.style.display = "none"
        if (onYes) onYes()
    }

    alertNoBtn.onclick = () => {
        alertContainer.style.display = "none"
    }
}

// Menu
menuIcon.addEventListener("click", () => {
    menu.style.display = "flex"

    body.classList.toggle("overlay")
    header.classList.toggle("hide")
    main.classList.toggle("hide")
    footer.classList.toggle("hide")
})

menuCloseIcon.addEventListener("click", () => {
    menu.style.display = "none"

    body.classList.toggle("overlay")
    header.classList.toggle("hide")
    main.classList.toggle("hide")
    footer.classList.toggle("hide")
})