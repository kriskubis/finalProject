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
    zoom: 9, // starting zoom
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
  map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/maieven/ck9lcgut327y51inypjxttjkr',
      center: [10.500,56.380],
      zoom: 9
    });
  });
})

//----------------------- SEND TO MAIL -----------------------//
// Get the modal
var modal = document.getElementById("mailModal");

// Get the button that opens the modal
var btn = document.getElementById("mailBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

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
      var budgetLength = budget.length;
      var price = act.data().price;
      var priceLength = price.length;

      // Converte category from string to array (Passed as string to Firebase by default)
      var category = act.data().cat;
      var catArray = category.split();

      // Use address to get direction from Google
      var street = act.data().street;
      var streetSep = street.split(' ').join('+'); // Swap spaces with plus sign
      var direction = 'www.google.com/maps/dir//' + streetSep + ',' + act.data().postal + ',' + act.data().city;

      //----------------------- HOURS - OPEN / CLOSED -----------------------//
      currentDate = new Date()
      weekday = currentDate.toString().substring(0,3).toLowerCase() // mon, tue, wed ...

      if (weekday == 'mon') {
        var startTime = act.data().monO + ':00';
        var endTime = act.data().monC + ':00';

      } else if (weekday == 'tue') {
        var startTime = act.data().tueO + ':00';
        var endTime = act.data().tueC + ':00';

      } else if (weekday == 'wed') {
        var startTime = act.data().wedO + ':00';
        var endTime = act.data().wedC + ':00';

      } else if (weekday == 'thu') {
        var startTime = act.data().tueO + ':00';
        var endTime = act.data().tueC + ':00';

      } else if (weekday == 'fri') {
        var startTime = act.data().friO + ':00';
        var endTime = act.data().friC + ':00';

      } else if (weekday == 'sat') {
        var startTime = act.data().satO + ':00';
        var endTime = act.data().satC + ':00';
        
      } else if (weekday == 'sun') {
        var startTime = act.data().sunO + ':00';
        var endTime = act.data().sunC + ':00';

      }

      startDate = new Date(currentDate.getTime());
      startDate.setHours(startTime.split(":")[0]);
      startDate.setMinutes(startTime.split(":")[1]);
      startDate.setSeconds(startTime.split(":")[2]);

      endDate = new Date(currentDate.getTime());
      endDate.setHours(endTime.split(":")[0]);
      endDate.setMinutes(endTime.split(":")[1]);
      endDate.setSeconds(endTime.split(":")[2]);

      isOpen = startDate < currentDate && endDate > currentDate

      if (isOpen == true) {
        var openClosed = 'Open';
      } else {
        var openClosed = 'Closed';
      }

    //----------------------- HTML TEMPLATES -----------------------//
    // If statement will filter by the search saved in local storage (see in console)
    if ((whoAre == 'challenged') && (act.data().friendly == 'yes') && (catArray.some(r=> interests.indexOf(r) >=0)) && (distNumber <= howFar) && (priceLength <= budgetLength)) {
      console.log('"' + act.data().title + '" is applicable for this search.')

      htmlTemplate += `
      <article class="activityCard" onClick="
        var latitude = ${act.data().lat};
        var longitude = ${act.data().lng};

        new mapboxgl.Map({
          container: 'minimap',
          style: 'mapbox://styles/maieven/ck9lcgut327y51inypjxttjkr',
          center: {lat: latitude, lng: longitude},
          zoom: 14,
          interactive: false
        });
        window.scrollTo(0, 0);
        document.getElementById('return').innerHTML = '<h4>Go back</h4>'; 
        document.getElementById('activityGrid').classList.add('hidden');
        document.getElementById('result-lead').classList.add('hidden');
        document.getElementById('first-column').classList.add('first-column-act');
        document.getElementById('return-div').style.width = '100%';
        document.getElementById('expand-map').classList.add('hidden');
        document.getElementById('map').classList.add('hidden');
        document.getElementById('banner').style.backgroundImage = 'url(uploads/${act.data().img})';
        document.getElementById('mailBtn').classList.remove('hidden');
        document.getElementById('sendMail').href = 'mailto:${usermail}?subject=${act.data().title}&body=${act.data().street}%0D%0A${act.data().postal}%0D%0A${act.data().city}';
        document.getElementById('webBtn').classList.remove('hidden');
        document.getElementById('webBtn').href = '${act.data().web}';
        document.getElementById('info-wrapper').classList.remove('hidden');
        document.getElementById('categories-wrapper').classList.add('hidden');
        document.getElementById('mon').innerHTML = '${act.data().monO} - ${act.data().monC}';
        document.getElementById('tue').innerHTML = '${act.data().tueO} - ${act.data().tueC}';
        document.getElementById('wed').innerHTML = '${act.data().wedO} - ${act.data().wedC}';
        document.getElementById('thu').innerHTML = '${act.data().thuO} - ${act.data().thuC}';
        document.getElementById('fri').innerHTML = '${act.data().friO} - ${act.data().friC}';
        document.getElementById('sat').innerHTML = '${act.data().satO} - ${act.data().satC}';
        document.getElementById('sun').innerHTML = '${act.data().sunO} - ${act.data().sunC}';
        document.getElementById('getDirection').href = 'https:${direction}';
        document.getElementById('mailBtn').href = '${act.data().web}';
        document.getElementById('webBtn').href = '${act.data().web}';
        document.getElementById('comment').innerHTML = '${act.data().comment}';
        document.getElementById('street').innerHTML = '${act.data().street}';
        document.getElementById('postal').innerHTML = '${act.data().postal}';
        document.getElementById('city').innerHTML = '${act.data().city}';
        document.getElementById('page-title').innerHTML = '${act.data().title}';
        document.getElementById('dist-price').innerHTML = 'Distance: ${act.data().dist} km<br>Price class: ${act.data().price}';
        document.getElementById('page-info').innerHTML = '<div><p>${act.data().intro}</p><br><h5>Ideal for</h5><p>${act.data().ideal}</p><br><h5>Why we like it</h5><p>${act.data().why}</p><br></div><div><h5>Do not miss</h5><p>${act.data().cant}</p><br><h5>Good to know</h5><p>${act.data().good}</p></div>';" 
        style="background-image: url('uploads/${act.data().img}');">
        <div class="card-head">
          <h4>${act.data().title}</h4>
          <h5>${openClosed}<br>${act.data().dist} km</h5>
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
    } else if ((act.data().aud == whoAre) && (catArray.some(r=> interests.indexOf(r) >=0)) && (distNumber <= howFar) && (priceLength <= budgetLength)) {
      console.log('"' + act.data().title + '" is applicable for this search.')

      htmlTemplate += `
      <article class="activityCard" onClick="
        var latitude = ${act.data().lat};
        var longitude = ${act.data().lng};

        new mapboxgl.Map({
          container: 'minimap',
          style: 'mapbox://styles/maieven/ck9lcgut327y51inypjxttjkr',
          center: {lat: latitude, lng: longitude},
          zoom: 14,
          interactive: false
        });
        window.scrollTo(0, 0);
        document.getElementById('return').innerHTML = '<h4>Go back</h4>'; 
        document.getElementById('activityGrid').classList.add('hidden');
        document.getElementById('result-lead').classList.add('hidden');
        document.getElementById('first-column').classList.add('first-column-act');
        document.getElementById('return-div').style.width = '100%';
        document.getElementById('expand-map').classList.add('hidden');
        document.getElementById('map').classList.add('hidden');
        document.getElementById('banner').style.backgroundImage = 'url(uploads/${act.data().img})';
        document.getElementById('mailBtn').classList.remove('hidden');
        document.getElementById('sendMail').href = 'mailto:${usermail}?subject=${act.data().title}&body=${act.data().street}%0D%0A${act.data().postal}%0D%0A${act.data().city}';
        document.getElementById('webBtn').classList.remove('hidden');
        document.getElementById('webBtn').href = '${act.data().web}';
        document.getElementById('info-wrapper').classList.remove('hidden');
        document.getElementById('categories-wrapper').classList.add('hidden');
        document.getElementById('mon').innerHTML = '${act.data().monO} - ${act.data().monC}';
        document.getElementById('tue').innerHTML = '${act.data().tueO} - ${act.data().tueC}';
        document.getElementById('wed').innerHTML = '${act.data().wedO} - ${act.data().wedC}';
        document.getElementById('thu').innerHTML = '${act.data().thuO} - ${act.data().thuC}';
        document.getElementById('fri').innerHTML = '${act.data().friO} - ${act.data().friC}';
        document.getElementById('sat').innerHTML = '${act.data().satO} - ${act.data().satC}';
        document.getElementById('sun').innerHTML = '${act.data().sunO} - ${act.data().sunC}';
        document.getElementById('getDirection').href = 'https:${direction}';
        document.getElementById('mailBtn').href = '${act.data().web}';
        document.getElementById('webBtn').href = '${act.data().web}';
        document.getElementById('comment').innerHTML = '${act.data().comment}';
        document.getElementById('street').innerHTML = '${act.data().street}';
        document.getElementById('postal').innerHTML = '${act.data().postal}';
        document.getElementById('city').innerHTML = '${act.data().city}';
        document.getElementById('page-title').innerHTML = '${act.data().title}';
        document.getElementById('dist-price').innerHTML = 'Distance: ${act.data().dist} km<br>Price class: ${act.data().price}';
        document.getElementById('page-info').innerHTML = '<div><p>${act.data().intro}</p><br><h5>Ideal for</h5><p>${act.data().ideal}</p><br><h5>Why we like it</h5><p>${act.data().why}</p><br></div><div><h5>Do not miss</h5><p>${act.data().cant}</p><br><h5>Good to know</h5><p>${act.data().good}</p></div>';" 
        style="background-image: url('uploads/${act.data().img}');">
        <div class="card-head">
          <h4>${act.data().title}</h4>
          <h5>${openClosed}<br>${act.data().dist} km</h5>
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
    document.getElementById('page-title').innerHTML = 'Recommendations';
    document.getElementById('dist-price').innerHTML = '';
    document.getElementById('page-info').innerHTML = '<p>We’ve listed our top picks based on your answers below.<br><br>Don’t like what you see? You can start over and choose new categories.</p>';
    document.getElementById('return').innerHTML = '<h4>Try again</h4>'; 
    document.getElementById('activityGrid').classList.remove('hidden');
    document.getElementById('expand-map').classList.remove('hidden');
    document.getElementById('map').classList.remove('hidden');
    document.getElementById('result-lead').classList.remove('hidden');
    document.getElementById('first-column').classList.remove('first-column-act');
    document.getElementById('categories-wrapper').classList.remove('hidden');
    document.getElementById('info-wrapper').classList.add('hidden');
    document.getElementById('mailBtn').classList.add('hidden');
    document.getElementById('webBtn').classList.add('hidden');
    map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/maieven/ck9lcgut327y51inypjxttjkr',
      center: [10.500,56.380],
      zoom: 9
    });
  } else {
    window.location.pathname = 'tiamoto/index.html';
  }
}

function returnFront(){
  window.location.href = '../index.html';
}