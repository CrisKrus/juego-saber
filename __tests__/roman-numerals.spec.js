const romanNumerals = require('../src/RomanNumerals');

describe('Roman numerals', function () {
    it('should convert number to Roman numerals', function () {

        expect(romanNumerals.fromNumber(1)).toBe('I');
        expect(romanNumerals.fromNumber(2)).toBe('II');
    });
});