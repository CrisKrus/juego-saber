function RomanNumerals() {
    function fromNumber() {
        return 'I';
    }

    return {
        fromNumber
    };
}

module.exports = new RomanNumerals();