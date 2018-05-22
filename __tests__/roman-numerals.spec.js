describe('Roman numerals', function () {
    it('should convert number to Roman numerals', function () {
        var romanNumerals = require('../src/RomanNumerals');

        expect(romanNumerals.fromNumber(1)).toBe('I');
    });
});