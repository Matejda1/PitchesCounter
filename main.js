const pitches = document.querySelector("#pitches")
const strikes = document.querySelector("#strikes")
const balls = document.querySelector("#balls")

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
let ball = parseInt(localStorage.getItem("ball"))  || 0

function updateUI() {
    pitches.innerHTML = pitch
    strikes.innerHTML = strike
    balls.innerHTML = ball
}

updateUI()

function saveData() {
    localStorage.setItem("pitch", pitch)
    localStorage.setItem("strike", strike)
    localStorage.setItem("ball", ball)
}

strikeBtn.addEventListener("click", () => {
    pitch++
    strike++

    saveData()
    updateUI()
})

ballBtn.addEventListener("click", () => {
    pitch++
    ball++

    saveData()
    updateUI()
})

foulBtn.addEventListener("click", () => {
    pitch++
    strike++

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
