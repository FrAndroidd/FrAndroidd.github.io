// Discord status
fetch("https://discord.com/api/guilds/1192002404711927878/widget.json")
    .then(response => response.json())
    .then(data => {
        let statusDot = document.getElementById("status")

        if (data.presence_count === 0) {
            statusDot.style.backgroundColor = "#555"
            statusDot.title = "Desconectado"
        } else {
            statusDot.style.backgroundColor = "#3AB2A4"
            statusDot.title = "Conectado | Discord"
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
    "AntonieBarres.jpg",
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
    "StijnTeStrake.jpg",
    "v2osk.jpg"
]

function randomBackground() {
    selectedBackground = backgroundList[Math.floor(Math.random() * backgroundList.length)]
    document.getElementById("background").src = "assets/backgrounds/" + selectedBackground
    document.getElementById("backgroundLink").href = "assets/backgrounds/" + selectedBackground
    document.getElementById("backgroundLink").innerText = selectedBackground.slice(0,-4).replace(/([A-Z])/g, " $1").trim()
}
randomBackground()

function show() { // This is run when the background is loaded
    setTimeout(function() {
        document.getElementById("container").style.display = "flex"
        document.getElementById("backgroundCredits").style.display = "block"
    }, 500)
}