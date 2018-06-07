const pug = require('pug');
import createGame from '../src/game';
import createQuestionNavigator from '../src/questionNavigator';
import saberganarPageObject from '../src/pageObject';
import saberganarScoreManager from '../src/scoreManager';
import saberganarTimer from '../src/timer';

describe("score board", function () {
    let app,
        players,
        pageObject;

    beforeEach(function () {
        document.body.innerHTML = pug.compileFile('./views/main.pug', null)();
        app = createGame(
            createQuestionNavigator,
            saberganarScoreManager,
            saberganarTimer
        );
        app = app.start();
        pageObject = saberganarPageObject();

        setPlayers();
    });

    function setPlayers() {
        players = ['Pepe', 'Antonio', 'Anastasio'];
    }

    it('should be empty the scoreBoard at the beginning', function () {
        let playerScores = pageObject.getPlayerScoresElement().textContent;
        expect(playerScores).toBe('\n    ');
    });

    it('should save a score before start the game', function () {
        pageObject.addPlayerNameToInputForm(players[0]);
        pageObject.saveScore();
        expectScoreToContainsPlayer(players[0]);
    });

    it('should save multiple scores', function () {
        pageObject.addPlayerNameToInputForm(players[0]);
        pageObject.saveScore();

        pageObject.addPlayerNameToInputForm(players[1]);
        pageObject.saveScore();

        pageObject.addPlayerNameToInputForm(players[2]);
        pageObject.saveScore();

        expectScoreToContainsPlayer(players[0]);
        expectScoreToContainsPlayer(players[1]);
        expectScoreToContainsPlayer(players[2]);
    });

    it('should save score after answer a question', function () {
        pageObject.startGame();
        pageObject.selectOption('0');
        pageObject.submitAnswer();
        pageObject.addPlayerNameToInputForm(players[1]);
        pageObject.saveScore();
        expectScoreToContainsMinusOne();
    });

    function expectScoreToContainsPlayer(player) {
        let playerScores = pageObject.getPlayerScoresElement().textContent;
        expect(playerScores).toContain(player);

    }

    function expectScoreToContainsMinusOne() {
        let playerScores = pageObject.getPlayerScoresElement().textContent;
        expect(playerScores).toContain('-1 puntos');
    }
});