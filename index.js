const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
    res.send('Explore JWT Token!')
})

app.listen(port, () => {
    console.log('Explore JWT Token Server Running', port);
})
