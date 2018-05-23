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

describe('question navigator', function () {
    let questions;
    let navigator;

    beforeEach(function () {
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
        navigator = application().questionNavigator(questions);
    });

    it('should get a question', function () {
        expect(navigator.getQuestion()).toBe(questions[0]);
    });

    it('should get next question', function () {
        expect(navigator.getQuestion()).toBe(questions[0]);
        navigator.goToNextQuestion();
        expect(navigator.getQuestion()).toBe(questions[1]);
    });

    it('does\'t get out of bound', function () {
        expect(navigator.getQuestion()).toBe(questions[0]);
        navigator.goToNextQuestion();
        navigator.goToNextQuestion();
        navigator.goToNextQuestion();
        navigator.goToNextQuestion();
        navigator.goToNextQuestion();
        expect(navigator.getQuestion()).toBe(questions[2]);
    });
});