export default function scoreManager() {

    let scoreboards = {
        names: [],
        points: []
    };
    let actualPoints = 0;

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

    function resetActualScore() {
        actualPoints = 0;
    }

    function decrementScore(decrement) {
        actualPoints -= decrement;
    }

    function incrementScore(increment) {
        actualPoints += increment;
    }

    function getActualScore() {
        return actualPoints;
    }

    return {
        saveUserOnScoreboard,
        resetActualScore,
        decrementScore,
        incrementScore,
        getNames,
        getPoints,
        getActualScore
    }
};