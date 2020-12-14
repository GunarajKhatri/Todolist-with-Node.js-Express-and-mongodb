## Build TODO-LIST INVOLVING CRUD(CREATE-READ-UPDATE-DELETE) OPERATION 
# All dependencies that are used in this project are :
```
- express
- body-parser
- ejs
- mongoose
- method-override

```

# So if you are cloning it locally then make sure you have installed all above mentioned dependencies along with node.js installed in system & also you should have mongodb installed in you system and using it with shell as i did.
# Here my database name is todolist which i m connecting locally as you can see below or in Model/Todo.js file..

` mongoose.connect('mongodb://localhost/todolist', {
  useNewUrlParser: true
}); 
`
# And finally app is running is this url : 
`http://localhost:1079/todo`
# or you can change port name in app.js in app.listen();

