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

//----------------------- FILTER -----------------------//
$("input[type=checkbox]").on("change", function(){
  var arr = []
  $(":checkbox").each(function(){
     if($(this).is(":checked")){
       arr.push($(this).val())
     }
  })
  
  // Save interest filter to local storage
  localStorage.setItem('q2', arr);
})

function filter() {
    // Save remaining filters to local storage
    localStorage.setItem('q1', document.querySelector('input[name="q1"]:checked').value);
    localStorage.setItem('q3', document.querySelector('input[name="q3"]:checked').value);
    localStorage.setItem('q4', document.querySelector('input[name="q4"]:checked').value);

    window.location.pathname = 'tiamoto/result.html'
};