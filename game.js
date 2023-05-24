const startBtns = document.querySelectorAll(".playBtn");

let optionsCount = 3;

startBtns.forEach((btn) => {
  btn.addEventListener("click", startGame);
});

document.querySelector(".choices").addEventListener("click", checkChoice);

// function so I dont need as many document.querySelector
function getEl(query) {
  return document.querySelector(query);
}

function startGame() {
  // reset to default values for a new game
  optionsCount = 3;
  document.getElementById("row2").innerHTML = ``;
  document.getElementById("row3").innerHTML = ``;
  document.querySelector("#counter").innerText = 0;
  document.querySelector("#score").innerText = 0;

  // showing the game El and hiding end screen, and start button
  document.querySelector("#game").classList.remove("invisible");
  document.querySelector("#startButton").classList.add("invisible");
  document.querySelector("#endScreen").classList.remove("visible");
  document.querySelector("#endScreen").classList.add("invisible");

  setNewValues();
}

// give new bg values to the square
function setNewValues() {
  const colorArr = [];
  const counterEl = document.querySelector("#counter");

  if (counterEl.innerText == "9") return endGame();

  counterEl.innerText++;

  // once you get to question 5 and 6 add more options
  if (counterEl.innerText == "5") {
    document.getElementById(
      "row2"
    ).innerHTML = `<div id="btn4" class="choice"></div>
    <div id="btn5" class="choice"></div>
    <div id="btn6" class="choice"></div>`;
    optionsCount = 6;
  }
  if (counterEl.innerText == "8") {
    document.getElementById(
      "row3"
    ).innerHTML = `<div id="btn7" class="choice"></div>
    <div id="btn8" class="choice"></div>
    <div id="btn9" class="choice"></div>`;
    optionsCount = 9;
  }

  // generating a random color for each option
  for (let i = 0; i < optionsCount; i++) {
    const randomColor = `rgb(${Math.floor(Math.random() * 256)},${Math.floor(
      Math.random() * 256
    )},${Math.floor(Math.random() * 256)})`;
    colorArr.push(randomColor);
    document.getElementById(`btn${i + 1}`).style.backgroundColor = randomColor;
    document.getElementById(`btn${i + 1}`).classList.remove("wrong");
  }

  // picking one of the random colors for the answer
  document.querySelector("#colorValue").innerText =
    colorArr[Math.floor(Math.random() * optionsCount)].slice(3);
    // colorArr[0].slice(3);
}

function checkChoice(e) {
  const scoreEl = document.querySelector("#score");
  const choice = document
    .getElementById(e.target.id)
    .style.backgroundColor.replace(/ /g, "");
  const ans = `rgb${document.getElementById("colorValue").innerText}`;

  // if the options is already wrong, it wont
  //register another click
  if (choice == "grey" || choice == "") return;

  if (choice == ans) {
    scoreEl.innerText = parseInt(scoreEl.innerText) + (optionsCount * 2) / 3;

    // flash the bg green to indicate getting the question right
    // then waiting to change the values
    flashBG("green");
    setTimeout(function () {
      setNewValues();
    }, 400);
  } else {
    flashBG("red");

    scoreEl.innerText--;

    //greying the bg and adding an 'X' to the wrong choice
    document.getElementById(e.target.id).classList.add("wrong");
    document.getElementById(e.target.id).style.backgroundColor = "grey";
  }
}

// hides the game and shows end screen
function endGame() {
  const currentScore = document.querySelector("#score").innerText;
  document.querySelector("#scoreResult").innerText = currentScore;

  // checking the score cookie and displaying it
  let highScore = getScoreCookie();
  console.log(highScore);
  console.log(currentScore);
  if (parseInt(highScore) <= parseInt(currentScore) || !highScore) {
    console.log("changing cookie");
    document.cookie = `score=${currentScore};max-age=${60 * 60 * 24 * 365}`;
  }
  document.querySelector("#highScore").innerText = getScoreCookie();
  console.log(getScoreCookie());

  // hiding the game and showing end screen
  document.querySelector("#game").classList.add("invisible");
  document.querySelector("#endScreen").classList.remove("invisible");
  document.querySelector("#endScreen").classList.add("visible");
}
function flashBG(color) {
  // console.log("flashing");
  document.getElementById("gameContainer").style.backgroundColor = color;
  setTimeout(function () {
    document.getElementById("gameContainer").style.backgroundColor = "white";
  }, 300);
}

function getScoreCookie() {
  let result = null;
  document.cookie.split(";").forEach((e) => {
    if (e.split("=")[0].trim() == "score") return (result = e.split("=")[1]);
  });
  return result;
}

if (!document.cookie) {
  document.querySelector("#cookieBanner").classList.remove("invisible");
}
document.querySelector("#cookieAccept").addEventListener("click", function () {
  document.cookie = 0;
  document.querySelector("#cookieBanner").classList.add("invisible");
});
