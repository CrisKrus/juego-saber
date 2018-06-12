describe('statistics', () => {
    let stats;

    beforeEach(() => {
        stats = statistics();
    });

    it('should start with zero correct answers', function () {
        expect(stats.correctAnswers()).toBe(0);
    });
});

export default function statistics(){
    function correctAnswers() {
        return 0;
    }

    return {
        correctAnswers
    }
};