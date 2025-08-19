let nav = new Navegador();

// Variables globales para las imágenes del Snake
let cabezaIzquierdaImg;
let cabezaDerechaImg;
let cabezaArribaImg;
let cabezaAbajoImg;
let frutaImg;
let cuerpoImg;
// Imagen del duplicador de puntaje del snake
let duplicadorImg;
//variables sonidos del galaga
let snakeComeSound; // Variable para el sonido de comer
let snakeComeAnuncioSound; // Variable para el sonido de comer anuncio
let snakeDuplicadorSound; // Variable para el sonido del duplicador
let snakePierdeSound; // Variable para el sonido de perder

// SONIDOS DE PAGINA01 
let spawnAnuncioSound; // Variable para el sonido de aparecer anuncio

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
    // Cargar imagen del duplicador de puntaje del snake
    duplicadorImg = loadImage("data/anuncios/duplicador-puntaje.png");
    //Cargar sonidos del snake
    snakeComeSound = loadSound("data/spasmic-snake-assets/sounds/snake-come.mp3");
    snakeComeAnuncioSound = loadSound("data/spasmic-snake-assets/sounds/snake-come-anuncio.mp3");
    snakeDuplicadorSound = loadSound("data/spasmic-snake-assets/sounds/snake-duplicador.mp3");
    snakePierdeSound = loadSound("data/spasmic-snake-assets/sounds/snake-pierde.mp3");

    //imagenes galaga
    imgs.push(loadImage('data/galaga-assets/ship.png'));
    imgs.push(loadImage('data/galaga-assets/alien0.png'));
    imgs.push(loadImage('data/galaga-assets/alien1.png'));
    imgs.push(loadImage('data/galaga-assets/alien2.png'));

    // CARGAR SONIDO DE PAGINA01
    spawnAnuncioSound = loadSound("data/anuncios/spawn-anuncio.mp3");
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