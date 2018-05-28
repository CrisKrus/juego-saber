const pug = require('pug');
const saberganarGame = require('../src/main');
const saberganarQuestionNavigator = require('../src/questionNavigator');

describe("score board", function () {
    let app,
        players;

    beforeEach(function () {
        document.body.innerHTML = pug.compileFile('./views/main.pug', null)();
        app = saberganarGame.game(saberganarQuestionNavigator.questionNavigator);
        app = app.start();

        setPlayers();
    });

    function setPlayers() {
        players = ['Pepe', 'Antonio', 'Anastasio'];
    }

    it('should be empty the scoreBoard at the beginning', function () {
        let playerScores = document.getElementById('playerScores').textContent;
        expect(playerScores).toBe('\n    ');
    });

    it('should save a score before start the game', function () {
        addPlayerName(players[0]);
        saveScore();
        expectScoreToContainsPlayer(players[0]);
    });

    it('should save multiple scores', function () {
        addPlayerName(players[0]);
        saveScore();

        addPlayerName(players[1]);
        saveScore();

        addPlayerName(players[2]);
        saveScore();

        expectScoreToContainsPlayer(players[0]);
        expectScoreToContainsPlayer(players[1]);
        expectScoreToContainsPlayer(players[2]);
    });

    function addPlayerName(player) {
        let inputName = document.getElementById('inputNameId');
        inputName.value = player;

    }

    function saveScore() {
        let saveScore = document.getElementById('save-score-button');
        saveScore.click();

    }

    function expectScoreToContainsPlayer(player) {
        let playerScores = document.getElementById('playerScores').textContent;
        expect(playerScores).toContain(player);

    }
});