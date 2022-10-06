// var apiUrl = 'https://api.github.com/users/' + user + '/repos';
var todayYYMMDD = dayjs().format("YYYYMMDD");

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
// cnt= the number of timestamps
// units = units of measurements returned (standard-is Kelvin)
var weatherApiUrl = "http://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + openKey + "&mode={json}&units=imperial&cnt=8";
http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
// assumption: requested imperial as units if measure 
// assumption: requested 40 count = 5 days 
// data layout is by location
//  location contains an array of 3-hour spans of data and then the location information
var forecastData =[];
var iconCode = "01d";
var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
var locationLS = [{
    location: "",
    country: "",
    longitude: 0,
    latitude
    }];
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

function    tempMinMax () {
    // find the lowest and highest temps per day (upto 8-3hr items)
};


function storeGeo(geoData){
    document.write('geo data received');
    document.write('<br>');
    console.log(">>geoData<<", geoData);
    document.write(typeof geoData);
    document.write('<br>');
    // document.write('core object (housekeeping)', '<br>');
    document.write("geo lat=>", geoData.results[0].geometry.location.lat, "< -geo lng=>", geoData.results[0].geometry.location.lng, "<br>");
    geoReturnLongitude = geoData.results[0].geometry.location.lng ;
    geoReturnLatitude = geoData.results[0].geometry.location.lat;
    weatherApiUrl = "http://api.openweathermap.org/data/2.5/forecast?lat=" + geoReturnLatitude + "&lon=" + geoReturnLongitude + "&appid=" + openKey + "&mode={json}&units=imperial&cnt=8";
};


function displayForecast(forecastData){
    document.write('weather data received');
    document.write('<br>');
    console.log(">>forecastData<<", forecastData);
    document.write(typeof forecastData);
    document.write('<br>');
    document.write('core object (housekeeping)', '<br>');
    document.write("cod=>", forecastData.cod, '--MSG=>', forecastData.message,"--cnt=>", forecastData.cnt, '<br>');
    document.write("city header info > name=> ", forecastData.city.name, "--country=> ", forecastData.city.country,"<--lon=> ", forecastData.city.coord.lon, "<--lat=> ", forecastData.city.coord.lat,"<--sunriseUTC=> ", forecastData.city.sunrise, "<--sunsetUTC=> ", forecastData.city.sunset, "<br>");
    document.write('forecast data', '<br>');
    document.write("=====date txt ======= main temp == min == max ===  humidity ==== desc ==== main ====icon",  "<br>");
    storeCityLS ();
    for(var i=0; i<forecastData.list.length;i++){
        iconCode = forecastData.list[i].weather[0].icon;
        iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
        tempMinMax();
        document.write("===>", forecastData.list[i].dt_txt, "<   >", forecastData.list[i].main.temp, "<   >", forecastData.list[i].main.temp_min, "<   >", forecastData.list[i].main.temp_max,  "< ===>", forecastData.list[i].main.humidity, "< == >", forecastData.list[i].weather[0].description, "     =>", forecastData.list[i].weather[0].main, "     =>", forecastData.list[i].weather[0].icon, "< == >"  , iconUrl, "<br>");
    };
};
function storeCityLS () {
    // search LS array for current city
    //  if not found  
    //   push to locale storage
}


callGeoAPI()
.then(response => {
  console.log('yay geo');
})
.catch(error => {
    console.log('error geo!');
    console.error(error);
});

async function callGeoAPI() {
    const response = await fetch(geoApiUrl);
    const geoData = await response.json();
    console.log(">>geoData<<", geoData);
    storeGeo(geoData);
}

callWeatherAPI()
.then(response => {
  console.log('yay');
})
.catch(error => {
    console.log('error!');
    console.error(error);
});

async function callWeatherAPI() {
    const response = await fetch(weatherApiUrl);
    const forecastData = await response.json();
    console.log(">>forecastData<<", forecastData);
    displayForecast(forecastData);
};

  $("#currentDate").html("Today is " + dayjs().format("dddd, MM/DD/YYYY"));
  var utcTime = dayjs('1664885779').format("HH:mm")
  console.log(utcTime)