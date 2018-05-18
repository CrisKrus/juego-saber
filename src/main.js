function application() {

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

    let message;
    let timer;
    let nameBox;
    let scoreUI;
    let totalPoints;
    let seconds;
    let actualQuestionSelected;
    let sumPoints;
    let listNames;
    let found;
    let optionChecked;
    let inSetInterval;
    let score;

    function start() {
        getElementsFromUI();
        initializeApplicationVariables();
        setButtonsListeners();
    }

    function getElementsFromUI() {
        message = document.getElementById('message');
        timer = document.getElementById('seconds');
        nameBox = document.getElementById('nameBox');
        scoreUI = document.getElementById('scoreUI');
    }

    function initializeApplicationVariables() {
        totalPoints = 0;
        seconds = 0;
        actualQuestionSelected = 0;
        score = { //Se guardan los nombres y las puntuaciones de cada jugador
            names:
                [],
            points:
                []
        };
        btnSend.disabled = true;
    }

    function setButtonsListeners() {
        btnSend.addEventListener('click', readUserAnswer);
        btnSend.addEventListener('click', printQuestionAndAnswers);

        btnStart.addEventListener('click', onStart);

        const btnSave = document.querySelector('.btnSave');
        btnSave.addEventListener('click', onSave);
    }

    function onStart() {
        changeButtonsVisibility();
        actualQuestionSelected = 0;
        printQuestionAndAnswers();
        inSetInterval = setInterval(timerAction, 1000); //El setInterval en una variable par luego utilizarla con el clearInterval
    }

    function changeButtonsVisibility() {
        btnStart.classList.toggle('invisible');
        btnSend.classList.toggle('invisible');
        boxQuestions.classList.remove('invisible');
    }

    function printQuestionAndAnswers() {
        if (actualQuestionSelected < questionsWithAnswers.length) {
            setQuestion();
            for (let x = 0; x < questionsWithAnswers[actualQuestionSelected].answers.length; x++) {
                addAnswer(x);
            }
            actualQuestionSelected++;
        } else {
            nameBox.classList.toggle('invisible');
            btnSend.disabled = true; //Se desabilita cuando llega al final de las preguntas
            stopAndResetTimer()
        }
    }

    function setQuestion() {
        let questionID = questionsWithAnswers[actualQuestionSelected].id;
        let question = questionsWithAnswers[actualQuestionSelected].question;
        boxQuestions.innerHTML = `<div class="questionBox" id="${questionID}">${question}</div>`;
    }

    function addAnswer(i) {
        let answer = questionsWithAnswers[actualQuestionSelected].answers;
        boxQuestions.innerHTML +=
            `<div class="checkboxBox">
                <input type="radio" id="${answer[i].id}" name="options" class="answer" value="${answer[i].answer}"/>
                <label for="${answer[i].id}">${answer[i].answer}</label>
            </div>`;
    }

//Set interval con la función startTimer para que cada segundo compruebe que los segundos no han llegado a 20.
//Si llega a 20 ejecuta la función de pintar las preguntas, es decir, pasa a la siguiente y resta 3 puntos.

    function timerAction() {
        seconds++;
        timer.innerHTML = `${seconds}`;
        if (seconds === 20) {
            seconds = 0;
            printQuestionAndAnswers();
            totalPoints -= 3;
            printScoreUI()
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

    function readUserAnswer() {
        const arrayRadioAnswers = document.querySelectorAll('.answer');
        getOptionChecked(arrayRadioAnswers);

        //todo extract that method
        found = questionsWithAnswers.find(function (question) {
            const questionBox = document.querySelector('.questionBox');
            if (question.id == questionBox.id) {
                return question;
            }
        });
        correctIncorrectAnswer(found, optionChecked);
    }

    function getOptionChecked(arrayRadioAnswers) {
        for (let i = 0; i < arrayRadioAnswers.length; i++) {
            if (arrayRadioAnswers[i].checked) {
                optionChecked = arrayRadioAnswers[i];
            }
        }
    }

    function correctIncorrectAnswer() {
        if (found.answers[optionChecked.id].isCorrect === true) {
            updateMessage('¡Correcta!');
            updateTotalPointsIfSuccess();
        }
        else if (found.answers[optionChecked.id].isCorrect !== true) {
            updateMessage('¡Incorrecta!');
            updateTotalPointsIfFails();
        }
        printScoreUI();
        seconds = 0;
    }

    function updateMessage(messageText) {
        message.innerHTML = `<h3>${messageText}</h3>`;
    }

    function updateTotalPointsIfFails() {
        if (seconds >= 11) {
            totalPoints -= 2;
        }
        else if (seconds <= 10) {
            totalPoints -= 1;
        }
    }

    function updateTotalPointsIfSuccess() {
        if (seconds <= 2) {
            totalPoints += 2;
        }
        else if (seconds >= 3 && seconds <= 10) {
            totalPoints += 1;
        }
    }

    function printScoreUI() {
        scoreUI.innerHTML = ` ${totalPoints} puntos`
    }

    function onSave() {
        saveName();
        savePoints();
        printPointsAndName(listNames, sumPoints);
        resetTimeAndPoints();
        cleanButtonsAndBoxes();
    }

    function saveName() {
        let name = document.querySelector('#inputNameId').value;
        score.names.push(name);
        listNames = score.names;
    }

    function savePoints() {
        score.points.push(totalPoints);
        sumPoints = score.points;
    }

    function printPointsAndName() {
        let scoreList = document.querySelector('.list');
        let newScoreList = '';
        for (let i = 0; i < listNames.length; i++) {
            newScoreList = addNameAndPointsToScoreboard(newScoreList, i);
        }
        scoreList.innerHTML = newScoreList;
    }

    function addNameAndPointsToScoreboard(newScoreList, i) {
        newScoreList +=
            `<li class="eachBoxPlayer">${listNames[i]} - 
                    <div class="actualPoints"> ${sumPoints[i]} puntos </div>
                </li>`;
        return newScoreList;
    }

    function resetTimeAndPoints() {
        totalPoints = 0;
        printScoreUI();
        stopAndResetTimer();
    }

    function stopAndResetTimer() {
        seconds = 0;
        clearInterval(inSetInterval);
        timer.innerHTML = '';
    }

    function cleanButtonsAndBoxes() {
        btnStart.classList.toggle('invisible');
        btnSend.classList.toggle('invisible');
        boxQuestions.classList.add('invisible');
        nameBox.classList.add('invisible');
        updateMessage('');
    }

    return {
        start
    }
}

if (typeof module !== 'undefined') {
    module.exports = application;
}