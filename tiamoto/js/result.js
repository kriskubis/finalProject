// Map API
mapboxgl.accessToken = 'pk.eyJ1IjoibWFpZXZlbiIsImEiOiJjazlsYzZhN2QwMzV3M29xdTF5N3gzM3dwIn0.cvTTAriBgANW9W8N9auz9g';
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/maieven/ck9lcgut327y51inypjxttjkr', // stylesheet location
    center: [10.500,56.380], // starting position [lng, lat]
    zoom: 9 // starting zoom
});

// Expand map
$(function() {
  $("#expand-map").click(function() {
      $(".map").toggleClass("expanded");
      $(".expand").toggleClass("rotate");
  });
});

// Refresh map or it won't fill the div on expand
$(function(){
  $("#expand-map").click(function() {
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/maieven/ck9lcgut327y51inypjxttjkr',
      center: [10.500,56.380],
      zoom: 9
    });
  });
})

// ADD ACTIVITIES TO DOM USING FETCH
fetch('json/activities.json')
.then(function(response) {
  return response.json();
  })

  .then(json => {
    console.log(json);
    appendActivities(json.activities);
  });

  function appendActivities(activities) {
  for (let activity of activities) {
    activityGrid.innerHTML += `
       <article class="activityCard" onClick="document.getElementById('return').innerHTML = '<h4>Go back</h4>'; 
        document.getElementById('activityGrid').classList.add('hidden');
        document.getElementById('result-lead').classList.add('hidden'); 
        document.getElementById('first-column').style.width = '70%';
        document.getElementById('first-column').style.margin = '0';
        document.getElementById('second-column').innerHTML = '(Practical info will be here)';
        document.getElementById('page-title').innerHTML = '${activity.title}';
        document.getElementById('page-info').innerHTML = '<div><p>${activity.intro}</p><br><h5>Ideal for</h5><p>${activity.ideal}</p></div><div><h5>Why we like it</h5><p>${activity.why}</p><br><h5>Do not miss</h5><p>${activity.cant}</p><br><h5>Good to know</h5><p>${activity.good}</p></div>';" 
         style="background-image: url('uploads/${activity.img}');">
          <div class="card-head">
            <h4>${activity.title}</h4>
            <h5>Open<br>${activity.dist} km</h5>
          </div>
          <div class="card-description">
            <h6>${activity.title}</h6>
            <p>${activity.intro}</p>
          </div>
          <div class="${activity.cat}-bg card-btn">
          <img src="media/plus.svg" alt="read more" style="width: 80%; padding: 10%; color: black;">
          </div>
        </article>
      `;
  }
}

// Change site content to show activity and change button functionality
function returnBtn() {
  let cards = document.querySelector('#activityGrid')

  if (cards.classList.contains('hidden')) {
    console.log("Return to activities");
    document.getElementById('activityGrid').classList.remove('hidden');
    document.getElementById('result-lead').classList.remove('hidden');
    document.getElementById('first-column').style.width = '45%';
    document.getElementById('first-column').style.margin = '0 25% 0 0';
    document.getElementById('page-title').innerHTML = 'Recommendations';
    document.getElementById('page-info').innerHTML = '<p>We’ve listed our top picks based on your answers below.<br><br>Don’t like what you see? You can start over and choose new categories.</p>';
    document.getElementById('page-title').innerHTML = '<div style="float: right; width: 10%;"><div class="cat-colour"></div><div class="cat-colour"></div><div class="cat-colour"></div><div class="cat-colour"></div><div class="cat-colour"></div><div class="cat-colour"></div></div><div style="float: right; width: 90%;"><p>Dining Out</p><p>Exploring the City</p><p>Relaxed Outdoor Activities</p><p>Amusement</p><p>Learning / Sightseeing</p><p>Active</p></div'; 
  } else {
    console.log("Return to frontpage");
  }
}