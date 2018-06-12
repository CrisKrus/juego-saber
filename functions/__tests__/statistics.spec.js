describe('statistics', () => {
    let stats;

    beforeEach(() => {
        stats = statistics();
    });

    it('should start with zero correct answers', function () {
        expect(stats.getCountCorrectAnswers()).toBe(0);
    });

    function incrementCorrectAnswers(timesIncremented) {
        for (let i = 0; i < timesIncremented; i++) {
            stats.addCorrectAnswer();
        }
    }

    it('should increment correct answers', function () {
        let timesIncremented = 3;
        incrementCorrectAnswers(timesIncremented);

        expect(stats.getCountCorrectAnswers()).toBe(timesIncremented);
    });
});

export default function statistics(){
    var correctAnswers = 0;

    function getCountCorrectAnswers() {
        return correctAnswers;
    }

    function addCorrectAnswer() {
        correctAnswers++;
    }

    return {
        getCountCorrectAnswers,
        addCorrectAnswer
    }
};