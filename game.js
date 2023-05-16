document.querySelector("#startButton").addEventListener("click", startGame);
document.querySelector(".choices").addEventListener("click", checkChoice);

function startGame() {
  document.querySelector("#game").classList.remove("invisible")
  document.querySelector("#startButton").classList.add("invisible")
  setNewValues();
}

function setNewValues() {
  const colorArr = [];
  for (let i = 0; i < 4; i++) {
    colorArr.push(
      `rgb(${Math.floor(Math.random() * 256)},${Math.floor(
        Math.random() * 256
      )},${Math.floor(Math.random() * 256)})`
    );
  }

  document.querySelector("#colorValue").innerText =
    colorArr[Math.floor(Math.random() * 4)].slice(3);
  colorArr.forEach((e, i) => {
    document.getElementById(`btn${i + 1}`).style.backgroundColor = e;
    document.getElementById(`btn${i + 1}`).style.borderColor = "black";
    document.getElementById(`btn${i + 1}`).classList.add("active");
  });
}
function checkChoice(e) {
  const scoreEl = document.querySelector('#score')
  const pick = document
    .getElementById(e.target.id)
    .style.backgroundColor.replace(/ /g, "");
  const ans = `rgb${document.getElementById("colorValue").innerText}`;
  console.log(pick)
  if(pick == "grey" || pick == "") return
  if (pick == ans) {
    setNewValues()
    scoreEl.innerText = parseInt(scoreEl.innerText) + 2
  } else {
    scoreEl.innerText --;
    document.getElementById(e.target.id).classList.remove("active")
    document.getElementById(e.target.id).style.backgroundColor = "grey"
    document.getElementById(e.target.id).style.borderColor = "red"

  }
}
