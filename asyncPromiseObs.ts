const { Observable } = require('rxjs');

/* export  class modelosAsync{ */

let datoADevolver = 'Devolucion';
listaEjem:[]=[ 'dato0','dato1','dato2','dato3'];
let titulo = `Arranca`;
  
/* enum role {  CLIENT = 90, ADMIN, USU }; */

const datoObs1 = new Observable();

//#region OBSERVABLES ocupa subscribe y next emite
const observable = new Observable((observer: any) => {
    datoObs1.subscribe(observer);
    observer.next(`primer OBS`);
    observer.next(`segundo OBS`);
    setTimeout(() => { observer.next(`otro OBS`), 2000; });
});

observable.subscribe((observer: any) => { 
    console.log(`${observer} Va Observables - ${datoObs1}`); 
});
//#endregion

//#region PROMISES resolve que ocupa el then
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(datoADevolver)
    }, 2000);
    reject(() => { console.log("rechazo") });
});

promise.then((observer: any) => { console.log(observer, `Va Promise`) });

const funcionPromise = () => {
    return new Promise<string>((resolve, reject) => {
        setTimeout(() => {
            resolve(datoADevolver)
        }, 2000)
        if (datoADevolver.charAt(0).toLocaleUpperCase() == "A") {
            reject(() => { console.log("rechazo a la A") });
        }
    });
};

//llamando a la función y luego del then obtengo el dato que me esta dando el resolve de la promesa
funcionPromise()
    .then(data => console.log(`dato que me da la promesa ${data}`))
    .catch(err => console.log(`errores - ${err}`));

/*otro ej promesa, que llama aotra con async */

const doSomething = async () => {
    console.log(await doSomethingAsync())
};
const doSomethingAsync = () => {
    return new Promise<string>((resolve, reject) => {
        setTimeout(() => {
            resolve('I did something')
        }, 3000);
        reject(() => { console.log("rechazo2") });
    });
};
console.log(`Before`)
//llamo
doSomething(),
console.log(`After`);
//#endregion

//#region ASYNC
//#endregion
/* } */