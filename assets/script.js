// Discord status
fetch("https://discord.com/api/guilds/1192002404711927878/widget.json")
    .then(response => response.json())
    .then(data => {
        let statusDot = document.getElementById("status")

        if (data.presence_count === 0) {
            statusDot.style.backgroundColor = "#555"
            statusDot.title = "Offline"
        } else {
            statusDot.style.backgroundColor = "#3AB2A4"
            statusDot.title = "Online | Discord"
        }
    }
)


// Expand profile picture
function expandProfilePicture() {
    let imageOverlay = document.getElementById("imageOverlay")

    if (imageOverlay.style.display === "none") {
        imageOverlay.style.display = "block"
        setTimeout(function() {imageOverlay.style.opacity = "1"}, 1) // This is so it plays the CSS animation
    } else {
        imageOverlay.style.opacity = "0"
        setTimeout(function() {imageOverlay.style.display = "none"}, 100)
    }
}


// Background randomizer
backgroundList = [
    "AdamBerkecz.jpg",
    "AnanduVinod.jpg",
    "AndreaDeSantis.jpg",
    "AnnieSpratt.jpg",
    "AntoineBarres.jpg",
    "DavideZeri.jpg",
    "EberhardGrossgasteiger.jpg",
    "FabrizioConti.jpg",
    "GiulioFabi.jpg",
    "KevinLien.jpg",
    "KikiSiepel.jpg",
    "MaksymIvanchenko.jpg",
    "NicholasKampouris.jpg",
    "PatrickCrosby.jpg",
    "RaimondKlavins.jpg",
    "SamuelFerrara.jpg",
    "StijnTeStrake.jpg"
]

function randomBackground() {
    selectedBackground = backgroundList[Math.floor(Math.random() * backgroundList.length)]
    document.getElementById("background").src = "assets/backgrounds/" + selectedBackground
    document.getElementById("backgroundLink").href = "assets/backgrounds/" + selectedBackground
    document.getElementById("backgroundLink").innerText = selectedBackground.slice(0,-4).replace(/([A-Z])/g, " $1").trim()
    document.getElementById("unsplashLink").href = "https://unsplash.com/s/users/" + selectedBackground.replace(/([A-Z])/g, "-$1").trim().slice(1,-4)
}
randomBackground()

function show() { // This is run when the background is loaded
    setTimeout(function() {
        document.getElementById("container").style.display = "flex"
        document.getElementById("miniContainer").style.display = "flex"
    }, 500)
}



// Change language
languageText = {
    "es": {
        "lang.age": "17 años",
        "lang.bio1": "Hola, soy FrAndroid, un aficionado al software, programador principiante y diseñador de UI/UX como hobby",
        "lang.bio2": "Actualmente tengo conocimientos relativamente avanzados sobre Windows y Linux",
        "lang.bio3": "Sé HTML y CSS, programar en Batch y JavaScript, y estoy aprendiendo otros lenguajes",
        "lang.backgroundBy": "Fondo por",
        "lang.backgroundAt": "en"
    },
    "en": {
        "lang.age": "17 years old",
        "lang.bio1": "Hi, I'm FrAndroid, a software enthusiast, beginner programmer and UI/UX designer as a hobby",
        "lang.bio2": "I currently have a somewhat advanced knowledge about Windows and Linux",
        "lang.bio3": "I know HTML and CSS, coding in Batch and JavaScript, and I'm learning other programming languages",
        "lang.backgroundBy": "Background by",
        "lang.backgroundAt": "@"
    }
}

userLanguage = navigator.language.slice(0, 2)
switchLanguage = 0

function language() {
    if (switchLanguage === 1) {
        if (userLanguage === "es") {
            userLanguage = "en"
        } else {
            userLanguage = "es"
        }
    }
    for (let i = 0; i <= Object.keys(languageText.es).length-1; i++) {
        if (userLanguage === "es") {
            document.getElementById(Object.keys(languageText.es)[i]).textContent = Object.values(languageText.es)[i]
        } else {
            document.getElementById(Object.keys(languageText.en)[i]).textContent = Object.values(languageText.en)[i]
        }
    }
    switchLanguage = 1
}
language()