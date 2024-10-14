const apiKey = 'ccd0af738ca3c1cbd35a366c56130660';

fetch('cities.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to load cities.json');
        }
        return response.json();
    })
    .then(cities => {
        const cityDropdown = document.getElementById('cityDropdown');
        cities.forEach(city => {
            const option = document.createElement('option');
            option.value = city.name;
            option.text = `${city.name}, ${city.country}`;
            cityDropdown.appendChild(option);
        });
    })
    .catch(error => {
        console.error('Error loading cities:', error);
        alert('Failed to load cities. Please try again later.');
    });

document.getElementById('getWeather').addEventListener('click', () => {
    const city = document.getElementById('cityDropdown').value;
    if (city) {
        fetchWeather(city);
    } else {
        alert("Please select a city from the dropdown");
    }
});

function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('forecastDetails').style.display = 'block';
            document.getElementById('cityName').innerText = `Weather in ${data.name}`;
            document.getElementById('temperature').innerText = `Temperature: ${data.main.temp}°C`;
            document.getElementById('description').innerText = `Description: ${data.weather[0].description}`;
            document.getElementById('humidity').innerText = `Humidity: ${data.main.humidity}%`;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data. Please try again later.');
        });
}
