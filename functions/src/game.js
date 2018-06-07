export default function createGame(questionNavigator, scoreManager, timerManager) {

    const page = UI();
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
    }

    function setGameEvents() {
        page.setOnSubmitAnswer(onSubmit);
        page.setOnSave(onSave);
        page.setOnStarGame(onStart);
        page.setButtonsListeners();
    }

    function onSubmit() {
        let optionChecked = UI().getOptionChecked();
        let questions = theQuestionNavigator.getQuestion();
        let answer = questions.answers[optionChecked.id];

        updateGame(answer);
        page.printScore(score.getActualScore());

        timer.reset();

        theQuestionNavigator.goToNextQuestion();
        continueGame();
        page.disableSendAnswer();
    }

    //todo rename it
    function updateGame(answer) {
        if (answer.isCorrect === true) {
            page.updateMessage('¡Correcta!');
            updateTotalPointsOnSuccess();
        }
        else if (answer.isCorrect !== true) {
            page.updateMessage('¡Incorrecta!');
            updateTotalPointsOnFails();
        }
    }

    function onSave() {
        score.saveUserOnScoreboard(page.getInputName(), score.getActualScore());
        page.printPointsAndName(score.getNames(), score.getPoints());
        resetTimeAndPoints();
        page.cleanButtonsAndBoxes();
    }

    function onStart() {
        theQuestionNavigator.resetQuestions();
        inSetInterval = setInterval(timerAction, 1000); //El setInterval en una variable par luego utilizarla con el clearInterval
    }

    function updateTotalPointsOnSuccess() {
        if (timer.areSecondsLessThan(3)) {
            score.incrementScore(2);
        }
        else if (timer.areSecondsLessThan(11)) {
            score.incrementScore(1);
        }
    }

    function updateTotalPointsOnFails() {
        if (timer.areSecondsMoreThan(12)) {
            score.decrementScore(2);
        }
        else if (timer.areSecondsLessThan(11)) {
            score.decrementScore(1)
        }
    }

    function initializeApplicationVariables() {
        score.resetActualScore();
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
                    {id: 2, answer: "Ciudad de Panamá", isCorrect: true, idQuestion: 5}
                ]
            }
        ];
        callback(serverData);
    }

    function resetTimeAndPoints() {
        score.resetActualScore();
        page.printScore(score.getActualScore());
        stopAndResetTimer();
        page.printTimer(timer.getActualSeconds());
    }

    function UI() {

        const boxQuestions = document.getElementById('question');
        const btnSubmit = document.getElementById('submit-answer');
        const btnStart = document.getElementById('start-button');
        const btnSave = document.querySelector('.btnSave');
        const nameBox = document.getElementById('nameBox');

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
            setButtonsListeners,
            printScore,
            updateMessage,
            printQuestionAndOptions,
            toggleInvisibleNameBox,
            disableSendAnswer,
            printTimer,
            getInputName,
            setOnStarGame,
            getOptionChecked,
            setOnSubmitAnswer,
            setOnSave,
            cleanButtonsAndBoxes,
            printPointsAndName
        }
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

            score.decrementScore(3);
            page.printScore(score.getActualScore());

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
    }
};