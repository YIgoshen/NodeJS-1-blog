var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({ dest: 'uploads/' })

var mongo = require('mongodb');
const url = 'mongodb+srv://admin:admin@cluster0.fqawd.mongodb.net/nodeblogs?retryWrites=true&w=majority'
var db = require('monk')(url);


router.get('/show/:category', function(req, res, next) {
  const posts = db.get('posts');

  posts.find({category: req.params.category}, {}, function(err, categories) {
    res.render('index', {
        'title': req.params.category,
        'posts': posts
    });
  })

});


/* GET posts listing. */
router.get('/add', function(req, res, next) {
  // categories.find({}, {}, function(err, categories) {
    res.render('addcategory', {
        'title': 'Add Category',
        // 'categories': categories
    });
  // })

});

router.post('/add', function(req, res, next) {
    let {name} = req.body;
    let date = new Date();

    //check image upload
    // if (req.file){
    //   console.log("-------", req.file.filename)
    //   let mainimage = req.file.filename;      
    // }else{
    //   let mainimage = 'noimage.jpeg';
    // }
    // form validation 
    // req.checkBody('title', 'Title filed is required').notEmpty();
    // req.checkBody('body', 'Body filed is required').notEmpty();
    
    //check errors
    // let errors = req.validationErrors();
    let errors = '';
    if(errors){
      res.render('addpost',{
        "errors": errors
      })
    }else{
      let categories = db.get('categories')
      categories.insert({
        "name": name,
      }, function(err,post){
        if (err){
          res.send(err)
        }else{
          req.flash('success', 'Category added')
          res.location('/');
          res.redirect('/');
        }
      });
    }
  });

module.exports = router;
