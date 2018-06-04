import createQuestionNavigator from '../src/questionNavigator';

describe('question navigator', function () {
    let questions,
        navigator;

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
        navigator = createQuestionNavigator(questions);
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