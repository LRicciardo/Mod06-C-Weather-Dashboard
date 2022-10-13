// User Story
//  AS A traveler
//  I WANT to see the weather outlook for multiple cities
//  SO THAT I can plan a trip accordingly
// Acceptance Criteria
// x  GIVEN a weather dashboard with form inputs
//  WHEN I search for a city
// x THEN I am presented with current and future conditions for that city and that city is added to the search history
//  WHEN I view current weather conditions for that city
// x THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed
//  WHEN I view future weather conditions for that city
// x THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
//  WHEN I click on a city in the search history
// x THEN I am again presented with current and future conditions for that city


var forecastTime = dayjs('1664885779').format("HH:mm");
// Geo Location API queries, selectors, API key and URL
// var geoLocation = "Houston,+TX";
var geoKey = "AIzaSyBzUZm38CUd6AtsYcewUaQwnKUnZPMI7mg";
// var geoApiUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + geoLocation + "&key=" + geoKey;

//  informational data layout fron Geo location API
var geoDataLayout = {
    results: [
        {
            address_components: [
                {
                    long_name: "1600",
                    short_name: "1600",
                    types: [
                        "street_number"
                    ],
                },
                {
                    long_name: "Amphitheatre Parkway",
                    short_name: "Amphitheatre Pkwy",
                    types: [
                        "route"
                    ],
                },
                {
                    long_name: "Mountain View",
                    short_name: "Mountain View",
                    types: [
                        "locality",
                        "political"
                    ],
                },
                {
                    long_name: "Santa Clara County",
                    short_name: "Santa Clara County",
                    types: [
                        "administrative_area_level_2",
                        "political"
                    ],
                },
                {
                    long_name: "California",
                    short_name: "CA",
                    types: [
                        "administrative_area_level_1",
                        "political"
                    ],
                },
                {
                    long_name: "United States",
                    short_name: "US",
                    types: [
                        "country",
                        "political"
                    ],
                },
                {
                    long_name: "94043",
                    short_name: "94043",
                    types: [
                        "postal_code"
                    ],
                }
            ],
            formatted_address: "1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA",
            geometry: {
                location: {
                    lat: 37.4224428,
                    lng: -122.0842467
                },
                location_type: "ROOFTOP",
                viewport: {
                    northeast: {
                        lat: 37.4239627802915,
                        lng: -122.0829089197085
                    },
                    southwest: {
                        lat: 37.4212648197085,
                        lng: -122.0856068802915
                    }
                }
            },
            place_id: "ChIJeRpOeF67j4AR9ydy_PIzPuM",
            plus_code: {
                compound_code: "CWC8+X8 Mountain View, CA",
                global_code: "849VCWC8+X8"
            },
            types: [
                "street_address"
            ]
        }
    ],
    status: "OK"
};
// location Data created from geo location API
var geoData = [];
// holding variables ?
var geoReturnLongitude = -95.358421 ;
var geoReturnLatitude = 29.749907;


// dummy longitude and latitude for testing weather API
var longitude = -95.358421 ;
var latitude = 29.749907;


// weather API queries, selectors and API key
var openKey = "2dbbe96da045c9cf9ec08f3837c40596";
var openKeyName = "Mod06-key"
var openRecCnt = 40;
// cnt= the number of timestamps
// units = units of measurements returned (standard-is Kelvin)
// var weatherApiUrl = "http://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + openKey + "&mode={json}&units=imperial&cnt=" + openRecCnt;
http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
// assumption: requested imperial as units if measure 
// assumption: requested 40 count = 5 days 
// data layout is by location
//  location contains an array of 3-hour spans of data and then the location information

//  informational data layout fron weather API
var weatherDataLayout =[{
        cod: "200",
        message: 0,
        cnt: 40,
        list: [{
            dt: 1661871600,
            main: {
              temp: 296.76,
              feels_like: 296.98,
              temp_min: 296.76,
              temp_max: 297.87,
              pressure: 1015,
              sea_level: 1015,
              grnd_level: 933,
              humidity: 69,
              temp_kf: -1.11
            },
            weather: [{
                id: 500,
                main: "Rain",
                description: "light rain",
                icon: "10d"
            }],
            clouds: {
              all: 100
            },
            wind: {
              speed: 0.62,
              deg: 349,
              gust: 1.18
            },
            visibility: 10000,
            pop: 0.32,
            rain: {
              ThreeHour: 0.26
            },
            sys: {
              pod: "d"
            },
            dt_txt: "2022-08-30 15:00:00"
            }],
            city: {
              id: 3163858,
              name: "Zocca",
              coord: {
              lat: 44.34,
              lon: 10.99
              },
              country: "IT",
              population: 4593,
              timezone: 7200,
              sunrise: 1661834187,
              sunset: 1661882248
          }
        }
];
// forecast Data created from weather API
var weatherData =[];
// var iconCode = "01d";
// var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + ".png";


// Local Storage variables
var locationFromLS = false;  // set flag to true if location found in LS
var noLS = true;            // set flag to false if data in LS

var historyLS = [{
    location: "",
    longitude: 0,
    latitude: 0
    }];

var storeData = {
    location: "",
    longitude: 0,
    latitude: 0 };

var currWeather = {
        day: null,
        temp: 0,
        windSpeed: 0,
        humidity: 0,
       icon: null };

var forecast = [
        {
        yymmdd: null,
        min: 0,
        max: 0,
        windSpeed: 0,
        humidity: 0,
        icon: null },
        {
        yymmdd: null,
        min: 0,
        max: 0,
        windSpeed: 0,
        humidity: 0,
        icon: null },
        {
        yymmdd: null,
        min: 0,
        max: 0,
        windSpeed: 0,
        humidity: 0,
        icon: null },
        {
        yymmdd: null,
        min: 0,
        max: 0,
        windSpeed: 0,
        humidity: 0,
        icon: null },
        {
        yymmdd: null,
        min: 0,
        max: 0,
        windSpeed: 0,
        humidity: 0,
        icon: null },
        {
        yymmdd: null,
        min: 0,
        max: 0,
        windSpeed: 0,
        humidity: 0,
        icon: null }
];

// find the min and max temps, max windspeed
function    findMinMax (date, min, max, humidity, windSpeed, icon) {
    // console.log(" >>>>> inside findMinMax ", dayIdx, date, min, max)
    if (forecast[dayIdx].yymmdd == date) {
        if (forecast[dayIdx].min > min) {forecast[dayIdx].min = min};
        if (forecast[dayIdx].max < max) {forecast[dayIdx].max = max};
        if (forecast[dayIdx].windSpeed < windSpeed) {forecast[dayIdx].windSpeed = windSpeed};
    } else {
        dayIdx++;
        // console.log ("add 1 to dayIdx")
        if (dayIdx > 5) {return};
        forecast[dayIdx].yymmdd = date;
        forecast[dayIdx].min = min; 
        forecast[dayIdx].max = max;
        forecast[dayIdx].humidity = humidity;
        forecast[dayIdx].windSpeed = windSpeed;
        forecast[dayIdx].icon = icon;
    };
};

//  initialize switches, flags and variables
//  load history onto screen
function initDocument() {
// console.log(" >>>>>>  inside initDocument  >>>>>>>>>>>>>>>");
        
      $("#currentDate").html(" " + dayjs().format("dddd, MM/DD/YYYY"));
      daySwitch = true;
        if (dayjs().format("HH") > "17") {
            daySwitch = false;
        };
    
        getLocalStorage();
        $("#weatherBox").hide();
    };

function gatherForecast(weatherData){
// console.log(" >>>>> inside gatherForecast ", weatherData);
   
    for(var i=0; i<weatherData.list.length;i++){
        // console.log("inside for loop >>> i=>", i);
        forecastYYMMDD = dayjs(weatherData.list[i].dt_txt).format("YYYYMMDD");
        forecastTime = dayjs(weatherData.list[i].dt_txt).format("HH:mm");
        if (i === 0) {
            // current information is on first record
            currWeather.yymmdd = dayjs(weatherData.list[i].dt_txt).format("ddd, MM/DD"); 
            currWeather.temp = weatherData.list[i].main.temp; 
            currWeather.humidity = weatherData.list[i].main.humidity;
            currWeather.windSpeed = weatherData.list[i].wind.speed;
            currWeather.icon = weatherData.list[i].weather[0].icon;
            // initialize forecast weather table
            forecast[0].yymmdd = forecastYYMMDD; 
            forecast[0].min = weatherData.list[i].main.temp_min; 
            forecast[0].max = weatherData.list[i].main.temp_max;
            forecast[0].humidity = weatherData.list[i].main.humidity;
            forecast[0].windSpeed = weatherData.list[i].wind.speed;
            forecast[0].icon = weatherData.list[i].weather[0].icon;
            dayIdx = 0;   
        } else {          
            findMinMax(forecastYYMMDD, weatherData.list[i].main.temp_min, weatherData.list[i].main.temp_max, weatherData.list[i].main.humidity, weatherData.list[i].wind.speed, weatherData.list[i].weather[0].icon);
            if (dayIdx > 5) {
                i = weatherData.list.length;
            };
        };
    };

};

//  getLocalStorage (location, longitude, latitude) {
function getLocalStorage () {
    // console.log(" >>> inside getLocalStorage");
    historyLS = JSON.parse(localStorage.getItem("history")) || [];
    if (historyLS === null || historyLS.length === 0 ) {
        // init storage
        noLS = true;
        historyLS = [];    
        // console.log(" no forecast Data in Local Storage");
        return;
    };

    renderLS(historyLS);
}; 

//  saveLocalStorage (location, longitude, latitude) {
function saveLocalStorage() {
    console.log(" >>> inside saveLocalStorage");
    if (locationFromLS) {
        console.log("locationFromLS==>return");
        return;
    };
    if (historyLS === null || historyLS.length === 0 ) {
        console.log("historyLS = null", historyLS);
        console.log("or historyLS.length =zero", historyLS.length);
        // init storage
        noLS = true;
        if (storeData.location == "" ){
            console.log("storeData.location== \"\"", storeData.location);
            console.log("no data to store");
            return;
        };
        console.log("assign storeData to historyLS[0]", storeData);
        historyLS[0] = storeData;    
    };
    console.log("historyLS", historyLS);
    console.log("storeData", storeData);
    // search LocalStorage for StoreData Location
    returnIdx = historyLS.findIndex(function(item) {
        return item.location == storeData.location
    });
    if (returnIdx > -1) {  
        console.log("found");
        return;
    };
    // if not found push object on array
    historyLS.push(storeData);
    localStorage.setItem("history", JSON.stringify(historyLS));
    renderLS(historyLS);
}; 


// The following function renders items in a list as <li> elements
function renderLS(historyLS) {
    // console.log(" >>> inside renderLS");
    // Clear historyList element(s) 
    $("#historyList").empty();
  
    // Render a new li for each history item
    historyLS.forEach(function(item,index){ 

        var btnNbr = index + 1;
        // create li as a button
        var liEl = $("<li><button id=\"btn" + btnNbr + "\" type=\"button\" class=\"btn btn-secondary btn-lg btn-block\"></button></li>");
        // append to list element  
        $("#historyList").append(liEl);
        // add data atribute and text
        var btnId = "#btn" + btnNbr;
        $(btnId).attr("data-index", index);
        $(btnId).text(item.location);
      
    });
  };

function displayWeather(){
    // console.log(" >>> inside displayWeather");

    iconUrl = "url(https://openweathermap.org/img/w/%icon%.png)";
    cssUrl = iconUrl.replace("%icon%", currWeather.icon);
    // console.log("css URL=>", cssUrl);
    $( "#currIcon" ).css( {"background-image" : cssUrl } );
    $("#currlocation").text(storeData.location);
    $("#currDay").text(" " + dayjs().format("ddd, MM/DD"));
    $("#currTemp").text(currWeather.temp);
    $("#currWind").text(currWeather.windSpeed);
    $("#currHumidity").text(currWeather.humidity);

    var cardIdx = 1;
    for(var i=0; i < forecast.length; i++) {
        // console.log(i , forecast[i].yymmdd, forecast[5].yymmdd, forecast.length);
        // prompt("i++ why?");
        cssUrl = iconUrl.replace("%icon%", forecast[i].icon);
        // console.log("css URL=>", cssUrl);
        $("#day0" + cardIdx + "Card").css( {"background-image" : cssUrl } );
        var day = dayjs(forecast[i].yymmdd).format("ddd, MM/DD");
        $("#d0" + cardIdx + "CrdHdg").text(day);
        $("#d0" + cardIdx + "Min").text(forecast[i].min);
        $("#d0" + cardIdx + "Max").text(forecast[i].max);
        $("#d0" + cardIdx + "Wind").text(forecast[i].windSpeed);
        $("#d0" + cardIdx + "Hum").text(forecast[i].humidity);   
        cardIdx++;       
    };
    $("#weatherBox").show();
};

async function getWeatherAPIdata(longitude,latitude) {
// console.log(" >>>>>>  inside getWeatherAPIdata  >>>>>>>>>>>>>>>");
weatherApiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + openKey + "&mode={json}&units=imperial&cnt=40";
// console.log(weatherApiUrl);
    const response = await fetch(weatherApiUrl);
    const weatherData = await response.json();
    // console.log(">>weatherData<<", weatherData);
    gatherForecast(weatherData);
    displayWeather();
    saveLocalStorage(); 
};

async function getGeoAPIdata(geoApiUrl) {
// console.log(" >>>>>>  inside getGeoAPIdata  >>>>>>>>>>>>>>>");
    const response = await fetch(geoApiUrl);  // first promise
    const geoData = await response.json();      // second promise
    // console.log(">>geoApiUrl<<", geoApiUrl);
    // console.log(">>geoData<<", geoData);

    storeData.location = geoData.results[0].formatted_address;
    storeData.longitude = geoData.results[0].geometry.location.lng.toFixed(6);
    storeData.latitude = geoData.results[0].geometry.location.lat.toFixed(6);
    // console.log(" ", storeData);
    
    //  >>>>>>>>>>>>>>>>> Open Weather API Call 
    getWeatherAPIdata(storeData.longitude,storeData.latitude)
    .then(response => {
        console.log('yay from getGeoAPIdata');
    })
    .catch(error => {
        console.log('error!');
        console.error(error);
    });
};

function setSearchCriteria() {
// console.log(" >>>>>>  inside setSearchCriteria >>>>>>>>>>>>>>>");
    // use input data to call geo Location API
    storeData.location = $("#location").val();
    //  enter location into Geo location api url
    var geoLocation = storeData.location.replace(", ",",+").replace(" ","%20");

    var geoApiUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + geoLocation + "&key=" + geoKey;

    //  >>>>>>>>>>>>>>>>> Google geo API Call 
    getGeoAPIdata(geoApiUrl)
    .then(response => {
        console.log('geo okay');    
    })
    .catch(error => {
        console.log('error geo!');
        console.error(error);
    });
};

function setHistoryCriteria(histBtn) {
// console.log(" >>>>>>  inside setHistoryCriteria >>>>>>>>>>>>>>>");
var index = $("#" + histBtn).data("index")
storeData.location = historyLS[index].location;
storeData.longitude = historyLS[index].longitude;
storeData.latitude = historyLS[index].latitude;
// console.log(" ", storeData);

//  >>>>>>>>>>>>>>>>> Open Weather API Call 
getWeatherAPIdata(storeData.longitude,storeData.latitude)
.then(response => {
    console.log('yay from getGeoAPIdata');
})
.catch(error => {
    console.log('error!');
    console.error(error);
});
};


// this is setup when document is finished loading
$(document).ready(function() {
// console.log("document ready  >>>>>>>>>>>>>>>>>>>>>>");
    // initialize Document
    initDocument();
});

// wait for user Input
$("#searchBox").on("click", function (event) {
// console.log(" >>>>>>>>>click event happened >>>>>>>>>>>>>");
    event.preventDefault();
    // console.log ("event=>", event);

    if (event.target !== event.currentTarget) {
    // console.log ("event target localName=>", event.target.localName);
        // console.log ("event target id=>", event.target.id);
        if (event.target.localName === "button") {

            if (event.target.id == "submitBtn") 
            {
                // console.log("entering Submit Button");
                locationFromLS = false;
                setSearchCriteria();  
            } else {
                // console.log("entering History Buttons");
                //  use history button to get geo Location data
                locationFromLS = true;
                setHistoryCriteria(event.target.id);  
            };
        
        };

    };
// stop bubbling
// event.stopPropagation();
});
