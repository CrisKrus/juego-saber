import scoreBoard from "./scoreBoard.js";
import statistics from "./statistics.js";
import client from "./client.js";

export default function createGame(questionNavigator, scoreManager, timerManager) {

    const page = UI();
    const scoreBoardManager = scoreBoard();
    const stats = statistics();
    const remoteClient = client();
    const score = scoreManager();
    const timer = timerManager();

    let questions;
    let inSetInterval;
    let theQuestionNavigator;
    let serverData = null;

    function start() {
        initializeApplicationVariables();
        page.disableSendAnswer();
        setGameEvents();
        remoteClient.getTopTenScores().then((scores) => {
            page.printTopTenScores(scores);
        });
    }

    function setGameEvents() {
        page.setOnSubmitAnswer(onSubmit);
        page.setOnSave(onSave);
        page.setOnStarGame(onStart);
        page.setButtonsListeners();
    }

    function onSubmit() {
        let optionChecked = page.getOptionChecked();
        let questions = theQuestionNavigator.getQuestion();
        let answer = questions.answers[optionChecked.id];

        updateGame(answer);

        page.printScore(score.getScore());
        timer.reset();

        page.updateCorrectAnswers(stats.getCountCorrectAnswers());
        page.updateIncorrectAnswers(stats.getCountIncorrectAnswers());

        theQuestionNavigator.goToNextQuestion();
        continueGame();
        page.disableSendAnswer();
    }

    //todo rename it
    function updateGame(answer) {
        if (answer.isCorrect === true) {
            page.updateMessage('¡Correcta!');
            updateTotalPointsOnSuccess();
            stats.addCorrectAnswer();
        }
        else if (answer.isCorrect !== true) {
            page.updateMessage('¡Incorrecta!');
            updateTotalPointsOnFails();
            stats.addIncorrectAnswer();
        }
    }

    function onSave() {
        scoreBoardManager.saveUserAndScore(page.getInputName(), score.getScore());
        page.printPointsAndName(scoreBoardManager.getNames(), scoreBoardManager.getPoints());

        remoteClient.saveScore(page.getInputName(), score.getScore(), stats);

        resetTimeAndPoints();
        page.cleanButtonsAndBoxes();

        stats.reset();
        page.updateCorrectAnswers(stats.getCountCorrectAnswers());
        page.updateIncorrectAnswers(stats.getCountIncorrectAnswers());
    }

    function onStart() {
        theQuestionNavigator.resetQuestions();
        inSetInterval = setInterval(timerAction, 1000); //El setInterval en una variable par luego utilizarla con el clearInterval
    }

    function updateTotalPointsOnSuccess() {
        if (timer.areSecondsLessThan(3)) {
            score.increment(2);
        }
        else if (timer.areSecondsLessThan(11)) {
            score.increment(1);
        }
    }

    function updateTotalPointsOnFails() {
        if (timer.areSecondsMoreThan(12)) {
            score.decrement(2);
        }
        else if (timer.areSecondsLessThan(11)) {
            score.decrement(1)
        }
    }

    function initializeApplicationVariables() {
        score.resetScore();
        timer.reset();
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
                    {
                        id: 2,
                        answer: "Ciudad de Panamá",
                        isCorrect: true,
                        idQuestion: 5
                    }
                ]
            }
        ];
        callback(serverData);
    }

    function resetTimeAndPoints() {
        score.resetScore();
        page.printScore(score.getScore());
        stopAndResetTimer();
        page.printTimer(timer.getActualSeconds());
    }

    function gameOver() {
        page.toggleInvisibleNameBox();
        stopAndResetTimer();
        page.printTimer(timer.getActualSeconds());
    }

    function continueGame() {
        if (theQuestionNavigator.isThereMoreQuestions()) {
            let question = theQuestionNavigator.getQuestion();
            page.printQuestionAndOptions(question, question.answers);
        } else {
            gameOver();
        }
    }

    function timerAction() {
        timer.incrementSeconds();
        page.printTimer(timer.getActualSeconds());
        if (timer.areSecondsEqualTo(20)) {
            timer.reset();

            score.decrement(3);
            page.printScore(score.getScore());

            stats.addIncorrectAnswer();
            page.updateIncorrectAnswers(stats.getCountIncorrectAnswers());

            page.disableSendAnswer();
            theQuestionNavigator.goToNextQuestion();
            continueGame();
        }
    }

    function stopAndResetTimer() {
        clearInterval(inSetInterval);
        timer.reset();
    }

    return {
        start,
        setServerData: function (data) {
            serverData = data;
        }
    };

    function UI() {

        const boxQuestions = document.getElementById('question');
        const btnSubmit = document.getElementById('submit-answer');
        const btnStart = document.getElementById('start-button');
        const btnSave = document.querySelector('.btnSave');
        const nameBox = document.getElementById('nameBox');
        const topTenScores = document.getElementById('top-ten-scores');

        let onStarGame = function () {
        };
        let onSubmitAnswer = function () {
        };
        let onSave = function () {
        };

        function setButtonsListeners() {
            btnSubmit.addEventListener('click', onSubmitAnswer);

            btnStart.addEventListener('click', function () {
                changeButtonsVisibility();

                continueGame();
                disableSendAnswer();

                onStarGame();
            });

            btnSave.addEventListener('click', onSave);
        }

        function changeButtonsVisibility() {
            boxQuestions.classList.remove('invisible');
            btnSubmit.classList.toggle('invisible');
            btnStart.classList.toggle('invisible');
        }

        function printTopTenScores(scores) {
            for(let s of scores) {
                let li = document.createElement('li');
                li.appendChild(document.createTextNode(s.userName + ' ' + s.score));
                topTenScores.appendChild(li);
            }
        }

        function printScore(score) {
            document.getElementById('scoreUI').innerHTML = ` ${score} puntos`
        }

        function printQuestionAndOptions(question, options) {
            printQuestion(question);
            printOptions(options);
            addEnableSendButtonEventToOptions();
            disableSendAnswer();
        }

        function printQuestion(question) {
            boxQuestions.innerHTML = `<div class="questionBox" id="${question.id}">${question.question}</div>`;
        }

        function printOptions(answers) {
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

        function updateCorrectAnswers(count) {
            document.getElementById('correct-answers').innerText = count;
        }

        function updateIncorrectAnswers(count) {
            document.getElementById('incorrect-answers').innerText = count;
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
            btnSubmit.classList.toggle('invisible');
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
            btnSubmit.disabled = false
        }

        function disableSendAnswer() {
            btnSubmit.disabled = true;
        }

        function getOptionChecked() {
            let answers = document.querySelectorAll('.answer');
            for (let i = 0; i < answers.length; i++) {
                if (answers[i].checked) {
                    return answers[i];
                }
            }
        }

        function getInputName() {
            return document.querySelector('#inputNameId').value;
        }

        function setOnStarGame(callback) {
            onStarGame = callback;
        }

        function setOnSubmitAnswer(callback) {
            onSubmitAnswer = callback;
        }

        function setOnSave(callback) {
            onSave = callback;
        }

        return {
            printScore,
            printTopTenScores,
            printQuestionAndOptions,
            printPointsAndName,
            printTimer,
            updateMessage,
            updateCorrectAnswers,
            updateIncorrectAnswers,
            toggleInvisibleNameBox,
            disableSendAnswer,
            cleanButtonsAndBoxes,
            getInputName,
            getOptionChecked,
            setButtonsListeners,
            setOnStarGame,
            setOnSubmitAnswer,
            setOnSave
        }
    }
};