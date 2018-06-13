export default function statistics() {
    let correctAnswers = 0;
    let incorrectAnswers = 0;

    function getCountCorrectAnswers() {
        return correctAnswers;
    }

    function addCorrectAnswer() {
        correctAnswers++;
    }

    function getCountIncorrectAnswers() {
        return incorrectAnswers;
    }

    function addIncorrectAnswer() {
        incorrectAnswers++;
    }

    function reset() {
        correctAnswers = 0;
        incorrectAnswers = 0;
    }

    return {
        getCountCorrectAnswers,
        addCorrectAnswer,
        getCountIncorrectAnswers,
        addIncorrectAnswer,
        reset
    }
};