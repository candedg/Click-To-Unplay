let nav = new Navegador();
let img1; // Variable global para la imagen de anuncio

// Variables globales para las imágenes del Snake
let cabezaIzquierdaImg;
let cabezaDerechaImg;
let cabezaArribaImg;
let cabezaAbajoImg;
let frutaImg;
let cuerpoImg;

function preload() {
    // Cargar todas las imágenes globalmente en preload()
    img1 = loadImage("data/Image-not-found.png");
    
    // Cargar imágenes del Snake
    cabezaIzquierdaImg = loadImage("data/spasmic-snake-assets/img/cabeza_izquierda.png");
    cabezaDerechaImg = loadImage("data/spasmic-snake-assets/img/cabeza_derecha.png");
    cabezaArribaImg = loadImage("data/spasmic-snake-assets/img/cabeza_arriba.png");
    cabezaAbajoImg = loadImage("data/spasmic-snake-assets/img/cabeza_abajo.png");
    frutaImg = loadImage("data/spasmic-snake-assets/img/fruta.png");
    cuerpoImg = loadImage("data/spasmic-snake-assets/img/cola.png");
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