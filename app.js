let place = document.querySelector("#city-input");
let search = document.querySelector("button");
let baseUrl = "https://wttr.in/";


search.addEventListener("click", async ()=>{
    let city = place.value;
    let h2 = document.querySelector("h2");
    h2.innerText = city;
    let url = `${baseUrl}${city}?format=j1`;
    try {
        const config = {Headers: {Accept: "application/json"}}
        let res = await axios.get(url,config);
        console.log(res);
        //changes temp
        let degree = res.data.current_condition[0].FeelsLikeC;
        let temp = document.querySelector("#temperature")
        temp.innerText = `${degree}°C`
        //changes icon and description
        let condition = res.data.current_condition[0].weatherDesc[0].value;
        console.log(condition);
        let icon = document.querySelector("#weather-icon");
        let desc = document.querySelector("#description")
        desc.innerText = condition;
        let body = document.querySelector("body");
        if(condition == "Patchy rain nearby"){
            icon.setAttribute("src","./images/drizzle.png")
            body.style.backgroundImage = "url('./images/drizzle -rainbow.png')"
            body.style.backgroundSize = "cover"

        }else if(condition == "Clear"|| condition == "Sunny"){
            icon.setAttribute("src","./images/clear.png")
             body.style.backgroundImage = "url('./images/sunny -clear.png')"
             body.style.backgroundSize = "cover"

        }else if(condition == "Partly cloudy"){
            icon.setAttribute("src","./images/clouds.png")
             body.style.backgroundImage = "url('./images/cloudy -clouds.jpg')"
        }
    } catch (error) {
        console.log(error);
    }
})

