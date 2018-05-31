const saberganarTimer = require('../src/timer');

describe('timer', function () {
    let timer;

    beforeEach(function () {
        timer = saberganarTimer.timer();
    });

    it('should start on zero', function () {
        expect(timer.getActualSeconds()).toBe(0);
    });

});