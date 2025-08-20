// img1 se declara en sketch.js globalmente
let primerAnuncio = false;
let arrayAnuncios = [];
let posicionAnuncio;

class Pagina01 extends Pagina {
    constructor() {
        super();
        // La imagen img1 ya se carga globalmente en sketch.js

        //Variable de la música de fondo
        this.musica01 = false;
    }

    draw() {
        push(); // Guardar estado gráfico
        background(0, 255, 0);

        // Reproduce música en loop
        if (!this.musica01) {
            this.musica01 = true;
            pagina01Sound.setVolume(0.2);
            pagina01Sound.loop();
        }

        // Título grande centrado arriba
        push();
        textAlign(CENTER, TOP);
        textSize(width / 8);
        textWrap(WORD);
        stroke(148, 0, 211);
        strokeWeight(10);
        fill(255, 0, 0);
        textFont(fuenteTitulo);
        text('Click to', width / 2, height / 15);
        text('Unplay', width / 2, height / 5);
        pop();

        // Dibujo botón falso "!COMENZAR"
        push();
        rectMode(CENTER);
        stroke(148, 0, 211);
        strokeWeight(8);
        fill(255, 255, 0);
        rect(width / 2, height / 2, 210, 60, 20);
        pop();

        // Texto "!COMENZAR" dentro del botón falso
        push();
        textAlign(CENTER, CENTER);
        textSize(width / 19);
        noStroke();
        fill(0, 0, 255);
        textFont(fuenteTexto);
        text('!COMENZAR', width / 2, height / 2);
        pop();

        // Texto "Inicio" real, discreto en la parte inferior central
        push();
        textAlign(CENTER, CENTER);
        textSize(width / 35);
        noStroke();
        fill(0, 120, 0, 180);
        text('Inicio', width / 2, height - 17);
        pop();

        // Dibujo los anuncios en sus posiciones
        if (arrayAnuncios.length > 0) {
            push();
            imageMode(CENTER);
            for (let i = 0; i < arrayAnuncios.length; i++) {
                const pos = arrayAnuncios[i];
                if (pos.imagen && pos.imagen.width > 0) {
                    image(pos.imagen, pos.posicionX, pos.posicionY);
                } else {
                    // fallback: si no cargó la imagen
                    push();
                    fill(255, 0, 255);
                    stroke(0);
                    strokeWeight(2);
                    rectMode(CENTER);
                    rect(pos.posicionX, pos.posicionY, 100, 100);
                    fill(255);
                    textAlign(CENTER, CENTER);
                    textSize(12);
                    text('ANUNCIO', pos.posicionX, pos.posicionY);
                    pop();
                }
            }
            pop();
        }

        pop(); // Restaurar estado gráfico general
    }

    mousePressed() {
        // Defino área del botón "Inicio" real
        const botonInicioX1 = width / 2 - 25;
        const botonInicioX2 = width / 2 + 25;
        const botonInicioY1 = height - 25;
        const botonInicioY2 = height - 10;

        // Área del botón falso "!COMENZAR"
        const botonFalsoX1 = width / 2 - 105;
        const botonFalsoX2 = width / 2 + 105;
        const botonFalsoY1 = height / 2 - 30;
        const botonFalsoY2 = height / 2 + 30;

        console.log('Click en:', mouseX, mouseY);

        if (mouseX >= botonInicioX1 && mouseX <= botonInicioX2 &&
            mouseY >= botonInicioY1 && mouseY <= botonInicioY2) {
            // Click en botón "Inicio" real
            console.log('*** Navegando a Pagina02');
            this.limpiarEstado();

            // Resetear configuraciones gráficas
            textAlign(LEFT, BASELINE);
            textSize(12);
            noStroke();
            fill(0);
            rectMode(CORNER);
            imageMode(CORNER);

            pagina01Sound.stop();
            this.musica01 = false;
            finTiempo = millis();
            nav.siguientePagina();

        } else if (mouseX >= botonFalsoX1 && mouseX <= botonFalsoX2 &&
            mouseY >= botonFalsoY1 && mouseY <= botonFalsoY2) {
            // Click en botón falso "!COMENZAR"
            console.log('*** Click en botón falso - aparece anuncio');
            if (!primerAnuncio) {
                primerAnuncio = true;
                comienzaTiempo = millis();
            }
            this.crearAnuncio();

        } else if (primerAnuncio &&
            !(mouseX >= botonInicioX1 && mouseX <= botonInicioX2 &&
                mouseY >= botonInicioY1 && mouseY <= botonInicioY2)) {
            // Click general (fuera del botón "Inicio") después del primer anuncio
            console.log('*** Click general - aparece anuncio');
            this.crearAnuncio();

        } else {
            console.log('*** Click en área no válida');
        }
    }

    crearAnuncio() {
        // REPRODUCIR SONIDO AL CREAR ANUNCIO
        if (spawnAnuncioSound && spawnAnuncioSound.isLoaded()) {
            spawnAnuncioSound.play();
        }

        let x, y;
        let intentos = 0;
        const maxIntentos = 50;

        const img = anuncios[indiceAnuncio]; // elegir imagen actual
        console.log(`Mostrando anuncio: data/anuncios/a${indiceAnuncio + 1}.png`);
        const imgWidth = img.width || 100;
        const imgHeight = img.height || 100;

        const marginX = imgWidth / 2;
        const marginY = imgHeight / 2;

        const botonInicioX1 = width / 2 - 25;
        const botonInicioX2 = width / 2 + 25;
        const botonInicioY1 = height - 25;
        const botonInicioY2 = height - 10;

        let colisionaConBoton = false;

        do {
            x = random(0, width);
            y = random(0, height);

            const anuncioLeft = x - marginX;
            const anuncioRight = x + marginX;
            const anuncioTop = y - marginY;
            const anuncioBottom = y + marginY;

            colisionaConBoton = !(anuncioRight < botonInicioX1 ||
                anuncioLeft > botonInicioX2 ||
                anuncioBottom < botonInicioY1 ||
                anuncioTop > botonInicioY2);

            intentos++;
        } while (intentos < maxIntentos && colisionaConBoton);

        // Guardamos posición + qué imagen usar
        posicionAnuncio = {
            posicionX: x,
            posicionY: y,
            imagen: img
        };

        arrayAnuncios.push(posicionAnuncio);

        // Avanzar índice para la próxima vez (cíclico)
        indiceAnuncio = (indiceAnuncio + 1) % anuncios.length;

        console.log('*** Anuncio creado en:', x, y, 'Total anuncios:', arrayAnuncios.length);
    }


    limpiarEstado() {
        // Limpio el array y bandera para reiniciar la página
        arrayAnuncios = [];
        primerAnuncio = false;
        console.log('*** Estado de Pagina01 limpiado');
    }

    reset() {
        // Método para limpiar desde otras páginas si se necesita
        this.limpiarEstado();
    }

    onEnter() {
        // Aseguro configuraciones gráficas al entrar a esta página
        textAlign(LEFT, BASELINE);
        textSize(12);
        noStroke();
        fill(0);
        rectMode(CORNER);
        imageMode(CORNER);
    }
}
