let selectedCity1 = document.getElementById("city1_list");

window.addEventListener('load',loadCity)

/**
 * Logs the city data when the selected city changes.
 *
 * @param {object} data - the city data
 * @return {void} 
 */
function logCity(data){
  selectedCity1.addEventListener("change", ()=>{
    let selectedCity1Value = selectedCity1.value;
    fetchDataCity1(selectedCity1Value)
  });
}



/**
 * Updates the UI with the data for the first city.
 *
 * @param {object} data - the data for the first city
 */
function showCity1data (data){
  
  let city1Sunrise = document.querySelector(".first_city_sunrise p")
  
  let city1SunriseDate = new Date(data.sys.sunrise*1000)
  let city1SunriseHours = city1SunriseDate.getHours()
  let city1SunriseMinuts = city1SunriseDate.getMinutes()

  let city1SunsetDate = new Date(data.sys.sunset*1000)
  let city1SunsetHours = city1SunsetDate.getHours()
  let city1SunsetMinuts = city1SunriseDate.getMinutes()
  

  city1SunsetHours =  city1SunsetHours%12
  city1SunriseHours = city1SunriseHours%12 
  city1SunriseHours = city1SunriseHours ? city1SunriseHours : 12
  city1SunsetHours = city1SunsetHours ? city1SunsetHours : 12


  let city1SunriseElem = document.querySelector(".first_city_sunriseTime p")
  city1SunriseElem.innerHTML = city1SunriseHours + ":" + city1SunriseMinuts + ' AM'
  
  let city1SunsetElem = document.querySelector(".first_city_sunsetTime p")
  city1SunsetElem.innerHTML = city1SunsetHours + ":" + city1SunsetMinuts + " PM"


  let city1temp = Number(data.main.temp - 273.15)
  let city1TempElem = document.querySelector('.city1_temp')
  city1TempElem.innerHTML = Math.floor(city1temp) + '°'

  let city1WindElem = document.querySelector('.city1_wind_status')
  city1WindElem.innerHTML = data.wind.speed + ' Km/H'

  let city1HumElem = document.querySelector('.city1_Hum_status')
  city1HumElem.innerHTML = data.main.humidity + ' %'

}


/**
 * Fetches data for a selected city and updates the city information on the page.
 *
 * @param {string} selectedCityValue - The value of the selected city
 * @return {void} 
 */
function fetchDataCity1 (selectedCityValue){
  let inputValue = searchInput.value
   fetch(`${option.url}${selectedCityValue}&appid=${option.key}`)
   .then((res)=>{
    return res.json()

   }).then((data)=>{
    document.getElementById("city_Name1").innerHTML = data.name
      logCity(data)
      showCity1data(data)

   }) .catch((err)=>{
      console.log(err);
   })
  
}

fetchDataCity1()



// !! +++++++++++++++++ city 2 ++++++++++++++++++!!! 


let selectedCity2 = document.getElementById("city2_list");

/**
 * Listens for changes on selectedCity2 and fetches data for the selected city.
 *
 * @param {object} data - The data object containing information about the selected city.
 * @return {void} 
 */
function logCity2 (data){
    selectedCity2.addEventListener("change", ()=>{
      let selectedCity2Value = selectedCity2.value;
      fetchDataCity2(selectedCity2Value)
    })
}


/**
 * Retrieves data for the second city and updates the UI with sunrise time, sunset time, wind status, humidity, and temperature.
 *
 * @param {object} data - the data object containing information about the second city
 * @return {void} 
 */
function showCity2Data(data){
   
  let city2Sunrise = new Date (data.sys.sunrise*1000)
  let city2SunriseHours = city2Sunrise.getHours()
  let city2SunriseMinute = city2Sunrise.getMinutes()

  let city2Sunset = new Date()
  let city2SunsetHours = city2Sunset.getHours()
  let city2SunsetMinute = city2Sunset.getMinutes()

  city2SunriseHours = city2SunriseHours%12
  city2SunsetHours = city2SunsetHours%12


  let city2SunriseElem = document.querySelector(".second_city_sunriseTime p")
  city2SunriseElem.innerHTML = city2SunriseHours+ ':' + city2SunriseMinute + ' AM'

  let city2SunsetElem = document.querySelector(".second_city_sunsetTime p")
  city2SunsetElem.innerHTML = city2SunsetHours+ ':' + city2SunsetMinute + ' PM'

  let city2WindElem = document.querySelector('.city2_wind_status')
  city2WindElem.innerHTML = data.wind.speed+ ' km/h'
  
  let city2HumElem = document.querySelector('.city2_Hum_status')
  city2HumElem.innerHTML = data.main.humidity + ' %'  
  
  let city2Temp = Number(data.main.temp -273.15)
  let city2TempElem = document.querySelector('.city2_temp')
  city2TempElem.innerHTML = Math.floor(city2Temp) + '°'
}


/**
 * Loads city data based on the selected city values and displays the city names and data.
 *
 * @param {type} selectedCity1Value - the value of the first selected city
 * @param {type} selectedCity2Value - the value of the second selected city
 * @return {type} undefined
 */
function loadCity(){
  // console.log(selectedCity2.value);
  let selectedCity1Value = selectedCity1.value;
   fetch(`${option.url}${selectedCity1Value}&appid=${option.key}`)
   .then((res)=>{
    return res.json()

   }).then((data)=>{
    document.getElementById("city_Name1").innerHTML = data.name
      logCity(data)
      showCity1data(data)

   }) .catch((err)=>{
      console.log(err);
   })

  // !!-------------city2--------------------

  let selectedCity2Value = selectedCity2.value;
  
  fetch(`${option.url}${selectedCity2Value}&appid=${option.key}`)
  .then((res)=>{
   return res.json()

  }).then((data)=>{
 let city2Name = document.querySelector('.second_city_name').innerHTML = data.name
   logCity2(data)
   showCity2Data(data)

  }) .catch((err)=>{
     console.log(err);
  })

}

/**
 * Fetches data for the selected city 2 value and updates the UI with the city name and related data.
 *
 * @param {type} selectedCity2Value - the value of the selected city 2
 * @return {type} undefined
 */
function fetchDataCity2 (selectedCity2Value){
   fetch(`${option.url}${selectedCity2Value,selectedCity2.value}&appid=${option.key}`)
   .then((res)=>{
    return res.json()

   }).then((data)=>{
  let city2Name = document.querySelector('.second_city_name').innerHTML = data.name
    logCity2(data)
    showCity2Data(data)

   }) .catch((err)=>{
      console.log(err);
   })
  
}

fetchDataCity2()
