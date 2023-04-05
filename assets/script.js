const apiKey = 'ba8be1421b27077c61c5e9ec57f68e6d'; 
const city = 'New York'; 


fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    const { lat, lon } = data[0]; 

    
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        const forecastData = data.daily; 

        
        forecastData.forEach(forecast => {
          const date = new Date(forecast.dt * 1000); 
          const temp = forecast.temp.day; 
          const icon = forecast.weather[0].icon;

          
          const forecastCard = document.createElement('div');
          forecastCard.className = 'p-4 bg-gray-100 text-center';
          forecastCard.innerHTML = `
            <p class="text-lg">${date.toLocaleDateString()}</p>
            <img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon" class="mx-auto my-2">
            <p class="text-lg">${temp} &#8451;</p>
          `;


          document.getElementById('forecast-container').appendChild(forecastCard);
        });
      })
      .catch(error => console.error(error));
  })
  .catch(error => console.error(error));