import createGame from "./game.js";
import createQuestionNavigator from "./questionNavigator.js";
import scoreManager from "./scoreManager.js";
import timer from "./timer.js";

window.onload = function () {
    let game = createGame(createQuestionNavigator, scoreManager, timer);
    game.start();
};