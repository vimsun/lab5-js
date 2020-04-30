var express = require('express');
var createError = require('http-errors');
var path = require('path');
var bodyParser = require('body-parser');
var database = require('./db');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/dist/client')));

app.set('views', path.join(__dirname, 'views'));

const hostname = 'localhost';
const port = process.env.PORT || 3000;

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

const cors = require('cors') 
/*const corsOptions = {
    'credentials': true,
    'origin': true,
    'methods':	'GET,HEAD,PUT,PATCH,POST,DELETE' ,
    'allowedHeaders': 'Authorization,X-Requested-With,X-HTTP- Method-Override,Content-Type,Cache-Control,Accept',
    }
app.use(cors(corsOptions))
 */
app.use(cors());

var stocks = database['stocks']
var brockers = database['brockers']

app.use(allowCrossDomain);

app.get('/stocks', cors(), (req, res) => {
    console.log("get stocks");
    console.log(stocks);
    res.send(stocks);
});

app.post('/stocks/', cors(), (req, res) => {
    console.log(stocks)
    stocks.push( {
        'id': (stocks[stocks.length - 1].id + 1),
        'name': req.body.name,
        'price': req.body.price,
        'amount': req.body.amount
    });
    res.send({'stocks': stocks, 'success': true});
});

app.put('/stocks/:id', cors(), (req, res) => {
    console.log(req.query)
    console.log(req.body)
    var index = stocks.findIndex(b => b.id === parseInt(req.body.id));
    var oldStock = stocks[index];
    stocks[index] = {
        'id': oldStock.id,
        'name': req.body.name,
        'price': req.body.price,
        'amount': req.body.amount
    };
    res.send()
});

app.delete('/stocks/:id', (req, res) => {
    stocks = stocks.filter(function(value, index, arr){ return value.id !== req.query.id});
    res.send(stocks)
});


app.get('/brockers', (req, res) => {
    res.send(brockers);
});

app.post('/brockers/', (req, res) => {
    brockers.push( {
        'id': (brockers[brockers.length - 1].id + 1),
        'name': req.body.name,
        'surname': req.body.surname,
        'email': req.body.email,
        'money': req.body.money
    });
    res.send({'brockers': brockers, 'success': true});
});

app.put('/brockers/:id', (req, res) => {
    console.log(req.query)
    console.log(req.body)
    var index = brockers.findIndex(b => b.id === parseInt(req.query.id));
    var oldBrocker = brockers[index];
    brockers[index] = {
        'id': oldBrocker.id,
        'name': req.body.name,
        'surname': req.body.surname,
        'email': req.body.email,
        'money': req.body.money
    };
    res.send()
});

app.delete('/brockers/:id', (req, res) => {
    brockers = brockers.filter(function(value, index, arr){ return value.id !== req.query.id});
    res.send(brockers)
});


app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});


app.listen(port, hostname, () => {
  console.log(`Server running AT http://${hostname}:${port}/`);
});
