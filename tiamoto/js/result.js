//----------------------- LOCAL STORAGE -----------------------//
var whoAre = [];
var interests = [];
var howFar = [];
var budget = [];

function localStorageCheck() {
  // Search
  whoAre = localStorage.getItem('q1');
  interests = localStorage.getItem('q2');
  howFar = localStorage.getItem('q3');
  budget = localStorage.getItem('q4');

  console.log('In local storage: ' + whoAre + ', ' + interests + ', ' + howFar + ', ' + budget);
}

localStorageCheck();

//----------------------- MAPBOX -----------------------//
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

//----------------------- ADD ACTIVITIES TO DOM -----------------------//
actRef.orderBy("score","desc").onSnapshot(function(snapshotData) {
  // Add .limit(10) after actRef.orderBy("score","desc") to limit entries.
  let acts = snapshotData.docs;
  appendActivities(acts);
});

// append posts to the DOM
function appendActivities(acts) {
  let htmlTemplate = "";
  for (let act of acts) {
      
      // Converte distance from string to number (Passed as string to Firebase by default)
      var distance = act.data().dist;
      var distNumber = parseInt(distance, 10);

      // Converte dollars to number (Passed as string to Firebase by default)
      var howFarLength = howFar.length;
      var price = act.data().price;
      var priceLength = price.length;

      // Converte category from string to array (Passed as string to Firebase by default)
      var category = act.data().cat;
      var catArray = category.split();

    // If statement will filter by the search saved in local storage (see in console)
    if ((whoAre == 'challenged') && (act.data().friendly == 'yes') && (catArray.some(r=> interests.indexOf(r) >=0)) && (distNumber <= howFar) && (priceLength <= howFarLength)) {
      console.log('"' + act.data().title + '" is applicable for this search.')

      htmlTemplate += `
      <article class="activityCard" onClick="document.getElementById('return').innerHTML = '<h4>Go back</h4>'; 
        document.getElementById('activityGrid').classList.add('hidden');
        document.getElementById('result-lead').classList.add('hidden'); 
        document.getElementById('first-column').style.width = '70%';
        document.getElementById('first-column').style.margin = '0';
        document.getElementById('return-div').style.width = '100%';
        document.getElementById('second-column').innerHTML = '(Practical info will be here)';
        document.getElementById('page-title').innerHTML = '${act.data().title}';
        document.getElementById('page-info').innerHTML = '<div><p>${act.data().intro}</p><br><h5>Ideal for</h5><p>${act.data().ideal}</p><br><h5>Why we like it</h5><p>${act.data().why}</p><br></div><div><h5>Do not miss</h5><p>${act.data().cant}</p><br><h5>Good to know</h5><p>${act.data().good}</p></div>';" 
        style="background-image: url('uploads/${act.data().img}');">
        <div class="card-head">
          <h4>${act.data().title}</h4>
          <h5>Open<br>${act.data().dist} km</h5>
        </div>
        <div class="card-description">
          <h6>${act.data().title}</h6>
          <p>${act.data().intro}</p>
        </div>
        <div class="${act.data().cat}-bg card-btn">
        <img src="media/plus.svg" alt="read more" style="width: 80%; padding: 10%; color: black;">
        </div>
      </article>        
      `;
    } else if ((act.data().aud == whoAre) && (catArray.some(r=> interests.indexOf(r) >=0)) && (distNumber <= howFar) && (priceLength <= howFarLength)) {
      console.log('"' + act.data().title + '" is applicable for this search.')

      htmlTemplate += `
      <article class="activityCard" onClick="document.getElementById('return').innerHTML = '<h4>Go back</h4>'; 
        document.getElementById('activityGrid').classList.add('hidden');
        document.getElementById('result-lead').classList.add('hidden'); 
        document.getElementById('first-column').style.width = '70%';
        document.getElementById('first-column').style.margin = '0';
        document.getElementById('return-div').style.width = '100%';
        document.getElementById('second-column').innerHTML = '(Practical info will be here)';
        document.getElementById('page-title').innerHTML = '${act.data().title}';
        document.getElementById('page-info').innerHTML = '<div><p>${act.data().intro}</p><br><h5>Ideal for</h5><p>${act.data().ideal}</p><br><h5>Why we like it</h5><p>${act.data().why}</p><br></div><div><h5>Do not miss</h5><p>${act.data().cant}</p><br><h5>Good to know</h5><p>${act.data().good}</p></div>';" 
        style="background-image: url('uploads/${act.data().img}');">
        <div class="card-head">
          <h4>${act.data().title}</h4>
          <h5>Open<br>${act.data().dist} km</h5>
        </div>
        <div class="card-description">
          <h6>${act.data().title}</h6>
          <p>${act.data().intro}</p>
        </div>
        <div class="${act.data().cat}-bg card-btn">
        <img src="media/plus.svg" alt="read more" style="width: 80%; padding: 10%; color: black;">
        </div>
      </article>        
      `;
    }


  }
  document.querySelector('#activityGrid').innerHTML = htmlTemplate;
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
    document.getElementById('second-column').innerHTML = '<div style="float: right; width: 10%;"><div class="cat-colour"></div><div class="cat-colour"></div><div class="cat-colour"></div><div class="cat-colour"></div><div class="cat-colour"></div><div class="cat-colour"></div></div><div style="float: right; width: 90%;"><p>Dining Out</p><p>Exploring the City</p><p>Relaxed Outdoor Activities</p><p>Amusement</p><p>Learning / Sightseeing</p><p>Active</p></div'; 
  } else {
    window.location.pathname = 'tiamoto/index.html';
  }
}