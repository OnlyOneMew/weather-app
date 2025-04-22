const apiKey = "6b226a3161190d43ac111e96468c461b";
const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector('.search-btn');
const weatherResult = document.querySelector("#weather-result");

searchBtn.addEventListener("click", function (event) {
    event.preventDefault()
    const cityName = cityInput.value.trim();

    if (cityName === "") {
        weatherResult.innerHTML = "<p>Please,enter city name.</p>"
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&lang=en`)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found")
            }
            return response.json()
        })
        .then(data => {
            const weatherDescription = data.weather[0].description;
            const temperature = data.main.temp - 273.15
            const iconCode = data.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;


            weatherResult.innerHTML = `
            <h2>Weather Forcast</h2>
            <img src="${iconUrl}" alt="Weather icon">
            <p>Description of the weather: ${weatherDescription}</p>
            <p>Temperature: ${temperature.toFixed(2)}°C</p>
            `;
        })
        .catch(error => {
            weatherResult.innerHTML = `<p>Error...: ${error.message}</p>`;
        })

});

