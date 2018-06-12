import scoreManager from "../src/scoreManager";

describe('score manager', () => {
    let score;

    beforeEach(() => {
        score = scoreManager();
    });

    it('should start points on zero', function () {
        expect(score.getActualScore()).toBe(0);
    });
});