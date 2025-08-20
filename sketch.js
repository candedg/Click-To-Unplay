let nav = new Navegador();

// Variable para la tipografía
let fuenteTitulo;
let fuenteTexto;

// Variables para las músicas
let pagina01Sound;
let pagina02Sound;
let pagina03Sound;

// Variable del contador de tiempo
let comienzaTiempo;
let finTiempo;
let contadorAnuncios2 = 0;
let contadorAnuncios3 = 0;

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
let recompensaImg
//variables galaga
let keys = [];
let ship;
let bullets = [];
let aliens = [];
let settings;
//variables sonidos galaga
let muerteNave
let recompensaGalaga
let muereAlien
let sonidoBala
let sonidoRevive

let anuncios = []; //array con anuncios
let indiceAnuncio = 0; // índice de la próxima imagen a mostrar

function preload() {
    // Cargar anuncios
    for (let i = 1; i <= 16; i++) {
        let img = loadImage(`data/anuncios/a${i}.png`);
        anuncios.push(img);
    }

    // Cargar tipografías
    fuenteTitulo = loadFont("data/fonts/zephyr_jubilee.ttf");
    fuenteTexto = loadFont("data/fonts/Neuropol.otf");

    // Cargar músicas
    pagina01Sound = loadSound("data/musica/musica inicio.mp3");
    pagina02Sound = loadSound("data/musica/musica galaga.mp3");
    pagina03Sound = loadSound("data/musica/musica snake.mp3");

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
    recompensaImg=loadImage('data/galaga-assets/recompensa.png')

    //sonidos galaga
    muerteNave=loadSound('data/galaga-assets/muerte-nave.mp3')
    muereAlien=loadSound('data/galaga-assets/muere-alien.mp3')
    recompensaGalaga=loadSound('data/galaga-assets/recompensa-galaga.mp3')
    sonidoBala=loadSound('data/galaga-assets/bala.mp3')
    sonidoRevive=loadSound('data/galaga-assets/revive.mp3')

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
    p = new Pagina04();
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