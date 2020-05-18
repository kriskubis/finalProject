// Made with https://weatherstack.com/ API

document.addEventListener("DOMContentLoaded", function() {

  const url = 'http://api.weatherstack.com/current';
  const key = '00936ff3c9d9b955dfc75bd662098cc5';
  let query = 'Grenaa';

  fetch(`${url}?access_key=${key}&query=${query}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {

      let weather = json.current.weather_descriptions;
      console.log(weather);

      if (weather == "Sunny") {
        document.getElementById('weather').style.backgroundImage = "url('media/sunny.jpeg')";
      } else if (weather == "Partly Cloudy") {
        document.getElementById('weather').style.backgroundImage = "url('media/partly-cloudy.jpeg')";
      } else if (weather == "Overcast") {
        document.getElementById('weather').style.backgroundImage = "url('media/overcast.jpeg')";
      } else if (weather == "Light Drizzle") {
        document.getElementById('weather').style.backgroundImage = "url('media/light-drizzle.jpeg')";
      } else if (weather == "Light Rain Shower") {
        document.getElementById('weather').style.backgroundImage = "url('media/light-drizzle.jpeg')";
      } else if (weather == "Rain") {
        document.getElementById('weather').style.backgroundImage = "url('media/overcast.jpeg')";
      } else {
        document.getElementById('weather').style.backgroundImage = "url('media/partly-cloudy.jpeg')";
      }
      
    });

});