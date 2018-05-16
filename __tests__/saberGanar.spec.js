const fs = require('fs');
const path = require('path');
const jsdom = require('jsdom');
const chai = require('chai');
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

describe("the test", function(){

    beforeEach(function(done){
        loadTemplate('../templates/saberGanar.html', function(text){
            document.body.innerHTML = text;
            done();
        });
    });

    it('loads the markup', function(){
        expect(
            document.getElementsByClassName('btnStart'))
            .not.toBeNull();
    });
});