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
      $("#admin-title").text("Upload new image");
      $("#edit").addClass("hidden");
      $("#add").addClass("hidden");
      $("#imgUpload").removeClass("hidden");
  });
});

function addNewActivity() {
  // Fields
  let title = document.querySelector('#title').value;

  // Fail message
  if (title == "") {
    alert('Oops, something is missing. Please fill in the field named "Activity Title".');
  } else {
    let newActivity = {
      title: document.querySelector('#title').value,
      cat : document.querySelector('input[name="cat"]:checked').value,
      price : document.querySelector('input[name="price"]:checked').value,
      indoors : document.querySelector('input[name="indoors"]:checked').value,
      dist: document.querySelector('#dist').value,
      intro : document.querySelector('#intro').value,
      ideal : document.querySelector('#ideal').value,
      why : document.querySelector('#why').value,
      cant : document.querySelector('#cant').value,
      good : document.querySelector('#good').value,
      monO : document.querySelector('#monO').value,
      monC : document.querySelector('#monC').value,
      tueO : document.querySelector('#tueO').value,
      tueC : document.querySelector('#tueC').value,
      wenO : document.querySelector('#wenO').value,
      wenC : document.querySelector('#wenC').value,
      thuO : document.querySelector('#thuO').value,
      thuC : document.querySelector('#thuC').value,
      friO : document.querySelector('#friO').value,
      friC : document.querySelector('#friC').value,
      satO : document.querySelector('#satO').value,
      satC : document.querySelector('#satC').value,
      sunO : document.querySelector('#sunO').value,
      sunC : document.querySelector('#sunC').value,
      comment : document.querySelector('#comment').value,
      score : 0,
      img : "placeholder.jpg"
    };
  
    console.log(newActivity);
    // Create new document with the title as ID
    actRef.doc(title).set(newActivity);

    alert("Success! " + title + " was added to the guide.");
    document.getElementById("add-form").reset(); // Reset the form
  }
}

//----------------------- EDIT ACTIVITY -----------------------//
actRef.onSnapshot(function(snapshotData) {
  let acts = snapshotData.docs;
  appendFields(acts);
});

// Edit fields based on chosen activity
function appendFields(acts) {
  let htmlTemplate = "";
  for (let act of acts) {
    htmlTemplate += `
    <article class="option" onClick="
    document.getElementById('id').value = '${act.data().title}';
    document.getElementById('delete-text').innerHTML = 'Delete ${act.data().title}';

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

    document.getElementById('new-street').value = '${act.data().street}';
    document.getElementById('new-postal').value = '${act.data().postal}';
    document.getElementById('new-city').value = '${act.data().city}';

    document.getElementById('new-monO').value = '${act.data().monO}';
    document.getElementById('new-tueO').value = '${act.data().tueO}';
    document.getElementById('new-wenO').value = '${act.data().wenO}';
    document.getElementById('new-thuO').value = '${act.data().thuO}';
    document.getElementById('new-friO').value = '${act.data().friO}';
    document.getElementById('new-satO').value = '${act.data().satO}';
    document.getElementById('new-sunO').value = '${act.data().sunO}';
    document.getElementById('new-monC').value = '${act.data().monC}';
    document.getElementById('new-tueC').value = '${act.data().tueC}';
    document.getElementById('new-wenC').value = '${act.data().wenC}';
    document.getElementById('new-thuC').value = '${act.data().thuC}';
    document.getElementById('new-friC').value = '${act.data().friC}';
    document.getElementById('new-satC').value = '${act.data().satC}';
    document.getElementById('new-sunC').value = '${act.data().sunC}';
    document.getElementById('new-comment').value = '${act.data().comment}';

    document.getElementById('new-img').value = '${act.data().img}';
    document.getElementById('new-web').value = '${act.data().web}';
    
    ">
    <h6>${act.data().title}</h6>
    </article>        
  `;
  }
  document.querySelector('#edit-activity').innerHTML = htmlTemplate;
}

// Update functionality
function editActivity() {
  // Fields
  let title = document.querySelector('#id').value;
  let newTitle = document.querySelector('#new-title').value;
  let newCat = document.querySelector('#new-cat').value;
  let newPrice = document.querySelector('#new-price').value;
  let newIndoors = document.querySelector('#new-indoors').value;
  let newDist = document.querySelector('#new-dist').value;
  let newIntro = document.querySelector('#new-intro').value;
  let newIdeal = document.querySelector('#new-ideal').value;
  let newWhy = document.querySelector('#new-why').value;
  let newCant = document.querySelector('#new-cant').value;
  let newGood = document.querySelector('#new-good').value;
  let newMonO = document.querySelector('#new-monO').value;
  let newMonC = document.querySelector('#new-monC').value;
  let newTueO = document.querySelector('#new-tueO').value;
  let newTueC = document.querySelector('#new-tueC').value;
  let newWenO = document.querySelector('#new-wenO').value;
  let newWenC = document.querySelector('#new-wenC').value;
  let newThuO = document.querySelector('#new-thuO').value;
  let newThuC = document.querySelector('#new-thuC').value;
  let newFriO = document.querySelector('#new-friO').value;
  let newFriC = document.querySelector('#new-friC').value;
  let newSatO = document.querySelector('#new-satO').value;
  let newSatC = document.querySelector('#new-satC').value;
  let newSunO = document.querySelector('#new-sunO').value;
  let newSunC = document.querySelector('#new-sunC').value;
  let newComment = document.querySelector('#new-comment').value;
  let newScore = 0;
  let newImg = "placeholder.jpg";

  // Fail message
  if (newTitle == "") {
    alert('Please fill in the field named "New title".');
  } else {
    let updatedActivity = {
      oldTitle: title,
      title: newTitle,
      cat: newCat,
      price: newPrice,
      indoors: newIndoors,
      dist: newDist,
      intro: newIntro,
      ideal: newIdeal,
      why: newWhy,
      cant: newCant,
      good: newGood,
      monO: newMonO,
      monC: newMonC,
      tueO: newTueO,
      tueC: newTueC,
      wenO: newWenO,
      wenC: newWenC,
      thuO: newThuO,
      thuC: newThuC,
      friO: newFriO,
      friC: newFriC,
      satO: newSatO,
      satC: newSatC,
      sunO: newSunO,
      sunC: newSunC,
      comment: newComment,
      score: newScore,
      img: newImg
    };
  
    // Delete old document by ID (title)
    // and create new document with the new title as ID
    actRef.doc(title).delete().then(function() {
      actRef.doc(newTitle).set(updatedActivity);
      alert("Success! " + title + " was updated.");
    }).catch(function(error) {
      alert("Oops! Something went wrong.");
      console.error("Error updating document: ", error);
    });
  }
}

//----------------------- DELETE ACTIVITY -----------------------//
function deleteActivity() {
  let id = document.querySelector('#id').value;

  actRef.doc(id).delete().then(function() {
    alert("Success! " + id + " was deleted.");
}).catch(function(error) {
    alert("Oops! Something went wrong.");
    console.error("Error removing document: ", error);
});
}