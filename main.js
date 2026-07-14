const quizData = [
  { question: "In the first book, what kind of snake does Harry accidentally set free at the zoo?", options: ["Sahara Sand Viper", "Burmese Python", "Indian Cobra", "Brazilian Boa Constrictor"], correctAnswer: "Burmese Python" },
  { question: "In Chamber of Secrets, what potion do the golden trio use to find out if Draco Malfoy is the heir of Slytherin?", options: ["Felix Felicis", "Veritaserum", "Amortentia", "Polyjuice Potion"], correctAnswer: "Polyjuice Potion" },
  { question: "Who teaches Arithmancy at Hogwarts?", options: ["Professor Vector", "Professor Binns", "Professor Babbling", "Professor Trelawny"], correctAnswer: "Professor Vector" },
  { question: "What dragon does Viktor Krum face in the first task of the Triwizard Tournament?", options: ["The Hungarian Horntail", "The Swedish Short-Snout", "The Chinese Fireball", "The Common Welsh Green"], correctAnswer: "The Chinese Fireball" },
  { question: "Who betrays Dumbledore's Army in Order of the Phoenix?", options: ["Severus Snape", "Cho Chang", "Marietta Edgecombe", "Justin Finch-Fletchley"], correctAnswer: "Marietta Edgecombe" },
  { question: "What is the name of Tom Riddle's mother?", options: ["Bathilda Bagshot", "Merope Gaunt", "Hepzibah Smith", "Dolores Umbridge"], correctAnswer: "Merope Gaunt" },
  { question: "When Umbridge was in possession of the locket, what did she claim the 'S' on it stood for", options: ["Slytherin", "Scrimgeour", "Sinistra", "Selwyn"], correctAnswer: "Selwyn" }
];

const quizContainer = document.querySelector('.quiz-container');
const questionText = document.querySelector('.quiz-container .question');
const optionsContainer = document.querySelector('.quiz-container .options');
const nextButton = document.querySelector('.quiz-container .next-button');
const quizResult = document.querySelector('.quiz-result');

let questionIndex = 0;
let score = 0;
const TOTAL = quizData.length;
let timerInterval;

const shuffleArray = (array) => array.slice().sort(() => Math.random() - 0.5);

function disableOptions() {
  optionsContainer.querySelectorAll('button.option').forEach(b => b.disabled = true);
}

function checkAnswer(e) {
  const selected = e.target.textContent;
  const correct = quizData[questionIndex].correctAnswer;
  if (selected === correct) {
    score++;
    e.target.classList.add('correct');
  } else {
    e.target.classList.add('incorrect');
  }
  try { localStorage.setItem(`userAnswer_${questionIndex}`, selected); } catch (_) {}
  disableOptions();
}

function renderQuestion() {
  clearInterval(timerInterval);

  let secondsLeft = 10;
  const timerDisplay = document.querySelector('.quiz-container .timer');
  timerDisplay.classList.remove('danger');
  timerDisplay.textContent = `Time left: ${secondsLeft} seconds`;

  timerInterval = setInterval(() => {
    secondsLeft--;
    if (secondsLeft <= 0) {
      timerDisplay.textContent = `Time left: 0 seconds`;
      timerDisplay.classList.add('danger');
      clearInterval(timerInterval);
      nextQuestion();
      return;
    }

    timerDisplay.textContent = `Time left: ${secondsLeft.toString().padStart(2,0)} seconds`;
    if (secondsLeft < 3) {
      timerDisplay.classList.add('danger');
    }
  }, 1000);

  if (!questionText || !optionsContainer) return;
  optionsContainer.innerHTML = '';
  questionText.innerHTML = `<span class=\"question-number\">${questionIndex + 1}/${TOTAL}</span><span class=\"question-text\">${quizData[questionIndex].question}</span>`;
  const shuffled = shuffleArray(quizData[questionIndex].options);
  shuffled.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option';
    btn.textContent = opt;
    btn.addEventListener('click', checkAnswer);
    optionsContainer.appendChild(btn);
  });
}

// Compatibility wrapper: some older code expects `createQuestion()`
function createQuestion() {
  renderQuestion();
}

function showResults() {
  clearInterval(timerInterval);
  if (!quizResult || !quizContainer) return;
  quizContainer.style.display = 'none';
  quizResult.style.display = 'flex';
  quizResult.innerHTML = '';
  const h2 = document.createElement('h2');
  h2.textContent = `You have scored ${score} out of ${TOTAL}.`;
  quizResult.appendChild(h2);
  for (let i = 0; i < TOTAL; i++) {
    const item = document.createElement('div');
    item.className = 'question-container';
    const user = localStorage.getItem(`userAnswer_${i}`) || 'Not answered';
    const correct = quizData[i].correctAnswer;
    if (user !== correct) item.classList.add('incorrect');
    item.innerHTML = `<div class=\"question\">Question ${i+1}: ${quizData[i].question}</div><div class=\"user-answer\">Your answer: ${user}</div><div class=\"correct-answer\">Correct answer: ${correct}</div>`;
    quizResult.appendChild(item);
  }
  let retake = quizResult.querySelector('.retake-button');
  if (!retake) {
    retake = document.createElement('button');
    retake.className = 'retake-button';
    retake.textContent = 'Retake Quiz!';
    quizResult.appendChild(retake);
  }
  retake.addEventListener('click', resetQuiz);
}

function nextQuestion() {
  if (questionIndex >= TOTAL - 1) {
    showResults();
    return;
  }
  questionIndex++;
  renderQuestion();
}

function resetQuiz() {
  clearInterval(timerInterval);
  questionIndex = 0;
  score = 0;
  try { for (let i=0;i<TOTAL;i++) localStorage.removeItem(`userAnswer_${i}`); } catch(_){ }
  quizResult.style.display = 'none';
  quizContainer.style.display = '';
  quizData.sort(() => Math.random() - 0.5);
  renderQuestion();
}

// init
renderQuestion();
if (nextButton) nextButton.addEventListener('click', nextQuestion);
