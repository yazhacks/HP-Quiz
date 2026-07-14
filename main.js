let quizData = [
    {
        question: "In the first book, what kind of snake does Harry accidentally set free at the zoo?",
        options: ["Sahara Sand Viper", "Burmese Python", "Indian Cobra", "Brazilian Boa Constrictor"],
        correctAnswer: "Burmese Python"
    },
    {
        question: "In Chamber of Secrets, what potion do the golden trio use to find out if Draco Malfoy is the heir of Slytherin?",
        options: ["Felix Felicis", "Veritaserum", "Amortentia", "Polyjuice Potion"],
        correctAnswer: "Polyjuice Potion"
    },
    {
        question: "Who teaches Arithmancy at Hogwarts?",
        options: ["Professor Vector", "Professor Binns", "Professor Babbling", "Professor Trelawny"],
        correctAnswer: "Professor Vector"
    },
    {
        question: "What dragon does Viktor Krum face in the first task of the Triwizard Tournament?",
        options: ["The Hungarian Horntail", "The Swedish Short-Snout", "The Chinese Fireball", "The Common Welsh Green"],
        correctAnswer: "The Chinese Fireball"
    },
    {
        question: "Who betrays Dumbledore's Army in Order of the Phoenix?",
        options: ["Severus Snape", "Cho Chang", "Marrietta Edgecombe", "Justin Finch-Fletchley"],
        correctAnswer: "Marietta Edgecombe"
    },
    {
        question: "What is the name of Tom Riddle's mother?",
        options: ["Bathilda Bagshot", "Merope Gaunt", "Hepzibah Smith", "Dolores Umbridge"],
        correctAnswer: "Merope Gaunt"
    },
    {
        question: "When Umbridge was in possession of the locket, what did she claim the 'S' on it stood for",
        options: ["Slytherin", "Scrimgeour", "Sinistra", "Selwyn"],
        correctAnswer: "Selwyn"
    }
];

const quizContainer = document.querySelector('.quiz-container');
const questionText = document.querySelector('.quiz-container .question');
const optionsContainer = document.querySelector('.quiz-container .options');
const nextButton = document.querySelector('.quiz-container .next-button');
const quizResult = document.querySelector('.quiz-result');
const retakeButton = document.querySelector('.retake-button');

let questionNumber = 0;
const MAX_Questions = quizData.length;

const shuffleArray = (array) => array.slice().sort(() => Math.random() - 0.5);

const createQuestion = () => {
    optionsContainer.innerHTML = "";
    questionText.textContent = quizData[questionNumber].question;

    const shuffledOptions = shuffleArray(quizData[questionNumber].options);

    shuffledOptions.forEach((o) => {
        const option = document.createElement('button');
        option.classList.add('option');
        option.textContent = o;
        optionsContainer.appendChild(option);
    });
}

const displayQuizResult = () => {
    quizResult.style.display = 'flex';
    quizContainer.style.display = 'none';
}

const displayNextQuestion = () => {
    if (questionNumber >= MAX_Questions - 1) {
        displayQuizResult();
        return;
    }

    questionNumber++;
    createQuestion();
}

const resetQuiz = () => {
    questionNumber = 0;
    quizResult.style.display = 'none';
    quizContainer.style.display = '';
    createQuestion();
}

createQuestion();
nextButton.addEventListener('click', displayNextQuestion);
retakeButton.addEventListener('click', resetQuiz); 











