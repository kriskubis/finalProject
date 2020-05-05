"use strict";

//----------------------- FIREBASE -----------------------//
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBaXpDbJvr5P4cyveLlC5SODF_b57LQmcc",
  authDomain: "finalproject-c1daa.firebaseapp.com",
  databaseURL: "https://finalproject-c1daa.firebaseio.com",
  projectId: "finalproject-c1daa",
  storageBucket: "finalproject-c1daa.appspot.com",
  messagingSenderId: "804528166915",
  appId: "1:804528166915:web:127d130559acd85c005636"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const actRef = db.collection("activities");
const scoreRef = db.collection("score");
const titleRef = db.collection("title");
const introRef = db.collection("intro");
const imgRef = db.collection("img");
const distRef = db.collection("dist");
const catRef = db.collection("cat");
const idealRef = db.collection("ideal");
const whyRef = db.collection("why");
const cantRef = db.collection("cant");
const goodRef = db.collection("good");

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
  let acts = snapshotData.docs;
  appendActivities(acts);
});

// append posts to the DOM
function appendActivities(acts) {
  let htmlTemplate = "";
  for (let act of acts) {
    console.log(act.id);
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
    console.log("Return to frontpage");
  }
}