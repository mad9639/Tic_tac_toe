let buttonRef = document.querySelectorAll(".button-styles");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("reset");
let msgRef = document.getElementById("message");


//Win Pattern Array
let winPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [2, 5, 8],
  [6, 7, 8],
  [3, 4, 5],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6],
];


//'X' plays first
let xTurn = true;
let cnt = 0;

//Disable All Buttons
const disableButtons = () => {
  buttonRef.forEach((element) => (element.disabled = true));
  //enable popup
  popupRef.classList.remove("hide");
};

//Enable all buttons (For New Game and Restart)
const enableButtons = () => {
  buttonRef.forEach((element) => {
    element.innerText = "";
    element.disabled = false;
  });
  //disable popup
  popupRef.classList.add("hide");
};

//This function is executed when a player wins
const winFunction = (letter) => {
  disableButtons();
  if (letter == "X") {
    msgRef.innerHTML = " 'X' Wins";
  } else {
    msgRef.innerHTML = " 'O' Wins";
  }
};

//Function for draw
const drawFunction = () => {
  disableButtons();
  msgRef.innerHTML = "Draw";
};

//New Game
newgameBtn.addEventListener("click", () => {
  cnt = 0;
  enableButtons();
});
restartBtn.addEventListener("click", () => {
  cnt = 0;
  enableButtons();
});

//Win Logic
const winChecker = () => {
  //Loop through all win patterns
  for (let i of winPattern) {
    let [element1, element2, element3] = [
      buttonRef[i[0]].innerText,
      buttonRef[i[1]].innerText,
      buttonRef[i[2]].innerText,
    ];
    //Check if elements are filled

    //If 3 empty elements are same and would give win as would
    if (element1 != "" && (element2 != "") & (element3 != "")) {
      if (element1 == element2 && element2 == element3) {
        //If all 3 buttons have same values then pass the value to winFunction
        winFunction(element1);
      }
    }
  }
};

//Display X/O on click

buttonRef.forEach((element) => {
  element.addEventListener("click", () => {
    if (xTurn) {
      xTurn = false;
      //Display X
      element.innerText = "X";
      element.disabled = true;
    } else {
      xTurn = true;
      //Display Y
      element.innerText = "O";
      element.disabled = true;
    }

    //Increment count on each click
    cnt += 1;
    if (cnt == 9) {
      drawFunction();
    }

    //Check for win on every click
    winChecker();
  });
});

//Enable Buttons and disable popup on page load
window.onload = enableButtons;
