export default function scoreManager() {

    let actualPoints = 0;

    function resetScore() {
        actualPoints = 0;
    }

    function decrement(decrement) {
        actualPoints -= decrement;
    }

    function increment(increment) {
        actualPoints += increment;
    }

    function getScore() {
        return actualPoints;
    }

    return {
        getScore,
        increment,
        decrement,
        resetScore
    }
};