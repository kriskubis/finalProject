// ADD ACTIVITIES TO DOM USING FETCH
fetch('json/activities.json')
.then(function(response) {
  return response.json();
  })

  .then(json => {
    console.log(json);
    appendActivities(json.activities);
  });

  function appendActivities(activities) {
  for (let activity of activities) {
    activityGrid.innerHTML += `
      <a href="#">
        <article class="activityCard" style="background-image: url('uploads/${activity.img}');">
          <div class="card-head">
            <h4>${activity.title}</h4>
            <h5>Open<br>${activity.dist} km</h5>
          </div>
          <div class="card-description">
            <h6>${activity.title}</h6>
            <p>${activity.intro}</p>
          </div>
          <div class="${activity.cat}-bg card-btn btn">
          </div>
        </article>
      </a>
      `;
  }
}