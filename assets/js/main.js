var time = 75;
var score = 0;

var questions = [
  {
    question: "Commonly used data types DO NOT include:",
    options: ["string", "booleans", "alerts", "numbers"],
    answer: "alerts",
  },
  {
    question:
      "The condition in an if/else statement is enclosed with ____________.",
    options: ["quotes", "curly brackets", "parenthesis", "square brackets"],
    answer: "curly brackets",
  },
];

var questionSectionEl = document.getElementById("questionSection");
var startButtonEl = document.getElementById("startButton");
var inputEl = document.createElement("input");
var submitBtnEl = document.createElement("button");

startButtonEl.addEventListener("click", function () {
  renderTime();
  startQuiz();
});

function checkAnswer(event) {
  if ("data-correct" in event.srcElement.attributes) {
    score++;
  } else {
    if (time > 10) {
      time = time - 10;
    } else {
      time = 0;
    }
    renderTime();
  }
  if (questions.length > 0) {
    renderQuestion(questions.pop());
  } else {
    renderEnd();
  }
}

function renderQuestion(question) {
  questionSectionEl.innerHTML = "";
  var questionEl = document.createElement("h2");
  questionEl.textContent = question.question;
  questionSectionEl.appendChild(questionEl);

  var options = shuffle(question.options);

  for (var i = 0; i < options.length; i++) {
    var buttonEl = document.createElement("button");
    buttonEl.textContent = options[i];
    buttonEl.setAttribute("onclick", "checkAnswer(event)");
    if (options[i] === question.answer) {
      buttonEl.setAttribute("data-correct", true);
    }
    questionSectionEl.appendChild(buttonEl);
  }
}

function renderEnd() {
  questionSectionEl.innerHTML = "";

  var titleEl = document.createElement("h2");
  var messageEl = document.createElement("p");
  var labelEl = document.createElement("label");

  titleEl.textContent = "All done!";
  messageEl.textContent = `Your final score is ${score}.`;

  labelEl.setAttribute("for", "score");
  labelEl.textContent = "Enter initials:";

  inputEl.setAttribute("type", "text");
  inputEl.setAttribute("name", "score");
  inputEl.setAttribute("id", "scoreInput");

  inputEl.addEventListener("input", function (event) {
    if (event.srcElement.value.length > 0) {
      submitBtnEl.removeAttribute("disabled");
    } else {
      submitBtnEl.setAttribute("disabled", true);
    }
  });

  submitBtnEl.setAttribute("disabled", true);
  submitBtnEl.textContent = "Submit";

  questionSectionEl.appendChild(titleEl);
  questionSectionEl.appendChild(messageEl);
  questionSectionEl.appendChild(labelEl);
  questionSectionEl.appendChild(inputEl);
  questionSectionEl.appendChild(submitBtnEl);

  window.onload = inputEl.focus();
}

submitBtnEl.addEventListener("click", function () {
  var scores = localStorage.getItem("scores");
  if (scores) {
    scores = JSON.parse(scores);
  } else {
    scores = {};
  }
  scores[inputEl.value.trim()] = score;
  localStorage.setItem("scores", JSON.stringify(scores));
  location.href = "highscores.html";
});

function renderTime() {
  var timerEl = document.getElementById("timer");
  timerEl.textContent = time;
}

function startQuiz() {
  questions = shuffle(questions);
  renderQuestion(questions.pop());
  var timer = setInterval(function () {
    time--;
    renderTime();
    if (time <= 0) {
      clearInterval(timer);
    }
  }, 1000);
}

// https://bost.ocks.org/mike/shuffle/
function shuffle(array) {
  var m = array.length,
    t,
    i;

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}
