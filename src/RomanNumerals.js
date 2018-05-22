function RomanNumerals() {
    function fromNumber(number) {
        return 'I';
    }

    return {
        fromNumber
    };
}

module.exports = new RomanNumerals;