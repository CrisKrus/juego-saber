function start() {
    'use strict';

    const questionsWithAnswers = [
        {
            id: 1,
            question: "¿Cuál es la capital de Portugal?",
            answers: [
                {id: 0, answer: "Faro", isCorrect: false, idQuestion: 1},
                {id: 1, answer: "Oporto", isCorrect: false, idQuestion: 1},
                {id: 2, answer: "Lisboa", isCorrect: true, idQuestion: 1}
            ]
        },
        {
            id: 2,
            question: "¿Cuál es la capital de Egipto?",
            answers: [
                {id: 0, answer: "Faro", isCorrect: false, idQuestion: 2},
                {id: 1, answer: "El Cairo", isCorrect: true, idQuestion: 2},
                {id: 2, answer: "Lisboa", isCorrect: false, idQuestion: 2}
            ]
        },
        {
            id: 3,
            question: "¿Cuál es la capital de Zambia?",
            answers: [
                {id: 0, answer: "Lusaka", isCorrect: true, idQuestion: 4},
                {id: 1, answer: "Oporto", isCorrect: false, idQuestion: 4},
                {id: 2, answer: "Lisboa", isCorrect: false, idQuestion: 4}
            ]
        },
        {
            id: 4,
            question: "¿Cuál es la capital de Jordania?",
            answers: [
                {id: 0, answer: "Madrid", isCorrect: false, idQuestion: 5},
                {id: 1, answer: "Amán", isCorrect: true, idQuestion: 5},
                {id: 2, answer: "Lisboa", isCorrect: false, idQuestion: 5}
            ]
        },
        {
            id: 5,
            question: "¿Cuál es la capital de Panama?",
            answers: [
                {id: 0, answer: "Madrid", isCorrect: false, idQuestion: 6},
                {id: 1, answer: "Oporto", isCorrect: false, idQuestion: 6},
                {id: 2, answer: "Ciudad de Panamá", isCorrect: true, idQuestion: 6}
            ]
        }
    ];


    const boxQuestions = document.querySelector('.questions');
    const btnSend = document.querySelector('.btn');
    const btnStart = document.querySelector('.btnStart');
    const btnSave = document.querySelector('.btnSave');
    let msg = document.querySelector('.message');
    let timer = document.querySelector('.seconds');
    let nameBox = document.querySelector('.nameBox');
    let scoreUI = document.querySelector('.scoreUI');
    let totalPoints = 0;
    let seconds = 0;
    let i = 0; //TODO what is i?
    let sumPoints;
    let listNames;
    let found;
    let optionChecked;
    let inSetInterval;
    btnSend.disabled = true;


//INICIALIZA el juego y el tiempo

    btnStart.addEventListener('click', onStart);

    function onStart() {
        btnStart.classList.toggle('invisible');
        btnSend.classList.toggle('invisible');
        boxQuestions.classList.remove('invisible');
        i = 0; //TODO Why i? What is i?
        paintQuestions();
        inSetInterval = setInterval(startTimer, 1000); //El setInterval en una variable par luego utilizarla con el clearInterval
    }


//SUCESIÓN DE PREGUNTAS

    function paintQuestions() {
        if (i < questionsWithAnswers.length) {
            // document.getElementById()
            boxQuestions.innerHTML =
                `<div class="questionBox" id="${questionsWithAnswers[i].id}">${questionsWithAnswers[i].question}</div>`;
            for (let x = 0; x < questionsWithAnswers[i].answers.length; x++) {
                boxQuestions.innerHTML +=
                    `<div class="checkboxBox">
            <input type="radio" id="${questionsWithAnswers[i].answers[x].id}" name="options" class="answer" value="${questionsWithAnswers[i].answers[x].answer}"/>
        <label for="${questionsWithAnswers[i].answers[x].id}">${questionsWithAnswers[i].answers[x].answer}</label>
        </div>`;
            }
            i++;
            msg.innerHTML = '';
        } else {
            nameBox.classList.toggle('invisible');
            btnSend.disabled = true; //Se desabilita cuando llega al final de las preguntas
            stopTimer()
        }
    }

//Set interval con la función startTimer para que cada segundo compruebe que los segundos no han llegado a 20.
//Si llega a 20 ejecuta la función de pintar las preguntas, es decir, pasa a la siguiente y resta 3 puntos.

    function startTimer() {
        seconds++;
        timer.innerHTML = `${seconds}`;
        if (seconds === 20) {
            seconds = 0;
            paintQuestions();
            totalPoints -= 3;
            console.log(totalPoints);//todo delete this
            printScoreUIRealTime()
        }
        btnSend.disabled = true; //TODO disable button at the beginning of the round
        let answers = document.querySelectorAll('.answer');
        btnSend.disabled = !isAnyAnswerSelected(answers);
    }

    function isAnyAnswerSelected(answers) {
        for (let a of answers) {
            if (a.checked) {
                return true
            }
        }
        return false;
    }

//SELECCIONAR RESPUESTA Y PUNTOS

    btnSend.addEventListener('click', readUserAnswer);
    btnSend.addEventListener('click', paintQuestions);

    function readUserAnswer() {
        const arrayRadioAnswers = document.querySelectorAll('.answer');

        for (let i = 0; i < arrayRadioAnswers.length; i++) {
            if (arrayRadioAnswers[i].checked) {
                optionChecked = arrayRadioAnswers[i];
            }
        }
        found = questionsWithAnswers.find(function (question) {
            const questionBox = document.querySelector('.questionBox');
            if (question.id == questionBox.id) {
                return question;
            }
        });
        correctIncorrectAnswer(found, optionChecked);
    }

    function correctIncorrectAnswer(a, b) {
        if (found.answers[optionChecked.id].isCorrect === true) {
            console.log('BIEN');
            msg.innerHTML = `<h3> ¡Correcta! </h3>`;
            if (seconds <= 2) {
                totalPoints += 2;
            }
            else if (seconds >= 3 && seconds <= 10) {
                totalPoints += 1;
            }
            else {
                totalPoints;
            }
        }
        else if (found.answers[optionChecked.id].isCorrect !== true) {
            console.log('MAL');
            msg.innerHTML = `<h3> ¡Incorrecta! </h3>`;
            if (seconds >= 11) {
                totalPoints -= 2;
            }
            else if (seconds <= 10) {
                totalPoints -= 1;
            }
        }
        printScoreUIRealTime();
        console.log(totalPoints);
        seconds = 0;
    }


    function printScoreUIRealTime() {
        scoreUI.innerHTML = ` ${totalPoints} puntos`
    }

// MARCADOR

    btnSave.addEventListener('click', onSave);

    function onSave() {
        saveScoreAndName();
        resetTimeAndPoints();
        cleanButtonsAndBoxes();
    }

    let score = { //Se guardan los nombres y las puntuaciones de cada jugador
        names:
            [],
        points:
            []
    };

    function saveScoreAndName() {
        let name = document.querySelector('#inputNameId').value;
        score.names.push(name);
        listNames = score.names;
        console.log(listNames);
        score.points.push(totalPoints);
        sumPoints = score.points;
        console.log(sumPoints);
        printScoreAndName(listNames, sumPoints)
    }

    function printScoreAndName(a, b) {
        let scoreList = document.querySelector('.list');
        let add = '';
        for (let i = 0; i < listNames.length; i++) {
            add +=
                `<li class="eachBoxPlayer">
            ${listNames[i]} - <div class="actualPoints"> ${sumPoints[i]} puntos </div>
        </li>`;
        }
        scoreList.innerHTML = add;
    }


//RESETEA temporizador y puntos y lo deja preparado para iniciar el juego de nuevo

    function stopTimer() {
        seconds = 0;
        clearInterval(inSetInterval);
    }

    function resetTimeAndPoints() {
        totalPoints = 0;
        printScoreUIRealTime();
        stopTimer();
        timer.innerHTML = '';
    }

    function cleanButtonsAndBoxes() {
        btnStart.classList.toggle('invisible');
        btnSend.classList.toggle('invisible');
        boxQuestions.classList.add('invisible');
        nameBox.classList.add('invisible');
        msg.innerHTML = '';
    }

    return {
        isAnyAnswerSelected
    }
}