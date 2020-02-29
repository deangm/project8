const express = require('express');

const path = require('path');
const { PORT } = require('./config');
const db = require('./user');

const app = express();
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'pug');

app.use(express.urlencoded({ extended: true }))

db.intialize();

app.get('/users', db.getUsers);

app.post('/users', db.createUser);

app.get('/users/delete/:id', db.deleteUser)

app.get('/users/update/:id', db.findUser)

app.post('/users/update/:id', db.updateUser)

app.get('/users/search', (req, res) => {
    res.render('search')
})

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});