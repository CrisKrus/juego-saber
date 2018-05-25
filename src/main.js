var saberganar = saberganar || {};

saberganar.game = function (questionNavigator) {

    let questions;
    let totalPoints;
    let seconds;
    let sumPoints;
    let listNames;
    let inSetInterval;
    let score;
    let theQuestionNavigator;
    let serverData = null;

    function start() {
        initializeApplicationVariables();
        UI().setButtonsListeners();
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
        UI().disableSendAnswer();
        getQuestions(function (data) {
            questions = data;
            theQuestionNavigator = questionNavigator(questions);
        });
    }

    function getQuestions(callback) {
        serverData = serverData || [
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
        callback(serverData);
    }

    ///////////////GAME////////////
    function resetTimeAndPoints() {
        totalPoints = 0;
        UI().printScoreUI();
        stopAndResetTimer();
    }

    function savePoints() {
        score.points.push(totalPoints);
        sumPoints = score.points;
    }

    function saveUser() {
        saveName();
        savePoints();
    }

    function saveName() {
        let name = document.querySelector('#inputNameId').value;
        score.names.push(name);
        listNames = score.names;
    }

    function UI() {

        let boxQuestions = document.getElementById('question');
        let btnSend = document.getElementById('submit-answer');
        let btnStart = document.getElementById('start-button'); //todo disable button when game start

        function setButtonsListeners() {
            btnSend.addEventListener('click', readUserAnswer);
            btnSend.addEventListener('click', function () {
                theQuestionNavigator.goToNextQuestion();
                printQuestionAndAnswers();
            });

            btnStart.addEventListener('click', onStart);

            const btnSave = document.querySelector('.btnSave');
            btnSave.addEventListener('click', onSave); //TODO: disable button while game is playing
        }

        function onStart() {
            changeButtonsVisibility();
            theQuestionNavigator.resetQuestions();
            printQuestionAndAnswers();
            inSetInterval = setInterval(timerAction, 1000); //El setInterval en una variable par luego utilizarla con el clearInterval
        }

        function onSave() {
            saveUser();
            printPointsAndName(listNames, sumPoints);
            resetTimeAndPoints();
            cleanButtonsAndBoxes();
        }

        function readUserAnswer() {
            const answers = document.querySelectorAll('.answer');
            let optionChecked = getOptionChecked(answers);
            correctIncorrectAnswer(theQuestionNavigator.getQuestion().answers, optionChecked);
        }

        function correctIncorrectAnswer(answers, optionChecked) {
            if (answers[optionChecked.id].isCorrect === true) {
                UI().updateMessage('¡Correcta!');
                updateTotalPointsIfSuccess();
            }
            else if (answers[optionChecked.id].isCorrect !== true) {
                UI().updateMessage('¡Incorrecta!');
                updateTotalPointsIfFails();
            }
            UI().printScoreUI();
            seconds = 0;
        }

        ////////////////////////////////////////////

        let message = document.getElementById('message');
        let timer = document.getElementById('seconds');
        let nameBox = document.getElementById('nameBox');
        let scoreUI = document.getElementById('scoreUI');

        function printScoreUI() {
            scoreUI.innerHTML = ` ${totalPoints} puntos`
        }

        function printQuestionAndAnswers() {
            if (theQuestionNavigator.isThereMoreQuestions()) {
                let question = theQuestionNavigator.getQuestion();
                printQuestion(question);
                printAnswers(question.answers);
                addEnableSendButtonEventToOptions();
            } else {
                gameOver();
            }
            disableSendAnswer();
        }

        function printQuestion(question) {
            boxQuestions.innerHTML = `<div class="questionBox" id="${question.id}">${question.question}</div>`;
        }

        function printAnswers(answers) {
            for (let i = 0; i < answers.length; i++) {
                printAnswer(answers[i]);
            }
        }

        function printAnswer(answer) {
            boxQuestions.innerHTML +=
                `<div class="checkboxBox">
                <input type="radio" id="${answer.id}" name="options" class="answer" value="${answer.answer}"/>
                <label for="${answer.id}">${answer.answer}</label>
            </div>`;
        }

        function printPointsAndName() {
            let scoreList = document.querySelector('.list');
            let newScoreList = '';
            for (let i = 0; i < listNames.length; i++) {
                newScoreList = addNewNameAndPointsToScoreboard(newScoreList, i);
            }
            scoreList.innerHTML = newScoreList;
        }

        function printTimer(time) {
            timer.innerHTML = `${time}`;
        }

        function updateMessage(messageText) {
            message.innerHTML = `<h3>${messageText}</h3>`;
        }

        function addNewNameAndPointsToScoreboard(newScoreList, i) {
            newScoreList +=
                `<li class="eachBoxPlayer">${listNames[i]} - 
                    <div class="actualPoints"> ${sumPoints[i]} puntos </div>
                </li>`;
            return newScoreList;
        }

        function changeButtonsVisibility() {
            boxQuestions.classList.remove('invisible');
            btnSend.classList.toggle('invisible');
            btnStart.classList.toggle('invisible');
        }

        function toggleInvisibleNameBox() {
            nameBox.classList.toggle('invisible');
        }

        function cleanButtonsAndBoxes() {
            btnStart.classList.toggle('invisible');
            btnSend.classList.toggle('invisible');
            boxQuestions.classList.add('invisible');
            nameBox.classList.add('invisible');
            updateMessage('');
        }

        function addEnableSendButtonEventToOptions() {
            let options = document.querySelectorAll('.answer');
            for (let option of options) {
                option.addEventListener('click', () => {
                    enableSendAnswerButton();
                });
            }
        }

        function enableSendAnswerButton() {
            btnSend.disabled = false
        }

        function disableSendAnswer() {
            btnSend.disabled = true;
        }

        function getOptionChecked(answers) {
            for (let i = 0; i < answers.length; i++) {
                if (answers[i].checked) {
                    return answers[i];
                }
            }
        }

        return {
            setButtonsListeners,
            updateMessage,
            printScoreUI,
            printQuestionAndAnswers,
            toggleInvisibleNameBox,
            disableSendAnswer,
            printTimer
        }
    }

    function gameOver() {
        UI().toggleInvisibleNameBox();
        stopAndResetTimer();
        //TODO: hide questions and options
    }

    function timerAction() {
        seconds++;
        UI().printTimer(seconds);
        if (seconds === 20) {//todo put timer on 20
            seconds = 0;
            theQuestionNavigator.goToNextQuestion();
            totalPoints -= 3;
            UI().printQuestionAndAnswers();
            UI().printScoreUI();
        }
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

    function stopAndResetTimer() {
        seconds = 0;
        clearInterval(inSetInterval);
        UI().printTimer('');
    }

    return {
        start,
        setServerData: function (data) {
            serverData = data;
        }
    }
};

if (isNodeAvailable()) {
    module.exports = saberganar;
}

function isNodeAvailable() {
    return typeof module !== 'undefined';
}
