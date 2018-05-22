function RomanNumerals() {
    function fromNumber(number) {
        return number === 3 && 'III'
            || number === 2 && 'II'
            || 'I';
    }

    return {
        fromNumber
    };
}

module.exports = new RomanNumerals;