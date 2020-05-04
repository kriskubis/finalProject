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
  // Get values of radio options
  var cat = "city"; // Trying to make these global
  var price = "$"; // Trying to make these global
  var indoors = true; // Trying to make these global
  
  jQuery(function(){
    $("input[name='cat']").click(function(){
        var cat = $("input[name='cat']:checked").val();
        console.log(cat);
    });
  
    $("input[name='price']").click(function(){
        var price = $("input[name='price']:checked").val();
        console.log(price);
    });
  
    $("input[name='indoors']").click(function(){
        var indoors = $("input[name='indoors']:checked").val();
        console.log(indoors);
    });
  });
  
  function addNewActivity() {
    // Fields
    let title = document.querySelector('#title').value;
    let dist = document.querySelector('#dist').value;
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

    // Fail message
    if (title == "") {
      alert('Oops, something is missing. Please fill in the field named "Activity Title".');
    } else {
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
      actRef.add(newActivity);
  
      alert("Success! " + title + " was added to the guide.");
      document.getElementById("add-form").reset(); // Reset the form
    }
  }
  
  //----------------------- EDIT ACTIVITY -----------------------//
  actRef.onSnapshot(function(snapshotData) {
    let acts = snapshotData.docs;
    appendTitles(acts);
  });
  
  // Append option the user can choose from
  function appendTitles(acts) {
    let htmlTemplate = "";
    for (let act of acts) {
      console.log(act.id);
      htmlTemplate += `
      <option class="title-option" value="${act.data().title}">     
      `;
    }
    document.querySelector('#title-options').innerHTML = htmlTemplate;
  }

  // Get the title of the selected activity
  $("input[name='title-options']").on('input', function(e){
    var selectedActivity = $(this).val();
    console.log(selectedActivity);
    fields();
  });

  // ----------------------- ADD ACTIVITIES TO DOM -----------------------//
  actRef.onSnapshot(function(snapshotData) {
    let acts = snapshotData.docs;
    appendFields(acts);
  });

  // Edit fields based on chosen activity
  function appendFields(acts) {
    let htmlTemplate = "";
    for (let act of acts) {
      console.log(act.id);
      htmlTemplate += `
      <article class="option" onClick="
      document.getElementById('new-title').value = '${act.data().title}';
      document.getElementById('new-cat').value = '${act.data().cat}';
      document.getElementById('new-price').value = '${act.data().price}';
      document.getElementById('new-indoors').value = '${act.data().indoors}';
      document.getElementById('new-dist').value = '${act.data().dist}';

      document.getElementById('new-intro').value = '${act.data().intro}';
      document.getElementById('new-ideal').value = '${act.data().ideal}';
      document.getElementById('new-why').value = '${act.data().why}';
      document.getElementById('new-cant').value = '${act.data().cant}';
      document.getElementById('new-good').value = '${act.data().good}';
      
      ">
      ${act.data().title}
      </article>        
    `;
    }
    document.querySelector('#edit-title').innerHTML = htmlTemplate;
  }