var express = require('express');
var router=express.Router();
var MyModel=require('../Model/Todo');
var User=require('../Model/User');
const bcrypt = require('bcryptjs');
var passport = require('passport');

const { check, validationResult } = require('express-validator');


router.get('/register',(req,res)=>{
    res.render('register',{errors:null});
});
router.get('/login',(req,res)=>{
    res.render('login',{message: req.flash()});
});

router.post('/login', function(req, res, next){
    passport.authenticate('local', {
      successRedirect:'/todo',
      failureRedirect:'/login',
      failureFlash: true
    })(req, res, next);
  });

router.get('/logout', function(req, res){
   req.logout();
   redirect('/login');
    
  });

router.post('/register',[
    check('username')
            .not()
            .isEmpty()
            .withMessage('Name is required'),
            check('email').not().isEmpty().withMessage('Email is required').isEmail().withMessage('invalid email format'),
            check('password').not().isEmpty().withMessage('Password is required').isLength({min:6}).withMessage('pass should be 6 chars'),
            check('confirm_password').not().isEmpty().withMessage('confirm Password is required').isLength({min:6}).withMessage('pass should be 6 chars').custom((val, { req, loc, path }) => {
                if (val !== req.body.password) {
                    throw new Error('Password confirmation does not match password');
                  }
                  
                  // Indicates the success of this synchronous custom validator
                  return true;
            })

],function(req,res){
    var errors = validationResult(req).array();
    if(errors.length>0){
        res.render('register',{errors:errors});
    }
    else{
        let user=new User();
        user.username=req.body.username;
        user.email=req.body.email;
        
        bcrypt.genSalt(10, function(err, salt){
            bcrypt.hash(req.body.password, salt, function(err, hash){
              if(err){
                console.log(err);
              }
              user.password=hash;
              user.save();
              res.redirect('/login');
            })
            })
        

    }
});

router.get('/todo',(req,res)=>{
    MyModel.find((err,item)=>{
        if(!err){
            res.render('todolist',{items:item,errors:null});
        }
    })
});
router.get('/todo/edit/:id',(req,res)=>{
  MyModel.findOne({_id:req.params.id},(err,item)=>{
      if(!err){
          res.render('edittodo',{item:item});
      }
  })
});
router.put('/todo/edit/:id',(req,res)=>{
  MyModel.findByIdAndUpdate(req.params.id,{item:req.body.item},function(err,resp){
    if(!err){
      res.redirect('/todo');
    }
  })

});
router.delete('/todo/remove/:id',(req,res)=>{
  console.log(req.params.id)
  MyModel.findByIdAndRemove(req.params.id, err => {
    if (!err) return res.redirect("/todo");
    
    });
});
router.post('/todo', 
[
  check('item')
      .not()
      .isEmpty()
      .withMessage('Item is required!!')
]
, function (req, res) {
  var errors = validationResult(req).array();
        if (errors) {
          req.flash('error',`${errors[0].msg}`);
          
          res.redirect('/todo');
        }
          const item = MyModel({ item: req.body.item});
          item.save(function (err) {
              if (!err){
                req.flash('success','Item added successfully!!')
                  res.redirect('/todo');
              } 
            }); 
        
     
  });
  module.exports=router;