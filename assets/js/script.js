var APIKey = "729fc5cf58d6f14307e8d05b5359b614";

const API_KEY = "729fc5cf58d6f14307e8d05b5359b614";

//add click handler on search button and var to keep track of input box
var APIURL = "https://api.openweathermap.org/data/2.5/weather?q=Detroit&appid=729fc5cf58d6f14307e8d05b5359b614"
var search = document.getElementById("searchbtn");




search.addEventListener("click", function () {
    //console.log("hi")
    fetch(APIURL)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            var weather = data.weather[0]
        });

})

