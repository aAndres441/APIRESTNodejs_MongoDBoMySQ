const { Observable } = require('rxjs');
const puppeteer = require('puppeteer');
const fs = require('fs/promises');
const {map,filter} = require('rxjs/operators');
const  fetch  = require('node-fetch'); //es para la version 2 de fetch
//import fetch from 'node-fetch';

//#region DATOS DE URL a usar 🐄 
    const un  = https://jsbin.com/wihohiqaru/edit?html,css,js,output 🔋
    const deux = https://api.github.com/users ↕  
    const trois = https://restcountries.com/v3.1/capital/lima 🌵
    const quatre = https://www.tabnine.com/code/javascript/functions/puppeteer/Page/evaluate 🧙
    const cinq = https://quotes.toscrape.com/login 📜
 //#endregion

//#region datos
const datoADevolver = 'Devolucion';
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
//llamada
/* resultadoCapital('buenos aires'); */

/********** ASYNC ************************************* */
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
/* ('rickitan'); */
/* nombres('rickitan'); */
 //#endregion

//#region
/**********  GETS NOMBRES  *************************************/
const getNames = async ()=>{
    const url = 'https://api.github.com/users';
    const res = await fetch(url);
    if (res.status !== 200){
        throw new Error(`Favor verificar url-${res.status}`)
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
 })
 //Llamada
/*  (); */
 
/******* ASYNC AWAIT //es lo mismo que anterior pero le cambie por async await ******************************************************** */
// async function fetchConPromesa(datoBuscado) {
// const fetchConPromesa = async ()  => { //no anda asi, como pasar param?
//const fetchConPromesa = async (datoBuscado) => { 

///       .then((response) => console.log(`Name: ${response[0].name.official}--Limites:${response[0].borders}`))

/********************************************************************* */
//#endregion

/***************  SCRAPPING  *******************************************************/
//#region ASYNC Escrapiando
const searchValue = 'moto';
const urlMercibre = "https://listado.mercadolibre.com.uy";

const secrapiando = async () => {
    console.log('🌊 Puppeteer robot start working.')
    const opcionCabezaAbreVentana = {
        _headless: false,
        /*get headless() {return this._headless; },
        set headless(value) {this._headless = value; }, */
    };
   
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
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36');
    await page.setViewport({
        width: 1920, height: 1080, deviceScaleFactor: 1
    })
    try {
        await page.goto(urlMercibre);   

        await page.waitForSelector('#cb1-edit');
        await page.type(searchValue,{ delay: 100 });
        await page.waitForTimeout(2000);
        await page.screenshot({ path: 'mercadoLibre/moto', type: "jpeg"});
        await page.click('.nav-icon-search');
        
        await fs.writeFile('mercadoLibre/nuevoArch.txt', valorEncontrado);

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
        const todasPublicaiones = document.getElementsByClassName('ui-search-layout');//> ui-search-layout > ui-search-layout__item        
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

   listDtosDOM.forEach(element => console.log(`element-${element.concat(1, 0, 'Feb')}`));
    await fs.writeFile('mercadoLibre/nuevlista.txt', listDtosDOM.splice(0, 0, 'Feb').join('\r\n'));
 
    //await fs.writeFile('link.txt', unlink.join('\r\n')); 
    
    await browser.close(); //cierra navegador
} catch (error) {
    console.error('Opps, Something Error: ', error || 'null')
}

}
/* secrapiando.pipe(
    map(val => ({ASYNC:val})).subscribe(console.log)
) */
//secrapiando();
//#endregion

//#region mercadolibre anda lindo
(async () => {
    const urlMercibreAutos = "https://listado.mercadolibre.com.uy/autos#D[A:autos]";
    console.log('🌊 Puppeteer robot start working in Laptop.');
    const objLista=[];
    const browser = await puppeteer.launch({
        headless: false, //no abre navegador en true
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
    try {
        const page = await browser.newPage()
        //await page.goto('https://books.toscrape.com/');
        //await page.goto('https://listado.mercadolibre.com.uy');
        
        await page.goto('https://books.toscrape.com/', {"waitUntil" : "networkidle0"});       
       
        await page.waitForTimeout(2000);
        await page.screenshot({ path: 'mercadoLibre/otrp.jpg', type: "jpeg" });
        // const links2 = await page.$$eval('ol>li>.product_pod>.image_container>a',elem=>elem.map(link=>link.href))
        const enlaces = await page.evaluate(() => {
            const elements = document.querySelectorAll('ol>li>.product_pod>.image_container>a');           
            const links = [];
            let count=0;           
            for (let e of elements) {
                const obj={}
                count++;               
                obj.re=e.href;
                obj.count=count;
                links.push(obj);                
            }
            return links;
        });
        // EL CONSOLE VA AFUERA DEL EVALUATE  
         //console.log("\n Resultado: ", enlaces, "\n");

         let cont = 0;
         for (elem of enlaces) {
            console.log('Nº',cont);
            if(cont === 10) continue;
            const obj={}
            await page.goto(elem.re);
            await page.waitForSelector("#content_inner>article> div.row > div.col-sm-6.product_main h1");
            
            /* **************anda todo , solo descomentar ********************** */
            //anda  await page.evaluate(() => alert('This message is inside an alert box'))
            
            //anda string
             /* const title = await page.$eval("#content_inner>article>div.row > div.col-sm-6.product_main p"
                ,el=>el.innerText);
             console.log(title); */
            
            // anda array
            /* const title = await page.evaluate(() => 
                Array.from(document.querySelectorAll('#content_inner>article> div.row > div.col-sm-6.product_main h1'))
                .map(el => el.textContent));
            console.log(title); */
                      
            /* //anda array
             const title = await page.evaluate(()=>{
                 const elem = document.querySelector('#content_inner > article > div.row > div.col-sm-6.product_main h1');
                 if(!elem) return null;
                 // return elem.innertext; -no sirve - 
                 return elem.textContent;
             })
             console.log(title); */

             /* *********hasta aca anda, me aburri, despues sigo ******************************************************************** */
             //const price = document.querySelector('.col-sm-6 product_main>p',el=>el.innerText);
             //const price = await page.$eval('.col-sm-6 product_main>.price_color',el=>el.innerText);
             /*  const vendedor = await page.evaluate(()=>{
                const elem = document.querySelector('.zz>z');
                if(!elem) return null;
                return elem.innerText;
            }); */
           // obj.name=title;
            //obj.precio = price;
           // objLista.push(obj);
           //objLista.push(title.innerText);
           
           cont++;
          //console.log('???',title);
         }

         
         ///console.log(objLista.length);
         //console.log('LENGTH',objLista[0].name,'--',objLista[1].name);
          /*   for (const link of linkis) {
            console.log('Nº',contador);
            if(contador ===10) continue;
            await page.goto(link);
            await page.waitForSelector('ul>xxx>.title');

            const titulo = await page.$eval('ul>xxx>.title',el=>el.innerText);
            const precio = await page.$eval('.yyy>.price',el=>el.innerText);

            const vendedor = await page.evaluate(()=>{
                const elem = document.querySelector('.zz>z');
                if(!elem) return null;
                return elem.innerText;
            });

            const objRet={}
            objRet.name = titulo; */
               /*  await page.goto(e.href);
                await page.waitForSelector('#content_inner>article>.col-sm-6 product_main>h1');
                const uno = await page.$eval('#content_inner>article>.col-sm-6 product_main>h1',(elem)=>{elem.innerText})
                obj.titul=uno; */
                
                //links.push(e.innerText); //devuelve titulo
                /*   console.log('Nº',contador);
            if(contador ===10) continue;

            await page.goto(link);
            await page.waitForSelector('');

            const titulo = await page.$eval('',el=>el.innerText);
            const precio = await page.$eval('',el=>el.innerText);

            const vendedor = await page.evaluate(()=>{
                const elem = document.querySelector('');
                if(!elem) return null;
                return elem.innerText;
            }); */
       /*  const links = [];
            const obj={};
            let count=0;
            for (let e of elements) {
                obj.id=count;
                obj.hre=e.href;
                obj.title=e.title;
                
                links.push(obj);
                //links.push(e.innerText);
                count++;
            }
            return links; */
       /* const libros = [];
        let count = 0;
        for (let item of enlaces) {
            console.log('item', count++, item)
            await page.goto(item);
            await page.waitForSelector('.product_main>h1');
            const libro = await page.evaluate(() => {
                const tmpLibros = {};
                tmpLibros.title = document.querySelector('.product_main>h1').innerText;
                tmpLibros.price = document.querySelector('.product_main>.price_color').innerText;
                return tmpLibros;
            });
            libros.push(libro);
        }
        console.log(`LIBROS:${JSON.stringify(libros, null, 4)}`); */
        await page.waitForTimeout(2000);
        await browser.close(); //cierra navegador
    
    }
    catch (error) {
        console.error(`Ta le erro-${error}`)
    }
   
})
//llamada
()
//#endregion 

//#region toscrape anda bien 1
const url= 'https://quotes.toscrape.com/login';
const searchFor = 'moto';
const searchPass = '123';
const scrapLogin = async()=>{ 
    
    const browser = await puppeteer.launch({
        headless: false, //abre navegador en false
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForSelector('.form-group>.#username');
    await page.type('.form-group>#username','Aprenderás', { delay: 1000 });
    await page.type('#password',searchPass, { delay: 1000 });
    await page.screenshot({ path: 'mercadoLibre/login1.jpg', type: "jpeg" });

    await page.waitForTimeout(2000);
    await page.click('form>input>.btn');  
    await page.waitForTimeout(2000); 
    await page.screenshot({ path: 'mercadoLibre/login2.jpg', type: "jpeg" });
   /*  await page.evaluate(()=>{ 
        tmpBoton =  document.querySelector('.form-group>.btn btn-primary').innerHTML;
    })
    console.log(tmpBoton); */
   /*  await page.waitForTimeout(2000);
    const valor1 = await page.evaluate('#password',el=>{el.innerHTML});
console.log('Valor',valor1); */
const valor2 = document.getElementById("#password").innerHTML;
        console.log(valor2);

    await browser.close(); //cierra navegador
        ///const tmp = {}//un objeto
        ///tmp.title = element.querySelectorAll('ol>li>article>.product_price>form>.btn btn-primary btn-block').innertext;
       /*  await page.evaluate('section>.alert-warning',el=>{el.innerHTML});
   console.log(valor.map((p)=>{datp(p)})); */
       
        // EL CONSOLE VA AFUERA DEL EVALUATE
/*        return pub.getElementsByClassName('ui-search-layout__item')[0].href;
    
       //await page.screenshot({ path: "mercadoLibre/laptop.jpg", type: "jpeg", fullPage: true });
        //await page.waitForTimeout(2000);
        //await page.click('.nav nav-list>li>ul>li[0]>a');
        /*  await page.screenshot({ path:"mercadoLibre/libro.jpg", type: "jpeg", fullPage: true }); */
        //const valor = await page.evaluate('#cb1-edit',el=>{el.innerHTML});

        //const valor = document.getElementById("#cb1-edit").innerHTML;
        //console.log(valor);
        //await page.type('#cb1-edit','autos');
        /*  await page.type('.nav-search > input','moto');
         await page.screenshot({path: 'mercadoLibre/libro.jpg', type: "jpeg" });
         await page.click('.nav-search > .nav-search-btn');
         //await page.waitForSelector('[.ui-search-row--stack>li]')
         await page.waitForSelector('.ui-search-row--stack>li>.ui-search-row>.andes-card andes-card--flat andes-card--default andes-card--padding-default>.andes-card__content ui-row-card ui-row-card--mot>a>.ui-row-item__group ui-row-item__group--price');
          */
                     //const element = document.querySelectorAll('.ui-search-layout ui-search-layout--grid')


}
//scrapLogin();
//#endregion

//#region mercadoLibre completo
const searchValue2 = 'laptop';
const urlMercibre2 = "https://listado.mercadolibre.com.uy";
let contador = 10;
const listaDeBusqueda=[];

const scrapMerc = async () => {
    console.log('🦋  Puppeteer robot start working.')
    const opcionCabezaAbreVentana = {
        _headless: false,
        /*get headless() {return this._headless; },
        set headless(value) {this._headless = value; }, */
    };
    const browser = await puppeteer.launch({
        headless: false,
        /* slowMo: 2200,
        devtool: true */
    });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36');
    await page.setViewport({
        width: 1920, height: 1080, deviceScaleFactor: 1
    })
    try {
        await page.goto(urlMercibre2);   

        await page.waitForSelector('#cb1-edit');
        await page.type('#cb1-edit',searchValue2);
        await page.waitForTimeout(2000);
        await page.screenshot({ path: 'mercadoLibre/laptop', type: "jpeg"});
        
        await Promise.all([
            page.waitForNavigation(),
             page.click('.nav-icon-search')
        ])
//$$eval es como document.querySelectAll
//$eval avalua solo el primer selector

        const linkis = await page.$$eval('ol>li>.ui-search-result__item_wrapper>a',elem=>elem.map(link=>link.href))
        //arriba itera en todos los elem pero cada uno con su href 
        console.log('ppp',linkis);
       
        for (const link of linkis) {
            console.log('Nº',contador);
            if(contador ===10) continue;

            await page.goto(link);
            await page.waitForSelector('ul>xxx>.title');

            const titulo = await page.$eval('ul>xxx>.title',el=>el.innerText);
            const precio = await page.$eval('.yyy>.price',el=>el.innerText);

            const vendedor = await page.evaluate(()=>{
                const elem = document.querySelector('.zz>z');
                if(!elem) return null;
                return elem.innerText;
            });

            const objRet={}
            objRet.name = titulo;
            objRet.precio = precio;
            objRet.link = link;
            (vendedor ? objRet.vendor : '');

            listaDeBusqueda.push(objRet);

            contador++;
        }

        console.log('LISTA',listaDeBusqueda);
       
       /*  const listaObj=[];
        const obj1={};
        for(let elem of linkis) {
            obj1.title = elem.title,
            obj1.fref = elem.href
        }
        listaObj.push(obj1);
        const enlaces = await page.evaluate(() => {
            const elements = document.querySelectorAll('ol>li>.ui-search-result>.ui-search-result__item_wrapper>a');
            const links = [];
            for (let e of elements) {
                links.push(e.href);
            }
            return links;
        });
        // EL CONSOLE VA AFUERA DEL EVALUATE  
         console.log("\n Resultado: ", enlaces, "\n"); */

        /* const elems=[];
const ele = document.getElementsByClassName('.ui-search-result__item-image-container>.ui-search-result__link ui-search-link').innerText;
elems.push(ele); */
    /*     for (let e of elems) {
            console.log(e.href);}
              
        const todasPublicaiones = document.getElementsByClassName('.ui-search-result__item-image-container>.ui-search-result__link ui-search-link');       
         const linkDe = (pub)=>{
             return pub.getElementsByClassName('.ui-search-result__item-image-container>.ui-search-result__link ui-search-link')[0].href;
         }
         console.log('linkDe',linkDe); */
        // return Array.from(todasPublicaiones).map((p)=> {linkDe(p)}); 
        
        //$$eval es = document.querySelectorAll()
       // const href = document.select
        /* const images = await page.evaluate(()=>{
            const links=[]; */
            //return Array.from 
           // const link = document.getElementsByClassName('.ui-search-result__item_wrapper').innerText;
          /*   const link = document.querySelectorAll('.ui-search-result__item_wrapper>a')
            .innerText; */
            //.map(x => x.textContent);
           /*  links.push(link) */
            /* for (let e of elements) {
                links.push(e.href);
            } */
            /* return links;            
        })
        for(let im of links) {
            console.log('i',im);
                    } */

        /* evaluate(() => {         
        const todasPublicaiones = document.getElementsByClassName('ui-search-layout');//> ui-search-layout > ui-search-layout__item        
         const linkDe = (pub)=>{
             return pub.getElementsByClassName('ui-search-layout__item')[0].href;
         }
         return Array.from(todasPublicaiones).map((p)=> {linkDe(p)});     
        return Array.from(document.querySelectorAll('.ui-search-results > .ui-search-layout > .ui-search-layout__item > .ui-search-price__second-line'))
        .map(x => x.textContent);
   return Array.from(document.querySelectorAll('section > .ui-search-results > ol > li > .ui-search-result__wrapper > a'))
        .map(x => x.textContent); 
});

listDtosDOM.forEach(element => console.log(`element-${element.concat(1, 0, 'Feb')}`));
await fs.writeFile('mercadoLibre/nuevlista.txt', listDtosDOM.splice(0, 0, 'Feb').join('\r\n'));
*/

        /*    const valorEncontrado = await page.$eval
        (" .ui-search-results > .ui-search-layout > .ui-search-layout__item >.ui-search-result__content >.ui-search-result__content-wrapper>.ui-search-price , span", e => e.innerHTML)
    //const valorEncontrado=await page.$eval(" .nav-search-input" , e=> e.innerHTML)
    /* .map((p)=>{linkDe(p)}); */
    /*  const linkDe = (pub)=>{
         return pub.getElementsByClassName('ui-search-layout__item')[0].href;
     }
      */

    //console.log("\n Resultado: ", valorEncontrado.split('>'), "\n"); */
        /* console.log()
            const laspages=await page.evaluate('.ui-search-result__item_wrapper',el=>{el.innerHTML});
            console.log(laspages.length) */
           /*  const tmp = {}//un objeto
            tmp.title = element.querySelectorAll('ol>li>article>.product').innertext;
            tmp.price = element.querySelectorAll('ol>li>article>.product').innertext;
            tmp.link = element.querySelectorAll('ol>li>article>.product>a').href;
            return tmp; */


            /*    const enlaces = await page.evaluate(() => {
            const elements = document.querySelectorAll('ol>li>article>h3>a');
            const links = [];
            for (let e of elements) {
                links.push(e.href);
                //links.push(e.innerText);
            }
            return links;
        }); */
        /* const links = [];
            for (let e of elements) {
                links.push(e.href);
                //links.push(e.innerText);
            }
            return links; */
        
        
        ///const tmp = {}//un objeto
        ///tmp.title = element.querySelectorAll('ol>li>article>.btn btn-primary btn-block').innertext;
       //  await page.evaluate('section>.alert-warning',el=>{el.innerHTML});
        
       /// await fs.writeFile('mercadoLibre/nuevoArch.txt', valorEncontrado);

   // const valorEncontrado = await page.$eval
     //   (" .ui-search-results > .ui-search-layout ", e => e.innerHTML)
  

   // console.log("\n Resultado: ", valorEncontrado.split('>'), "\n");
   await page.waitForTimeout(2000);
    await browser.close(); //cierra navegador
    } catch (error) {
        console.error('Opps, Something Error: ', error || 'null')
    }

}
//scrapMerc();
//#endregion

//#region lista al pedo

const ll = agregar => {
    undato = { id: 2, title: "locus", year: 233 };
    listado.push(undato);
    console.log("largo", listado.length);
}
//ll();
//#endregion
