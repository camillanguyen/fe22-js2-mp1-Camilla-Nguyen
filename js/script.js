
let randomNumber = Math.ceil(Math.random() * 3);

const player = document.querySelector("#spelare");
const computer = document.querySelector("#dator");
const result = document.querySelector("#resultat");
const submit = document.querySelector("#playerName");

const rock = document.querySelector("#rock");
const sissor = document.querySelector("#sax");
const pose = document.querySelector("#paper");

let spelare;
let datorsumma = 0;
let spelaresumma = 0;
let namn;



submit.addEventListener("click", nameInput);
function nameInput(event) {
  event.preventDefault();
  const el = document.createElement("h3");
  document.body.appendChild(el);
  const textinput = document.querySelector("#name-input");
  player.innerText = textinput.value;
  namn = textinput.value;
  textinput.value = " ";
}

container.addEventListener("click", game);
function game(event) {
  if (event.target.tagName == "BUTTON") {
    randomNumber = Math.ceil(Math.random() * 3);
    console.log(randomNumber);
    if (event.target.id == "rock") {
      spelare = event.target.innerText;
      const el2 = document.createElement("h3");
      document.body.appendChild(el2);
      player.innerText = (`${namn}` + ":" + spelare);

      if (randomNumber == 1) {
        computer.innerText = "Computer: Rock";
        result.innerText = "Result: Tie";

      } else if (randomNumber == 2) {
        computer.innerText = "Computer: Paper";
        result.innerText = "Result: Computer Won";
        datorsumma++;

      } else if (randomNumber == 3) {
        computer.innerText = "Computer: Sissor";
        result.innerText = "Result: Player Won";
        spelaresumma++;
      }
    } else if (event.target.id == "paper") {
      spelare = event.target.innerText;
      const el3 = document.createElement("h3");
      document.body.appendChild(el3);
      player.innerText = (`${namn}` + ":" + spelare);

      if (randomNumber == 0) {
        computer.innerText = "Computer: Rock";
        result.innerText = "Result: Player won";
        spelaresumma++;

      } else if (randomNumber == 1) {
        computer.innerText = "Computer: Paper";
        result.innerText = "Result: Tie";

      } else if (randomNumber == 2) {
        computer.innerText = "Computer: Sissor";
        result.innerText = "Result: Computer won";
        datorsumma++;
      }
    } else if (event.target.id == "sissor") {
      spelare = event.target.innerText;
      const el4 = document.createElement("h3");
      document.body.appendChild(el4);
      player.innerText = (`${namn}` + ":" + spelare);

      if (randomNumber == 0) {
        computer.innerText = "Computer: Rock";
        result.innerText = "Result: Computer won";
        datorsumma++;

      } else if (randomNumber == 1) {
        computer.innerText = "Computer: Paper";
        result.innerText = "Result: Player won";
        spelaresumma++;

      } else if (randomNumber == 2) {
        computer.innerText = "Computer: Sissor";
        result.innerText = "Result: Tie";
      }
    }

    document.querySelectorAll("h2")[0].innerText = `Computer :  ${datorsumma}`;
    document.querySelectorAll("h2")[1].innerText = `${namn} :  ${spelaresumma}`;
    setTimeout(function () {
      if (datorsumma == 1) {

        let obj = {
          name: namn,
          score: spelaresumma
        }

        postNewScore(obj)
        alert(`Game over, your total score is ${spelaresumma} `);

        const restartBtn = document.createElement('button');
        restartBtn.innerText = 'Restart the game';
        document.body.append(restartBtn);
        restartBtn.addEventListener("click", function () {
          location.reload(true);
        })
      }
    }, 20)
  }
}

async function getAllScores() {
  const url = `https://rock-paper-sissors-3272e-default-rtdb.europe-west1.firebasedatabase.app/.json`;

  const response = await fetch(url);
  const scores = await response.json();
  return scores;
}
getAllScores();

async function displayScore() {
  let scores = await getAllScores();
  const scoreList = document.querySelector('#scoreList');
  const scoreContainer = document.querySelector('#scoreContainer');
  const highscoreTitle = document.querySelector('#highscoreTitle');
  highscoreTitle.innerText = 'Highscore';

  scoreList.innerHTML = '';
  let sortedList = [];
  
  for (let item in scores.highscore) {
    sortedList.push({ name: scores.highscore[item].name, score: scores.highscore[item].score });
  }

  sortedList.sort(function (a, b) {
    return b.score - a.score;
  });

  sortedList.slice(0, 5).forEach(element => {
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.innerHTML = `Name: ${element.name} Points: ${element.score}`;
    li.append(p);
    scoreList.append(li)
    
  })

}

async function postNewScore(obj) {
  const url = `https://rock-paper-sissors-3272e-default-rtdb.europe-west1.firebasedatabase.app/highscore.json`;
  const init = {
    method: 'POST',
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify(obj)
  };

  const response = await fetch(url, init);
  const data = await response.json();

  displayScore(data);
}

function getScore() {
  let obj = {
    name: namn,
    score: spelaresumma
  }

  const url = `https://rock-paper-sissors-3272e-default-rtdb.europe-west1.firebasedatabase.app/highscore.json`;

  fetch(url)
    .then(response => response.json())
    .then(compareScores)

  function compareScores(data) {
    if (obj <= data.score) {
    }
    else {
      postNewScore(obj).then(getAllScores);
    }

  }
}

async function getAll() {
  const url = `https://rock-paper-sissors-3272e-default-rtdb.europe-west1.firebasedatabase.app/highscore.json`;

  const response = await fetch(url);
  const data = await response.json();

  const dataSort = data.sort(function (a, b) {
    return b.score - a.score;
  })

  postNewScore(dataSort);
}