// var apiUrl = 'https://api.github.com/users/' + user + '/repos';
var currWeather = [
        {
        yymmdd: null,
        temp: 0,
        windSpeed: 0,
        humidity: 0,
       icon: null }];
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
var forecastTime = dayjs('1664885779').format("HH:mm");

var geoLocation = "address=Houston,+TX";
var geoKey = "AIzaSyBzUZm38CUd6AtsYcewUaQwnKUnZPMI7mg";
var geoApiUrl = "https://maps.googleapis.com/maps/api/geocode/json?" + geoLocation + "&key=" + geoKey;
var geoReturnLongitude = -95.358421 ;
var geoReturnLatitude = 29.749907;
var geoData = [];
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

var longitude = -95.358421 ;
var latitude = 29.749907;


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
var forecastData =[];
var iconCode = "01d";
var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
var forecastLS = [{
    location: "",
    country: "",
    longitude: 0,
    latitude: 0
    }];
var storeData = [{
    location: "",
    country: "",
    longitude: 0,
    latitude: 0 }
]
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

// calculate the min and max temps, max windspeed
function    calcMinMax (date, min, max, humidity, wind) {
    console.log(" >>>>> inside calcMinMax ", dayIdx, date, min, max)
    if (forecast[dayIdx].yymmdd == date) {
        if (forecast[dayIdx].min > min) {forecast[dayIdx].min = min};
        if (forecast[dayIdx].max < max) {forecast[dayIdx].max = max};
        if (forecast[dayIdx].wind < wind) {forecast[dayIdx].wind = wind};
    } else {
        dayIdx++;
        console.log ("add 1 to dayIdx")
        if (dayIdx > 5) {return};
        forecast[dayIdx].yymmdd = date;
        forecast[dayIdx].min = min; 
        forecast[dayIdx].max = max;
        forecast[dayIdx].humidity = humidity;
        forecast[dayIdx].windSpeed = wind;
    };

    // find the lowest and highest temps per day (upto 8-3hr items)
};

function gatherForecast(forecastData){
    console.log(" >>>>> inside displayForecast ", forecastData);
    storeData.location = forecastData.city.name;
    storeData.country =  forecastData.city.country;
    storeData.longitude = forecastData.city.coord.lon;
    storeData.latitude = forecastData.city.coord.lat;

    for(var i=0; i<forecastData.list.length;i++){
        console.log("inside for loop >>> i=>", i);
        forecastYYMMDD = dayjs(forecastData.list[i].dt_txt).format("YYYYMMDD");
        forecastTime = dayjs(forecastData.list[i].dt_txt).format("HH:mm");
        console.log("forecast date=>", forecastYYMMDD, "< time=>", forecastTime);
        if (i === 0) {
            // current information is on first record
            currWeather.yymmdd = forecastYYMMDD; 
            currWeather.temp = forecastData.list[i].main.temp; 
            currWeather.humidity = forecastData.list[i].main.humidity;
            currWeather.windSpeed = forecastData.list[i].wind.speed;
            currWeather.icon = forecastData.list[i].weather[0].icon;
            // initialize forecast weather table
            forecast[0].yymmdd = forecastYYMMDD; 
            forecast[0].min = forecastData.list[i].main.temp_min; 
            forecast[0].max = forecastData.list[i].main.temp_max;
            forecast[0].humidity = forecastData.list[i].main.humidity;
            forecast[0].windSpeed = forecastData.list[i].wind.speed;
            forecast[0].icon = forecastData.list[i].weather[0].icon;
            dayIdx = 0;   
            console.log ("init forecast");
        } else {
            // console.log("i>", i);
            
            calcMinMax(forecastYYMMDD, forecastData.list[i].main.temp_min, forecastData.list[i].main.temp_max, forecastData.list[i].main.humidity, forecastData.list[i].wind.speed);
            if (dayIdx > 5) {
                i = forecastData.list.length
                console.log("exiting for loop");
            };
        };
    };
      console.log("forecast=>", forecast);
      console.log("storeData", storeData)
    //   iconCode = forecastData.list[i].weather[0].icon;
      iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
    // storeCityLS ();
};

// function getLocalStorage (location, country, longitude, latitude) {
function getLocalStorage () {
    console.log(" >>> inside getLocalStorage")
    forecastLS = JSON.parse(localStorage.getItem("forecast")) || [];
    if (forecastLS === null) {
        // init storage
        noStorage = true;
        forecastLS = [];    
        console.log(" no forecast Data in Local Storage");
    } else {
        // display prev forecast info (location, country, longitude, latitude) 
        console.log("forecastLS", forecastLS);
    };
}; 

function displayWeather(){
    console.log(" >>> inside displayWeather");
    $("#currentDate").html(" " + dayjs().format("dddd, MM/DD/YYYY"));

}

async function getWeatherAPIdata() {
    const response = await fetch(weatherApiUrl);
    const forecastData = await response.json();
    // console.log(">>forecastData<<", forecastData);
    gatherForecast(forecastData);
};

async function getGeoAPIdata() {
    const response = await fetch(geoApiUrl);
    const geoData = await response.json();
    // console.log(">>geoData<<", geoData);
    // useGeotoGetWeather(geoData);
    // console.log(" >>>>> inside storeGeo ", geoData)
    // console.log("geo lat=>", geoData.results[0].geometry.location.lat, "< -geo lng=>", geoData.results[0].geometry.location.lng, "<br>");
    geoReturnLongitude = geoData.results[0].geometry.location.lng;
    geoReturnLatitude = geoData.results[0].geometry.location.lat;
    weatherApiUrl = "http://api.openweathermap.org/data/2.5/forecast?lat=" + geoReturnLatitude + "&lon=" + geoReturnLongitude + "&appid=" + openKey + "&mode={json}&units=imperial&cnt=40";
    // console.log(weatherApiUrl);

    //  >>>>>>>>>>>>>>>>> Open Weather API Call 
    getWeatherAPIdata()
    .then(response => {
        console.log('yay');
    })
    .catch(error => {
        console.log('error!');
        console.error(error);
    });
};


//  >>>>>>>>>>>>>>>>> Google geo API Call 
getGeoAPIdata()
.then(response => {
  console.log('yay geo');
})
.catch(error => {
    console.log('error geo!');
    console.error(error);
});
function initDocument() {
    
  $("#currentDate").html(" " + dayjs().format("dddd, MM/DD/YYYY"));
  daySwitch = true;
    if (dayjs().format("HH") > "17") {
        daySwitch = false;
    };

    getLocalStorage();
};
    // let entries = Object.entries(forecastData);
    // console.log("entries>", entries);
    // console.log("core    cod=>", forecastData.cod, "--MSG=>", forecastData.message,"--cnt=>", forecastData.cnt, "<br>");
    // console.log("city header info > name=>", forecastData.city.name, "--country=>", forecastData.city.country,"<--lon=>", forecastData.city.coord.lon, "<--lat=>", forecastData.city.coord.lat,"<--sunriseUTC=>", forecastData.city.sunrise, "<--sunsetUTC=>", forecastData.city.sunset, "<br>");
    // console.log('forecast data', '<br>');
    // console.log("=====date txt ======= main temp == min == max ===  humidity ==== desc ==== main ====icon",  "<br>");
          // console.log("===>", forecastData.list[i].dt_txt, "<   >", forecastData.list[i].main.temp, "<   >", forecastData.list[i].main.temp_min, "<   >", forecastData.list[i].main.temp_max,  "< ===>", forecastData.list[i].main.humidity, "< == >", forecastData.list[i].weather[0].description, "     =>", forecastData.list[i].weather[0].main, "     =>", forecastData.list[i].weather[0].icon, "< == >"  , iconUrl, "<br>");
//  ********Begin ******************  moved into function getGeoAPIdata
// function useGeotoGetWeather(geoData){
//     console.log(" >>>>> inside storeGeo ", geoData)
//     console.log("geo lat=>", geoData.results[0].geometry.location.lat, "< -geo lng=>", geoData.results[0].geometry.location.lng, "<br>");
//     geoReturnLongitude = geoData.results[0].geometry.location.lng ;
//     geoReturnLatitude = geoData.results[0].geometry.location.lat;
//     weatherApiUrl = "http://api.openweathermap.org/data/2.5/forecast?lat=" + geoReturnLatitude + "&lon=" + geoReturnLongitude + "&appid=" + openKey + "&mode={json}&units=imperial&cnt=40";
//     console.log(weatherApiUrl)
//     //  >>>>>>>>>>>>>>>>> Open Weather API Call 
//     getWeatherAPIdata()
//     .then(response => {
//         console.log('yay');
//     })
//     .catch(error => {
//         console.log('error!');
//         console.error(error);
//     });
// };
//  ********end ******************  moved into function getGeoAPIdata

// this is setup when document is finished loading
$(document).ready(function() {
    // console.log("document ready  >>>>>>>>>>>>>>>>>>>>>>");
    
    // initialize Document
    initDocument();

    $("#currentDay").html(" " + dayjs().format("dddd, MM/DD/YYYY"));

// when the document is ready init the screen and wait for UI
    $("#planner").on("click", function (event) {
        console.log(" >>>>>>>>>document is ready>>>>>>>>>>>>>");


        if (event.target !== event.currentTarget) {
        //   console.log ("event target localName=>", event.target.localName);
        //   console.log ("event target id=>", event.target.id);
        //   console.log ("event=>", event);
        //   if (event.target.localName !== "button") {
            // console.log(event.target.localName, " not = button");
        //   };
        //   if (event.target.localName == "button") {
        //     switch (event.target.id) {
        //     case "btn07":
        //         scheduleLS[0] = $("#appt07").val();
        //         break;
        //     case "btn08":
        //         scheduleLS[1] = $("#appt08").val();
        //         break;
        //     case "btn09":
        //         scheduleLS[2] = $("#appt09").val();
        //         break;
        //     case "btn10":
        //         scheduleLS[3] = $("#appt10").val();
        //         break;
        //     case "btn11":
        //         scheduleLS[4] = $("#appt11").val();
        //         break;
        //     case "btn12":
        //         scheduleLS[5] = $("#appt12").val();
        //         break;
        //     case "btn13":
        //         scheduleLS[6] = $("#appt13").val();
        //         break;
        //     case "btn14":
        //         scheduleLS[7] = $("#appt14").val();
        //         break;
        //     case "btn15":
        //         scheduleLS[8] = $("#appt15").val();
        //         break;
        //     case "btn16":
        //         scheduleLS[9] = $("#appt16").val();
        //         break;
        //     case "btn17":
        //         scheduleLS[10] = $("#appt17").val();
        //         break;
        //     case "btn18":
        //         scheduleLS[11] = $("#appt18").val();
        //         break;
        //     case "btn19":
        //         scheduleLS[12] = $("#appt19").val();
        //         break;
        //     default:
        //         console.log("no button should get here");
        //         console.log(event);
        //         break;
        //   };
        //   };

            localStorage.setItem("schedule", JSON.stringify(scheduleLS));
            // console.log("save to localStorage=>", scheduleLS)
        };
    // stop bubbling
    // event.stopPropagation();
    });
});
