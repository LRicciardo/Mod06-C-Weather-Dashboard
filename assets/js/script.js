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
const geoKey = "AIzaSyBzUZm38CUd6AtsYcewUaQwnKUnZPMI7mg";
// var geoApiUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + geoLocation + "&key=" + geoKey;

// location Data created from geo location API
var geoData = [];

// weather API queries, selectors and API key
const openKey = "2dbbe96da045c9cf9ec08f3837c40596";
const openKeyName = "Mod06-key"
const openRecCnt = 40;
// cnt= the number of timestamps
// units = units of measurements returned (standard-is Kelvin)
// var weatherApiUrl = "http://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + openKey + "&mode={json}&units=imperial&cnt=" + openRecCnt;
http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
// assumption: requested imperial as units if measure 
// assumption: requested 40 count = 5 days 
// data layout is by location
//  location contains an array of 3-hour spans of data and then the location information
// forecast Data created from weather API
var weatherData =[];
var forecastData =[];
// var iconCode = "01d";
// var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + ".png";

const iconUrl = "url(https://openweathermap.org/img/w/%ICON%.png)";

// Local Storage variables
let locationFromLS = false;  // set flag to true if location found in LS
let noLS = true;            // set flag to false if data in LS

let historyLS = [{
    location: "",
    longitude: 0,
    latitude: 0
    }];

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
  $("#forecastBox").hide();
};

//  getLocalStorage (location, longitude, latitude) {
function getLocalStorage () {
  // console.log(" >>> inside getLocalStorage");
  historyLS = JSON.parse(localStorage.getItem("history")) || [];
  if (historyLS === null) {
    historyLS = [];    
  };

  if (historyLS.length === 0 ) {
    // init storage
    noLS = true;
  } else {
    noLS = false;
    renderLS(historyLS);
  };
}; 

//  saveLocalStorage (location, longitude, latitude) {
function saveLocalStorage(location,latitude,longitude) {
  // console.log(" >>> inside saveLocalStorage");
  // console.log("historyLS", historyLS);

  if (noLS) {
    returnIdx = -1;
  } else {  
    // search LocalStorage for  Location
    returnIdx = historyLS.findIndex(item => item.location == location);
  };
  // found in history or no localStorage
  if (returnIdx === -1) { 
    let storeData = {
      location: location,
      latitude: latitude ,
      longitude: longitude
      };
    historyLS.push(storeData);
    noLS = false;
    localStorage.setItem("history", JSON.stringify(historyLS));
    renderLS(historyLS);
  };
}; 

// The following function renders items in a list as <li> elements
function renderLS(historyLS) {
  // console.log(" >>> inside renderLS");
  // Clear historyList element(s) 
  $("#historyList").empty();

  // Render a new li for each history item
  historyLS.forEach((item,index) => { 
    let btnNbr = index + 1;
    // create li as a button
    // let liEl = `<li class="nav-item"><button id="btn${btnNbr}" type="button" class="btn btn-secondary btn-lg btn-block">${item.location}</button></li>`;
    let liEl = `<li class="nav-item"><a id="btn${btnNbr}"  class="nav-link btn btn-light btn-lg btn-block border" href="#" role="button">${item.location}</a></li>`;
    // append to list element  
    $("#historyList").append(liEl);
    // add data atribute and text
    let btnId = "#btn" + btnNbr;
    $(btnId).attr("data-index", index);
    if (index === 0) {
      // $(btnId).addClass("active");
      const spanEl = "<span class=\"sr-only\">(current)</span>";
      $(btnId).append(spanEl);
    }
  });
};


// find the min and max temps, max windspeed
function findMinMax (dayInfo,i,forecastData) {
  // console.log(" >>>>> inside findMinMax ", dayInfo, i, weatherData)
// ${Math.round(forecastData.list[i].main.temp_min)}
  let min = Math.round(forecastData.list[i].main.temp_min); 
  let max = Math.round(forecastData.list[i].main.temp_max);
  let humidity = forecastData.list[i].main.humidity;
  let wind = Math.round(forecastData.list[i].wind.speed);

  if (dayInfo.min > min) {dayInfo.min = min};
  if (dayInfo.max < max) {dayInfo.max = max};
  if (dayInfo.wind < wind) {dayInfo.wind = wind};
  if (dayInfo.humidity < humidity) {dayInfo.humidity = humidity};
};


function initForecast(dayInfo,i,forecastData){
// console.log(" >>>>> inside initForecast ", dayInfo, i, forecastData);

  //  initialize day information
  dayInfo.dayIdx++;
  dayInfo.yymmdd = dayjs(forecastData.list[i].dt_txt).format("YYYYMMDD"); 
  dayDate = dayInfo.yymmdd;
  dayInfo.min = Math.round(forecastData.list[i].main.temp_min); 
  dayInfo.max = Math.round(forecastData.list[i].main.temp_max);
  dayInfo.humidity = forecastData.list[i].main.humidity;
  dayInfo.wind = Math.round(forecastData.list[i].wind.speed);
  dayInfo.icon = forecastData.list[i].weather[0].icon;
  dayInfo.desc = forecastData.list[i].weather[0].description;    
};

function gatherForecast(forecastData){
// console.log(" >>>>> inside gatherForecast ", location, weatherData);
  let dayInfo = {
    dayIdx: 0,
    yymmdd: null,
    min: 0,
    max: 0,
    desc: "",
    windSpeed: 0,
    humidity: 0,
    icon: null };
  // let dayDate = null;
   
  for(let i=0; i<forecastData.list.length;i++){
    if (i === 0) {
      dayInfo.dayIdx = 0;
      initForecast(dayInfo,i,forecastData);
      dayDate = dayInfo.yymmdd;
    } else {
      let dayDate = dayjs(forecastData.list[i].dt_txt).format("YYYYMMDD");    
      if (dayInfo.yymmdd === dayDate) {
        findMinMax(dayInfo,i,forecastData);
      } else {    
        displayCards(dayInfo);
        initForecast(dayInfo,i,forecastData);
      };  
    };
  };  // end for loop
  // display last card?
  if (dayInfo.dayIdx === 5) {
    displayCards(dayInfo);
  };
};

function displayCards(dayInfo){
  // console.log(" >>> inside displayCards");
  // console.log("dayInfo=>", dayInfo);
  const iconUrl = "https://openweathermap.org/img/w/%ICON%.png";
  let imageAttr = {
    src: iconUrl.replace("%ICON%", dayInfo.icon),
    alt: "An icon for the weather conditions"
  };
  // cssUrl = iconUrl.replace("%ICON%", forecast[i].icon);
  // console.log("css URL=>", cssUrl);
  // $("#day0" + cardIdx + "Card").css( {"background-image" : cssUrl } );
  let date = dayjs(dayInfo.yymmdd).format("ddd, MM/DD");
  $("#d0" + dayInfo.dayIdx + "CrdHdg").text(date)
  $("#d0" + dayInfo.dayIdx + "Icon").attr(imageAttr);
  // $("#d0" + cardIdx + "CrdHdg img").attr(imageAttr);
  $("#d0" + dayInfo.dayIdx + "Desc").text(dayInfo.desc);
  $("#d0" + dayInfo.dayIdx + "Min").text(dayInfo.min);
  $("#d0" + dayInfo.dayIdx + "Max").text(dayInfo.max);
  $("#d0" + dayInfo.dayIdx + "Wind").text(dayInfo.wind);
  $("#d0" + dayInfo.dayIdx + "Hum").text(dayInfo.humidity);     

  $("#forecastBox").show();
};

function displayCurr(location,weatherData){
// console.log(" >>> inside displayCurr", location, weatherData );

  const iconUrl = "https://openweathermap.org/img/w/%ICON%.png";
  let imageAttr = {
    src: iconUrl.replace("%ICON%", weatherData.weather[0].icon),
    alt: "An icon for the weather conditions"
  };
  $("#currIcon").attr(imageAttr);
  $("#currlocation").text(location);
  // console.log("weatherData.dt", weatherData.dt, dayjs(weatherData.dt).format("ddd, MM/DD/YYYY"))
  // let dateTime = " " + dayjs(weatherData.dt).format("ddd, MM/DD/YYYY") + " at " + dayjs(weatherData.dt).format("h:mm A")
  // $("#currDay").text(dateTime);
  $("#currDesc").text(weatherData.weather[0].description);
  $("#currTemp").text(Math.round(weatherData.main.temp));
  $("#currWind").text(weatherData.wind.speed);
  $("#currHumidity").text(weatherData.main.humidity);
  $("#weatherBox").show();
};

async function getWeatherAPIdata(location,latitude,longitude) {
// console.log(" >>>>>>  inside getWeatherAPIdata  >>>>>>>>>>>>>>>");
const weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?lat=%LATITUDE%&lon=%LONGITUDE%&appid=%OPENKEY%&mode={json}&units=imperial&cnt=40".replace("%LATITUDE%",latitude).replace("%LONGITUDE%",longitude).replace("%OPENKEY%",openKey);
const forecastApiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=%LATITUDE%&lon=%LONGITUDE%&appid=%OPENKEY%&mode={json}&units=imperial&cnt=40".replace("%LATITUDE%",latitude).replace("%LONGITUDE%",longitude).replace("%OPENKEY%",openKey);
// console.log(weatherApiUrl);
  const response1 = await fetch(weatherApiUrl);
  const weatherData = await response1.json();
  displayCurr(location,weatherData);

  const response2 = await fetch(forecastApiUrl);
  const forecastData = await response2.json();
  // console.log(">>weatherData<<", weatherData);
  // displayWeather(location);
  gatherForecast(forecastData);
  saveLocalStorage(location,latitude,longitude); 
};

async function getGeoAPIdata(geoApiUrl) {
// console.log(" >>>>>>  inside getGeoAPIdata  >>>>>>>>>>>>>>>");
    const response = await fetch(geoApiUrl);  // first promise
    const geoData = await response.json();   // second promise
    // console.log(">>geoApiUrl<<", geoApiUrl);
    // console.log(">>geoData<<", geoData);

    let location = geoData.results[0].formatted_address;
    let longitude = geoData.results[0].geometry.location.lng.toFixed(6);
    let latitude = geoData.results[0].geometry.location.lat.toFixed(6);
    locationFromLS = false;
    //  >>>>>>>>>>>>>>>>> Open Weather API Call 
    getWeatherAPIdata(location,latitude,longitude)
    .catch(error => {
        console.log('catch error location getWeatherAPIdata function inside getGeoAPIdata async function');
        console.error(error);
    });
};

function setSearchCriteria() {
// console.log(" >>>>>>  inside setSearchCriteria >>>>>>>>>>>>>>>");
    // use input data to call geo Location API
  let geolocation = $("#location").val().replace(", ",",+").replace(" ","%20");

  const geoApiUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=%GEOLOCATION%&key=%GEOKEY%".replace("%GEOLOCATION%",geolocation).replace("%GEOKEY%",geoKey);

  //  >>>>>>>>>>>>>>>>> Google geo API Call 
  getGeoAPIdata(geoApiUrl)
  .catch(error => {
    console.log('catch error location getGeoAPIdata function');
    console.error(error);
  });
};

function setHistoryCriteria(histBtn) {
// console.log(" >>>>>>  inside setHistoryCriteria >>>>>>>>>>>>>>>");
// console.log("histBtn>", histBtn);
  //  retrieve the index of the requested location in the localStorage Array
  let btnId = "#" + histBtn;
  let index = $(btnId).data("index");
  // use local variables
  let location = historyLS[index].location;
  let longitude = historyLS[index].longitude;
  let latitude = historyLS[index].latitude;
  locationFromLS = true;

  //  >>>>>>>>>>>>>>>>> Open Weather API Call 
  getWeatherAPIdata(location,latitude,longitude)
  .catch(error => {
    console.log('catch error location getWeatherAPIdata function inside setHistoryCriteria function');
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
$("#submitBtn").on("click", function (event) {
// console.log(" >>>>>>>>>click event happened >>>>>>>>>>>>>");
  event.preventDefault();
  // console.log ("event=>", event);
  // console.log ("event target localName=>", event.target.localName);
  // console.log ("event target id=>", event.target.id);
  // console.log("entering Submit Button");
  setSearchCriteria();  
});

// wait for user Input
$("#historyList").on("click", function (event) {
// console.log(" >>>>>>>>>click event happened >>>>>>>>>>>>>");
  event.preventDefault();
  // console.log ("event=>", event);
  // console.log ("event target localName=>", event.target.localName);
  // console.log ("event target id=>", event.target.id);
  // console.log("entering History Buttons");
  //  pass the history button id pressed
  setHistoryCriteria(event.target.id);  
});
