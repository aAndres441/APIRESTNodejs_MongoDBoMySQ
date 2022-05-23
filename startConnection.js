require(`dotenv`).config();
const express = require("express");
const cors = require("cors");

let datoADevolver=[ 'dato0','dato1','dato2','dato3'];

async function init() {
    /*return new Promise < string > (( resolve, reject *) => {*/
    /*  resolve(datoADevolver); */

    const app = express();
    app.use(cors());

    /* const port = 2002; */
    const port = process.env.PORT || 3002;   

    if (datoADevolver.charAt(0).toLocaleUpperCase() == "A") {
        console.log("rechazo a la A");
        //reject(() => { console.log("rechazo a la A") });
    }else{  setTimeout(() => {
        app.listen((port, () => {
            console.log(`listening mi APP on port http://localhost:${port}`);
        }))
    }, 2000);}

    /*  }); */
}

init()
    .then(() => console.log(`Arranca bien`))
    .catch(err => console.log(`errores - ${err}`));
