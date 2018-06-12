export default function scoreBoard() {
    let scoreboards = {
        names: [],
        points: []
    };

    function saveUserOnScoreboard(name, score) {
        savePointsOnScoreBoard(score);
        saveNameOnScoreboard(name);
    }

    function savePointsOnScoreBoard(score) {
        scoreboards.points.push(score);
    }

    function saveNameOnScoreboard(name) {
        scoreboards.names.push(name);
    }

    function getNames() {
        return scoreboards.names;
    }

    function getPoints() {
        return scoreboards.points;
    }

    return {
        saveUserOnScoreboard,
        getNames,
        getPoints
    }
};