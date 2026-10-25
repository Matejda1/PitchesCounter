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
let lastFoul = localStorage.getItem("lastFoul") || false
let strikeCount = parseInt(localStorage.getItem("strikeCount")) || 0
let ballCount = parseInt(localStorage.getItem("ballCount")) || 0
let inning = parseInt(localStorage.getItem("inning")) || 1
let lastTouch = localStorage.getItem("lastTouch") || " "
let pitcherName = localStorage.getItem("pitcherName") || ""
let pitcherJersey = localStorage.getItem("pitcherJersey") || ""

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
}

updateUI()

function saveData() {
    localStorage.setItem("pitch", pitch)
    localStorage.setItem("strike", strike)
    localStorage.setItem("ball", ball)
    localStorage.setItem("lastFoul", lastFoul)
    localStorage.setItem("strikeCount", strikeCount)
    localStorage.setItem("ballCount", ballCount)
    localStorage.setItem("inning", inning)
    localStorage.setItem("lastTouch", lastTouch)
    localStorage.setItem("pitcherName", pitcherName)
    localStorage.setItem("pitcherJersey", pitcherJersey)
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

    lastTouch = "strike"

    saveData()
    updateUI()
})

ballBtn.addEventListener("click", () => {
    pitch++
    ball++
    ballCount++

    lastTouch = "ball"

    saveData()
    updateUI()
})

foulBtn.addEventListener("click", () => {
    pitch++
    strike++

    lastTouch = "foul"

    if (strikeCount < 2) {
        strikeCount++
        lastFoul = true
    } else {
        lastFoul = false
    }

    saveData()
    updateUI()
})

resetBtn.addEventListener("click", () => {
    alert("Reset pitch count?", "This will reset the whole pitch count.", "Reset", "Cancel")

    alertYesBtn.addEventListener("click", () => {
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
    inning++

    lastTouch = "inning"

    saveData()
    updateUI()
})

backBtn.addEventListener("click", () => {
    if (lastTouch == "strike") {
        pitch--
        strike--
        strikeCount--
        if (strikeCount == -1) {
            strikeCount = 2
        }
    } else if (lastTouch == "ball") {
        pitch--
        ball--
        ballCount--
        if (ballCount == -1) {
            ballCount = 3
        }
    } else if (lastTouch == "foul") {
        pitch--
        strike--

        if (lastFoul) {
            strikeCount--
        }
    } else if (lastTouch == "inning") {
        inning--
    }

    lastTouch = " "

    saveData()
    updateUI()
})
// Name & number functions 
pitcherNameBtn.addEventListener("click", () => {
    alertContainer.style.display = "flex"

    alertHeading.innerHTML = "Change pitcher name"
    alertContent.innerHTML = ""
    alertYesBtn.innerHTML = "Confirm"
    alertNoBtn.innerHTML = "Cancel"
    pitcherNameInput.style.display = "block"
    alertYesBtn.addEventListener("click", () => {
        if (pitcherNameInput.value != "") {
            alertContainer.style.display = "none"
            pitcherName = pitcherNameInput.value
            saveData()
            updateUI()
            pitcherNameInput.style.display = "none"
        } else {
            alertContent.innerHTML = "Please type name of pitcher"
        }
    })
    alertNoBtn.addEventListener("click", () => {
        alertContainer.style.display = "none"
        pitcherNameInput.style.display = "none"
    })
})

pitcherJerseyBtn.addEventListener("click", () => {
    alertContainer.style.display = "flex"

    alertHeading.innerHTML = "Change pitcher number"
    alertContent.innerHTML = ""
    alertYesBtn.innerHTML = "Confirm"
    alertNoBtn.innerHTML = "Cancel"
    pitcherJerseyInput.style.display = "block"
    alertYesBtn.addEventListener("click", () => {
        if (pitcherJerseyInput.value != "") {
            alertContainer.style.display = "none"
            pitcherJersey = "#" + pitcherJerseyInput.value
            saveData()
            updateUI()
            pitcherJerseyInput.style.display = "none"
        } else {
            alertContent.innerHTML = "Please type number of pitcher"
        }
    })
    alertNoBtn.addEventListener("click", () => {
        alertContainer.style.display = "none"
        pitcherJerseyInput.style.display = "none"
    })

    saveData()
    updateUI()
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
function alert(heading, content, yesBtn, noBtn) {
    alertHeading.innerHTML = heading
    alertContent.innerHTML = content
    alertYesBtn.innerHTML = yesBtn
    alertNoBtn.innerHTML = noBtn

    alertContainer.style.display = "flex"

    alertYesBtn.addEventListener("click", () => {
        alertContainer.style.display = "none"
    })

    alertNoBtn.addEventListener("click", () => {
        alertContainer.style.display = "none"
    })
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

fullResetBtn.addEventListener("click", () => {
    alert("Reset whole pitch count?", "This will reset all innings and pitches", "Reset", "Cancel")

    alertYesBtn.addEventListener("click", () => {
        pitch = 0
        strike = 0
        ball = 0
        strikeCount = 0
        ballCount = 0
        lastTouch = " "
        inning = 1
        pitcherName = ""
        pitcherJersey = ""
        alertContainer.style.display = "none"

        saveData()
        updateUI()
    })  
    alertNoBtn.addEventListener("click", () => {
        alertContainer.style.display = "none"
    })
})