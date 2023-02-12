const input = document.querySelector("input");
const button = document.querySelector("button");
const cityName = document.querySelector(".city-name");
const warning = document.querySelector(".warning");
const photo = document.querySelector(".photo");
const weather = document.querySelector(".weather");
const temperature = document.querySelector(".temperature");
const humidity = document.querySelector(".humidity");

const API_LINK = "https://api.openweathermap.org/data/2.5/weather?q=";
const API_KEY = "&appid=702b3623acbf2d9021cf778e3769e7b5";
const API_UNITS = "&units=metric";

const getWeather = () => {
  const city = input.value;
  const URL = API_LINK + city + API_KEY + API_UNITS;

  axios
    .get(URL)
    .then((res) => {
      const temp = res.data.main.temp;
      const hum = res.data.main.humidity;
      const status = res.data.weather[0].main;
      const status1 = res.data.weather[0].id;

      if (status1 >= 200 && status1 <= 232) {
        photo.setAttribute("src", "./img/1thunderstorm.png");
      } else if (status1 >= 300 && status1 <= 321) {
        photo.setAttribute("src", "./img/drizzle.png");
      } else if (status1 >= 500 && status1 <= 531) {
        photo.setAttribute("src", "./img/rain.png");
      } else if (status1 >= 600 && status1 <= 622) {
        photo.setAttribute("src", "./img/ice.png");
      } else if (status1 >= 701 && status1 <= 781) {
        photo.setAttribute("src", "./img/fog.png");
      } else if (status1 === 800) {
        photo.setAttribute("src", "./img/sun.png");
      } else if (status1 >= 801 && status1 <= 804) {
        photo.setAttribute("src", "./img/cloud.png");
      } else {
        photo.setAttribute("src", "./img/unknow.png");
      }

      cityName.textContent = res.data.name;
      temperature.textContent = Math.floor(temp) + "°C";
      humidity.textContent = hum + "%";
      weather.textContent = status;
      input.value = "";
      warning.textContent = "";
    })
    .catch(() => {
      warning.textContent = "Wpisz poprawna nazwę miasta";
    });
};

button.addEventListener("click", getWeather);
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    getWeather();
  }
});
