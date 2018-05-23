function application() {

    let questionNavigator = function (questions) {
        let actualQuestionIndex = 0;

        function isThereMoreQuestions() {
            return actualQuestionIndex < questions.length;
        }

        function getQuestion() {
            return questions[actualQuestionIndex];
        }

        function goToNextQuestion() {
            if (isThereMoreQuestions()) {
                actualQuestionIndex++;
            }
        }

        function resetQuestions() {
            actualQuestionIndex = 0;
        }

        return {
            isThereMoreQuestions,
            goToNextQuestion,
            getQuestion,
            resetQuestions
        }
    };

    const boxQuestions = document.querySelector('.questions');
    const btnSend = document.querySelector('.btn');
    const btnStart = document.querySelector('.btnStart'); //todo disable button when game start

    const questions = [
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
                {id: 0, answer: "Lusaka", isCorrect: true, idQuestion: 3},
                {id: 1, answer: "Oporto", isCorrect: false, idQuestion: 3},
                {id: 2, answer: "Lisboa", isCorrect: false, idQuestion: 3}
            ]
        },
        {
            id: 4,
            question: "¿Cuál es la capital de Jordania?",
            answers: [
                {id: 0, answer: "Madrid", isCorrect: false, idQuestion: 4},
                {id: 1, answer: "Amán", isCorrect: true, idQuestion: 4},
                {id: 2, answer: "Lisboa", isCorrect: false, idQuestion: 4}
            ]
        },
        {
            id: 5,
            question: "¿Cuál es la capital de Panama?",
            answers: [
                {id: 0, answer: "Madrid", isCorrect: false, idQuestion: 5},
                {id: 1, answer: "Oporto", isCorrect: false, idQuestion: 5},
                {id: 2, answer: "Ciudad de Panamá", isCorrect: true, idQuestion: 5}
            ]
        }
    ];
    let message;
    let timer;
    let nameBox;
    let scoreUI;
    let totalPoints;
    let seconds;
    let sumPoints;
    let listNames;
    let inSetInterval;
    let score;
    let navigator = questionNavigator(questions);

    function start() {
        setElementsFromUI();
        initializeApplicationVariables();
        setButtonsListeners();
    }

    function setElementsFromUI() {
        message = document.getElementById('message');
        timer = document.getElementById('seconds');
        nameBox = document.getElementById('nameBox');
        scoreUI = document.getElementById('scoreUI');
    }

    function initializeApplicationVariables() {
        totalPoints = 0;
        seconds = 0;
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
        btnSend.addEventListener('click', function () {
            navigator.goToNextQuestion();
            printQuestionAndAnswers();
        });

        btnStart.addEventListener('click', onStart);

        const btnSave = document.querySelector('.btnSave');
        btnSave.addEventListener('click', onSave); //TODO: disable button while game is playing
    }

    function onStart() {
        changeButtonsVisibility();
        navigator.resetQuestions();
        printQuestionAndAnswers();
        inSetInterval = setInterval(timerAction, 1000); //El setInterval en una variable par luego utilizarla con el clearInterval
    }

    function changeButtonsVisibility() {
        btnStart.classList.toggle('invisible');
        btnSend.classList.toggle('invisible');
        boxQuestions.classList.remove('invisible');
    }

    function addEnableSendButtonEventToAnswers() {
        let answers = document.querySelectorAll('.answer');
        for (let answer of answers) {
            answer.addEventListener('click', () => {
                enableSendAnswerButton();
            });
        }
    }

    function enableSendAnswerButton() {
        btnSend.disabled = false
    }

    function printQuestionAndAnswers() {
        if (navigator.isThereMoreQuestions()) {
            let question = navigator.getQuestion();
            printQuestion(question);
            printAnswers(question.answers);
            addEnableSendButtonEventToAnswers();
        } else {
            gameOver();
        }
        disableSendAnswer();
    }

    function gameOver() {
        nameBox.classList.toggle('invisible');
        stopAndResetTimer()
    }

    function printAnswers(answers) {
        for (let i = 0; i < answers.length; i++) {
            printAnswer(answers[i]);
        }
    }

    function disableSendAnswer() {
        btnSend.disabled = true;
    }

    function printQuestion(question) {
        boxQuestions.innerHTML = `<div class="questionBox" id="${question.id}">${question.question}</div>`;
    }

    function printAnswer(answer) {
        boxQuestions.innerHTML +=
            `<div class="checkboxBox">
                <input type="radio" id="${answer.id}" name="options" class="answer" value="${answer.answer}"/>
                <label for="${answer.id}">${answer.answer}</label>
            </div>`;
    }

//Set interval con la función startTimer para que cada segundo compruebe que los segundos no han llegado a 20.
//Si llega a 20 ejecuta la función de pintar las preguntas, es decir, pasa a la siguiente y resta 3 puntos.

    function timerAction() {
        seconds++;
        timer.innerHTML = `${seconds}`;//todo extract this
        if (seconds === 20) {
            seconds = 0;
            navigator.goToNextQuestion();
            printQuestionAndAnswers();
            totalPoints -= 3;
            printScoreUI()
        }
    }

    function readUserAnswer() {
        const answers = document.querySelectorAll('.answer');
        let optionChecked = getOptionChecked(answers);
        correctIncorrectAnswer(navigator.getQuestion().answers, optionChecked);
    }

    function getOptionChecked(answers) {
        for (let i = 0; i < answers.length; i++) {
            if (answers[i].checked) {
                return answers[i];
            }
        }
    }

    function correctIncorrectAnswer(answers, optionChecked) {
        if (answers[optionChecked.id].isCorrect === true) {
            updateMessage('¡Correcta!');
            updateTotalPointsIfSuccess();
        }
        else if (answers[optionChecked.id].isCorrect !== true) {
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
        start,
        questionNavigator
    }
}

if (typeof module !== 'undefined') {
    module.exports = application;
}