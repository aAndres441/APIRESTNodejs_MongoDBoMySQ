require(`dotenv`).config();
const express = require('express');
const cors = require('cors');
/* 
const morgan = require("morgan");
const bodyParser = require("body-parser"); */

async function init() {
    console.time("Midiendo");

    const app = express();

    app.use(cors());

    /* pp.use(morgan("dev")); //ver peticiones 
    
    app.use(express.json()); //entiende request json
    
    app.use(bodyParser.urlencoded({ extended: true })); //otra forma de parsear json de la req
    
    app.use(bodyParser.json()); */

    const port = process.env.PORT || 3003;

    setTimeout(() => {
    app.listen(() => {
            console.log(`inicialiazando http://localhost: ${port}`);
        });
    }),5000;    

    await console.timeEnd("Midiendo");
}

init()
    .then(data => console.log(`sin Datos- ${data}`))
    .catch((err) => {err.message = `le erro`});

//#region invento
/* 
export let listaEjem:string[]=[ 'dato0','dato1','dato2','dato3'];
export let titulo = `Arranca`;

export enum FinDeSemana {
    Viernes = 90, Sabado, Domingo
};

export function mostra() {
    let fide: FinDeSemana = FinDeSemana.Domingo;
    let fide2 = FinDeSemana[92];
    listaEjem[1].charAt(0).toUpperCase();

    console.log(`Listade de clubes:${fide}-${fide2}`);
    console.log(`Lista- ${listaEjem}`);
}; */
//mostra();
//#endregion
