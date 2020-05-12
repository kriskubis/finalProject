const doc = document;

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
  const distRef = db.collection("dist");
  const catRef = db.collection("cat");
  const priceRef = db.collection("price");

//----------------------- FILTER -----------------------//
function filter() {
    // Filter activities based on form

    let who = document.querySelector('input[name="q1"]:checked').value;
    let howFar = document.querySelector('input[name="q3"]:checked').value;
    let budget = document.querySelector('input[name="q4"]:checked').value;
    
    let interests = document.querySelector('input[name="q2a"]:checked').value;

    console.log('Filters: ' + who + ' ' + interests + ' ' + howFar + ' ' + budget)


};