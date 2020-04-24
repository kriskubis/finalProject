// COPIED FROM "FETCH_JSON_DATA"

const doc = document;

fetch('../json/activities.json')
  .then(function(response) {
    return response.json();
  })
  .then(json => {
    console.log(json);
    appendActivities(json.activities);
  });

// Adds activities to the DOM by giving parameter, activities
function appendActivities(activities) {
  for (let activity of activities) { // looping trough all
    console.log(activity);
    //creating activity data, HTML tags and adding to the DOM, the element #gridActivities
    gridActivities.innerHTML += `
      <article>
      <h4>${activity.title}</h4>
      <p>${activity.dist}</p>
      </article>
      `;
  }
}