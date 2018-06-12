import scoreManager from "../src/scoreManager";

describe('score manager', () => {
    let score;

    beforeEach(() => {
        score = scoreManager();
    });

    it('should start points on zero', function () {
        expect(score.getActualScore()).toBe(0);
    });

    it('should increment points', function () {
        let initialPoints = score.getActualScore();
        let increment = 12;

        score.incrementScore(increment);

        expect(initialPoints + increment).toBe(score.getActualScore());
    });
});