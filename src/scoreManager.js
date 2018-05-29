var saberganar = saberganar || {};

saberganar.scoreManager = function () {
    let score = {
        names: [],
        points: []
    };


    function savePoints(points) {
        score.points.push(points);
    }

    function saveName(name) {
        score.names.push(name);
    }

    function getNames() {
        return score.names;
    }

    function getPoints() {
        return score.points;
    }

    return {
        saveName,
        savePoints,
        getNames,
        getPoints
    }
};

if (isNodeAvailable()) {
    module.exports = saberganar;
}

function isNodeAvailable() {
    return typeof module !== 'undefined';
}