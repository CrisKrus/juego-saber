const saberganarTimer = require('../src/timer');

describe('timer', function () {
    let timer;

    beforeEach(function () {
        timer = saberganarTimer.timer();
    });

    it('should start on zero', function () {
        expect(timer.getActualSeconds()).toBe(0);
    });

    it('should increment the time', function () {
        let increment = 2;
        incrementSeconds(increment);

        expect(timer.getActualSeconds()).toBe(increment);
    });

    function incrementSeconds(times) {
        for (let i = 0; i < times; i++) timer.incrementSeconds();
    }

    it('should reset the timer', function () {
        incrementSeconds(24);
        timer.reset();

        expect(timer.getActualSeconds()).toBe(0);
    });
});