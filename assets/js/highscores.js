var backButtonEl = document.getElementById('backButton')
var clearButtonEl = document.getElementById('clearButton')


backButtonEl.addEventListener('click', function(){
  location.href = 'index.html'
})

clearButtonEl.addEventListener('click', function(){
  localStorage.removeItem('scores')
  location.reload()
})

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
