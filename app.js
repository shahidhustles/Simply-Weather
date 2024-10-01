const cityInput = document.querySelector("#city-input")
const searchBtn = document.querySelector("#search-btn")
let apiKey = "7ee49280c93e60bd0e96ca2ecaf6e810"
let baseUrl = `https://api.openweathermap.org/data/2.5/weather`;

let date = document.querySelector("#date")
date.textContent = Date().toString().split(" ").slice(0,4).join(" ")

const iconToImgMap = {
    "01d": "https://media.istockphoto.com/id/1402473970/photo/orange-sky-and-clouds-background-background-of-colorful-sky-concept-amazing-sunset-with.jpg?s=612x612&w=0&k=20&c=IpH3EkDUZy2Mdldagii92jx4FU5B0dTtQOaYpK6byBI=", // Clear sky (day)
    "01n": "https://w7.pngwing.com/pngs/551/298/png-transparent-full-moon-and-starry-night-atmosphere-sky-universe-outer-space-blue-blue-sky-background-texture-blue-other.png", // Clear sky (night)
    "02d": "https://img.freepik.com/premium-photo/realistic-transparent-white-cloud-sky-set-fog-smoke-png-texture-isolated-design-abstract-cloudy-air-effect-with-day-light-icons-beautiful-3d-nature-atmosphere-vapor-smoky-steam-design_76964-144263.jpg", // Few clouds (day)
    "02n": "https://w7.pngwing.com/pngs/2/240/png-transparent-white-clouds-at-night-night-sky-cloud-moonlight-desktop-night-atmosphere-computer-wallpaper-meteorological-phenomenon.png", // Few clouds (night)
    "03n": "https://w7.pngwing.com/pngs/2/240/png-transparent-white-clouds-at-night-night-sky-cloud-moonlight-desktop-night-atmosphere-computer-wallpaper-meteorological-phenomenon.png", // Scattered clouds (night)
    "04n": "https://w7.pngwing.com/pngs/2/240/png-transparent-white-clouds-at-night-night-sky-cloud-moonlight-desktop-night-atmosphere-computer-wallpaper-meteorological-phenomenon.png", // Broken clouds (night)
    "09n": "https://png.pngtree.com/thumb_back/fh260/background/20201012/pngtree-rainy-sky-background-image_410908.jpg", // Shower rain (night)
    "10n": "https://png.pngtree.com/thumb_back/fh260/background/20201012/pngtree-rainy-sky-background-image_410908.jpg", // Rain (night)
    "11n": "https://kubrick.htvapps.com/vidthumb/images/thunderstorm-6463fa10c42e8.png?crop=1xw:0.9969230769230769xh;center,top&resize=640:*", // Thunderstorm (night)
    "13n": "https://wjla.com/resources/media2/16x9/full/1015/center/80/be94f27f-c70a-4e6c-b3cc-9a448da929b8-large16x9_SnowfallsinEllicottCityVeronicaJohnson.JPG", // Snow (night)
    "50n": "https://grammaticus.blog/wp-content/uploads/2022/11/foggy-morning-street.jpg?w=1600&h=1040&crop=1", // Mist (night)
    "03d": "https://img.freepik.com/premium-photo/realistic-transparent-white-cloud-sky-set-fog-smoke-png-texture-isolated-design-abstract-cloudy-air-effect-with-day-light-icons-beautiful-3d-nature-atmosphere-vapor-smoky-steam-design_76964-144263.jpg", // Scattered clouds
    "04d": "https://img.freepik.com/premium-photo/realistic-transparent-white-cloud-sky-set-fog-smoke-png-texture-isolated-design-abstract-cloudy-air-effect-with-day-light-icons-beautiful-3d-nature-atmosphere-vapor-smoky-steam-design_76964-144263.jpg", // Broken clouds
    "09d": "https://png.pngtree.com/thumb_back/fh260/background/20201012/pngtree-rainy-sky-background-image_410908.jpg", // Shower rain
    "10d": "https://png.pngtree.com/thumb_back/fh260/background/20201012/pngtree-rainy-sky-background-image_410908.jpg", // Rain (day)
    "11d": "https://kubrick.htvapps.com/vidthumb/images/thunderstorm-6463fa10c42e8.png?crop=1xw:0.9969230769230769xh;center,top&resize=640:*", // Thunderstorm
    "13d": "https://wjla.com/resources/media2/16x9/full/1015/center/80/be94f27f-c70a-4e6c-b3cc-9a448da929b8-large16x9_SnowfallsinEllicottCityVeronicaJohnson.JPG", // Snow
    "50d": "https://grammaticus.blog/wp-content/uploads/2022/11/foggy-morning-street.jpg?w=1600&h=1040&crop=1", // Mist
};

searchBtn.addEventListener("click", () => {
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
    
    let url = `${baseUrl}?q=${city}&appid=${apiKey}&units=metric`
    const res = await axios.get(url);
    const deg = document.querySelector("#deg")
    deg.textContent = `${res.data.main.temp}°C`;
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
    setWeatherImg(res)
}

// Function to set background GIF based on the weather icon code
function setWeatherImg(res) {
    let iconCode = res.data.weather[0].icon;
    const backgroundGif = iconToImgMap[iconCode] ;
    const leftContainer = document.querySelector('.container-left');
    
    leftContainer.style.backgroundImage = `url(${backgroundGif})`;
    leftContainer.style.backgroundSize = 'cover';
    leftContainer.style.backgroundPosition = 'center';
    leftContainer.style.backgroundRepeat = 'no-repeat';
  }








