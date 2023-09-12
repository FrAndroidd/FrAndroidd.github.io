console.log("Welcome to FruitTab!")


// Function to get the value of a cookie by its name - It's used for several things throughout the code
function getCookie(name) {
    let cookieArr = document.cookie.split(";");

    // This is used for the TextArea cookie
    for (let i = 0; i < cookieArr.length; i++) {
        let cookiePair = cookieArr[i].split("=");
        let cookieName = cookiePair[0].trim();
        if (cookieName === name) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
}

// Function to save cookies
function setCookie(name, value) {
    let expirationDate = new Date(currentTime.getFullYear() + 3, currentTime.getMonth(), currentTime.getDate()); // Sets cookie expiration date to the current year +3
    let expires = "expires=" + expirationDate.toUTCString(); 

    document.cookie = name + "=" + value + "; SameSite=Strict; " + expires;
}




// ---------------------------------------------------------------------- Compact mode ----------------------------------------------------------------------
function compactCheck() {
    if (window.innerWidth < 1359) {
        compactMode(true);
    } else {
        compactMode(false);
    }
}

compactCheck();
window.addEventListener("resize", compactCheck);

function compactMode(compactEnable) {
    if (compactEnable) {
        document.getElementById("clock-container").style.left = "50%";
        document.getElementById("clock-container").style.transform = "translateX(-50%)";

        document.getElementById("button-container").style.left = "50%";
        document.getElementById("button-container").style.transform = "translateX(-50%)";

        document.getElementById("list-container").style.display = "none"
    } else {
        document.getElementById("clock-container").style.left = "17.5vh";
        document.getElementById("clock-container").style.transform = "translateX(-0%)";

        document.getElementById("button-container").style.left = "17.5vh";
        document.getElementById("button-container").style.transform = "translateX(-0%)";

        document.getElementById("list-container").style.display = "block";
    }
}






// ---------------------------------------------------------------------- Clock ----------------------------------------------------------------------

function updateClock() {
    currentTime = new Date();
    let hours = currentTime.getHours()
    let minutes = currentTime.getMinutes().toString().padStart(2, "0");

    document.getElementById("clock").textContent = `${hours}:${minutes}`;
}

setInterval(updateClock, 1000); // Updates the clock every 1 second
updateClock();






// ---------------------------------------------------------------------- Weather ----------------------------------------------------------------------

// Loads the weather cached in the cookies - They get replaced as soon as it can get the current weather from OpenMeteo
let cachedWeather = getCookie("weatherCache")
let cachedWeatherIcon = getCookie("weatherIconCache")
document.getElementById("weather").textContent = cachedWeather
document.getElementById("weather").style.backgroundImage = cachedWeatherIcon


// Weather API - OpenMeteo (I don't know of any other that doesn't require an API key)
updateWeather()

function updateWeather() {
    fetch("https://api.open-meteo.com/v1/forecast?latitude=-31.41&longitude=-64.18&current_weather=true")
        .then(weatherAPI => {return weatherAPI.json()})
        .then(weatherData => {
            let weather = weatherData.current_weather;
            let temperatureTemp = weather.temperature;
            let temperature = Math.floor(temperatureTemp); // Removes decimals from temperature (yes I did create a temporal variable only for this,
            let weatherCode = weather.weathercode;         // if you know a better way to do this without creating a temporal variable, please let me know :)

            // Sets what word to use depending on the weathercode
            // I'm not sure if I got all of these right though
            let weatherCodeMap = {
                0: "Clear",
                1: "Mainly clear",
                2: "Partly cloudy",
                3: "Overcast",
                45: "Fog",
                48: "Rime fog",
                51: "Light dizzle",
                53: "Moderate dizzle",
                55: "Dense dizzle",
                56: "Light freezing dizzle",
                57: "Dense freezing dizzle",
                61: "Slight rain",
                63: "Moderate rain",
                65: "Heavy rain",
                66: "Light freezing rain",
                67: "Heavy freezing rain",
                71: "Slight snowfall",
                73: "Moderate snowfall",
                75: "Heavy snowfall",
                77: "Snow grains",
                80: "Slight rain showers",
                81: "Moderate rain showers",
                82: "Violent rain showers",
                85: "Slight snow showers",
                86: "Heavy snow showers",
                95: "Thunderstorm",
                96: "Thunderstorm",
                97: "Thunderstorm",
                98: "Thunderstorm",
                99: "Thunderstorm",
            }

            // Sets what weather icon to use depending on the weathercode
            // I could have used a similar method as the weatherCodeMap, but imo this method is the easiest for setting custom icons
            switch (true) {
                case weatherCode >= 0 && weatherCode <= 1:
                    weatherIcon = "clear.svg";
                    break;
                case weatherCode >= 2 && weatherCode <= 3:
                    weatherIcon = "overcast.svg";
                    break;
                case weatherCode >= 45 && weatherCode <= 48:
                    weatherIcon = "fog.svg";
                    break;
                case weatherCode >= 51 && weatherCode <= 57:
                    weatherIcon = "dizzle.svg";
                    break;
                case weatherCode >= 61 && weatherCode <= 67:
                    weatherIcon = "rain.svg";
                    break;
                case weatherCode >= 71 && weatherCode <= 77:
                    weatherIcon = "snow.svg";
                    break;
                case weatherCode >= 80 && weatherCode <= 86:
                    weatherIcon = "rain.svg";
                    break;
                case weatherCode >= 95 && weatherCode <= 99:
                    weatherIcon = "thunderstorm.svg";
                    break;
                
                default:
                    break;
            }
            document.getElementById("weather").style.backgroundImage = `url(assets/icons/weather/${weatherIcon})`; // Sets the corresponding weather icon

            let weatherCondition = weatherCodeMap[weatherCode] // Sets the weather text to actually use

            document.getElementById("weather").textContent = "\u00A0\u00A0\u00A0\u00A0\u00A0" + `${temperature}°C - ${weatherCondition}`; // Those "\u00A0\" are janky asf but it works. I'm sorry


            // Saves the current weather to some sort of "cache" you could say? So it doesn't display 0°C when the page was just loaded
            setTimeout(setCookie("weatherCache", "\u00A0\u00A0\u00A0\u00A0\u00A0" + `${temperature}°C - ${weatherCondition}`), 5000)
            // Saves the current icon to the cache (I'm too lazy to make something so it uses the same cookie for everything, sorry xd)
            setTimeout(setCookie("weatherIconCache", `url(assets/icons/weather/${weatherIcon})`), 5000)
            }
        )
}

setInterval(updateWeather, 300000)






// ---------------------------------------------------------------------- TextArea ----------------------------------------------------------------------
// This was a pain to make, so it's well commented for my own mental sake

// Gets the text content from the textarea
let textarea = document.getElementById("todo-textarea");

// Function to save the cookie
function saveTextarea() {
    let text = textarea.value;
    let lines = text.split("\n"); // Split the text for every new line
    setCookie("textareaContent", JSON.stringify(lines)); // Calls the setTextCookie function to actually save the cookie
}

// Uses the getCookie function to get the text from the cookie
let savedText = getCookie("textareaContent");

// Loads the text saved in the cookie to the textarea
if (savedText) {
    let lines = JSON.parse(savedText);
    textarea.value = lines.join("\n");
}

// This was made so it wouldn't set the cookie value to nothing when the page is just loaded,
// as it takes some miliseconds to load the content from the cookie
setTimeout(saveTextarea, 500);

// Saves the textarea every 1 second
setInterval(saveTextarea, 1000);