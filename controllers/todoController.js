const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://test:test@ds251849.mlab.com:51849/todo-testing-dev');

const todoSchema = new mongoose.Schema({
  item: String,
});

const Todo = mongoose.model('Todo', todoSchema);

const urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = (app) => {
  app.get('/todo', (req, res) => {
    Todo.find({}, (err, data) => {
      if (err) throw err;
      res.render('todo', { todos: data });
    });
  });

  app.post('/todo', urlencodedParser, (req, res) => {
    Todo(req.body).save((err, data) => {
      if (err) throw err;
      res.json(data);
    });
  });

  app.delete('/todo/:item', (req, res) => {
    Todo.find({ item: req.params.item.replace(/-/g, ' ') }).remove((err, data) => {
      if (err) throw err;
      res.json(data);
    });
  });
};
