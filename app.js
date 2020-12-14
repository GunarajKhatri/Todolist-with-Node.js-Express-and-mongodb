var express=require('express')
var app = express()
var MyModel=require('./Model/Todo');
var bodyParser = require('body-parser')
var methodOverride = require('method-override')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.set('view engine','ejs');
app.use('/css', express.static('css'));
app.use(methodOverride('_method'))

app.get('/todo',(req,res)=>{
    MyModel.find((err,item)=>{
        if(!err){
            res.render('todolist',{items:item});
        }
    })
});
app.get('/todo/edit/:id',(req,res)=>{
  MyModel.findOne({_id:req.params.id},(err,item)=>{
      if(!err){
          res.render('edittodo',{item:item});
      }
  })
});
app.put('/todo/edit/:id',urlencodedParser,(req,res)=>{
  MyModel.findByIdAndUpdate(req.params.id,{item:req.body.item},function(err,resp){
    if(!err){
      res.redirect('/todo');
    }
  })

});
app.delete('/todo/remove/:id',(req,res)=>{
  console.log(req.params.id)
  MyModel.findByIdAndRemove(req.params.id, err => {
    console.log(req.params.id);
    if (!err) return res.redirect("/todo");
    
    });
});
app.post('/todo', urlencodedParser, function (req, res) {
    const item = MyModel({ item: req.body.item});
    item.save(function (err) {
        if (!err){
            //item.push({item:req.body.item}); 
            res.redirect('/todo');
        } 
      });  
  });

app.listen(1079);
