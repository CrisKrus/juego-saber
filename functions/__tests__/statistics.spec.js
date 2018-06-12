describe('statistics', () => {
    let stats;

    beforeEach(() => {
        stats = statistics();
    });

    it('should start with zero correct answers', function () {
        expect(stats.getCountCorrectAnswers()).toBe(0);
    });

    it('should increment correct answers', function () {
        stats.addCorrectAnswer();
        stats.addCorrectAnswer();

        expect(stats.getCountCorrectAnswers()).toBe(2);
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