const startBtns = document.querySelectorAll('.playBtn')
startBtns.forEach(btn =>{
  btn.addEventListener('click',startGame)
})
document.querySelector(".choices").addEventListener("click", checkChoice);

function startGame() {
  document.querySelector("#counter").innerText = 0
  document.querySelector('#score').innerText = 0
  document.querySelector("#game").classList.remove("invisible")
  document.querySelector("#startButton").classList.add("invisible")
  document.querySelector("#endScreen").classList.remove('visible')
  document.querySelector("#endScreen").classList.add('invisible')

  setNewValues();
}

function setNewValues() {
  const colorArr = [];
  const counterEl = document.querySelector("#counter")
  if(counterEl.innerText == "5"){
    endGame()
    return
  }
  counterEl.innerText ++
  for (let i = 0; i < 4; i++) {
    colorArr.push(
      `rgb(${Math.floor(Math.random() * 256)},${Math.floor(
        Math.random() * 256
      )},${Math.floor(Math.random() * 256)})`
    );
  }

  document.querySelector("#colorValue").innerText =colorArr[0].slice(3);
    // colorArr[Math.floor(Math.random() * 4)].slice(3);
    
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
    scoreEl.innerText = parseInt(scoreEl.innerText) + 2
    setNewValues()
  } else {
    scoreEl.innerText --;
    document.getElementById(e.target.id).classList.remove("active")
    document.getElementById(e.target.id).style.backgroundColor = "grey"
    document.getElementById(e.target.id).style.borderColor = "red"

  }
}
function endGame (){
  document.querySelector('#scoreResult').innerText = document.querySelector('#score').innerText

  document.querySelector("#game").classList.add("invisible")
  document.querySelector("#endScreen").classList.remove('invisible')
  document.querySelector("#endScreen").classList.add('visible')
}
