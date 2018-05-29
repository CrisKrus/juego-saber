const pug = require('pug');
const saberganarGame = require('../src/main');
const saberganarQuestionNavigator = require('../src/questionNavigator');
const saberganarPageObject = require('../src/pageObject');
const saberganarScoreManager = require('../src/scoreManager');

describe("the game", function () {
    let app,
        questions,
        pageObject;

    beforeEach(function () {
        document.body.innerHTML = pug.compileFile('./views/main.pug', null)();
        app = saberganarGame.game(
            saberganarQuestionNavigator.questionNavigator,
            saberganarScoreManager.scoreManager
        );
        setQuestions();
        app.setServerData(questions);
        app = app.start();
        pageObject = saberganarPageObject.pageObject();

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

    it('loads the markup', function () {
        expect(
            document.getElementById('start-button'))
            .not.toBeNull();
    });

    it('should start the game, answer a question and change the score', function () {
        pageObject.startGame();

        pageObject.selectOption(0);

        pageObject.submitAnswer();

        expectScoreToBeDifferentFromTheBeginning();
    });

    it('should start the game, answer a question and change the question', function () {
        pageObject.startGame();

        let question = pageObject.getQuestionText();
        pageObject.selectOption(0);
        pageObject.submitAnswer();

        expectQuestionAndAnswersToBeDifferentFromPreciousOne(question);
    });

    function expectScoreToBeDifferentFromTheBeginning() {
        let score = pageObject.getActualScoreElement();
        expect(score.innerHTML).not.toBe('0 puntos');

    }

    function expectQuestionAndAnswersToBeDifferentFromPreciousOne(question) {
        let newQuestion = pageObject.getQuestionText();
        expect(question).not.toEqual(newQuestion);

    }
});