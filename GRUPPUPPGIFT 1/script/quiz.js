const STARTVIEW = document.getElementById("STARTVIEW")
const QUIZVIEW = document.getElementById("QUIZVIEW")
const COMPLETEVIEW = document.getElementById("COMPLETEVIEW")
const FEEDBACKVIEW = document.getElementById("FEEDBACKVIEW")
//test
const QUESTION_TEXT = document.getElementById("QUESTION_TEXT")
const ANSWERS_CONTAINER = document.getElementById("ANSWERS_CONTAINER")

const START_BTN = document.getElementById("START_BTN")
const PREV_BTN = document.getElementById("PREV_BTN")
const NEXT_BTN = document.getElementById("NEXT_BTN")
const RESTART_BTN = document.getElementById("RESTART_BTN")

const QUESTION_NR = document.getElementById("QUESTION_NR")

const questions = [
    {
        id: 1,
        question: `Vad står "J.R.R." för i J.R.R. Tolkiens namn?`,
        correctAnswer: `John Ronald Reuel`,
        firstIncorrectAnswer: `John Rory Reuben`,
        secondIncorrectAnswer: `Jonathan Robert Rowan`,
        thirdIncorrectAnswer: `Jolkien Rolkien Rolkien`,
        fourthIncorrectAnswer: `James Ronald Rupert`,
        answered: false
    },
    {
        id: 2,
        question: `Vilket är ett annat ord för "trollkarl" i Tolkiens värld?`,
        correctAnswer: `Istar`,
        firstIncorrectAnswer: `Ainur`,
        secondIncorrectAnswer: `Aulë`,
        thirdIncorrectAnswer: `Vaiar`,
        fourthIncorrectAnswer: `Magus`,
        answered: false
    },
    {
        id: 3,
        question: `Gandalf är den Grå, Saruman den Vite och Radagast den Brune, men vad heter de två blå trollkarlarna i Tolkiens böcker?`,
        correctAnswer: `Alatar och Pallando`,
        firstIncorrectAnswer: `Morin och Rùaman`,
        secondIncorrectAnswer: `Fingolfin och Anari`,
        thirdIncorrectAnswer: `Melkor och Luin`,
        fourthIncorrectAnswer: `Penn och Teller`,
        answered: false
    },
    {
        id: 4,
        question: `Vad heter staden där ett flertal av Terry Pratchetts böcker om Skivvärlden utspelar sig?`,
        correctAnswer: `Ankh-Morpork`,
        firstIncorrectAnswer: `Gormenghast`,
        secondIncorrectAnswer: `Camorr-Ptolus`,
        thirdIncorrectAnswer: `Staden har inget namn`,
        fourthIncorrectAnswer: `Ambergris`,
        answered: false
    },
    {
        id: 5,
        question: `Vem eller vad bär upp hela världen i Skivvärldens mytologi?`,
        correctAnswer: `Fyra elefanter på ryggen av en sköldpadda`,
        firstIncorrectAnswer: `Titanen Atlas`,
        secondIncorrectAnswer: `Nio paddor ovanpå en kosmisk manet`,
        thirdIncorrectAnswer: `Trollkarlen Rensvind`,
        fourthIncorrectAnswer: `Sex vita kolumner av pärlsten`,
        answered: false
    },
    {
        id: 6,
        question: `Vad heter magins färg i Terry Pratchetts böcker?`,
        correctAnswer: `Oktarin`,
        firstIncorrectAnswer: `Trikrom`,
        secondIncorrectAnswer: `Olo`,
        thirdIncorrectAnswer: `Magitone`,
        fourthIncorrectAnswer: `Antevit`,
        answered: false
    },
    {
        id: 7,
        question: `Vilken polsk författare har skrivit böckerna om Häxkarlen (The Witcher)?`,
        correctAnswer: `Andrzej Sapkowski`,
        firstIncorrectAnswer: `Jarosław Grzędowicz`,
        secondIncorrectAnswer: `Andrzej Pilipiuk`,
        thirdIncorrectAnswer: `Anna Brzezińska`,
        fourthIncorrectAnswer: `Dorota Terakowska`,
        answered: false
    },
    {
        id: 8,
        question: `Vad kallas den stora magiska katastrof som ägde rum för ca 1500 år sedan i Witcher-världen?`,
        correctAnswer: `Sfärernas Konjunktion`,
        firstIncorrectAnswer: `Den Första Splittringen`,
        secondIncorrectAnswer: `Söndringen av Cirkeln`,
        thirdIncorrectAnswer: `Planeternas Rekursion`,
        fourthIncorrectAnswer: `Anfangsförödelsen`,
        answered: false
    },
    {
        id: 9,
        question: `Vilket kortspel blev populärt i och med videospelet The Witcher 3?`,
        correctAnswer: `Gwent`,
        firstIncorrectAnswer: `Caravan`,
        secondIncorrectAnswer: `Queen's Blood`,
        thirdIncorrectAnswer: `Pazaak`,
        fourthIncorrectAnswer: `Triple Triad`,
        answered: false
    },
    {
        id: 10,
        question: `Vilket år publicerades "Kampen om Järntronen", första boken i serien "Sagan om is och eld" av George R.R. Martin?`,
        correctAnswer: `1996`,
        firstIncorrectAnswer: `1991`,
        secondIncorrectAnswer: `1999`,
        thirdIncorrectAnswer: `1992`,
        fourthIncorrectAnswer: `1989`,
        answered: false
    },
    {
        id: 11,
        question: `Hur många skådespelare har gestaltat Ser Gregor "The Mountain" Clegane i TV-serien Game of Thrones?`,
        correctAnswer: `3`,
        firstIncorrectAnswer: `2`,
        secondIncorrectAnswer: `4`,
        thirdIncorrectAnswer: `1`,
        fourthIncorrectAnswer: `1, men två olika röstskådespelare`,
        answered: false
    },
    {
        id: 12,
        question: `Vem är kung då "Sagan om is och eld" inleds i första boken?`,
        correctAnswer: `Robert I Baratheon`,
        firstIncorrectAnswer: `King Aerys II Targaryen - "The Mad King"`,
        secondIncorrectAnswer: `Joffrey I Baratheon`,
        thirdIncorrectAnswer: `Eddard Stark`,
        fourthIncorrectAnswer: `Tyrion Lannister`,
        answered: false
    },
]

//** Håller koll på vilken fråga vi är på **
let currentQuestionIndex = -1
let progressIndex = String(currentQuestionIndex + 2)

//** Poängräknare **

const POINTS_EL = document.getElementById("POINTS")
let pointCounter = 0;

const updatePoints = (selectedAnswer, currentQuestion) => {
    if (selectedAnswer === currentQuestion.correctAnswer) {
        pointCounter++;
    }

    POINTS_EL.textContent = pointCounter;
}

//** Blandar svaren **
const shuffleAnswers = (x) => {
    return [x.correctAnswer, x.firstIncorrectAnswer, x.secondIncorrectAnswer, x.thirdIncorrectAnswer, x.fourthIncorrectAnswer].sort(() => Math.random() - 0.5)
}

//** Ritar ut frågorna i html **
const renderQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex]

    QUESTION_NR.textContent = `Fråga ${currentQuestionIndex + 1} av 12`


    //nollställer text och knappar inför den nya frågan:
    QUESTION_TEXT.textContent = currentQuestion.question
    ANSWERS_CONTAINER.innerHTML = "" 
    FEEDBACKVIEW.textContent = ""
    NEXT_BTN.disabled = true 

    //disable previous-knappen på första frågan:
    PREV_BTN.disabled = (currentQuestionIndex === 0)


    //hämtar de blandade svaren:
    const answers = shuffleAnswers(currentQuestion)

    //skapar HTML element för varje svarsalternativ:
    answers.forEach((answerText, index) => {

        const div = document.createElement("div")
        div.classList.add("answer-option")
        const radio = document.createElement("input")
        radio.type = "radio"
        radio.value = answerText
        radio.id = "answerID" + index //ger varje radioknapp ett unikt ID.
        radio.name = "quiz_answer" //alla radioknappar får samma namn.
        const answer = document.createElement("label")
        answer.textContent = answerText
        answer.htmlFor = "answerID" + index //ger ett unikt ID till labels.

        radio.addEventListener("change", () => { //det som händer när man klickar på ett svar.

            NEXT_BTN.disabled = false 

            const allAnswers = ANSWERS_CONTAINER.querySelectorAll("input[type='radio']")
            allAnswers.forEach(ans => ans.disabled = true) //hämtar alla radioknappar och stänger av dom efter ett val.
        
            // const radioButtons = ANSWERS_CONTAINER.querySelectorAll(".answer-option") //gör en div för varje radioknapp och skapar en klass för dom.
            // radioButtons.forEach(radioButton => {
            //     const clickedOn = raddioButton.querySelectorAll("input")

            //     if (clickedOn.value !== currentQuestion.correctAnswer) {
            //         radioButton.classList.add("answer-option-disabled")
            //     } else {
            //         radioButton.classList.add("answer-option")
            //     }
            // })

            if (radio.value === currentQuestion.correctAnswer) { //kolla om det är rätt eller fel.
                FEEDBACKVIEW.textContent = "Rätt svar!"
                updatePoints(radio.value, currentQuestion);
            } else {
                FEEDBACKVIEW.textContent = `Fel svar!
                Rätt svar är: ${currentQuestion.correctAnswer}`
            }
            questions[currentQuestionIndex].answered = true;
            document.getElementById(String(currentQuestionIndex + 1)).classList.replace("not-answered", "answered");
            console.log(questions[currentQuestionIndex].answered)
        })

        div.appendChild(radio) 
        div.appendChild(answer)
        ANSWERS_CONTAINER.appendChild(div)
    })
}


const renderApp = () => {
    //startskärmen:
    if (currentQuestionIndex === -1) {
        STARTVIEW.style.display = "block"
        QUIZVIEW.style.display = "none"
        COMPLETEVIEW.style.display = "none"
    } 
    //slutskärmen:
    else if (currentQuestionIndex >= questions.length) {
        STARTVIEW.style.display = "none"
        QUIZVIEW.style.display = "none"
        COMPLETEVIEW.style.display = "block"
    } 
    //quizzet:
    else {
        STARTVIEW.style.display = "none"
        QUIZVIEW.style.display = "block"
        COMPLETEVIEW.style.display = "none"
        renderQuestion()
    }
}

//knappar:
START_BTN.addEventListener("click", () => {
    currentQuestionIndex = 0
    renderApp()
})

PREV_BTN.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--
        renderApp()
    }
})

RESTART_BTN.addEventListener("click", () => {
    currentQuestionIndex = -1
    let a = document.getElementsByClassName( "answered" );
    [...a].forEach( x => x.className = "not-answered" );
    [...a].forEach( x => x.classList.remove("answered") );
    pointCounter = 0;
    POINTS_EL.textContent = pointCounter;
    QUESTION_NR.textContent = `Fråga 0 av 12`
    console.log(document.getElementById(1))
    renderApp()
})

NEXT_BTN.addEventListener("click", () => {
    currentQuestionIndex++
    renderApp()
})

renderApp()
