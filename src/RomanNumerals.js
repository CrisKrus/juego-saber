function RomanNumerals() {
    function fromNumber(number) {
        return number === 2 && 'II'
            || 'I';
    }

    return {
        fromNumber
    };
}

module.exports = new RomanNumerals;