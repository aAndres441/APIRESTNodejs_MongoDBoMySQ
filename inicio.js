require("dotenv").config();

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

/* const port = 3000; */
const port = process.env.PORT || 3000;

app.listen((port, ()=>{
    console.log(`listening mi APP on port http://localhost:${port}`)
}))