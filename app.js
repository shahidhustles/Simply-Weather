const cityInput = document.querySelector(".search-bar");
const searchBtn = document.querySelector(".search-btn");
const unitToggle = document.getElementById('unitToggle');
const temp = document.querySelector(".temp");
const saveBtn = document.querySelector("#save-btn");
const bookmarks = JSON.parse(localStorage.getItem("bookmarkedCities")) || [];
const apiKey = "7ee49280c93e60bd0e96ca2ecaf6e810";
const baseUrl = `https://api.openweathermap.org/data/2.5/weather`;

//search city area
searchBtn.addEventListener("click", () => {
    if (cityInput.value.trim() !== "") {
        fetchWeather(cityInput.value);
        cityInput.value = "";
    }
});

cityInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && cityInput.value.trim() !== "") {
        fetchWeather(cityInput.value);
        cityInput.value = "";
    }
});


//C to F and F to C conversion
unitToggle.addEventListener('change', () => {
    let currentTemp = parseFloat(temp.textContent);
    if (unitToggle.checked) {
        currentTemp = (currentTemp * 9 / 5) + 32;
        temp.textContent = `${currentTemp.toFixed(0)}°F`;
    } else {
        currentTemp = (currentTemp - 32) * 5 / 9;
        temp.textContent = `${currentTemp.toFixed(0)}°C`;
    }
});

//using users current location
navigator.geolocation.getCurrentPosition(
    (position) => {
        fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
    },
    (error) => {
        console.error("Error getting geolocation: ", error);
    }
);

saveBtn.addEventListener("click", () => {
    const city = document.querySelector("#curr-location").textContent;
    if (city && !bookmarks.includes(city)) {
        bookmarks.push(city);
        localStorage.setItem("bookmarkedCities", JSON.stringify(bookmarks));
        alert(`${city} saved as a bookmark.`);
        displayBookmarks();
    }
});

document.addEventListener("DOMContentLoaded", displayBookmarks);

async function fetchWeather(city) {
    const url = `${baseUrl}?q=${city}&appid=${apiKey}&units=metric`;
    try {
        const res = await axios.get(url);
        updateWeatherData(res.data);
    } catch (err) {
        alert("Please enter a valid city name");
    }
}

async function fetchWeatherByCoords(lat, long) {
    const url = `${baseUrl}?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
    try {
        const res = await axios.get(url);
        updateWeatherData(res.data);
    } catch (err) {
        console.error("Error fetching weather data: ", err);
    }
}

function updateWeatherData(data) {
    temp.textContent = `${data.main.temp.toFixed(0)}°C`;
    document.querySelector("#curr-location").textContent = data.name;
    document.querySelector(".winds-text").textContent = `${data.wind.speed} metre/sec`;
    document.querySelector(".humidity-text").textContent = `${data.main.humidity} %`;
    document.querySelector(".weather").textContent = data.weather[0].description.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    const iconCode = data.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
    const iconImg = document.querySelector("#weather-icon");
    if (iconImg) {
        iconImg.setAttribute("src", iconUrl);
    } else {
        console.error("Icon element not found");
    }
}

function displayBookmarks() {
    const bookmarkContainer = document.querySelector(".bookmark-list");
    bookmarkContainer.innerHTML = "";
    bookmarks.forEach((city) => {
        const cityElem = document.createElement("li");
        cityElem.textContent = city;
        cityElem.addEventListener("click", () => fetchWeather(city));
        bookmarkContainer.appendChild(cityElem);
    });
}

