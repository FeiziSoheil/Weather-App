let searchInput = document.querySelector(".header_search");

window.addEventListener("load", loadPage);


let option = {
  url: "https://api.openweathermap.org/data/2.5/weather?q=",
  key: "43e7525adcd0a1736abb0fd8489612e6",
};

let imgOption = {
  url : `https://api.unsplash.com/search/photos?query=`,
  key: `hzdUqKlWuNlJQg32JPL1Dd7XVKAnpw64AFaQBiwedrU`
}

function loadPage() {
  document.querySelector(".loader").classList.add("hidden");
}


/**
 * Retrieves the current weather using the geolocation API and the OpenWeatherMap API.
 *
 * @param {type} paramName - description of parameter
 * @return {type} description of return value
 */
function getCurrentWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      const url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${option.key}&units=metric`;

      fetch(url2)
        .then((res) => res.json())
        .then((val) => {
          if (val.cod === 200) {
            showData(val);
            dateShow(val);
            fetch(
              `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&units=metric&appid=3cb1e3bc09d345e92039e64c76ec688d`
            )
              .then((response) => response.json())
              .then((data) => {
                getHourlyStatus(data);
                getDailyStatus(data);
              });
          } else {
            console.error(`Error : ${data.message}`);
          }
        });
    });
  } else {
    console.error(`Geolocation API is not supported.`);
  }
}
getCurrentWeather()



/**
 * Updates the UI with weather data for the current city.
 *
 * @param {object} val - the weather data object
 * @return {void} 
 */
function showData(val) {
  let currentCityName = document.querySelector(".current_city_name");
  currentCityName.innerHTML = val.name + ", ";

  let currentCountryName = document.querySelector(".current_country_name");
  currentCountryName.innerHTML = val.sys.country;

  let tempElem = document.querySelector(".today_temp");
  if (val.main.temp > 60) {
    let temp = Number(val.main.temp - 273.15);
    tempElem.innerHTML = Math.floor(temp) + "°";
  } else {
    tempElem.innerHTML = Math.floor(val.main.temp) + "°";
  }

  let todayWeatherStatus = document.querySelector(".today_weather");
  todayWeatherStatus.innerHTML = val.weather[0].main;

  let todayWeatherImg = document.querySelector(".weather_img");
  todayWeatherImg.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${val.weather[0].icon}@2x.png`
  );

  let CurrentCityWind = document.querySelector(".current_wind_status");
  CurrentCityWind.innerHTML = val.wind.speed + "km/h";

  let currentCityHum = document.querySelector(".current_hum_status");
  currentCityHum.innerHTML = val.main.humidity + "%";

  document.querySelector(".current_city_sunsetTitle p").innerHTML = val.name;
  let dayTempDes = document.querySelector(".today_temp_des");
  dayTempDes.innerHTML = val.weather[0].description;

  let hourlyTemp_cityName = document.querySelector(".hourlyTemp_cityName");
  hourlyTemp_cityName.innerHTML = val.name;

}


/**
 * Function to display the current date and time, as well as sunrise and sunset times for a given city.
 *
 * @param {Object} val - the object containing information about the city, including sunrise and sunset times
 * @return {void} This function does not return a value
 */
function dateShow(val) {
  const monthList = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dayList = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let date = new Date();
  let day = date.getDate();
  let month = monthList[date.getMonth()];
  let dayWeek = dayList[date.getDay()];
  let hours = date.getHours();
  let minuts = date.getMinutes();
  let year = date.getFullYear();

  document.querySelector(".date_today").innerHTML = `Today, ${day} ${month}`;
  document.querySelector(
    ".header_date"
  ).innerHTML = `${dayWeek}, ${day} ${month} ${year}`;

  let todayTime = document.querySelector(".header_time");
  let period2 = hours >= 12 ? "AM" : "AM";
  todayTime.innerHTML = ` ${hours}:${minuts} ${period2}`;

  let sunsetRequest = val.sys.sunset;
  let sunriseRequest = val.sys.sunrise;
  let sunsetHours = new Date(sunsetRequest * 1000).getHours();
  let sunsetMinuts = new Date(sunsetRequest * 1000).getMinutes();
  let sunriseHours = new Date(sunriseRequest * 1000).getHours();
  let sunriseMinuts = new Date(sunriseRequest * 1000).getMinutes();

  let period = sunsetHours && sunriseHours >= 12 ? "pm" : "am";

  sunsetHours = sunsetHours % 12;
  sunriseHours = sunriseHours % 12;

  sunriseHours = sunriseHours ? sunriseHours : 12;
  sunsetHours = sunsetHours ? sunsetHours : 12;

  document.querySelector(".currentCity_sunrise_time").innerHTML =
    sunriseHours + ":" + sunriseMinuts + " " + period;
  document.querySelector(".currentCity_sunset_time").innerHTML =
    sunsetHours + ":" + sunsetMinuts + " " + period;
}



/**
 * Generates and displays the daily weather status based on the provided data.
 *
 * @param {object} data - The data containing the daily weather information
 * @return {void} 
 */
function getDailyStatus(data) {
  console.log(data);
  const dailyWeatherBox = document.querySelector(".week_card_wrapper");
  dailyWeatherBox.innerHTML = "";
  data.daily.forEach((day) => {
    dailyWeatherBox.innerHTML += `
            <div class="week_card ">
                <img src="https://openweathermap.org/img/wn/${
                  day.weather[0].icon
                }@4x.png" alt="">
                <p class="dayName">${moment(day.dt * 1000)
                  .format("dddd")
                  .substring(0, 3)}</p>
                <p class="day_temp">${day.temp.day}°</p>
                <p class="temp_des">${day.weather[0].description}</p>
            </div>
        `;
  });
}


/**
 * Retrieves hourly weather data and updates the DOM with the information.
 *
 * @param {Object} data - the weather data object
 * @return {void} 
 */
function getHourlyStatus(data) {
  const allHours = data.hourly;
  const hoursWrapper = document.querySelector(".airQuality_details");

  hoursWrapper.innerHTML = "";
  for (let count = 0; count < allHours.length; count += 2) {
    hoursWrapper.insertAdjacentHTML(
      "beforeend",
      `<div class="hourly_card">
            <img src="https://openweathermap.org/img/wn/${
              allHours[count].weather[0].icon
            }@4x.png" alt="">
            <p class="dayName">${moment(allHours[count].dt * 1000).format(
              "LT"
            )}</p>
            <p class="day_temp">${allHours[count].temp} °C</p>
        </div>`
    );
  }
}


/**
 * Retrieves the welcome status based on the current time and updates the 
 * welcome element with an appropriate message.
 */
function getWelcome() {
  let welcomeStatus = document.querySelector(".header_welcome_wrapper");

  let time = new Date();
  let hours = time.getHours();
  console.log(`time ${hours}`);

  if (hours < 12) {
    welcomeStatus.innerHTML = `<i class="bx bx-sun"></i> 
        Good morning, Soheil!
    `;
  } else if (hours < 15) {
    welcomeStatus.innerHTML = `<i class="bx bx-sun"></i> 
        Good afternon, Soheil!
    `;
  } else if (hours < 18) {
    welcomeStatus.innerHTML = `<i class="bx bx-sun"></i> 
        Good evening, Soheil!
    `;
  } else {
    welcomeStatus.innerHTML = `<i class="bx bx-moon"></i> 
        Good night, Soheil!
    `;
  }
}
getWelcome();



document.querySelector('.airQuality_btn_refresh').addEventListener('click',fetchData)
/**
 * Fetches data from the API and handles the response to display weather information.
 *
 * @param {type} none
 * @return {type} none
 */
function fetchData() {
  let inputValue = searchInput.value;
  fetch(`${option.url}${inputValue}&appid=${option.key}`)
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .then((val) => {
      if(val.message === "city not found"){
        alert('City not found, please enter correct city')
        return searchInput.value = ''
      }
      console.log(val);
      let lon = val.coord.lon;
      let lat = val.coord.lat;
      showData(val);
      dateShow(val);
      getCityImage(inputValue)
      console.log(`lon:${lon} , lat:${lat}`);
      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&units=metric&appid=3cb1e3bc09d345e92039e64c76ec688d`
      )
        .then((response) => response.json())
        .then((data) => {
          getHourlyStatus(data);
          getDailyStatus(data);
        }).catch(err=>{
          console.log();
        })
    });
}

function getCityImage (cityName){
  fetch(`${imgOption.url}${cityName}&client_id=${imgOption.key}`)
  .then((res)=>{
    console.log(res);
    return res.json()
  }).then((data)=>{
    console.log(data);
    let imageSection = document.querySelector('.image_section')
    imageSection.innerHTML =''
    data.results.forEach((img)=>{
     imageSection.insertAdjacentHTML('beforeend',`
     <div class="img_wrapper ">
     <img src="${img.urls.regular}" alt="image" class="img">
     <div class="image_filter">
         <p class="image_title">${img.user.name}</p>    
         <h1 class="image_des">${img.alt_description}</h1>
     </div>
 </div>
         
     `)

  
    })
  }).catch((err)=>{
    console.log(err);
  })
}

window.addEventListener('load',()=>{
  setTimeout(() => {
    let currentCity = document.querySelector('.current_city_name')
    getCityImage(currentCity.innerHTML)
  }, 1000);
})

searchInput.addEventListener("keydown", event=>{
  if (event.keyCode === 13) {
      fetchData()
  }
});


// !!------------- anim--------------------


window.addEventListener('load',()=>{
  setTimeout(() => {
    document.querySelector('.sunset_sunrise_container').classList.add('anim-active')
    document.querySelector('.airQuality_container').style.display = 'block'
  },4000)
})

