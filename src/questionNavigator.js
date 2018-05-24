var saberganar = saberganar || {};

saberganar.questionNavigator = function (questions) {
    let actualQuestionIndex = 0;

    // TODO: always have more questions because don't increment the last one
    function isThereMoreQuestions() {
        return actualQuestionIndex < questions.length - 1;
    }

    function getQuestion() {
        if (isThereMoreQuestions()) {
            return questions[actualQuestionIndex];
        }
        return questions[questions.length - 1];
    }

    function goToNextQuestion() {
        if (isThereMoreQuestions()) {
            actualQuestionIndex++;
        }
    }

    function resetQuestions() {
        actualQuestionIndex = 0;
    }

    return {
        isThereMoreQuestions,
        goToNextQuestion,
        getQuestion,
        resetQuestions,
    }
};

if (isNodeAvailable()) {
    module.exports = saberganar;
}

function isNodeAvailable() {
    return typeof module !== 'undefined';
}
