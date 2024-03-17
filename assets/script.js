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
    "AdamBerkecz-Unsplash.jpg",
    "AnanduVinod-Unsplash.jpg",
    "AndreaDeSantis-Unsplash.jpg",
    "AnnieSpratt-Unsplash.jpg",
    "AntonieBarres-Unsplash.jpg",
    "CloudyXP-Unknown.png",
    "DavideZeri-Unsplash.jpg",
    "EberhardGrossgasteiger-Unsplash.jpg",
    "FabrizioConti-Unsplash-1.jpg",
    "FabrizioConti-Unsplash-2.jpg",
    "GiulioFabi-Unsplash.jpg",
    "KevinLien-Unsplash.jpg",
    "KikiSiepel-Unsplash.jpg",
    "MaksymIvanchenko-Unsplash.jpg",
    "NicholasKampouris-Unsplash.jpg",
    "PatrickCrosby-Unsplash.jpg",
    "RaimondKlavins-Unsplash.jpg",
    "SamuelFerrara-Unsplash.jpg",
    "StijnTeStrake-Unsplash.jpg",
    "v2osk-Unsplash.jpg"
]

function randomBackground() {
    selectedBackground = backgroundList[Math.floor(Math.random() * backgroundList.length)]
    document.getElementById("background").src = "assets/backgrounds/" + selectedBackground
    console.log("Background credits: " + selectedBackground.slice(0, -4))
}
randomBackground()

function show() { // This is run when the background is loaded
    setTimeout(function() {
        document.getElementById("container").style.display = "flex"
    }, 500)
}