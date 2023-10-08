console.log("hello from javascript");

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

searchForm.addEventListener('submit', (event) =>{
    event.preventDefault();
});

searchBtn.addEventListener('click', async () =>{
    if(searchInput.value === "") return
    console.log("Search Button clicked");

    const weatherData = await getweatherData(searchInput.value);
    viewWeather(weatherData);

})

async function getweatherData(city){
    const endpoint = `https://api.weatherapi.com/v1/current.json?key=73fe2259e7bf4c71805105425230810&q=${city}&aqi=yes`;
    const weatherResponse =  await fetch(endpoint, {mode: "cors"});

    const weatherData = await weatherResponse.json();
    
    return weatherData;
}

function viewWeather(data){
    console.log("Data:", data);
    const searchResult = document.getElementById("searchResult");
    searchResult.classList.add("active");

    const cityName = document.getElementById("cityName");
    const temperature = document.getElementById("temperature");
    const feelsLike = document.getElementById("feelsLike");
    const humidity = document.getElementById("humidity");
    const wind = document.getElementById("wind");

    cityName.textContent = `City: ${data.location.name}`;
    temperature.textContent = `Temperature: ${data.current.condition.text}`;
    feelsLike.textContent = `Feels Like: ${data.current.feelslike_c} C`;
    humidity.textContent = `Humidity : ${data.current.humidity}`;
    wind.textContent = `Wind: ${data.current.wind_kph} Kph`;

    searchResult.appendChild(cityName);
    searchResult.appendChild(temperature);
    searchResult.appendChild(feelsLike);
    searchResult.appendChild(humidity);
    searchResult.appendChild(wind);
}