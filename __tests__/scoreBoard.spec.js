const pug = require('pug');
const saberganarGame = require('../src/main');
const saberganarQuestionNavigator = require('../src/questionNavigator');

describe("score board", function () {
    let app;

    beforeEach(function () {
        document.body.innerHTML = pug.compileFile('./views/main.pug', null)();
        app = saberganarGame.game(saberganarQuestionNavigator.questionNavigator);
        app = app.start();
    });

    function addInputName() {
        let inputName = document.getElementById('inputNameId');
        inputName.value = 'Pepe';
    }

    function saveScore() {
        let saveScore = document.getElementById('save-score-button');
        saveScore.click();
    }

    function expectScoreToContainsInputName() {
        let playerScores = document.getElementById('playerScores').textContent;
        expect(playerScores).toContain('Pepe');
    }

    it('should save a score before start the game', function () {
        addInputName();
        saveScore();
        expectScoreToContainsInputName();
    });
});