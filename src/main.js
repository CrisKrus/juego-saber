var saberganar = saberganar || {};

saberganar.game = function (questionNavigator, scoreManager) {

    const page = UI();
    const score = scoreManager();

    let questions;
    let seconds;
    let inSetInterval;
    let theQuestionNavigator;
    let serverData = null;

    function start() {
        initializeApplicationVariables();
        page.disableSendAnswer();
        page.setButtonsListeners();
    }

    function initializeApplicationVariables() {
        score.resetActualScore();
        resetTimer();
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

    function resetTimeAndPoints() {
        score.resetActualScore();
        page.printScoreUI(score.getActualScore());
        stopAndResetTimer();
        page.printTimer(seconds);
    }

    function saveUser(name, points) {
        score.saveName(name);
        score.savePoints(points);
    }

    function areSecondsMoreThan(toCompare) {
        return seconds > toCompare;
    }

    function areSecondsLessThan(toCompare) {
        return seconds < toCompare;
    }

    function resetTimer() {
        seconds = 0;
    }

    function incrementSeconds() {
        seconds++;
    }

    function isSecondsEqualTo(toCompare) {
        return seconds === toCompare;
    }

    function UI() {

        let boxQuestions = document.getElementById('question');
        let btnSend = document.getElementById('submit-answer');
        let btnStart = document.getElementById('start-button');

        function setButtonsListeners() {
            btnSend.addEventListener('click', readUserAnswer);
            btnSend.addEventListener('click', function () {
                theQuestionNavigator.goToNextQuestion();
                printQuestionAndAnswers();
            });

            btnStart.addEventListener('click', onStart);

            const btnSave = document.querySelector('.btnSave');
            btnSave.addEventListener('click', onSave);
        }

        function onStart() {
            changeButtonsVisibility();
            theQuestionNavigator.resetQuestions();
            printQuestionAndAnswers();
            inSetInterval = setInterval(timerAction, 1000); //El setInterval en una variable par luego utilizarla con el clearInterval
        }

        function changeButtonsVisibility() {
            boxQuestions.classList.remove('invisible');
            btnSend.classList.toggle('invisible');
            btnStart.classList.toggle('invisible');
        }

        function onSave() {
            saveUser(page.getInputName(), score.getActualScore());
            printPointsAndName(score.getNames(), score.getPoints());
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
                page.updateMessage('¡Correcta!');
                updateTotalPointsIfSuccess();
            }
            else if (answers[optionChecked.id].isCorrect !== true) {
                page.updateMessage('¡Incorrecta!');
                updateTotalPointsIfFails();
            }
            page.printScoreUI(score.getActualScore());
            resetTimer();
        }

        function updateTotalPointsIfFails() {
            if (areSecondsMoreThan(12)) {
                score.decrementScore(2);
            }
            else if (areSecondsLessThan(11)) {
                score.decrementScore(1)
            }
        }

        function updateTotalPointsIfSuccess() {
            if (areSecondsLessThan(3)) {
                score.incrementScore(2);
            }
            else if (areSecondsLessThan(11)) {
                score.incrementScore(1);
            }
        }

        ////////////////////////////////////////////

        let nameBox = document.getElementById('nameBox');

        function printScoreUI(points) {
            document.getElementById('scoreUI').innerHTML = ` ${points} puntos`
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

        function printPointsAndName(listNames, sumPoints) {
            let newScoreList = '';
            for (let i = 0; i < listNames.length; i++) {
                newScoreList += newNameAndPointsToScoreboard(sumPoints[i], listNames[i]);
            }
            updateScoreBoard(newScoreList);
        }

        function updateScoreBoard(newScoreList) {
            document.querySelector('.list').innerHTML = newScoreList;
        }

        function newNameAndPointsToScoreboard(sumPoints, listNames) {
            return `<li class="eachBoxPlayer">${listNames} -
                    <div class="actualPoints"> ${sumPoints} puntos </div>
                </li>`;
        }

        function printTimer(time) {
            document.getElementById('seconds').innerHTML = `${time}`;
        }

        function updateMessage(messageText) {
            document.getElementById('message').innerHTML = `<h3>${messageText}</h3>`;
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

        function getInputName() {
            return document.querySelector('#inputNameId').value;
        }

        return {
            setButtonsListeners,
            updateMessage,
            printScoreUI,
            printQuestionAndAnswers,
            toggleInvisibleNameBox,
            disableSendAnswer,
            printTimer,
            getInputName
        }
    }

    function gameOver() {
        page.toggleInvisibleNameBox();
        stopAndResetTimer();
        page.printTimer(seconds);
    }

    function timerAction() {
        incrementSeconds();
        page.printTimer(seconds);
        if (isSecondsEqualTo(20)) {
            resetTimer();
            theQuestionNavigator.goToNextQuestion();
            score.decrementScore(3);
            page.printQuestionAndAnswers();
            page.printScoreUI(score.getActualScore());
        }
    }

    function stopAndResetTimer() {
        clearInterval(inSetInterval);
        resetTimer();
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
