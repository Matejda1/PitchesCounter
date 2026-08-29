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
let pitch = 0
let strike = 0
let ball = 0

strikeBtn.addEventListener("click", () => {
    pitch++
    strike++

    pitches.innerHTML = pitch
    strikes.innerHTML = strike
})

ballBtn.addEventListener("click", () => {
    pitch++
    ball++

    pitches.innerHTML = pitch
    balls.innerHTML = ball
})

foulBtn.addEventListener("click", () => {
    pitch++
    strike++

    pitches.innerHTML = pitch
    strikes.innerHTML = strike
})

resetBtn.addEventListener("click", () => {
    alert.style.display = "flex"

    yesBtn.addEventListener("click", () => {
        alert.style.display = "none"

        pitch = 0
        strike = 0
        ball = 0

        pitches.innerHTML = pitch
        strikes.innerHTML = strike
        balls.innerHTML = ball
    })

    noBtn.addEventListener("click", () => {
        alert.style.display = "none"
    })
})
