let galagaGameOver = false;

// Recompensas y anuncios GALAGA
let recompensas = [];
let mostrandoCartelRecompensaGalaga = false;
let recompensasObtenidasGalaga = 0; // cantidad de recompensas obtenidas (sin cañones adicionales)
let mostrandoAnuncioGalaga = false;
let anuncioActualGalaga = null;
let tiempoInicioAnuncioGalaga = 0;
let anunciosVistosGalaga = 0;
let duracionAnuncioGalaga = 15000; // 15s
let anunciosNecesariosGalaga = 1;  // 1 anuncio por recompensa

// otras variables (alias cañones maximos y cartel cañones maximos)
let alias = "arbia.com.ar"; // alias para transferir
let maxCanonesGratis = 5;   // MÁXIMO TOTAL de cañones (incluye el base)
let mostrandoCartelMaximo = false;
let cantidad = 5;           // cantidad inicial de aliens por oleada

class Pagina02 extends Pagina {
    constructor() {
        super();
        //Variable de la música de fondo
        this.musica02 = false;
    }

    setup() {
        createCanvas(width, height);
        noStroke();

        // Reproduce música en loop
        if (!this.musica02) {
            this.musica02 = true;
            pagina02Sound.setVolume(0.2);
            pagina02Sound.loop();
        }

        // parámetros ajustables 
        this.maxAliens = 5;   // cantidad máxima inicial
        this.alienEvery = 700;
        this.shotDelay = 150;

        this._lastAlien = 0;
        this._lastShot = 0;

        settings = new Settings();
        ship = new Ship();

        // reset estado galaga
        this.resetearEstadoGalaga();
    }

    resetearEstadoGalaga() {
        // Reset completo del estado del juego Galaga
        galagaGameOver = false;
        recompensas = [];
        mostrandoCartelRecompensaGalaga = false;
        recompensasObtenidasGalaga = 0;
        mostrandoAnuncioGalaga = false;
        anuncioActualGalaga = null;
        anunciosVistosGalaga = 0;
        mostrandoCartelMaximo = false;
        cantidad = 5; // resetear cantidad inicial

        // Limpiar arrays globales
        bullets = [];
        aliens = [];

        // Reinicializar nave
        ship = new Ship();

        // Reset parámetros del juego
        this.maxAliens = 5;
        this.alienEvery = 700;
        this.shotDelay = 150;
        this._lastAlien = 0;
        this._lastShot = 0;

        console.log('*** Estado Galaga reseteado completamente');
    }

    draw() {
        background(255, 0, 0);
        fill(6, 6, 26);
        rect(0, 0, width, height - 50);

        // Título 
        push();
        textAlign(CENTER, TOP);
        textSize(width / 8);
        stroke(148, 0, 211);
        strokeWeight(10);
        fill(0, 255, 0);
        textFont(fuenteTitulo);
        text('Galaga', width / 2, height / 20);
        text('Glitch', width / 2, height / 20 + width / 5);
        pop();

        if (galagaGameOver) {
            fill(0, 0, 0, 180);
            rect(0, 0, width, height);
            push();
            fill(255, 0, 0);
            textAlign(CENTER, CENTER);
            textSize(32);
            text("¡PERDISTE!", width / 2, height / 2 - 40);
            textSize(20);
            text("Presiona ESPACIO para volver a empezar", width / 2, height / 2 + 10);
            text("o ESC para pasar al siguiente juego", width / 2, height / 2 + 40);
            pop();
            return;
        }

        // Overlays
        if (mostrandoAnuncioGalaga) { this.dibujarAnuncioGalaga(); return; }
        if (mostrandoCartelRecompensaGalaga) { this.dibujarCartelRecompensaGalaga(); return; }
        if (mostrandoCartelMaximo) { this.dibujarCartelMaximo(); return; }

        // ===== JUEGO =====
        // spawn de aliens + chance de recompensa
        if (millis() - this._lastAlien >= this.alienEvery && aliens.length < this.maxAliens) {
            for (let i = 0; i < cantidad; i++) {
                if (aliens.length < this.maxAliens) {
                    const ax = random(50, width - 50);
                    const ay = -20;
                    aliens.push(new Alien(ax, ay));

                    if (Math.floor(random(1, 20)) == 1) {
                        recompensas.push(new Recompensa(ax, ay));
                    }
                }
            }
            this._lastAlien = millis();
        }

        // disparo
        const shooting = keyIsDown(UP_ARROW) || keyIsDown(87);
        if (shooting && millis() - this._lastShot >= this.shotDelay) {
            this.disparar();
            this._lastShot = millis();
        }

        ship.show();
        ship.update();

        // limpiar balas fuera de pantalla
        for (let i = bullets.length - 1; i >= 0; i--) {
            if (bullets[i].y <= 0) bullets.splice(i, 1);
        }

        // aliens
        for (let i = 0; i < aliens.length; i++) {
            aliens[i].show();
            aliens[i].update();
            aliens[i].checkCollision();
        }

        // balas
        for (let i = 0; i < bullets.length; i++) {
            bullets[i].show(ship.x, ship.y);
            bullets[i].update();
            bullets[i].checkCollision(bullets[i]);
        }

        // recompensas
        for (let i = recompensas.length - 1; i >= 0; i--) {
            recompensas[i].show();
            recompensas[i].update();
            if (recompensas[i].checkCollision()) {
                recompensas.splice(i, 1);
                mostrandoCartelRecompensaGalaga = true;
                recompensaGalaga.play()
            }
        }
    }

    // disparo de a varios cañones
    disparar() {
        let n = Math.min(recompensasObtenidasGalaga + 1, maxCanonesGratis);
        const s = ship.s;
        let offsets = [];

        if (n === 1) offsets = [0];
        else if (n === 2) offsets = [-s / 2, +s / 2];
        else if (n === 3) offsets = [0, -s / 2, +s / 2];
        else if (n === 4) offsets = [-0.75 * s, -0.25 * s, +0.25 * s, +0.75 * s];
        else offsets = [0, -s / 2, +s / 2, -s, +s];

        for (let dx of offsets) {
            bullets.push(new Bullet(ship.x + dx, ship.y));
        }
        sonidoBala.play()
    }

    // cartel recompensa
    dibujarCartelRecompensaGalaga() {
        fill(0, 0, 0, 150);
        rect(0, 0, width, height);

        fill(255);
        rect(width / 2 - 150, height / 2 - 80, 300, 160, 10);

        fill(0);
        textAlign(CENTER, CENTER);
        textSize(18);
        text("¡Ganaste una recompensa!", width / 2, height / 2 - 40);
        text(`Mirá ${anunciosNecesariosGalaga} anuncio(s) para reclamarla`, width / 2, height / 2 - 15);

        // Botón SÍ
        fill(0, 255, 0);
        rect(width / 2 - 80, height / 2 + 20, 60, 30, 5);
        fill(0);
        text("SÍ", width / 2 - 50, height / 2 + 35);

        // Botón NO
        fill(255, 0, 0);
        rect(width / 2 + 20, height / 2 + 20, 60, 30, 5);
        fill(0);
        text("NO", width / 2 + 50, height / 2 + 35);
    }

    // cartel maximo cañones
    dibujarCartelMaximo() {
        fill(0, 0, 0, 150);
        rect(0, 0, width, height);

        fill(255);
        rect(width / 2 - 180, height / 2 - 90, 360, 180, 10);

        fill(0);
        textAlign(CENTER, CENTER);
        textSize(18);
        text("¡Ya alcanzaste el máximo de cañones (5/5)!", width / 2, height / 2 - 40);
        text(`Para obtener más, transferí 100 USD`, width / 2, height / 2 - 15);
        text(`Alias: ${alias}`, width / 2, height / 2 + 10);

        // Botón OK
        fill(0, 200, 255);
        rect(width / 2 - 40, height / 2 + 40, 80, 30, 5);
        fill(0);
        text("OK", width / 2, height / 2 + 55);
    }

    // anuncios
    dibujarAnuncioGalaga() {
        if (millis() - tiempoInicioAnuncioGalaga >= duracionAnuncioGalaga) {
            this.terminarAnuncioGalaga();
            return;
        }

        if (anuncioActualGalaga && anuncioActualGalaga.width > 0) {
            let aspectRatio = anuncioActualGalaga.height / anuncioActualGalaga.width;
            let alturaEscalada = width * aspectRatio;
            let y = (height - alturaEscalada) / 2;
            image(anuncioActualGalaga, 0, y, width, alturaEscalada);
        } else {
            push();
            fill(255, 0, 255);
            rect(0, 0, width, height);
            fill(255);
            textAlign(CENTER, CENTER);
            textSize(24);
            text("ANUNCIO", width / 2, height / 2);
            pop();
        }

        let tiempoRestante = Math.ceil((duracionAnuncioGalaga - (millis() - tiempoInicioAnuncioGalaga)) / 1000);
        fill(255, 255, 255, 200);
        stroke(0);
        strokeWeight(2);
        rect(width - 100, 10, 90, 30, 5);
        fill(0);
        textAlign(CENTER, CENTER);
        textSize(14);
        text(tiempoRestante + "s", width - 55, 25);
    }

    iniciarAnuncioGalaga() {
        mostrandoCartelRecompensaGalaga = false;
        mostrandoAnuncioGalaga = true;
        tiempoInicioAnuncioGalaga = millis();

        let indiceAleatorio = floor(random(anuncios.length));
        anuncioActualGalaga = anuncios[indiceAleatorio];

        contadorAnuncios2++;
    }

    terminarAnuncioGalaga() {
        mostrandoAnuncioGalaga = false;
        anuncioActualGalaga = null;

        anunciosVistosGalaga++;
        if (anunciosVistosGalaga < anunciosNecesariosGalaga) {
            this.iniciarAnuncioGalaga();
            return;
        }
        anunciosVistosGalaga = 0;
        const canonesActuales = Math.min(recompensasObtenidasGalaga + 1, maxCanonesGratis);
        // cada anuncio aumenta la cantidad de aliens a la vez y el límite
        cantidad += 3;
        this.maxAliens += 3;

        if (canonesActuales < maxCanonesGratis) {
            recompensasObtenidasGalaga++;
            ship.v = ship.v / 1.5;
        } else {
            mostrandoCartelMaximo = true;
            mostrandoCartelRecompensaGalaga = false;
        }
    }

    // teclas
    keyPressed() {
    if (galagaGameOver && keyCode === 32) { // ESPACIO - reiniciar juego
        galagaGameOver = false;
        aliens = [];
        bullets = [];
        ship = new Ship();
        recompensas = [];
        recompensasObtenidasGalaga = 0;
        anunciosVistosGalaga = 0;
        mostrandoCartelRecompensaGalaga = false;
        mostrandoAnuncioGalaga = false;
        mostrandoCartelMaximo = false;
        this.maxAliens = 3; // reset
        cantidad = 3;       // reset
        sonidoRevive.play()
    }
    
    if (galagaGameOver && keyCode === ESCAPE) { // ESC - pasar al siguiente juego
        console.log('*** Pasando al siguiente juego desde Game Over');
        pagina02Sound.stop();
        this.musica02 = false;
        nav.siguientePagina();
    }
}

    mousePressed() {
        if (mostrandoCartelRecompensaGalaga) {
            if (mouseX >= width / 2 - 80 && mouseX <= width / 2 - 20 &&
                mouseY >= height / 2 + 20 && mouseY <= height / 2 + 50) {
                this.iniciarAnuncioGalaga();
            }
            if (mouseX >= width / 2 + 20 && mouseX <= width / 2 + 80 &&
                mouseY >= height / 2 + 20 && mouseY <= height / 2 + 50) {
                mostrandoCartelRecompensaGalaga = false;
            }
            return;
        }

        if (mostrandoCartelMaximo) {
            if (mouseX >= width / 2 - 40 && mouseX <= width / 2 + 40 &&
                mouseY >= height / 2 + 40 && mouseY <= height / 2 + 70) {
                mostrandoCartelMaximo = false;
            }
            return;
        }

        if (!mostrandoAnuncioGalaga) {
            print('*** Pasa al segundo juego, Spaspic Snake');
            pagina02Sound.stop();
            this.musica02 = false;
            nav.siguientePagina();
        }
    }

    onEnter() {
        // Configuraciones gráficas al entrar
        textAlign(LEFT, BASELINE);
        textSize(12);
        noStroke();
        fill(0);
        rectMode(CORNER);
        imageMode(CORNER);

        console.log('*** Entrando a Galaga - Juego reseteado');
    }

    onExit() {
        // Detener música y resetear estado al salir
        if (pagina02Sound && pagina02Sound.isPlaying()) {
            pagina02Sound.stop();
        }
        this.musica02 = false;

        // Resetear completamente el juego cuando se sale de la página
        this.resetearEstadoGalaga();

        console.log('*** Saliendo de Galaga - Estado limpiado');
    }
}

// Clase recompensa
class Recompensa {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.s = 30;
        this.v = 3;
    }
    show() {
        image(recompensaImg, this.x, this.y, this.s, this.s);
    }
    update() {
        this.y += this.v;
    }
    checkCollision() {
        return (
            this.x >= ship.x - ship.s / 2 &&
            this.x <= ship.x + ship.s / 2 &&
            this.y >= ship.y - ship.s / 2 &&
            this.y <= ship.y + ship.s / 2
        );
    }
}