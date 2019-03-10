const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    id: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true }
});

const Todo = module.exports = mongoose.Model('Todo', todoSchema);

module.exports.addTodo = function(newTodo, callback) {
    newTodo.save(callback);
}