var saberganar = saberganar || {};

saberganar.pageObject = function () {

    function startGame() {
        let startButton = document.getElementById('start-button');
        startButton.click();
    }

    function selectOption(optionId) {
        let answer = document.getElementById(optionId);
        answer.click();
        expect(answer.checked).toBeTruthy();

    }

    function submitAnswer() {
        let submitAnswerButton = document.getElementById('submit-answer');
        //TODO: this should not be there, this is no SRP
        expectToBeAbleToSendTheAnswer(submitAnswerButton);
        submitAnswerButton.click();
    }

    function expectToBeAbleToSendTheAnswer(submitAnswerButton) {
        expect(submitAnswerButton.disabled).toBeFalsy();
    }

    function getActualScoreElement() {
        return document.getElementById('scoreUI');
    }

    function getPlayerScoresElement() {
        return document.getElementById('playerScores');
    }

    function getQuestionText() {
        return document.getElementById('question').textContent;
    }

    function addPlayerNameToInputForm(player) {
        let inputName = document.getElementById('inputNameId');
        inputName.value = player;
    }

    function saveScore() {
        let saveScore = document.getElementById('save-score-button');
        saveScore.click();

    }

    return {
        startGame,
        selectOption,
        submitAnswer,
        getActualScoreElement,
        getQuestionText,
        addPlayerNameToInputForm,
        saveScore,
        getPlayerScoresElement
    };
};

if (isNodeAvailable()) {
    module.exports = saberganar;
}

function isNodeAvailable() {
    return typeof module !== 'undefined';
}