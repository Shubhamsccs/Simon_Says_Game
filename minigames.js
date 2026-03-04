//Navigation toggle functionality

document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav-links");

  if (!toggle || !nav) return;

  toggle.addEventListener("click", function () {
    const isShown = nav.classList.toggle("show");
    toggle.setAttribute("aria-expanded", isShown ? "true" : "false");
    toggle.classList.toggle("open", isShown);
  });

  // Close menu when a nav link is clicked (useful on small screens)
  nav.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      nav.classList.remove("show");
      toggle.setAttribute("aria-expanded", "false");
      toggle.classList.remove("open");
    }
  });
});

//for sequence of color flash
let gameSeq = [];
let userSeq = [];

//intially the game is not started... just declaration
let started = false;

//initial level
let level = 0;

//access h2 element to perform actions
let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");

//array of colors
let colors = ["red", "green", "blue", "yellow"];

//event listner for key press action or functionality
document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("game is started");
    started = true;
    // reset h3
    h3.innerText = "";
    // change background color to white
    backgroundColor = document.querySelector("body");
    backgroundColor.style.backgroundColor = "white";
    levelUp();
  }
});

// userFlash se call ayega aur ye uthayega button ko aur flash karwayega
function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(function () {
    btn.classList.remove("userFlash");
  }, 200);
}

// gameFlash se call ayega aur ye uthayega button ko aur flash karwayega
function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 200);
}

//match sequences
function matchSeq(idx) {
  //check if user sequence is same as game sequence
  //index ko pehle se declare kiya hua hai function parameter me
  //isme hum bich ka index check kar rahe hai koi to particular index
  if (userSeq[idx] === gameSeq[idx]) {
    console.log("success");

    //check if user sequence is complete
    //kyuki isme hum last index check kar rahe hai isliye +1 karna padega level ka
    if (userSeq.length === gameSeq.length) {
      setTimeout(function () {
        levelUp();
      }, 1000);
    }
  }

  //if user sequence is wrong
  else {
    console.log("wrong");
    h2.innerText = "Game Over, Press Any Key to Restart";
    h3.innerText = `Your Final Score is ${(level - 1) * 10}`;
    started = false;
    level = 0;
    gameSeq = [];
    userSeq = [];

    //change background color to red for game over
    let backgroundColor = document.querySelector("body");
    setTimeout(function () {
      backgroundColor.style.backgroundColor = "red";
    }, 100);
  }
}

function levelUp() {
  level++;

  //reset user sequence
  userSeq = [];

  //update h2
  h2.innerText = `Level ${level}`;

  //get random index
  let randIdx = Math.floor(Math.random() * 4);

  //get random color
  let randColor = colors[randIdx];

  //access button
  let randBtn = document.querySelector(`.${randColor}`);

  //flash button ko call lagayega yahan se
  gameFlash(randBtn);

  gameSeq.push(randColor);
}

//user button press functionality
function colorBtnpressed() {
  let userBtn = this;
  userFlash(userBtn);
  userColor = userBtn.getAttribute("id");
  userSeq.push(userColor);
  matchSeq(userSeq.length - 1);
}

//add event listner to all buttons
// create a node list of all buttons
let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", colorBtnpressed);
}
