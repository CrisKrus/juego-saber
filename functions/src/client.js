export default function client() {
    const config = {
        apiKey: "AIzaSyDA8otk-0-O08vjWtv3iHaY2JRZmXIgU1w",
        authDomain: "saber-ganar.firebaseapp.com",
        databaseURL: "https://saber-ganar.firebaseio.com",
        projectId: "saber-ganar",
        storageBucket: "saber-ganar.appspot.com",
        messagingSenderId: "264673872993"
    };
    firebase.initializeApp(config);

    function saveScore(userName, score, stats) {
        firebase.database().ref('scoreboard').push({
            userName: userName,
            score: score,
            correctAnswers: stats.getCountCorrectAnswers(),
            incorrectAnswers: stats.getCountIncorrectAnswers()
        });
    }

    return {
        saveScore,
    }
}