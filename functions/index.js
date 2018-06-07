const functions = require('firebase-functions');
const express = require('express');
const app = express();

app.get('/api/questions', (request, response) => {
    let questions = [
        {
            id: 1,
            title: '¿Cuántos años tiene María?',
            answers: [
                {id: 0, answer: '25'},
                {id: 1, answer: '33'},
                {id: 2, answer: '37'}
            ],
            correctAnswer: {id: 1}
        },
        {
            id: 2,
            title: '¿Cuál es la capital de Zambia?',
            answers: [
                {id: 0, answer: 'Lusaka'},
                {id: 1, answer: 'Harare'},
                {id: 2, answer: 'Madrid'}
            ],
            correctAnswer: {id: 0}
        },
        {
            id: 3,
            title: '¿Cuál es el nombre completo de Freud?',
            answers: [
                {id: 0, answer: 'Adolf'},
                {id: 1, answer: 'Sefarad'},
                {id: 2, answer: 'Sigmund'}
            ],
            correctAnswer: {id: 2}
        },
        {
            id: 4,
            title: '¿Cuál es el animal más rápido del mundo?',
            answers: [
                {id: 0, answer: 'Guepardo'},
                {id: 1, answer: 'León'},
                {id: 2, answer: 'Tortuga'}
            ],
            correctAnswer: {id: 0}
        }
    ];
    response.setHeader('Content-Type', 'application/json');
    response.send(JSON.stringify(questions));
});

exports.app = functions.https.onRequest(app);
