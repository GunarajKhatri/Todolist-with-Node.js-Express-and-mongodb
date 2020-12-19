const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todolist', {
  useNewUrlParser: true
});
const Schema = mongoose.Schema;
const Users = new Schema({
    username:{
    type:String, 
    required:true
    },
    email:{
        type:String, 
        required:true
        },
    password:{
            type:String, 
            required:true
    }
  });
const User = mongoose.model('User', Users);
module.exports=User;
