const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todolist', {
  useNewUrlParser: true
});
const Schema = mongoose.Schema;
const Todo = new Schema({
    item:{
    type:String, 
    required:true
    }
  });
const MyModel = mongoose.model('Todo', Todo);
module.exports=MyModel;
