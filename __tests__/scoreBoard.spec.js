const pug = require('pug');
const saberganarGame = require('../src/main');
const saberganarQuestionNavigator = require('../src/questionNavigator');
// const chai = require('chai');
// const expect = chai.expect();

describe("the game", function () {
    let app,
        questions;

    beforeEach(function () {
        document.body.innerHTML = pug.compileFile('./views/main.pug', null)();
        app = saberganarGame.game(saberganarQuestionNavigator.questionNavigator);
        setQuestions();
        app.setServerData(questions);
        app = app.start();
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
        startGame();

        expectScoreToBeEmpty();
    });

    function expectScoreToBeEmpty() {
        let score = document.getElementById('scoreUI');
        expect(score.innerHTML).toBe('');
    }

    it('should answer the correct question and the score be bigger than before', function () {
        startGame();

        selectCorrectAnswer();
        submitAnswer();

        expectScoreToBeBiggerFromTheBeginning();
    });

    function startGame() {
        let startButton = document.getElementById('start-button');
        startButton.click();

    }

    function selectCorrectAnswer() {
        let answer = document.getElementById('2');
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

    function expectScoreToBeBiggerFromTheBeginning() {
        let score = document.getElementById('scoreUI');
        expect(score.innerHTML).toBe(' 2 puntos');
    }
});

