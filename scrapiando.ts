const puppeteer = require  ('puppeteer');
const express = require('express');
const cors = require('cors');
const fs = require('fs/promises');
const mongoose = require('mongoose');
const Champion = require('chmpionModel');

const mongoUrl='mongodb+srv://<MongoDB>';//ver en mongoAtlas > connect > Connection string only 

const app = express();
const port = 3002;
//const port = process.env.PORT || 3002

app.use(cors());
app.use(express.json());
app.set ('port', process.env.PORT || port); 

//#region mongoose
/* ** MONGOOSE**** */
/* mongoose.connect(mongoUrl, { useNewUrlParser: true });
var db = mongoose.connection;
!db ? console.log("Hubo un error conectandose a la base de datos") : console.log("Conexión a base de datos satisfactoria");
 */
//#endregion

app.get('/',(_,response) => {response.send(`-MENSAJE de connection-`);});
app.get('/id',(req,res) => {res.send(`Doc ID-${req.params.id}`);});

//#region getScraping
app.get("/scrapping", function (req, res) {
    res.send('Estamos en scrapping');
	let scrape = async () => {
		const browser = await puppeteer.launch({ headless: false });
		const page = await browser.newPage();
		await page.setViewport({ width: 1920, height: 1080 });
		await page.goto("https://listado.mercadolibre.com.uy/laptop#D[A:laptop]", 
        [1000,{ waitUntil: "domcontentloaded" }]);

        await page.click('#root-app > div > div > section > ol > li:nth-child(1) > div > div > div.ui-search-result__image');
      //  await page.waitforselect('.ui-pdp-container__top-wrapper mt-40 > .ui-pdp-header > .ui-pdp-header__title-container > h1');
      /*   const res = await page.evaluate(()=>{
            const elem = document.querySelector('.ui-pdp-container__top-wrapper mt-40 > .ui-pdp-header > .ui-pdp-header__title-container > h1').innerHTML;
            if(!elem) return null;
            return elem;   
            //return elem.textContent;
            //return elem.innerText;           
        }); */
       /// const articles = await page.evaluate(() => Array.from(document.querySelectorAll('a.storylink')).map(el => el.textContent));
       /// await page.evaluate(() => alert('This message is inside an alert box'))

        //const valorEncontrado = await page.$eval('#root-app > h1',(e)=>{e.innerHTML})
        //const linkis = await page.$$eval('ol>li>.ui-search-result__item_wrapper>a',elem=>elem.map(link=>link.href));
        //console.log('ppp',articles);
        console.log('ppp',res);
        console.log('ppp',res.textContent);
        //console.log('ppp',valorEncontrado);
        /*  const elements = document.querySelectorAll('ol>li>.ui-search-result>.ui-search-result__item_wrapper>a');
            const links = [];
            for (let e of elements) {
                links.push(e.href);
            } return links; */
        
        await page.waitForTimeout(2000);
        //await browser.close();
	}

	scrape().then(value => {    
		Champion.create(value,  (err, small)=> {
			if (err) return (err);
			console.log('saved!');
            
		});
		res.send(value);
        console.log(value);
        
		return;
	});
})
//#endregion
/***********   PUPETEER   ************/
//#region sucive
app.post('/sucive', (req, res) => {
    let body_filtro = req.body;
    console.log(body_filtro);

    (async () => {
        console.log('🌊 Puppeteer robot start working.')
        const browser=await puppeteer.launch({
            headless:true,
            args:['--no-sandbox', '--disable-setuid-sandbox']
        })
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36');
        try {
            await page.goto('https://www.sucive.gub.uy/consulta_deuda');
            await page.waitForSelector('')
            await page.type('#',body_filtro.document);
            await page.click('#btn');
            await page.waitForTimeout(2000);

            const valorEncontrado = await page.$eval
                (" .ui-search-results > .ui-search-layout > .ui-search-layout__item >.ui-search-result__content >.ui-search-result__content-wrapper>.ui-search-price , span", e => e.innerHTML)
            console.log("\n Resultado: ", valorEncontrado.split('>'), "\n");

            let salida = await page.evaluate(()=> {
                let elem =document.querySelectorAll('.list-group');
               
                return {
                    name:elem[1].innerHTML,
                    edad:elem[4].innerHTML
                }
                
            });

            await fs.writeFile('mercadoLibre/nuevoArch.txt', salida.splice(0, 0, 'Feb').join('\r\n'));
        
        } catch (error) {
            console.error('Opps, Something Error: ', error || 'null')
        }
        
    await browser.close(); //cierra navegador

    })
})
//#endregion

/********************************** */
app.post('/popst',(request,response) => {response.status('status').send(request.body.document);});


/********************************** */
app.listen(app.get('port'), () => { 
    //console.log('Server in port:  ', app.get('port'));
    console.log(`ir a: http://localhost:${app.get('port')}/scrapping`);
});

/* */