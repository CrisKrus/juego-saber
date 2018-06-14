import firebase from 'firebase';

export default function client() {
    //todo remove apiKey and put ir as variable on deploy environment
    const config = {
        apiKey: "AIzaSyDA8otk-0-O08vjWtv3iHaY2JRZmXIgU1w",
        authDomain: "saber-ganar.firebaseapp.com",
        databaseURL: "https://saber-ganar.firebaseio.com",
        projectId: "saber-ganar",
        storageBucket: "saber-ganar.appspot.com",
        messagingSenderId: "264673872993"
    };

    if (isNotInitialize()){
        firebase.initializeApp(config);
    }

    function isNotInitialize() {
        return !firebase.apps.length;
    }

    function saveScore(userName, score, stats) {
        firebase.database().ref('scoreboard').push({
            userName: userName,
            score: score,
            correctAnswers: stats.getCountCorrectAnswers(),
            incorrectAnswers: stats.getCountIncorrectAnswers(),
            order: (score * -1)
        });
    }

    function getTopTenScores() {
        let topTen = [];
        let count = 0;
        return new Promise((resolve => {
            firebase.database().ref('scoreboard').orderByChild('order').limitToFirst(10)
                .on('child_added', (snap) => {
                    count++;
                    topTen.push({
                        score: snap.val().score,
                        userName: snap.val().userName
                    });
                    if (count === 10) resolve(topTen);
                });
        }));
    }

    return {
        saveScore,
        getTopTenScores
    }
}