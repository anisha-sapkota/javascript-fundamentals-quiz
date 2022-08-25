// get buttons by id
var backButtonEl = document.getElementById("backButton");
var clearButtonEl = document.getElementById("clearButton");

// add event listeners to buttons
backButtonEl.addEventListener("click", function () {
  location.href = "index.html";
});

clearButtonEl.addEventListener("click", function () {
  localStorage.removeItem("scores");
  location.reload();
});

// function for rendering high scores
function renderHighScores() {
  // get element for rendering the scores
  var highScoresEl = document.getElementById("highScores");
  // get scores from local storage
  var scores = localStorage.getItem("scores");

  // if there are any scores in local storage
  if (scores) {
    // convert string to object
    scores = JSON.parse(scores);
    for (var item in scores) {
      // for each score, create li and append it
      var scoreEl = document.createElement("li");
      scoreEl.textContent = item + ": " + scores[item];
      highScoresEl.appendChild(scoreEl);
    }
  }
}

// call function to render the scores on load
renderHighScores();
