require(`dotenv`).config();
const express = require("express");
const cors = require("cors");

let datoADevolver=[ 'dato0','dato1','dato2','dato3'];

/* async function init() { */
    /*return new Promise < string > (( resolve, reject *) => {*/
    /*  resolve(datoADevolver); */

    const app = express();
    app.use(cors());

    /* const port = 2002; */
    const port = process.env.PORT || 2002;
    app.set ('port', process.env.PORT || port); 

    
    app.get('/', (_, res) =>{
        res.send('New mensaje');
    })
    
    app.listen((port, () => {
        console.log(`listening mi APP on port http://localhost:${port}`);
    }))
/* }

init()
    .then(() => console.log(`Arranca bien`))
    .catch(err => console.log(`errores - ${err}`));
 */