// Array of questions
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
  {
    question: "Arrays in JavaScript can be used to store ____________.",
    options: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the options",
    ],
    answer: "all of the options",
  },
];

// Global variables
var time = 75;
var score = 0;
var timer;

// html elements which need to be accessed across multiple functions
var questionSectionEl = document.getElementById("questionSection");
var startButtonEl = document.getElementById("startButton");
var inputEl = document.createElement("input");
var submitBtnEl = document.createElement("button");

var hrEl = document.createElement("hr");
var resultEl = document.createElement("p");

// click event listener for start and submit buttons
startButtonEl.addEventListener("click", function () {
  renderTime();
  startQuiz();
});

submitBtnEl.addEventListener("click", saveScore);

// function for saving score
function saveScore() {
  // get existing scores
  var scores = localStorage.getItem("scores");
  // if existing scores then parse them else start with empty object
  if (scores) {
    scores = JSON.parse(scores);
  } else {
    scores = {};
  }
  // add key value pair to scores object
  scores[inputEl.value.trim()] = score;
  // convert to string and save to local storage
  localStorage.setItem("scores", JSON.stringify(scores));
  // redirect to high scores page
  location.href = "highscores.html";
}

// Functions for render correct or incorrect
function renderResult(result) {
  hrEl.style.width = "100%";
  resultEl.id = "result";
  if (result) {
    // if correct set the text to 'Correct' and color to green
    resultEl.style.color = "green";
    resultEl.textContent = "Correct";
  } else {
    // if incorrect set the text to 'Wrong' and color to red
    resultEl.style.color = "red";
    resultEl.textContent = "Wrong";
  }
  // append the updated elements
  questionSectionEl.appendChild(hrEl);
  questionSectionEl.appendChild(resultEl);
}

// function for checking answer
function checkAnswer(event) {
  //check if the button element has 'data-correct' attribute
  if ("data-correct" in event.srcElement.attributes) {
    // if correct, increase score and render another question
    score++;
    if (questions.length > 0) {
      renderQuestion(questions.pop());
    } else {
      // if no more questions left, stop timer, and render end
      clearInterval(timer);
      renderEnd();
      return;
    }
    renderResult(true);
  } else {
    // if wrong and time > 10, decrease time by 10
    if (time > 10) {
      time = time - 10;
    } else {
      // if remaining time less than 10 then set it to 0
      time = 0;
    }
    // render updated time and 'Wrong' message
    renderTime();
    renderResult(false);
  }
}

// function for rendering new question
function renderQuestion(question) {
  // clear question section
  questionSectionEl.innerHTML = "";

  // create h2 element and change text to question
  var questionEl = document.createElement("h2");
  questionEl.textContent = question.question;
  // append the question to container
  questionSectionEl.appendChild(questionEl);

  // shuffle the options
  var options = shuffle(question.options);

  for (var i = 0; i < options.length; i++) {
    // for each option, create a button and append it
    var buttonEl = document.createElement("button");
    buttonEl.className = "styledButton";
    buttonEl.textContent = options[i];
    buttonEl.addEventListener("click", checkAnswer);
    if (options[i] === question.answer) {
      // for correct answer add data attribute
      buttonEl.setAttribute("data-correct", true);
    }
    questionSectionEl.appendChild(buttonEl);
  }
}

// function for rendering end
function renderEnd() {
  // clear container
  questionSectionEl.innerHTML = "";

  // create html elements
  var titleEl = document.createElement("h2");
  var containerEl = document.createElement("div");
  var messageEl = document.createElement("p");
  var labelEl = document.createElement("label");

  // update html elements
  titleEl.textContent = "All done!";
  messageEl.textContent = `Your final score is ${score}.`;

  containerEl.className = "inputContainer";

  labelEl.setAttribute("for", "score");
  labelEl.textContent = "Enter initials:";

  inputEl.setAttribute("type", "text");
  inputEl.setAttribute("name", "score");
  inputEl.setAttribute("id", "scoreInput");

  // if input if empty, disable button else enable
  inputEl.addEventListener("input", function (event) {
    if (event.srcElement.value.length > 0) {
      submitBtnEl.removeAttribute("disabled");
    } else {
      submitBtnEl.setAttribute("disabled", true);
    }
  });

  submitBtnEl.setAttribute("disabled", true);
  submitBtnEl.id = "submitButton";
  submitBtnEl.className = "styledButton";
  submitBtnEl.textContent = "Submit";

  // append the elements
  questionSectionEl.appendChild(titleEl);
  questionSectionEl.appendChild(messageEl);
  containerEl.appendChild(labelEl);
  containerEl.appendChild(inputEl);
  questionSectionEl.appendChild(containerEl);
  questionSectionEl.appendChild(submitBtnEl);

  window.onload = inputEl.focus();
}

// function for updating the timerEl with new time
function renderTime() {
  var timerEl = document.getElementById("timer");
  timerEl.textContent = time;
}

// function for starting the quiz
function startQuiz() {
  // shuffle questions
  questions = shuffle(questions);
  // render question
  renderQuestion(questions.pop());
  //start timer
  timer = setInterval(function () {
    time--;
    renderTime();
    if (time <= 0) {
      clearInterval(timer);
    }
  }, 1000);
}

// function for shuffling an array
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
