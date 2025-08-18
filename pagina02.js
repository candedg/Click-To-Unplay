let galagaGameOver = false;
let showGameOverText = false;


class Pagina02 extends Pagina {
    setup() {
        createCanvas(width, height);
        noStroke();

        //parámetros ajustables 
        this.maxAliens = 30;      // límite de aliens simultáneos
        this.alienEvery = 1000;   // milisegundos entre spawns de alien
        this.shotDelay = 150;     // milisegundos entre disparos cuando mantenés la tecla

        this._lastAlien = 0;
        this._lastShot = 0;

        settings = new Settings();
        ship = new Ship();
    }

    draw() {
        background(255, 0, 0);
        fill(6, 6, 26);
        rect(0, 0, width, height - 50);

        // Título 
        push();
        textAlign(CENTER);
        textSize(width / 5);
        textWrap(WORD);
        stroke(148, 0, 211);
        strokeWeight(10);
        fill(0, 255, 0);
        text('Galaga Glitch', 0, height / 15, width);
        pop();

        // Si el juego terminó → mostrar cartel y no seguir dibujando
        if (galagaGameOver) {
            fill(0, 0, 0, 180);
            rect(0, 0, width, height);

            fill(255, 0, 0);
            textAlign(CENTER, CENTER);
            textSize(32);
            text("¡PERDISTE!", width / 2, height / 2 - 20);
            textSize(20);
            text("Presiona ESPACIO para volver a empezar", width / 2, height / 2 + 20);

            return; // 👈 detenemos aquí, no dibujamos aliens ni nave
        }

        //spawn de aliens basado en tiempo + límite 
        if (millis() - this._lastAlien >= this.alienEvery && aliens.length < this.maxAliens) {
            const ax = random(50, width - 50);
            const ay = -40;
            aliens.push(new Alien(ax, ay));
            this._lastAlien = millis();
        }

        // disparo con cooldown (sin setInterval) 
        const shooting = keyIsDown(UP_ARROW) || keyIsDown(87); //es la de w
        if (shooting && millis() - this._lastShot >= this.shotDelay) {
            bullets.push(new Bullet());
            this._lastShot = millis();
        }

        ship.show();
        ship.update();

        // Limpieza de balas fuera de pantalla
        for (let i = bullets.length - 1; i >= 0; i--) {
            if (bullets[i].y <= 0) bullets.splice(i, 1);
        }

        // Aliens
        for (let i = 0; i < aliens.length; i++) {
            aliens[i].show();
            aliens[i].update();
            aliens[i].checkCollision();
        }

        // Colisiones bala–alien
        for (let i = 0; i < bullets.length; i++) {
            bullets[i].show(ship.x, ship.y);
            bullets[i].update();
            bullets[i].checkCollision(bullets[i]);
        }
    }


    keyPressed() {
        if (galagaGameOver && keyCode === 32) { // 32 = espacio
            // Reiniciar estado sin recargar página
            galagaGameOver = false;
            aliens = [];
            bullets = [];
            ship = new Ship();
        }
    }
    mousePressed() {
        print('*** Pasa al segundo juego, Spaspic Snake');
        nav.siguientePagina();
    }
}
