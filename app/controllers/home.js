var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Article = mongoose.model('Article');

module.exports = function (app) {
  app.use('/', router);
};

// to match jade view 
router.get('/template/:name.html', function(req, res) {
	console.log(req.params.name);
	res.render('template/' + req.params.name);
})

// because of html 5 mode refresh certain page don't load index and fail 

router.get('*', function(req, res){
    res.render('index', {
      title: 'TWEB-ond9-Site1',
    });
});

