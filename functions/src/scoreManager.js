export default function scoreManager() {

    let actualPoints = 0;

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
        getActualScore,
        incrementScore,
        decrementScore,
        resetActualScore
    }
};