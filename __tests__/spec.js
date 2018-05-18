const fs = require('fs');
const path = require('path');
const chai = require('chai');
const application = require('../src/main');
chai.expect();

function loadTemplate(filepath, onLoad) {
    const filePath = path.join(__dirname, filepath);
    fs.readFile(filePath, {encoding: 'utf-8'}, function (err, data) {
        if (!err) {
            onLoad(data);
        } else {
            console.log(err);
        }
    });
}

describe("the test", function () {
    let app;

    beforeEach(function (done) {
        loadTemplate('../views/body.html', function (text) {
            document.body.innerHTML = text;
            app = application();
            app.start();
            done();
        });
    });

    it('loads the markup', function () {
        expect(
            document.getElementById('start-button'))
            .not.toBeNull();
    });

    it('should press start button and answer a question', function () {
        // This test is not going to work because jsdom does not implement
        // the MutationObserver object. It would work with a real browser.
        clickStartButton();
        selectAnswer();
        submitAnswer();
        checkScore();
    });


    function clickStartButton() {
        let startButton = document.getElementById('start-button');
        startButton.click();
    }

    function selectAnswer() {
        let answer = document.getElementById('0');
        answer.click();
        expect(answer.checked).toBeTruthy();
    }

    function submitAnswer() {
        let submitAnswerButton = document.getElementById('submit-answer');
        expect(submitAnswerButton.disabled).toBeFalsy(); //todo wait 1 second to click
        // the test fails because enable button is not on a event
        // is on a timer that update UI every 1 second
        submitAnswerButton.click();
    }

    function checkScore() {
        let score = document.getElementById('scoreUI');
        expect(score.innerText).not.toBe('0'); //todo check real score
    }
});