fetch("https://discord.com/api/guilds/1192002404711927878/widget.json")
    .then(response => response.json())
    .then(data => {
        discordData = data
        discord()
    }
)

statusDot = document.getElementById("status")
profilePicture = document.getElementById("profilePicture")
imageOverlay = document.getElementById("imageOverlay")

function discord() {
    if (discordData.presence_count === 0) {
        statusDot.style.backgroundColor = "#555"
        statusDot.title = "Desconectado"
        profilePicture.title = "Desconectado | Perfil de GitHub"
        profileImage = "https://avatars.githubusercontent.com/u/70262448?v=4"
    } else {
        statusDot.style.backgroundColor = "#3AB2A4"
        statusDot.title = "Conectado | Discord"
        profileImage = discordData.members[0].avatar_url
    }
    profilePicture.src = profileImage
    profilePicture.style.boxShadow = "0 8px 16px 0 #0008"
    profilePicture.addEventListener("click", function() {
        imageOverlay.style.display = "block"
        setTimeout(function() {imageOverlay.style.opacity = 1}, 1)
        imageOverlay.style.backgroundImage = `url(${profileImage})`
        imageOverlay.addEventListener("click", function() {
            imageOverlay.style.opacity = 0
            setTimeout(function() {imageOverlay.style.display = "none"}, 100)
        })
    })
}



wallpaperList = ["AdamBerkecz-Unsplash.jpg", "CloudyXP-Unknown.png", "GiulioFabi-Unsplash.jpg", "JoeGardner-Unsplash.jpg", "KikiSiepel-Unsplash.jpg", "BriceCooper-Unsplash.jpg", "FedericoBottos-Unsplash.jpg"]

document.getElementById("background").src = "assets/backgrounds/" + wallpaperList[Math.floor(Math.random() * wallpaperList.length)]

document.getElementById("background").addEventListener("load", () => {
    document.getElementById("container").style.display = "flex"
})