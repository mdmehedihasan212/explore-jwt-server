const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).send({ message: 'unauthorized' })
    }
    const token = authHeader.split(' ')[1]
    jwt.verify(token, process.env.ACCESS_JWT_SECRET, (err, decoded) => {
        if (err) {
            res.status(403).send({ message: 'forbidden' })
        }
        req.decoded = decoded;
        next()
    });
}

app.get('/', (req, res) => {
    res.send('Explore JWT Token!')
})

app.post('/login', (req, res) => {
    const user = req.body;
    if (user.email === 'mdmehedihasan384@gmail.com' && user.password === '123456') {
        const token = jwt.sign({
            email: user.email
        },
            process.env.ACCESS_JWT_SECRET, {
            expiresIn: '1d',

        });
        res.send({
            token: token,
            success: true
        })
    }
    else {
        res.send({ success: false })
    }
})

app.get('/orders', verifyJWT, (req, res) => {

    res.send([{ id: 1, order: "sunglass" }, { id: 2, order: "watch" }, { id: 3, order: "show" }])
})

app.listen(port, () => {
    console.log('Explore JWT Token Server Running', port);
})
