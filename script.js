const apiKey = 'bfb68777b4a3f5ac251acf6477d13c82'; 
function getWeather() {
  const city = document.getElementById("cityInput").value;
  const resultDiv = document.getElementById("weatherDetails");
  const image = document.getElementById("weatherImage");

  if (!city) {
    resultDiv.innerHTML = "Please enter a city name.";
    image.style.display = "none";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error("City not found.");
      return response.json();
    })
    .then(data => {
      const weatherType = data.weather[0].main;

      const icons = {
        Clear: "https://cdn-icons-png.flaticon.com/512/869/869869.png",
        Clouds: "https://cdn-icons-png.flaticon.com/512/1163/1163624.png",
        Rain: "https://cdn-icons-png.flaticon.com/512/414/414974.png",
        Snow: "https://cdn-icons-png.flaticon.com/512/642/642102.png",
        Drizzle: "https://cdn-icons-png.flaticon.com/512/4005/4005901.png",
        Thunderstorm: "https://cdn-icons-png.flaticon.com/512/1146/1146860.png",
        Mist: "https://cdn-icons-png.flaticon.com/512/1779/1779887.png",
        Haze: "https://cdn-icons-png.flaticon.com/512/1197/1197102.png",
        Smoke: "https://cdn-icons-png.flaticon.com/512/4380/4380895.png"
      };

      image.src = icons[weatherType] || "";
      image.style.display = icons[weatherType] ? "inline-block" : "none";

      resultDiv.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
      `;
    })
    .catch(error => {
      resultDiv.innerHTML = error.message;
      image.style.display = "none";
    });
}
