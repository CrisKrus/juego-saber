import scoreBoard from "../src/scoreBoard";

describe('score manager', () => {
    let scoreboard;

    beforeEach(() => {
        scoreboard = scoreBoard();
    });

    it('should start with an empty scoreboard', function () {
        let empty = [];

        expect(scoreboard.getNames()).toEqual(empty);
        expect(scoreboard.getPoints()).toEqual(empty);
    });

    it('should save user and points on scoreboard', function () {
        let users = ['Pepe', 'Antonio', 'Jose Luis'];
        let points = [2, 6, 34];
        let i = 0;

        for (let user of users) {
            scoreboard.saveUserOnScoreboard(user, points[i++]);
        }

        expect(scoreboard.getNames()).toEqual(users);
        expect(scoreboard.getPoints()).toEqual(points);
    });
});


