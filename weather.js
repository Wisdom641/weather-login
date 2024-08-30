const apiKey ="9383c7c7472b43555fb23154a0ef2664"; 
const apiUrl ="https://api.openweathermap.org/data/2.5/weather";


const locationInput = document.getElementById("locationInput");
const searchButton = document.getElementById("searchButton");
const locationElement = document.getElementById("location");
const temperatureElement = document.getElementById("temperature");
const descriptionElement = document.getElementById("description");
const weatherIcon = document.getElementById("weather-icon");
const humidityElement = document.getElementById("humidity");
const windElement = document.getElementById("wind");

searchButton.addEventListener("click", () => {
    const location = locationInput.value;
    if (location){
        fetchWeather(location);
    } else {
        alert("Please enter a location.")
    }
});

function fetchWeather(location){
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Weather data not available for this location.");
            } 
            return response.json();
        })
        .then(data => {
            
            locationElement.textContent = data.name;
            temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
            descriptionElement.textContent = data.weather[0].description;
            humidityElement.textContent = data.main.humidity + "%";
            windElement.textContent = data.wind.speed + " Km/h";
            
            if (data.weather[0].main == "Clouds"){
                weatherIcon.src = "images/cloudy.png";
            }
            else if(data.weather[0].main == "Clear"){
                weatherIcon.src = "images/clear.png";
            }
            else if(data.weather[0].main == "Rain"){
                weatherIcon.src = "images/rain icon.png";
            }
            else if(data.weather[0].main == "Mist"){
                weatherIcon.src = "images/mist.webp";
            }
            else if(data.weather[0].main == "Snow"){
                weatherIcon.src = "images/snow.webp";
            }
            else if(data.weather[0].main == "Drizzle"){
                weatherIcon.src = "images/drizzle1.jpg";
            }
            
            document.querySelector(".weather_info").style.display = "block";
        })
        

        .catch(error => {
            console.error("Error fetching weather data: ", error);
            locationElement.textContent = "Location not found";
            temperatureElement.textContent = "--";
            descriptionElement.textContent = "N/A";
            humidityElement.textContent = "--";
            windElement.textContent = "--";
            weatherIcon.src = "images/default-weather.png";
       });
}