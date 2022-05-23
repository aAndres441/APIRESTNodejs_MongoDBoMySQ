const { Observable } = require('rxjs');
const puppeteer = require('puppeteer');
const fs = require('fs/promises');
const {map,filter} = require('rxjs/operators');
const  fetch  = require('node-fetch'); //es para la version 2 de fetch
//import fetch from 'node-fetch';

//#region datos
let datoADevolver = 'Devolucion';
const listado =[
    {id:1, title:'uno', year:2001},
    {id:2, title:'dos', year:2002},
    {id:3, title:'tres', year:2003}
];
//#endregion

//#region PROMISE VS OBSERVABLE, al agregar ASYNC a cualquier función PROMESA FUNCTION o CONST significa que la función devolverá una promesa.

//PROMESA FUNCTION que devuelve un solo valor new promesa y la llamo usando la en then 
const otraPromesa2 =  (data) => { //async function(data){...}
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`Si sale - ${data}`)
        }), 2000        
        if(data =='aa'|| data ==undefined){
        reject(`NO SALE - `)//(err) => { new Error("NO SALE",err.message)})
    }
    })
}
/* //llamada a otraPromesa2
 otraPromesa2('aa')
 .then(valor =>({vemos:valor}))
 .then(console.log) 
 .catch(err => console.log(`VEMOS - ${err}`))
    .finally(() => { console.log('FIN') });
     */

const otraPromesa = async (data) => { //async function(data){...}
    return new Promise((resolver, rerchazar) => {
        if(listado.length > 6){
            rerchazar(new Error("hay muchos datos en la lista"));
        }
        setTimeout(() => {
            resolver("PROMISE.",data)
        }, 2000)
    })
}
/* //llamada a otraPromesa
otraPromesa('ppp')
.then(i=>console.log(`datos - ${i}`))
.catch((err) => { console.log('ERR', err) })
.finally(() => { console.log('FIN') });
     */

//OBSERVABLE
const otroObsFuncionConParametro = (vallor)=> {
    return new Observable((data) => {
        console.time('tm');
        data.next(vallor);
        data.next('Pepe');
        data.next('Manu');
        console.timeEnd('tm');
    })
}
//llamada otroObsFuncionConParametro
///otroObsFuncionConParametro('mandioca').pipe(map(data => ({numero:data}))).subscribe(console.log);

const otroObsNoPasaParam = new Observable((observer) => {
    //constante, no es function por eso el new
    observer.next('uno');
    observer.next('dos');
});
//llamada a otroObsNoPasaParam
///otroObsNoPasaParam.pipe(map(data => ({name:data}))).subscribe(console.log);

//#endregion

//#region PROMESA CONST new resuelve y usa then, devuelve un solo valor

const unaPromesa = new Promise((resuelvelve, reject) => { //constante, no es function por eso el new
    setTimeout(() => {
        resuelvelve("1Promesa");
    }), 2000;
    resuelvelve("2Promesa");
    if(listado.length > 6){
        //reject(new Error("hay muchos datos en la lista"));
        reject ((err) => { new Error("nada datosss")})
    }
});
/* //llamada a unaPromesa con constante, no es function por eso el new
unaPromesa
    .then(valor =>({OnePromesa:valor}))
    .then(console.log) //debe estar para poder mostrar el unico then que devuelve
    .catch((err) => { console.log('ERR', err) })
    .finally(() => { console.log('FIN') });
     */

//#endregion

//#region PROMESA FUNCTION que devuelve un solo valor new promesa y la llamo usando la en then
const funcionPromise = () => {
    return new Promise((resuelvelve, reject) => {
        setTimeout(() => {
            resuelvelve("cambioDevolucion")
        }, 2000)
        if(listado.length > 6){
            //reject(new Error("hay muchos datos en la lista"));
            reject ((err) => { new Error("nada datosss")})
        }
    });
    //en HTML <h3>App status = {{datoADevolver | async}}</h3>
};
/* //llamando a la función y luego del then obtengo el dato que me esta dando el resuelvelve de la promesa
funcionPromise()
    //.then(data => console.log(`dato que me da la promesa ${data}`))
    .then(valor =>({otherPromes:valor}))
    .then(console.log)
    .catch(err => console.log(`errores - ${err}`))
    .finally(() => console.log('Fin promesa')); */

//#endregion

//#region OBSERVABLE con next emite muchos valores y lo uso con subscribe 
const unObservable = new Observable((observer) => {
    console.time("hora Observable");
    observer.next("Observable1");    
    setTimeout(() => {
        observer.next("Observable2");
    }),5000;
    observer.next("Observable3");

    console.timeEnd("hora Observable");
});
/* //llamada aunObservable
unObservable.pipe(
    // filter(val => val === "Obs1"),
    map(val => ({OBS:val})))
    .subscribe(console.log); */
 
//#endregion

//#region Promise FETCH

//primero requiero node-fetch para llamadas http://
const formula = new Promise((resolve, reject) => { //constante, no es function por eso el new
    if (listado.length > 6) {
        reject ((err) => { new Error(err, 'ERR')})
    }
    /*comentado para no llamar a FETCH
    resolve(getName('Asuncion'));    */
    resolve('Asuncion')
});
/* //llamada a constante, no es function, que me devuelve el resolve
 formula
    .then((response) =>console.log(response))
    .catch ((err) =>console.log(err))
    .finally(() => console.log('Ta')); */

/* function getName(username) */
const getName = async (username) =>{
    const url = 'https://api.github.com/users/' + username;
    const url2 = `https://api.github.com/users/${username}`;
    const url3 = `https://openweathermap.org/`;
    const url4 = `https://restcountries.com/v3.1/all`;
    const url5 = `https://restcountries.com/v3.1/capital/${username}`
    const url51 = `https://restcountries.com/v3.1/capital/`
    const url6 = `https://jsonplaceholder.typicode.com/posts`;
    const url7 = 'http://example.com/movies.json';
    
    /* fetch(url5) //funcion fetch del modulo importado fetch que retorna una promesa      
    //fetch(url2) //funcion fetch del modulo importado fetch que retorna una promesa      
        .then(response => response.json()) //fetch da respuesta que la parsea y guardo
        // .then(data => ({ Info: data })) //no se lo pongo pues no anda co esto/
        .then((response) => console.log(`Name: ${response[0].name.official}--Limites:${response[0].borders}`))
        .catch((err) => { console.log('ERR', err) })
        .finally(() => { console.log('FIN') }); */

        /************  ACA AGREGANDO AWAIT y async a  la funcion madre ************ */
        const respuesta = await fetch(url5)  
        //console.log(respuesta)  
        if(respuesta.status !==200){
            throw new Error(`Error nombre  ${respuesta.status}`) 
           //throw Error(`Error nombre  ${obtenerjson.status}`);
       }
        const obtenerjson = await respuesta.json()
        
        //ERRORES
      
       // console.log(obtenerjson) 
       //console.log(`Name: ${obtenerjson[0].name.official}--Limites:${obtenerjson[0].borders}`)
        return `Pais: ${obtenerjson[0].name.official}--Limites:${obtenerjson[0].borders}`;
};

const resultadoCapital = async (valor)=>{
    try {
        const res = await getName(valor)
        console.log(res);
    } catch (e) {
        console.log(`sinDato ${e}`)
    }
}
resultadoCapital('buenos aires');
/*********************************************** */
//async function getnn(nombre){ 
const getnombre = async (nombre)=>{ 
    ///const respuesta = await fetch(`https://api.github.com/users/lima`) 
    const respuesta = await fetch(`https://api.github.com/users/${nombre}`) 
    if(respuesta.status !==200){
        throw new Error(`El usuario no existe ${respuesta.status}`) 
   }
    const res = await respuesta.json();
    //console.log(res)
  /*   if(res.status !==200){
        throw new Error(`Error nombress  ${res.status}`) 
   }*/
   console.log('Resr',respuesta)
   console.log('body',respuesta.body.bytesWritten)
    return res.name+res.id; 
}
//llamada a getnombre sin async
//getnombre('rickitan').then((r) =>console.log(`Name: ${r}` )).catch((err)=>console.log('eeee',err));
//llamada a get nombre con async o sin guardar en const
/* const nombres = async(value)  => { */
( async (value)=>{
    try {
        const res = await getnombre(value);
        console.log(`Name:: ${res}`);
    } catch (e) { console.log(`Error: ${e}`);}
})
//llamada
('rickitan');
/* nombres('rickitan'); */
  
/**********  GETS NOMBRES  *************************************/
const getNames = async ()=>{
    const url = 'https://api.github.com/users';
    const res = await fetch(url);
    if (res.status !== 200){
        throw new Error(`Favor ferificar url-${res.status}`)
    }
    const respuestaOk = res.json();
    return respuestaOk;
}
 (async ()=>{ 
     try {
         const lst = await  getNames();
         lst.forEach(element => {
             console.log(element.login+'..'+element.id);             
         });
     } catch (error) {
         console.log(error);
     }
 })();
 
/******* ASYNC AWAIT //es lo mismo que anterior pero le cambie por async await ******************************************************** */
// async function fetchConPromesa(datoBuscado) {
// const fetchConPromesa = async ()  => { //no anda asi, como pasar param?
//const fetchConPromesa = async (datoBuscado) => { 

///       .then((response) => console.log(`Name: ${response[0].name.official}--Limites:${response[0].borders}`))

/********************************************************************* */
//#endregion

//#region ASYNC Escrapiando

/* secrapiando.pipe(
    map(val => ({ASYNC:val})).subscribe(console.log)
)
 */
const secrapiando = async () => {
    const opcionCabezaAbreVentana = {
        _headless: false,
        /*get headless() {return this._headless; },
        set headless(value) {this._headless = value; }, */
    };
    const urlMercibre = "https://listado.mercadolibre.com.uy";
    const urlMercibreAutos = "https://listado.mercadolibre.com.uy/autos#D[A:autos]";
    const urlMercLibreMoto = "https://listado.mercadolibre.com.uy/motos#D[A:motos]";
    const urlMercLibreCasaVenta = "https://listado.mercadolibre.com.uy/casas-ventas#D[A:casas%20ventas]";
    const urlMercLibreCasaAlq = "https://listado.mercadolibre.com.uy/casas-alquiler#D[A:casas%20alquiler]";
    const urlMercLibreCasas= "https://listado.mercadolibre.com.uy/";
    const urlMercLibreCasaBiciElec = "https://listado.mercadolibre.com.uy/bicicleta-electrica#D[A:bicicleta%20electrica]";
    const urlMercLibreCasaBicis= "https://listado.mercadolibre.com.uy/";
    const urlBici = "bicicleta"
    const urlCasas = "casas#D[A:casas]"

    const browser = await puppeteer.launch({
        headless: false,
        /* slowMo: 2200,
        devtool: true */
    });
    const page = await browser.newPage();
    await page.setViewport({
        width: 1920, height: 1080, deviceScaleFactor: 1
    })
    await page.goto(urlMercibre);

    const valorEncontrado = await page.$eval
        (" .ui-search-results > .ui-search-layout > .ui-search-layout__item >.ui-search-result__content >.ui-search-result__content-wrapper>.ui-search-price , span", e => e.innerHTML)
    //const valorEncontrado=await page.$eval(" .nav-search-input" , e=> e.innerHTML)
    /* .map((p)=>{linkDe(p)}); */
    /*  const linkDe = (pub)=>{
         return pub.getElementsByClassName('ui-search-layout__item')[0].href;
     }
      */

    console.log("\n Resultado: ", valorEncontrado.split('>'), "\n");

    /********************************************************************* */
    //await page.click();
    /* await page.mouse.click(132, 103, { button: 'left' }) */
    /* await page.screenshot({ path: "mercLibre/autos" }); */
    // await page.pdf({ path: 'hn.pdf', format: 'a4' });  //formato A4
    /* await page.on('dialog', async dialog => {
          console.log(dialog.message())
          await dialog.dismiss()
          }) */
    // await page.evaluate(() => alert('This message is inside an alert box'));
   /********************************************************************* */

    await page.screenshot({ path: "mercadoLibre/autos2.jpg", type: "jpeg", fullPage: true });
    // await fs.writeFile('mercadoLibre/nuevoArch.txt', valorEncontrado.concat(1, 0, 'Feb').join('\r\n')); 
    await fs.writeFile('mercadoLibre/nuevoArch.txt', valorEncontrado);

    ////await page.evaluate(() => alert('This message is inside an alert box'));

    /*  const name = "<img src='x' onerror='alert(1)'>";
el.innerHTML = name; */


    const listDtosDOM = await page.evaluate(() => {
        /*  
        const todasPublicaiones = docuument.getElementsByClassName('ui-search-layout');//> ui-search-layout > ui-search-layout__item        
         const linkDe = (pub)=>{
             return pub.getElementsByClassName('ui-search-layout__item')[0].href;
         }
         return Array.from(todasPublicaiones).map((p)=> {linkDe(p)}); 
         */

        return Array.from(document.querySelectorAll('.ui-search-results > .ui-search-layout > .ui-search-layout__item > .ui-search-price__second-line'))
            .map(x => x.textContent);
        /* return Array.from(document.querySelectorAll('section > .ui-search-results > ol > li > .ui-search-result__wrapper > a'))
            .map(x => x.textContent); */
    });

    /* 
        const unlink = await page.evaluate(() => {
            return Array.from(document.getElementsByClassName('.ui-search-results >ol >li')[0].href)
            .map(x => x.textContent);
        }) */

    listDtosDOM.forEach(element => console.log(`element-${element.concat(1, 0, 'Feb')}`));
    await fs.writeFile('mercadoLibre/nuevoArch.txt', listDtosDOM.splice(0, 0, 'Feb').join('\r\n'));
    //await fs.writeFile('link.txt', unlink.join('\r\n')); 

    await browser.close(); //cierra navegador

}

//#endregion

//#region lista al pedo

const ll = agregar => {
    undato = { id: 2, title: "locus", year: 233 };
    listado.push(undato);
    console.log("largo", listado.length);
}
//ll();
//#endregion
