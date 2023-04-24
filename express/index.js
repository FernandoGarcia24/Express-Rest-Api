
const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('dev'));

// Para procesar los datos que envian los usuarios;
app.use(express.text())       
app.use(express.json());
// Para que entienda los datos que viene de un formulario
app.use(express.urlencoded({extended: false}));

app.get('/products', (req, res) => {
    res.send('Estoy es la pagina de productos')
})

// Middlewares


// Mostra mensaje por consola
app.use((req, res, next) => {
    console.log(`Router: ${req.ur} Metodo: ${req.method}`);
    next();
})

// Json
app.get('/uses', (req, res) => {
    res.json({"nombre": "Fernando" });
});

// Resiviendo los datos del ususario
app.post('/datos', (req, res) => {
    console.log(req.body);
    res.send('Datos recividos');
})

// Params : para intrepertar un valor
app.get('/name/:nombre/age/:edad', (req, res) => {
    res.send(`El usuario es ${req.params.nombre}  tiene ${req.params.edad} años`);
} )


app.listen(3000);
console.log(`server on port ${3000}`);