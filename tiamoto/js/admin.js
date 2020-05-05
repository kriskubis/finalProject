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
  const activities = db.collection("activities");

  //----------------------- SINGLE-PAGE FUNCTIONALITY -----------------------//
  // Change active button (the colour green) with jQuery
  $(function() {
    $(".btn").click(function() {
        $(".btn").removeClass("btn-active");
        $(this).addClass("btn-active");
    });
  });

  // Hide and show sections
  $(function() {
    $("#addBtn").click(function() {
        $("#admin-title").text("Adding new activity");
        $("#edit").addClass("hidden");
        $("#imgUpload").addClass("hidden");
        $("#add").removeClass("hidden");
    });
  });

  $(function() {
    $("#editBtn").click(function() {
        $("#admin-title").text("Editing existing activity");
        $("#add").addClass("hidden");
        $("#imgUpload").addClass("hidden");
        $("#edit").removeClass("hidden");
    });
  });

  $(function() {
    $("#imgBtn").click(function() {
        $("#admin-title").text("Uploading new image");
        $("#add").addClass("hidden");
        $("#edit").addClass("hidden");
        $("#imgUpload").removeClass("hidden");
    });
  });

  //----------------------- ADD NEW ACTIVITY -----------------------//
  $("#pushData").click(function(){
    // Fields
    let title = document.querySelector('#title').value;
    let cat = document.querySelector('input[name="cat"]:checked').value;
    let price = document.querySelector('input[name="price"]:checked').value;
    let indoors = document.querySelector('input[name="indoors"]:checked').value;
    let dist = document.querySelector('#dist').value;;
    let intro = document.querySelector('#intro').value;
    let ideal = document.querySelector('#ideal').value;
    let why = document.querySelector('#why').value;
    let cant = document.querySelector('#cant').value;
    let good = document.querySelector('#good').value;
    let monO = document.querySelector('#monO').value;
    let monC = document.querySelector('#monC').value;
    let tueO = document.querySelector('#tueO').value;
    let tueC = document.querySelector('#tueC').value;
    let wenO = document.querySelector('#wenO').value;
    let wenC = document.querySelector('#wenC').value;
    let thuO = document.querySelector('#thuO').value;
    let thuC = document.querySelector('#thuC').value;
    let friO = document.querySelector('#friO').value;
    let friC = document.querySelector('#friC').value;
    let satO = document.querySelector('#satO').value;
    let satC = document.querySelector('#satC').value;
    let sunO = document.querySelector('#sunO').value;
    let sunC = document.querySelector('#sunC').value;
    let score = 0;
    let img = "placeholder.jpg";

    let newActivity = {
      title: title,
      cat: cat,
      price: price,
      indoors: indoors,
      dist: dist,
      intro: intro,
      ideal: ideal,
      why: why,
      cant: cant,
      good: good,
      monO: monO,
      monC: monC,
      tueO: tueO,
      tueC: tueC,
      wenO: wenO,
      wenC: wenC,
      thuO: thuO,
      thuC: thuC,
      friO: friO,
      friC: friC,
      satO: satO,
      satC: satC,
      sunO: sunO,
      sunC: sunC,
      score: score,
      img: img
    };
    console.log(newActivity);
    activities.add(newActivity);
});
