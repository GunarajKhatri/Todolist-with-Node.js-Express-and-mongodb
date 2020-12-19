var express=require('express')
var app = express()

var methodOverride = require('method-override')
var passport = require('passport');
var session = require('express-session')
var bodyParser = require('body-parser');
app.set('view engine','ejs');
app.use(passport.initialize());
app.use(passport.session());
app.use('/css', express.static('css'));
app.use(methodOverride('_method'));
app.use(require('connect-flash')());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

let routes = require('./routes/route');
app.use('/', routes);
require('./config/auth')(passport);

// app.get('/todo',(req,res)=>{
//     MyModel.find((err,item)=>{
//         if(!err){
//             res.render('todolist',{items:item,errors:null});
//         }
//     })
// });
// app.get('/todo/edit/:id',(req,res)=>{
//   MyModel.findOne({_id:req.params.id},(err,item)=>{
//       if(!err){
//           res.render('edittodo',{item:item});
//       }
//   })
// });
// app.put('/todo/edit/:id',urlencodedParser,(req,res)=>{
//   MyModel.findByIdAndUpdate(req.params.id,{item:req.body.item},function(err,resp){
//     if(!err){
//       res.redirect('/todo');
//     }
//   })

// });
// app.delete('/todo/remove/:id',(req,res)=>{
//   console.log(req.params.id)
//   MyModel.findByIdAndRemove(req.params.id, err => {
//     if (!err) return res.redirect("/todo");
    
//     });
// });
// app.post('/todo', 
// [
//   check('item')
//       .not()
//       .isEmpty()
//       .withMessage('Item is required!!')
// ]
// ,urlencodedParser, function (req, res) {
//   var errors = validationResult(req).array();
//         if (errors) {
//           req.flash('error',`${errors[0].msg}`);

//           res.redirect('/todo');
//         }
//           const item = MyModel({ item: req.body.item});
//           item.save(function (err) {
//               if (!err){
//                 req.flash('success','Item added successfully!!')
//                   res.redirect('/todo');
//               } 
//             }); 
        
     
//   });

app.listen(1393);
