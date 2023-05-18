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
  if(counterEl.innerText == "2"){
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

  document.querySelector("#colorValue").innerText =colorArr[Math.floor(Math.random() * 4)].slice(3);
    
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
  flashBG("green")
  setTimeout(function() {
    

    setNewValues()
}, 400);
  } else {
  flashBG("red")

    scoreEl.innerText --;
    document.getElementById(e.target.id).classList.remove("active")
    document.getElementById(e.target.id).style.backgroundColor = "grey"
    document.getElementById(e.target.id).style.borderColor = "red"

  }
}
function endGame (){
  document.querySelector('#scoreResult').innerText = document.querySelector('#score').innerText
  // console.log(document.cookie)
  if(!document.cookie || document.cookie < document.querySelector('#score').innerText){
    console.log("changing cookie")
    document.cookie = document.querySelector('#score').innerText
  }
  document.querySelector('#highScore').innerText = document.cookie

  document.querySelector("#game").classList.add("invisible")
  document.querySelector("#endScreen").classList.remove('invisible')
  document.querySelector("#endScreen").classList.add('visible')
}
function flashBG(color){
  console.log("flashing")
  document.getElementById("gameContainer").style.backgroundColor = color
  setTimeout(function() {
    document.getElementById("gameContainer").style.backgroundColor = "white"

}, 300);
}

if(!document.cookie){
  document.querySelector("#cookieBanner").classList.remove("invisible")
}
document.querySelector("#cookieAccept").addEventListener("click",function(){
  document.cookie = 0
  document.querySelector("#cookieBanner").classList.add("invisible")
})