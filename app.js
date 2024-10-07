
// alert("Make sure your device's location service is turned on.");
const cityInput = document.querySelector(".search-bar")
const searchBtn = document.querySelector(".search-btn")
let apiKey = "7ee49280c93e60bd0e96ca2ecaf6e810"
let baseUrl = `https://api.openweathermap.org/data/2.5/weather`;

// let date = document.querySelector("#date")
// date.textContent = Date().toString().split(" ").slice(0,4).join(" ")

searchBtn.addEventListener("click", ()=>{
    if(cityInput.value.trim() !==""){
        seeWeather(cityInput.value)
        cityInput.value = ""    
    }
})
cityInput.addEventListener("keydown", (e)=>{
    if(e.key === "Enter" && cityInput.value.trim() !==""){
        
        seeWeather(cityInput.value)
        cityInput.value = ""    
    }
})

async function seeWeather(city) {
    
  try {
    let url = `${baseUrl}?q=${city}&appid=${apiKey}&units=metric`
    const res = await axios.get(url);
    
    const temp = document.querySelector(".temp")
    temp.textContent = `${res.data.main.temp.toFixed(0)}°C`;
    const currCity = document.querySelector("#curr-location");
    currCity.textContent = res.data.name;
    const winds = document.querySelector(".winds-text")
    winds.textContent = `${res.data.wind.speed} metre/sec`;
    const humidity = document.querySelector(".humidity-text")
    humidity.textContent = `${res.data.main.humidity} %`;
    const weather = document.querySelector(".weather")
    weather.textContent = res.data.weather[0].description.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    
    let iconCode = res.data.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
    let iconImg = document.querySelector("#weather-icon");
    if (iconImg) {
        iconImg.setAttribute("src", iconUrl);
    } else {
        console.error("Icon element not found");
    }
    
    
  } catch (err) {
    alert("Please enter a valid city name")
  }
    // setWeatherImg(res)

}

const unitToggle = document.getElementById('unitToggle');
const unitLabel = document.getElementById('unitLabel');
const temp = document.querySelector(".temp")
 
unitToggle.addEventListener('change', () => {
        let currentTemp = parseFloat(temp.textContent); //takes only the int value for calculation
        if (unitToggle.checked) {
            // Convert to Fahrenheit
            currentTemp = (currentTemp * 9/5) + 32;
            console.log(currentTemp)
            temp.textContent = `${currentTemp.toFixed(0)}°F`; //round up to 1 decimal places
        } else {
            // Convert to Celsius
            currentTemp = (currentTemp - 32) * 5/9;
            console.log(currentTemp)
            temp.textContent = `${currentTemp.toFixed(0)}°C`;
        }
        
});


navigator.geolocation.getCurrentPosition(
    (position) => {
        changeCurrLocation(position.coords.latitude, position.coords.longitude);
        
    },
    (error) => {
        console.error("Error getting geolocation: ", error);
    }
);
  
async function changeCurrLocation(lat, long) {
    let url = `${baseUrl}?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
    try {
        const res = await axios.get(url);
        const temp = document.querySelector(".temp");
        temp.textContent = `${res.data.main.temp.toFixed(0)}°C`;
        const currCity = document.querySelector("#curr-location");
        currCity.textContent = res.data.name;
        const winds = document.querySelector(".winds-text");
        winds.textContent = `${res.data.wind.speed} metre/sec`;
        const humidity = document.querySelector(".humidity-text");
        humidity.textContent = `${res.data.main.humidity} %`;
        const weather = document.querySelector(".weather");
        weather.textContent = res.data.weather[0].description.split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

        let iconCode = res.data.weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
        
        let iconImg = document.querySelector("#weather-icon");
        console.log(iconImg)
        if (iconImg) {
            iconImg.setAttribute("src", iconUrl);
        } else {
            console.error("Icon element not found");
        }
    } catch (err) {
        console.error("Error fetching weather data: ", err);
    }
}



const saveBtn = document.querySelector("#save-btn");
let bookmarks = JSON.parse(localStorage.getItem("bookmarkedCities")) || [];

saveBtn.addEventListener("click", () => {
    const city = document.querySelector("#curr-location").textContent;
    if (city && !bookmarks.includes(city)) {
        bookmarks.push(city);
        localStorage.setItem("bookmarkedCities", JSON.stringify(bookmarks));
        alert(`${city} saved as a bookmark.`);
        displayBookmarks(); // Update the display
    }
});

function displayBookmarks() {
    const bookmarkContainer = document.querySelector(".bookmark-list");
    bookmarkContainer.innerHTML = "";
    bookmarks.forEach((city) => {
        const cityElem = document.createElement("li");
        cityElem.textContent = city;
        cityElem.addEventListener("click", () => seeWeather(city)); // Fetch weather when clicked
        bookmarkContainer.appendChild(cityElem);
    });
}

// Call displayBookmarks on page load to show saved bookmarks
document.addEventListener("DOMContentLoaded", displayBookmarks);


//previously commented===================
// let myCities = [];
// // localStorage.clear()
// const save = document.querySelector("button")
// const bookmark = document.querySelector("button > i")
// const myCity = document.querySelector(".city");
// save.addEventListener("click", () => {
//     if (cityInput.value.trim() !== "" || myCity.textContent.trim() !== "") {
//         // Determine which city to save
//         let cityToSave;
//         if (cityInput.value.trim() !== "") {
//             cityToSave = cityInput.value.trim();
//         } else {
//             cityToSave = myCity.textContent.trim();
//         }
        
//         // Save the city to local storage
//         localStorage.setItem("city", cityToSave);
        
//         alert("City saved successfully.");
//     } else {
//         alert("Please enter a city name before saving.");
//     }
// });

// const loadCity = document.querySelector('.bookmark > p')

// let storedCities = JSON.parse(localStorage.getItem("cities")) || [];
// if (storedCities.length === 0) {
//     alert("No saved cities.");
// } else {
//     let savedCity = storedCities[storedCities.length - 1];
//     console.log(savedCity)
//     //push the city temp and weather to text content of loadCity
//     loadCity.textContent = savedCity;
    
    
    
// }
