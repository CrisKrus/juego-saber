var saberganar = saberganar || {};

saberganar.score = function () {

};

if (isNodeAvailable()) {
    module.exports = saberganar;
}

function isNodeAvailable() {
    return typeof module !== 'undefined';
}