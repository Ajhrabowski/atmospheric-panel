var APIKey = "729fc5cf58d6f14307e8d05b5359b614";

const API_KEY = "729fc5cf58d6f14307e8d05b5359b614";

//add click handler on search button and var to keep track of input box
var APIURL = "https://api.openweathermap.org/data/2.5/weather?units=imperial&appid=729fc5cf58d6f14307e8d05b5359b614"
var search = document.getElementById("searchbtn");
var searchInput = document.getElementById("searchBar")
// Grab REFERENCE to any HTML ELEMENTs i want to change/modify
var currentCity = document.querySelector('.city');
var currentTemp = document.querySelector('.temperature');
var currentHumidity = document.querySelector('.humidity');
var currentWind = document.querySelector('.wind');
var currentDate = document.querySelector('.date')
var container = document.querySelector('.container')


search.addEventListener("click", function () {
    //console.log("hi")
    var searchUrl = APIURL + "&q=" + searchInput.value
    fetch(searchUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            getForcast(data.coord.lat, data.coord.lon)
            var weather = data.weather[0]

            // We capture the data from the API
            var cityName = data.name;
            var temp = data.main.temp;
            var wind = data.wind.speed;
            var humid = data.main.humidity;
            var todaysDate = (new Date(data.dt * 1000)).toDateString()
            var iconUrl = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
            console.log("Data:", cityName, temp, humid)
            // UPDATE the HTML content on screen
            currentCity.textContent = cityName;
            currentTemp.textContent = temp;
            currentWind.textContent = wind;
            currentHumidity.textContent = humid;
            currentDate.textContent = todaysDate


        });


})


function getForcast(latitude, longitude) {

    var APIURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&units=imperial&appid=729fc5cf58d6f14307e8d05b5359b614"
    fetch(APIURL)
        .then(response => response.json())
        .then(data => {
            console.log(data)

            var filteredData = [];

            var forecastData = data.list;
            console.log("Data: ", forecastData);
            for (let i = 0; i < forecastData.length; i++) {
                // console.log(forecastData[i].dt_txt);  // --> "1923-10-01 12:00:00"
                // console.log(forecastData[i].dt_txt.split());  // --> "cat" -> ['c', 'a', 't']
                //                                                 INDEX           0         1
                // console.log(forecastData[i].dt_txt.split(' '));  // --> ['1923-10-01', '12:00:00']
                let date = forecastData[i].dt_txt.split(' ')[0]
                let current = forecastData[i].dt_txt.split(' ')[1]

                if (current === '12:00:00') {
                    filteredData.push(forecastData[i])
                }
            }

            console.log("Filtered data: ", filteredData)
            container.innerHTML = "";
            // Now that we have the ESSENTIAL DATA --> what do we do with it(?)
            for (let i = 0; i < filteredData.length; i++) {
                var newTemp = document.createElement("div")
                newTemp.setAttribute("class", "weather1")
                var cityEl = document.createElement("h2")

                newTemp.appendChild(cityEl)
                var iconUrl = `https://openweathermap.org/img/w/${filteredData[i].weather[0].icon}.png`;
                var weatherIcon = document.createElement('img')
                weatherIcon.setAttribute('src', iconUrl)


                //var todaysDate = (dayjs(data.dt*1000)).format('M/D/YYYY');
                var dateEl = document.createElement("h2")
                dateEl.textContent = " " + (new Date(filteredData[i].dt * 1000)).toDateString();
                // var newDate = (new Date(data.dt*1000)).toDateString()
                // dateEl.textContent = newDate
                newTemp.appendChild(dateEl);


                newTemp.appendChild(weatherIcon)

                var tempEl = document.createElement("h2")
                tempEl.textContent = "Temp:" + filteredData[i].main.temp;  // --> DAta[INDEX_vALUE].FIELDnAME.nestedFieldName
                newTemp.appendChild(tempEl);


                var windEl = document.createElement("h2")
                windEl.textContent = "Wind; " + filteredData[i].wind.speed
                newTemp.appendChild(windEl)


                var humidEl = document.createElement("h2")
                humidEl.textContent = "Humidity: " + filteredData[i].main.humidity;
                newTemp.appendChild(humidEl);



                //add dayjs dayjs(forecast.dt_txt).format('M/D/YYYY');




                container.appendChild(newTemp)


            }
            // UPDATE THE DOM with the new data we recieved from the API call 


            // IF we dynnmaicatlly Create new html element 
            /// we have to create the elemenet
            // we have to add attributes
            // we have to add data / textContent
            // we have to APPEND THE NEW ELEMENT TO AN EXISITING HTML ELEMENT (that we have reference to)
        });
}

