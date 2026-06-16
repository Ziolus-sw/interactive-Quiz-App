

document.addEventListener("DOMContentLoaded", () => {
  let currques = 1;
  let score = 0;
  let totalques = 5;
  const startBtn = document.querySelector("#start-btn");
  const restartBtn = document.querySelector("#restart-btn");
  const quesNo = document.querySelector("#current-question");
  const totalQues = document.querySelector("#total-questions");
  const htmlscore = document.querySelector("#score");
  const question = document.querySelector("#question-text");

  let progress = document.querySelector("#progress");

  let ansbtn = document.querySelector(".answer-btn");
  let ansContainer = document.querySelector(".answers-container");
const answerStatus = document.querySelector("#answer-status");
  const qna = [
    {
      question: `What is the NO. of states in India?`,
      op1: "28",
      op2: "29",
      op3: "30",
      op4: "31",
      qno: "1",
      correctanswer: "28",
      correctoption: 1,
    },
    {
      question: `What is the capital of Australia?`,
      op1: "Sydney",
      op2: "Melbourne",
      op3: "Canberra",
      op4: "Perth",
      qno: "2",
      correctanswer: "Canberra",
      correctoption: 3,
    },
    {
      question: `Which planet is called Red Planet?`,
      op1: "Venus",
      op2: "Mars",
      op3: "Jupiter",
      op4: "Saturn",
      qno: "3",
      correctanswer: "Mars",
      correctoption: 2,
    },
    {
      question: `Who wrote the Indian Constitution?`,
      op1: "M. Gandhi",
      op2: "J. Nehru",
      op3: "B. R. Ambedkar",
      op4: "S. Patel",
      qno: "4",
      correctanswer: "B. R. Ambedkar",
      correctoption: 3,
    },
    {
      question: `Which is the largest ocean Earth?`,
      op1: "Atlantic",
      op2: "Indian",
      op3: "Arctic",
      op4: "Pacific",
      qno: "5",
      correctanswer: "Pacific",
      correctoption: 4,
    },
    {
      question: `What is the square root of 64?`,
      op1: "6",
      op2: "7",
      op3: "8",
      op4: "9",
      qno: "6",
      correctanswer: "8",
      correctoption: 3,
    },
  ];
totalques = qna.length;
  const userinputs = [{}, {}, {}, {}, {},{}];

  function fillclass(e) {
    let x = "";
    let y = "";
    let z = "";
    if (userinputs[currques - 1].correct === qna[currques - 1]["op" + e]) {
      x = "correct";
    }
    if (userinputs[currques - 1].choice === qna[currques - 1]["op" + e]) {
      y = "selected";
      if (!x) {
        z = "incorrect";
      }
    }
    return `${x} ${y} ${z}`;
  }

  function fillanswercont(e) {
    question.textContent = qna[e].question;
    quesNo.textContent = `${currques}`;
    totalQues.textContent = `${totalques}`;
    htmlscore.textContent = `${score}`;
    ansContainer.innerHTML = `
        <button class="answer-btn ${userinputs[currques - 1].clicked} ${fillclass(1)}">${qna[e].op1}</button>
        <button class="answer-btn  ${userinputs[currques - 1].clicked} ${fillclass(2)}">${qna[e].op2}</button>
        <button class="answer-btn  ${userinputs[currques - 1].clicked} ${fillclass(3)}">${qna[e].op3}</button>
        <button class="answer-btn  ${userinputs[currques - 1].clicked} ${fillclass(4)}">${qna[e].op4}</button>
      `;
  }
  function chosenOption(e) {
    for (let i = 1; i <= 4; i++) {
      if (e.innerText === `qna[currques-1].op${i}`) {
        return;
      }
    }
  }

  startBtn.addEventListener("click", () => {
    document.querySelector("#start-screen")?.classList.remove("active");
    document.querySelector("#quiz-screen")?.classList.add("active");
    fillanswercont(currques - 1);
  });

  // function handleInput(event) {
  //   if ( event.type === 'mousedown'){
  //     input= event.button;
  //   }
  //   if ( event.type === 'keydown'){
  //     input= event.key;
  //   }
  //   console.log(input);
  // }
  ansContainer.addEventListener("mousedown", (e) => {
    if (!userinputs[currques - 1].answered) {
      console.log(e.button);
      const btn = e.target.closest(".answer-btn");

      if (!btn) return;

      document.querySelectorAll(".answer-btn").forEach((b) => {
        b.classList.add("clicked");
      });

      if (btn.textContent == qna[currques - 1].correctanswer) {
        btn.classList.add("correct", "selected");
        score += 1;
      } else {
        btn.classList.add("incorrect", "selected");

        document
          .querySelectorAll(".answer-btn")
          [qna[currques - 1].correctoption - 1].classList.add("correct");
      }
      userinputs[currques - 1].answered = "yes";
      userinputs[currques - 1].choice = btn.textContent;
      userinputs[currques - 1].correct = `${qna[currques - 1].correctanswer}`;
      userinputs[currques - 1].clicked = "clicked";
      htmlscore.textContent = `${score}`;
      progress.style.width = `${currques * 20}%`;
    }
  });

  document
    .querySelector(".back-for-progress")
    .addEventListener("mousedown", (e) => {
      const btn = e.target.closest(".forward-btn");
      if (!btn) {
        return;
      }
      if (
        currques >= 1 &&
        currques < totalques &&
        userinputs[currques - 1].answered === "yes"
      ) {
        currques += 1;
        fillanswercont(currques - 1);
      } else if (
        (currques = totalques && userinputs[currques - 1].answered === "yes")
      ) {
        currques += 1;
        document.querySelector("#quiz-screen")?.classList.remove("active");
        document.querySelector("#result-screen")?.classList.add("active");
        document.querySelector("#final-score").innerText = `${score}`;
        document.querySelector("#max-score").innerText = `${totalques}`;
        let message = "";

        if (score === 5) {
          message = "Outstanding! Perfect score, you truly nailed it.";
        } else if (score === 4) {
          message = "Excellent work! Just one step from perfection.";
        } else if (score === 3) {
          message = "Good job! You have a solid understanding.";
        } else if (score === 2) {
          message = "Nice effort! Keep practicing to improve.";
        } else if (score === 1) {
          message = "Don't give up! Every attempt builds knowledge.";
        } else {
          message = "Keep learning and try again. You can improve!";
        }
        document.querySelector("#result-message").innerText = message;
      }
    });
  document
    .querySelector(".back-for-progress")
    .addEventListener("mousedown", (e) => {
      const btn = e.target.closest(".back-btn");
      if (!btn) {
        return;
      }
      if (currques > 1) {
        currques -= 1;
        fillanswercont(currques - 1);
      }
    });
//     restartBtn.addEventListener("click", () => {
//   // Reset quiz state
//   currques = 1;
//   score = 0;

//   // Clear user answers
//   userinputs.forEach(input => {
//     Object.keys(input).forEach(key => delete input[key]);
//   });

//   // Reset UI
//   htmlscore.textContent = "0";
//   progress.style.width = "0%";

//   // Switch screens
//   document.querySelector("#result-screen").classList.remove("active");
//   document.querySelector("#quiz-screen").classList.add("active");

//   // Load first question
//   fillanswercont(0);
// });
restartBtn.addEventListener("click", () => {

  // Reset quiz variables
  currques = 1;
  score = 0;

  // Clear user answers
  for (let i = 0; i < qna.length; i++) {
    userinputs[i] = {};
  }

  // Reset UI
  htmlscore.textContent = "0";
  progress.style.width = "0%";

  // Hide result screen and show quiz screen
  document.querySelector("#result-screen").classList.remove("active");
  document.querySelector("#quiz-screen").classList.add("active");

  // Load first question
  fillanswercont(0);
});
});
