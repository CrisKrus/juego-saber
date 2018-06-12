import scoreManager from "../src/scoreManager";

describe('score manager', () => {
    let score;

    beforeEach(() => {
        score = scoreManager();
    });

    it('should start points on zero', function () {
        expect(score.getScore()).toBe(0);
    });

    it('should increment points', function () {
        let initialPoints = score.getScore();
        let increment = 12;

        score.increment(increment);

        expect(initialPoints + increment).toBe(score.getScore());
    });

    it('should decrement points', function () {
        let initialPoints = score.getScore();
        let increment = 45;
        let decrement = 15;

        score.increment(increment);
        score.decrement(decrement);

        expect(initialPoints + increment - decrement)
            .toBe(score.getScore())
    });

    it('should reset points to zero', function () {
        let increment = 12;

        score.increment(increment);
        expect(score.getScore()).toBe(increment);

        score.resetScore();
        expect(score.getScore()).toBe(0);
    });
});