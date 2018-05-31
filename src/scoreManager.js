var saberganar = saberganar || {};

saberganar.scoreManager = function () {
    let scores = {
        names: [],
        points: []
    };
    let actualPoints = 0;


    function savePoints(points) {
        scores.points.push(points);
    }

    function saveName(name) {
        scores.names.push(name);
    }

    function getNames() {
        return scores.names;
    }

    function getPoints() {
        return scores.points;
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

    function getActualScore(){
        return actualPoints;
    }

    return {
        saveName,
        savePoints,
        resetActualScore,
        decrementScore,
        incrementScore,
        getNames,
        getPoints,
        getActualScore
    }
};

if (isNodeAvailable()) {
    module.exports = saberganar;
}

function isNodeAvailable() {
    return typeof module !== 'undefined';
}