// var apiUrl = 'https://api.github.com/users/' + user + '/repos';
var geoKey = "AIzaSyBzUZm38CUd6AtsYcewUaQwnKUnZPMI7mg";

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
var dataLayout =[{
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
    for(var i=0; i<forecastData.list.length;i++){
        iconCode = forecastData.list[i].weather[0].icon;
        document.write("===>", forecastData.list[i].dt_txt, "<   >", forecastData.list[i].main.temp, "<   >", forecastData.list[i].main.temp_min, "<   >", forecastData.list[i].main.temp_max,  "< ===>", forecastData.list[i].main.humidity, "< == >", forecastData.list[i].weather[0].description, "     =>", forecastData.list[i].weather[0].main, "     =>", forecastData.list[i].weather[0].icon, "< == >"  , iconUrl, "<br>");
    };
 };




// fetch(weatherApiUrl)
//   .then(function (response) {
//     if (response.ok) {
//         response.json().then(function (data) {
//         displayForecast(data);
//       });
//     } else {
//     // redirect to error1.html
//       alert('Error: ' + response.statusText);
//     }
//   })
//   .catch(function (error) {
//     alert('Unable to connect to OpenWeather');
//   });

callAPI()
.then(response => {
  console.log('yay');
})
.catch(error => {
    console.log('error!');
    console.error(error);
});

async function callAPI() {
    const response = await fetch(weatherApiUrl);
    const forecastData = await response.json();
    console.log(">>forecastData<<", forecastData);
    displayForecast(forecastData);
}

  $("#currentDate").html("Today is " + dayjs().format("dddd, MM/DD/YYYY"));
  var utcTime = dayjs('1664885779').format("HH:mm")
  console.log(utcTime)