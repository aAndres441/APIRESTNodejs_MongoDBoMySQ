require("dotenv").config();

const express = require('express');
const cors = require('cors');

 function init() {

    console.time("Tiempo ejecucion");

    const app = express();

    app.use(cors());

    /* const port = 3000; */
    const port = process.env.PORT || 3300;

    app.listen((port, () => {
        console.log(`listening mi APP on port http://localhost:${port}`)
    }))

    console.timeEnd("Tiempo ejecucion");
}

init()
.then(data => console.log(`datos - }`))
/* .then(data => console.log(`datos - ${data.env.PORT}`)) */
.catch(err => console.log(err));

