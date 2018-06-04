import saberganarTimer from '../src/timer';

describe('timer', function () {
    let timer;

    beforeEach(function () {
        timer = saberganarTimer();
    });

    it('should start on zero', function () {
        expect(timer.getActualSeconds()).toBe(0);
    });

    it('should increment the time', function () {
        let initialTime = timer.getActualSeconds();
        let increment = 2;
        incrementSeconds(increment);

        expect(timer.getActualSeconds()).toBe(initialTime + increment);
    });

    function incrementSeconds(times) {
        for (let i = 0; i < times; i++) timer.incrementSeconds();
    }

    it('should reset the timer', function () {
        incrementSeconds(24);
        timer.reset();

        expect(timer.getActualSeconds()).toBe(0);
    });

    it('should compare time', function () {
        let time = 15,
            minor = 10,
            bigger = 19;
        incrementSeconds(time);

        expect(timer.getActualSeconds()).toBe(time);
        expect(timer.getActualSeconds()).toBeGreaterThan(minor);
        expect(timer.getActualSeconds()).toBeLessThan(bigger);
    });
});