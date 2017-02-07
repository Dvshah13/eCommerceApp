const express = require('express');
const mongoose = require('mongoose');
const bluebird = require('bluebird');
const bodyParser = require('body-parser');


mongoose.Promise = bluebird;
mongoose.connect('mongodb://localhost/eCommerceProj');
const app = express();
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const Product = mongoose.model('Product', {
  name: String,
  description: String,
  console: {
      type: String,
      enum: [ ]
  },
  genre: String,
  brand: String,
  rating: {
      type: String,
      enum: [ ]
  },
  inStockQuantity: Number,
  price: Number
});



app.get('/', function(req, res) {
   res.render('index.hbs')
});

app.post('/add_game', function(req, res){
   var p = new Product({
       name: req.body.game
   });
   console.log('game is ');
console.log(req.body.game);
   p.save(function(err) {
       if (err)
          throw err;
       else
          console.log('saved product successfully...');
   });
   res.render  ('index.hbs')
});

app.listen(3000, function() {
   console.log('3000!');
});
