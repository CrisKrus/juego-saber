const chai = require('chai');
const pug = require('pug');
const application = require('../src/main');
chai.expect();

describe("the test", function () {
    let app;

    beforeEach(function () {
        //todo: add all the modules of the app on document
        document.body.innerHTML = pug.compileFile('./views/main.pug', null)();
        app = application();
        app.start();
    });

    it('loads the markup', function () {
        expect(
            document.getElementById('start-button'))
            .not.toBeNull();
    });

    it('should start the game and answer a question', function () {
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

    function submitAnswer() {
        let submitAnswerButton = document.getElementById('submit-answer');
        expect(submitAnswerButton.disabled).toBeFalsy();
        submitAnswerButton.click();
    }

    function expectScoreToBeDifferentFromTheBeginning() {
        let score = document.getElementById('scoreUI');
        expect(score.innerText).not.toBe('0 puntos');
    }
});