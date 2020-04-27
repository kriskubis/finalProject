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
        $("#edit-section").addClass("hidden");
        $("#add-section").removeClass("hidden");
    });
});

$(function() {
    $("#editBtn").click(function() {
        $("#admin-title").text("Editing existing activity");
        $("#add-section").addClass("hidden");
        $("#edit-section").removeClass("hidden");
    });
});




//----------------------- EDIT EXISTING ACTIVITY -----------------------//
// Create json request "req"
let req = new Request('json/activities.json');

// Add existing activities to step 1
fetch(req)
.then(function(response) {
  return response.json();
  })

  .then(json => {
    appendOptions(json.activities);
  });

  function appendOptions(activities) {
  for (let activity of activities) {
    activityOptions.innerHTML += `
    <input type="radio" name="actTitle" value="${activity.title}" onClick="getActValue()"> ${activity.title} <br>
      `;
  }
}

// Get value of the chosen activity in step 1 (var must be global)
var chosenActivity = {};
function getActValue() {
    chosenActivity.value = event.target.value;
}

// Get value of the chosen field in step 2 (var must be global)
var chosenField = {};
function getFieldValue() {
    chosenField.value = event.target.value;
}

// Show available options or...
function priceOptions() {
    document.getElementById("infoField").innerHTML = '<input type="radio" name="newInfo" value="$"> $ <br><input type="radio" name="newInfo" value="$$"> $$ <br><input type="radio" name="newInfo" value="$$$"> $$$ <br>';
}
function catOptions() {
    document.getElementById("infoField").innerHTML = '<input type="radio" name="cat" value="dining"> Dining Out <br><input type="radio" name="cat" value="city"> Exploring the City <br><input type="radio" name="cat" value="outdoor"> Relaxed Outdoor Activities <br><input type="radio" name="cat" value="amusement"> Amusement <br><input type="radio" name="cat" value="learning"> Learning <br><input type="radio" name="cat" value="active"> Active <br>';
}
function indoorOptions() {
    document.getElementById("infoField").innerHTML = '<input type="radio" name="indoors" value="true"> Indoor <br><input type="radio" name="indoors" value="false"> Outdoor <br>';
}

// ...show current content in step 3
function getContent() {
    
    fetch(req)
    .then(function(response) {
        return response.json();
    })
      
    .then(json => {
        appendOptions(json.activities);
    });

    // SHOULD FILTER ACCORDING TO chosenActivity AND chosenField
    console.log('Showing the content of "' + chosenField.value + '" for ' + chosenActivity.value);

    function appendOptions(activities) {
        for (let activity of activities) {
            
            //if (title.includes(chosenActivity)) {
            //   console.log(activity.identifier)
            //}
            
            infoField.innerHTML = `
            <h4>Current text:</h4>
            <p><i>${activity.intro}</i></p><br>
            <h4>New text:</h4>
            <input type="text" name="newContent" size="50" maxlength="100" placeholder="(Write the new text here)"><br>
            `;
        }
    }   
}