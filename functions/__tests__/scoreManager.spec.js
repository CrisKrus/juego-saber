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

    it('should decrement points', function () {
        let initialPoints = score.getActualScore();
        let increment = 45;
        let decrement = 15;

        score.incrementScore(increment);
        score.decrementScore(decrement);

        expect(initialPoints + increment - decrement)
            .toBe(score.getActualScore())
    });

    it('should reset points to zero', function () {
        let increment = 12;

        score.incrementScore(increment);
        expect(score.getActualScore()).toBe(increment);

        score.resetActualScore();
        expect(score.getActualScore()).toBe(0);
    });

    it('should start with an empty scoreboard', function () {
        let empty = [];

        expect(score.getNames()).toEqual(empty);
        expect(score.getPoints()).toEqual(empty);
    });

    it('should save user and points on scoreboard', function () {
        let users = ['Pepe', 'Antonio', 'Jose Luis'];
        let points = [2, 6, 34];
        let i = 0;

        for (let user of users) {
            score.saveUserOnScoreboard(user, points[i++]);
        }

        expect(score.getNames()).toEqual(users);
        expect(score.getPoints()).toEqual(points);
    });
});