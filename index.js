const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
    res.send('Explore JWT Token!')
})

app.post('/login', (req, res) => {
    const user = req.body;
    if (user.email === 'mdmehedihasan384@gmail.com' && user.password === '123456') {
        const token = jwt.sign({ email: user.email }, process.env.ACCESS_JWT_SECRET);
        res.send({ token })
    }
    else {
        res.send({ success: false })
    }
})

app.listen(port, () => {
    console.log('Explore JWT Token Server Running', port);
})
