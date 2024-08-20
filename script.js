
document.getElementById('cityInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        getWeatherData();
    }
});

function getWeatherData() {
    const city = document.getElementById('cityInput').value;
    const apiKey = 'ade2268e2774804297cfe5deab77f1bd';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === "404") {
                alert('City not found! Please enter a valid city name.');
                return;
            }

            document.getElementById('cityName').innerText = data.name;
            document.getElementById('temperature').innerText = `Temperature: ${data.main.temp}°C`;
            document.getElementById('description').innerText = `Description: ${data.weather[0].description}`;

            const weatherIcon = document.getElementById('icon').querySelector('i');
            const weatherMain = data.weather[0].main.toLowerCase();

            if (weatherMain.includes('cloud')) {
                weatherIcon.className = 'fas fa-cloud';
            } else if (weatherMain.includes('rain')) {
                weatherIcon.className = 'fas fa-cloud-showers-heavy';
            } else if (weatherMain.includes('clear')) {
                weatherIcon.className = 'fas fa-sun';
            } else if (weatherMain.includes('night')) {
                weatherIcon.className = 'fas fa-moon';
            } else {
                weatherIcon.className = 'fas fa-cloud-sun';
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data! Please try again.');
        });
}
