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
        console.log(json);
        
        let weather = json.current.weather_descriptions;
        console.log(weather);

        if (weather == "Sunny") {
          document.getElementById('weather').style.backgroundImage = "url('media/sunny.jpeg')";
          console.log("The weather is " + weather)
        } else if (weather == "Partly cloudy") {
          document.getElementById('weather').style.backgroundImage = "url('media/partly-cloudy.jpeg')";
          console.log("The weather is " + weather)
        } else if (weather == "Overcast") {
          document.getElementById('weather').style.backgroundImage = "url('media/cloudy.jpeg')";
          console.log("The weather is " + weather)
        } else {
          document.getElementById('weather').style.backgroundImage = "url('media/partly-cloudy.jpeg')";
          console.log("The weather is " + weather)
        };
        
      });
  
  });