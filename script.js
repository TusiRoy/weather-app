const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchbtn");
const resultDiv = document.getElementById("result");
searchBtn.addEventListener("click", function (){
    const cityName = cityInput.value;
    if (cityName === ""){
        resultDiv.innerHTML = "Please enter a city name.";
        return;
    }
    getWeather(cityName);
});
async function getWeather(city){
    resultDiv.innerHTML = "Loading...";
    try{
        const geoURL = `https://geocoding-api.open-meteo.com/v1/search?name=${city}`;
        const geoResponse = await fetch(geoURL);
        const geoData = await geoResponse.json();
    }
