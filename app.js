const cityInput = document.querySelector(".input")
const searchBtn = document.querySelector("#search-btn")
let apiKey = "7ee49280c93e60bd0e96ca2ecaf6e810"
let baseUrl = `https://api.openweathermap.org/data/2.5/weather`;

let date = document.querySelector("#date")
date.textContent = Date().toString().split(" ").slice(0,4).join(" ")

const searchBarContainerEl = document.querySelector(".search-bar-container");

const magnifierEl = document.querySelector(".magnifier");

magnifierEl.addEventListener("click", () => {
  searchBarContainerEl.classList.toggle("active");
});




cityInput.addEventListener("keydown", (e)=>{
    if(e.key === "Enter" && cityInput.value.trim() !==""){
        
        seeWeather(cityInput.value)
        
    }
})

async function seeWeather(city) {
    
  try {
    let url = `${baseUrl}?q=${city}&appid=${apiKey}&units=metric`
    const res = await axios.get(url);
    const deg = document.querySelector("#deg")
    deg.textContent = `${res.data.main.temp}°C`;
    const currCity = document.querySelector(".city");
    currCity.textContent = res.data.name;
    const winds = document.querySelector(".winds")
    winds.textContent = `${res.data.wind.speed} metre/sec`;
    const humidity = document.querySelector(".humidity")
    humidity.textContent = `${res.data.main.humidity} %`;
    const weather = document.querySelector("#deg-info")
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
const deg = document.querySelector("#deg")
 
unitToggle.addEventListener('change', () => {
        let currentTemp = parseFloat(deg.textContent); //takes only the int value for calculation
        if (unitToggle.checked) {
            // Convert to Fahrenheit
            currentTemp = (currentTemp * 9/5) + 32;
            console.log(currentTemp)
            deg.textContent = `${currentTemp.toFixed(1)}°F`; //round up to 1 decimal places
        } else {
            // Convert to Celsius
            currentTemp = (currentTemp - 32) * 5/9;
            console.log(currentTemp)
            deg.textContent = `${currentTemp.toFixed(1)}°C`;
        }
        
});

//checking if geolocation is available
// if ("geolocation" in navigator) {
//     console.log("geolocation is available")
// } else {
//     console.log("geolocation is not available")
// }
  
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
    let res = await axios.get(url);
    const currLocation = document.querySelector("#curr-location");
    const city = document.querySelector(".city");
    city.textContent = res.data.name;
    currLocation.textContent = res.data.name;
    const deg = document.querySelector("#deg");
    deg.textContent = `${res.data.main.temp}°C`;
    const winds = document.querySelector(".winds");
    winds.textContent = `${res.data.wind.speed} metre/sec`;
    const humidity = document.querySelector(".humidity");
    humidity.textContent = `${res.data.main.humidity} %`;
    const weather = document.querySelector("#deg-info");
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
}

//letter animation
const words = ["Hey there!!","Weather forecast for you..", "Click the search icon below"]
const animate = document.querySelector(".animate")

let wordsIndex = 0
let characterIndex = 0

updateText()

function updateText() {
    characterIndex++;
    animate.textContent = words[wordsIndex].slice(0, characterIndex);
  
    if (characterIndex === words[wordsIndex].length) {
      wordsIndex++;
      characterIndex = 0;
    }
  
    if (wordsIndex === words.length) {
      wordsIndex = 0;
    }
    setTimeout(updateText, 120);
}

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
