document.getElementById("weather-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const city = document.getElementById("city-input").value.trim();
    const apiKey = "bf98a272d9a3f035bcf7de0dd183c2cb"; // Ensure this is your valid OpenWeatherMap API key

    if (city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data); // Log the entire API response for debugging
                
                // Check if the response contains valid weather data
                if (data.cod === 200) {  // 200 means success
                    const weatherInfo = `
                        <h2>Weather in ${data.name}</h2>
                        <p>Temperature: ${data.main.temp}°C</p>
                        <p>Weather: ${data.weather[0].description}</p>
                        <p>Humidity: ${data.main.humidity}%</p>
                    `;
                    document.getElementById("weather-info").innerHTML = weatherInfo;
                } else {
                    // Display error message from the API if cod is not 200 (e.g., city not found)
                    document.getElementById("weather-info").innerHTML = `<p>Error: ${data.message}</p>`;
                }
            })
            .catch(error => {
                document.getElementById("weather-info").innerHTML = `<p>Error fetching weather data: ${error.message}</p>`;
                console.error("Error fetching weather data:", error);
            });
    } else {
        document.getElementById("weather-info").innerHTML = `<p>Please enter a city name.</p>`;
    }
});
