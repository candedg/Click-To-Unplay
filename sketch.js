let nav = new Navegador();

// Variables globales para las imágenes del Snake
let cabezaIzquierdaImg;
let cabezaDerechaImg;
let cabezaArribaImg;
let cabezaAbajoImg;
let frutaImg;
let cuerpoImg;
//variables imagenes galaga
let imgs = [];
//variables galaga
let keys = [];
let ship;
let bullets = [];
let aliens = [];
let settings;

let anuncios = []; //array con anuncios
let indiceAnuncio = 0; // índice de la próxima imagen a mostrar

function preload() {
    // Cargar anuncios
    for (let i = 1; i <= 15; i++) {
        let img = loadImage(`data/anuncios/a${i}.png`);
        anuncios.push(img);
    }

    // Cargar imágenes del Snake
    cabezaIzquierdaImg = loadImage("data/spasmic-snake-assets/img/cabeza_izquierda.png");
    cabezaDerechaImg = loadImage("data/spasmic-snake-assets/img/cabeza_derecha.png");
    cabezaArribaImg = loadImage("data/spasmic-snake-assets/img/cabeza_arriba.png");
    cabezaAbajoImg = loadImage("data/spasmic-snake-assets/img/cabeza_abajo.png");
    frutaImg = loadImage("data/spasmic-snake-assets/img/fruta.png");
    cuerpoImg = loadImage("data/spasmic-snake-assets/img/cola.png");
    //imagenes galaga
    imgs.push(loadImage('data/galaga-assets/ship.png'));
    imgs.push(loadImage('data/galaga-assets/alien0.png'));
    imgs.push(loadImage('data/galaga-assets/alien1.png'));
    imgs.push(loadImage('data/galaga-assets/alien2.png'));
}

function setup() {
    let cnv = createCanvas(400, windowHeight);
    let x = (windowWidth - width) / 2;
    cnv.position(x, 0);

    // Crear las páginas y agregarlas al navegador
    let p = new Pagina01();
    nav.agregarPagina(p);
    p = new Pagina02();
    nav.agregarPagina(p);
    p = new Pagina03();
    nav.agregarPagina(p);

}

function draw() {
    nav.paginaActual.draw();
}

function mousePressed() {
    nav.paginaActual.mousePressed();
}

function keyPressed() {
    nav.paginaActual.keyPressed();
}