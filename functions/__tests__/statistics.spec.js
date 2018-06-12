describe('statistics', () => {
    let stats;

    beforeEach(() => {
        stats = statistics();
    });

    it('should start with zero correct answers', function () {
        expect(stats.getCountCorrectAnswers()).toBe(0);
    });

    it('should increment correct answers', function () {
        let timesIncremented = 3;
        incrementCorrectAnswers(timesIncremented);

        expect(stats.getCountCorrectAnswers()).toBe(timesIncremented);
    });

    function incrementCorrectAnswers(timesIncremented) {
        for (let i = 0; i < timesIncremented; i++) {
            stats.addCorrectAnswer();
        }
    }

    it('should start with zero incorrect answers', function () {
        expect(stats.getCountIncorrectAnswers()).toBe(0);
    });

    function incrementIncorrectAnswers(timesIncremented) {
        for (let i = 0; i < timesIncremented; i++) {
            stats.addIncorrectAnswer();
        }
    }

    it('should increment incorrect answers', function () {
        let timesIncremented = 2;
        incrementIncorrectAnswers(timesIncremented);

        expect(stats.getCountIncorrectAnswers()).toBe(timesIncremented);
    });
});

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

    return {
        getCountCorrectAnswers,
        addCorrectAnswer,
        getCountIncorrectAnswers,
        addIncorrectAnswer
    }
};