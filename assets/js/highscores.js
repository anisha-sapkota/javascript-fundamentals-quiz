function renderHighScores() {
  var highScoresEl = document.getElementById("highScores");
  var scores = localStorage.getItem("scores");
  if (scores) {
    scores = JSON.parse(scores)
    for (var item in scores) {
      var scoreEl = document.createElement("li");
      scoreEl.textContent = item + ": " + scores[item];
      highScoresEl.appendChild(scoreEl)
    }
  }
}

renderHighScores();
