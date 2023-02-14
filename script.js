let searchInp = document.querySelector(".weather_search");
let city = document.querySelector(".weather_city");
let day = document.querySelector(".weather_day");
let humidity = document.querySelector(".weather_indicator--humidity>.value");
let wind = document.querySelector("#wind");
let pressure = document.querySelector("#pressure");
let image = document.querySelector(".weather_image");
let tempreature = document.querySelector(".weather_temperature");
let suggestions = document.querySelector("#suggestions");
let weatherAPIKey = "6a5cda3d208358347eebf101e675fffd";
let weatherBaseEndpoint =
  "https://api.openweathermap.org/data/2.5/weather?appid=" + weatherAPIKey;
let cityBaseEndpoint = "https://api.teleport.org/api/cities/?search= ";




let getWeatherByCityName = async (city) => {
  let endpoint = weatherBaseEndpoint + "&q=" + city;
  let response = await fetch(endpoint);
  let weather = await response.json();

  return weather;
};
async function getWeather(city){
    let weather = await getWeatherByCityName(city);
    if(weather.code !== "404"){
        updateCurrentweather(weather);
    }else{
        alert(weather.message);
    }
}
searchInp.addEventListener("keydown", async (e) => {
  if (e.keyCode === 13) {
   getWeather(searchInp.value)
  }
});

searchInp.addEventListener("input", async () => {
  let endpoint = cityBaseEndpoint + searchInp.value;

  let result = await (await fetch(endpoint)).json();

  let cities = result._embedded["city:search-results"];

  let length = cities.length > 5 ? 5 : cities.length;
  for (let i = 0; i < length; i++) {
    let option = document.createElement("option");
    option.value = cities[i].matching_full_name;

    suggestions.appendChild(option);
  }
  console.log(result);
});


let updateCurrentweather = (data) => {
  console.log(data);
  city.textContent = data.name + "," + data.sys.country;

  day.textContent = dayOfWeek();
  const main = data.main;
  humidity.textContent = main.humidity;
  pressure.textContent = main.pressure;
  let windDirection;
  let deg = data.wind.deg;
  if (deg > 45 && deg <= 135) {
    windDirection = "East";
  } else if (deg > 135 && deg <= 225) {
    windDirection = "South";
  } else if (deg > 255 && deg <= 315) {
    windDirection = "west";
  } else {
    windDirection = "North";
  }

  wind.textContent = windDirection + "," + data.wind.speed;

  tempreature.textContent =
    data.main.temp > 0
      ? "+ " + Math.round(data.main.temp)
      : Math.random(data.main.temp);
};
let dayOfWeek = () => {
  return new Date().toDateString("en-EN", { weekday: "long" });
};


getWeather("mogadishu")
