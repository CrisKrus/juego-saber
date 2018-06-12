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
});

export default function statistics(){
    let correctAnswers = 0;

    function getCountCorrectAnswers() {
        return correctAnswers;
    }

    function addCorrectAnswer() {
        correctAnswers++;
    }

    function getCountIncorrectAnswers() {
        return 0;
    }

    return {
        getCountCorrectAnswers,
        addCorrectAnswer,
        getCountIncorrectAnswers
    }
};