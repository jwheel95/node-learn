const express = require('express');
const db = require('./dummy-db');
const bodyParser = require('body-parser');
const todo = require('./models/todo-model');
const mongoose = require('mongoose');

mongoose.connect('mongodb://admin:Password1@ds137483.mlab.com:37483/todo-db', { useNewUrlParser: true });
mongoose.connection.on('connected', () => {
    console.log('Connected to Db');
});

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.get('/api/todos', (req, res) => {

    todo.find({}, (err, todos) => {
        res.status(200).send({
            success: 'true',
            todos: todos
        })
    })

    res.status(200).send({
       success: 'true',
       todos:
    }); 
});

app.post('/api/todos', (req, res) => {
    if (!req.body.title) {
        return res.status(400).send({
            success: 'false',
            message: 'Title is required'
        });
    } else if (!req.body.description) {
        return res.status(400).send({
            success: 'false',
            message: 'Description is required'
        });
    }
    
    let newTodo = new todo({
        title: req.body.title,
        description: req.body.description
    })

    newTodo.save();

    return res.status(201).send({
        success: 'true',
        todo: todo
    })
});

app.listen(3000, err => {
    if (err) throw err;
    console.log('We have liftoff on port 3000');
});