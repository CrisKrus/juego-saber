function numeral(value, numeral) {
    return {value: value, numeral: numeral};
}

let numerals = [
    numeral(1000, 'M'),
    numeral(900, 'CM'),
    numeral(500, 'D'),
    numeral(400, 'CD'),
    numeral(100, 'C'),
    numeral(90, 'XC'),
    numeral(50, 'L'),
    numeral(40, 'XL'),
    numeral(10, 'X'),
    numeral(9, 'IX'),
    numeral(5, 'V'),
    numeral(4, 'IV'),
    numeral(1, 'I'),
];

function RomanNumerals() {
    function fromNumber(number) {
        let result = '';

        numerals.forEach(function (item) {
            while (number >= item.value) {
                result += item.numeral;
                number -= item.value;
            }

        });
        return result;
    }

    return {
        fromNumber
    };
}

module.exports = new RomanNumerals;