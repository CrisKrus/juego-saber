// saberganar.timer = function () {
export default function timer() {

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