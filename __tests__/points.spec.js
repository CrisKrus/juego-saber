const pug = require('pug');
import createGame from '../src/game';
import createQuestionNavigator from '../src/questionNavigator';
import saberganerPageObject from '../src/pageObject';
import saberganerScoreManager from '../src/scoreManager';
import saberganarTimer from '../src/timer';

describe("points from UI", function () {
    let app,
        questions,
        pageObject;

    beforeEach(function () {
        document.body.innerHTML = pug.compileFile('./views/main.pug', null)();
        app = createGame(
            createQuestionNavigator,
            saberganerScoreManager,
            saberganarTimer
        );
        setQuestions();
        app.setServerData(questions);
        app = app.start();
        pageObject = saberganerPageObject();
    });

    function setQuestions() {
        questions = [
            {
                id: 1,
                question: "¿De que colo es el caballo blanco de santiago?",
                answers: [
                    {id: 0, answer: "Es un unicornio, no un caballo", isCorrect: false, idQuestion: 1},
                    {id: 1, answer: "Verde", isCorrect: false, idQuestion: 1},
                    {id: 2, answer: "Blanco", isCorrect: true, idQuestion: 1}
                ]
            },
            {
                id: 2,
                question: "¿Como sale un perro de un tanque de agua?",
                answers: [
                    {id: 0, answer: "Por la escalera", isCorrect: false, idQuestion: 2},
                    {id: 1, answer: "Mojado", isCorrect: true, idQuestion: 2},
                    {id: 2, answer: "Verde, los perros si se mojan se ponen verdes", isCorrect: false, idQuestion: 2}
                ]
            },
            {
                id: 3,
                question: "¿Que fue antes el huevo o la gallina?",
                answers: [
                    {id: 0, answer: "Huevo", isCorrect: false, idQuestion: 3},
                    {id: 1, answer: "Gallina", isCorrect: false, idQuestion: 3},
                ]
            }
        ];
    }

    it('should start a game and the score be empty', function () {
        pageObject.startGame();

        expectScoreToBeEmpty();
    });

    function expectScoreToBeEmpty() {
        let score = document.getElementById('scoreUI');
        expect(score.innerHTML).toBe('');
    }

    it('should answer the correct option and the score be bigger than before', function () {
        pageObject.startGame();

        selectCorrectOption();
        pageObject.submitAnswer();

        expectScoreToBeBiggerFromTheBeginning();
    });

    function selectCorrectOption() {
        pageObject.selectOption(2);
    }

    function expectScoreToBeBiggerFromTheBeginning() {
        let score = pageObject.getActualScoreElement();
        expect(score.innerHTML).toBe(' 2 puntos');
    }

    it('should answer the incorrect option and the score be lower than before', function () {
        pageObject.startGame();

        selectIncorrectAnswer();
        pageObject.submitAnswer();

        expectScoreToBeLowerFromTheBeginning();
    });

    function selectIncorrectAnswer() {
        pageObject.selectOption(0);
    }

    function expectScoreToBeLowerFromTheBeginning() {
        let score = pageObject.getActualScoreElement();
        expect(score.innerHTML).toBe(' -1 puntos');
    }

    xit('should wait more than 20 seconds and the score be 3 points less than before', function (done) {
        pageObject.startGame();

        let score = pageObject.getActualScoreElement();
        //TODO jest has 5 seconds timeout, can't test that
        setTimeout(expectScoreToBeThreePointLessFromTheBeginning, 20000);

        function expectScoreToBeThreePointLessFromTheBeginning() {
            expect(score.innerHTML).toBe(' -3 puntos');
            done();
        }
    });
});