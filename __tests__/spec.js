const chai = require('chai');
const pug = require('pug');
const application = require('../src/main');
// const expect = chai.expect();

describe("the game", function () {
    let app;

    beforeEach(function () {
        document.body.innerHTML = pug.compileFile('./views/main.pug', null)();
        app = application();
        app.start();
    });

    it('loads the markup', function () {
        expect(
            document.getElementById('start-button'))
            .not.toBeNull();
    });

    it('should start the game, answer a question and change the score', function () {
        startGame();

        selectAnswer();
        submitAnswer();

        expectScoreToBeDifferentFromTheBeginning();
    });


    function startGame() {
        let startButton = document.getElementById('start-button');
        startButton.click();
    }

    function selectAnswer() {
        let answer = document.getElementById('0');
        answer.click();
        expect(answer.checked).toBeTruthy();
    }

    function expectToBeAbleToSendTheAnswer(submitAnswerButton) {
        expect(submitAnswerButton.disabled).toBeFalsy();
    }

    function submitAnswer() {
        let submitAnswerButton = document.getElementById('submit-answer');
        expectToBeAbleToSendTheAnswer(submitAnswerButton);
        submitAnswerButton.click();
    }

    function expectScoreToBeDifferentFromTheBeginning() {
        let score = document.getElementById('scoreUI');
        expect(score.innerHTML).not.toBe('0 puntos');
    }

    function expectQuestionAndAnswersToBeDifferentFromPreciousOne(question) {
        let newQuestion = document.getElementById('question').textContent;
        expect(question).not.toEqual(newQuestion);//TODO: should check only the question not the answers too
    }

    it('should start the game, answer a question and change the question', function () {
        startGame();

        let question = document.getElementById('question').textContent;
        selectAnswer();
        submitAnswer();

        expectQuestionAndAnswersToBeDifferentFromPreciousOne(question);
    });

});