var express = require('express');
var exphbs  = require('express-handlebars');
const mercadopago = require('./mercadopago')
const bodyParser = require('body-parser')

var app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()) 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/detail', async (req, res) => {
    const init_point = await mercadopago.createPreference(req.query)
    res.render('detail', {...req.query, init_point});
});

app.get('/success', (req, res) => {
    res.render('success', req.query);
})

app.get('/failure', (req, res) => {
    const message = 'Pago fallido'
    res.render('failure', message);
})

app.get('/pending', (req, res) => {
    const message = 'Pago pendiente'
    res.render('pending', message );
})

app.post('/notifications', (req, res) => {
    console.log("Notification:", req.body)
    res.status(200).send();
})

app.use(express.static('assets'));
 
app.use('/assets', express.static(__dirname + '/assets'));
 
app.listen(process.env.PORT || 3000);