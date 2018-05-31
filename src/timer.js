var saberganar = saberganar || {};

saberganar.timer = function () {
    let seconds = 0;

    function reset() {
        seconds = 0;
    }

    function incrementSeconds() {
        seconds++;
    }

    function getActualSeconds() {
        return seconds;
    }

    function areSecondsMoreThan(toCompare) {
        return seconds > toCompare;
    }

    function areSecondsLessThan(toCompare) {
        return seconds < toCompare;
    }

    function areSecondsEqualTo(toCompare) {
        return seconds === toCompare;
    }

    return {
        reset,
        incrementSeconds,
        getActualSeconds,
        areSecondsMoreThan,
        areSecondsLessThan,
        areSecondsEqualTo
    };

};

if (isNodeAvailable()) {
    module.exports = saberganar;
}

function isNodeAvailable() {
    return typeof module !== 'undefined';
}