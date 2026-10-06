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
        if (!geoData.results || geoData.results.length === 0){
            resultDiv.innerHTML = "City not found. Try again.";
            return;
        }
        const lat = geoData.results[0].latitude;
        const lon = geoData.results[0].longitude;
        const properCityName = geoData.results[0].name;
        const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
        const weatherResponse = await fetch(weatherURL);
        const weatherData = await weatherResponse.json();
        const temperature = weatherData.current_weather.temperature;
        resultDiv.innerHTML = `
            <p><strong>${properCityName}</strong></p>
            <p>Temperature: ${temperature}°C</p>
        `;
    } catch (error){
        resultDiv.innerHTML = "Something went wrong. Please try again.";
    }
}