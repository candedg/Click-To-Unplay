// Variables globales para Snake
let posicionCabeza;
let posicionFruta;
let cuerpoSerpiente = []; // Array para el cuerpo de la serpiente

let puntos = 0;
let gameOver = false;
let gameStarted = false;

// Área de juego adaptada
const margenIzquierdo = 10;
const margenDerecho = 10;
const margenArribaTitulo = 0;

let areaX, areaY, areaAncho, areaAlto;

const colorArea = [238, 232, 170]; // paleGoldenRod

const salto = 25; // tamaño de la celda y salto

let verGrilla = false;

let pausaMovimiento = 8; // frames para mover la serpiente (más rápido)

// Textos
let textoPuntos = "PUNTOS: ";
let textoGameOver = "GAME OVER!";
let textoInicio = "Presiona cualquier flecha para comenzar";
let posicionTextoPuntos;
let posicionTextoGameOver;

// Las imágenes se cargan globalmente en sketch.js:
// cabezaIzquierdaImg, cabezaDerechaImg, cabezaArribaImg, cabezaAbajoImg, frutaImg, cuerpoImg

// Dirección de la cabeza (enum)
const DIRECCIONES = {
    DETENIDO: 0,
    IZQUIERDA: 1,
    DERECHA: 2,
    ARRIBA: 3,
    ABAJO: 4,
};

let direccionCabeza = DIRECCIONES.DETENIDO;
let direccionAnterior = DIRECCIONES.DETENIDO;
let proximaDireccion = DIRECCIONES.DETENIDO; // Para evitar cambios múltiples entre frames

// Tamaño de título en función del ancho
let tituloAltura;

// Variable para controlar si ya se inicializó
let juegoInicializado = false;

class Pagina03 extends Pagina {
    draw() {
        // Fondo azul para toda la pantalla
        background(0, 0, 255);

        // Calcular altura del título
        tituloAltura = height / 8;

        // Texto título arriba centrado
        push();
        textAlign(CENTER, CENTER);
        textSize(width / 5);
        textWrap(WORD);
        stroke(0, 255, 0);
        strokeWeight(3);
        fill(255, 0, 0);
        text('Spasmic', width / 2, tituloAltura / 2);
        text('Snake', width / 2, tituloAltura + 50);
        pop();

        // Definir área del juego
        this.calcularAreaJuego();

        // Inicializar solo una vez cuando se entra a esta página
        if (!juegoInicializado) {
            this.inicializar();
            juegoInicializado = true;
        }

        // Dibujo área de juego (fondo color paleGoldenRod)
        fill(...colorArea);
        rect(areaX, areaY, areaAncho, areaAlto);

        // Mostrar puntos
        fill(0);
        textAlign(LEFT, BASELINE);
        textSize(20);
        text(textoPuntos + puntos, posicionTextoPuntos.x, posicionTextoPuntos.y);

        if (!gameStarted && !gameOver) {
            // Mostrar mensaje de inicio
            fill(0);
            textAlign(CENTER, CENTER);
            textSize(18);
            text(textoInicio, areaX + areaAncho/2, areaY + areaAlto/2);
            
            // Dibujar solo la cabeza inicial si la imagen está disponible
            if (cabezaDerechaImg && cabezaDerechaImg.width > 0) {
                image(cabezaDerechaImg, posicionCabeza.x, posicionCabeza.y, salto, salto);
            } else {
                // Fallback: dibujar un rectángulo verde para la cabeza
                push();
                fill(0, 255, 0);
                stroke(0);
                rect(posicionCabeza.x, posicionCabeza.y, salto, salto);
                pop();
            }
            
        } else if (!gameOver) {
            // Aplicar próxima dirección
            if (proximaDireccion !== DIRECCIONES.DETENIDO) {
                direccionCabeza = proximaDireccion;
                proximaDireccion = DIRECCIONES.DETENIDO;
            }

            // Dibujar cuerpo de la serpiente
            for (let segmento of cuerpoSerpiente) {
                if (cuerpoImg && cuerpoImg.width > 0) {
                    image(cuerpoImg, segmento.x, segmento.y, salto, salto);
                } else {
                    // Fallback: rectángulo amarillo para el cuerpo
                    push();
                    fill(255, 255, 0);
                    stroke(0);
                    rect(segmento.x, segmento.y, salto, salto);
                    pop();
                }
            }

            // Dibujar cabeza según dirección
            this.dibujarCabeza();

            // Dibujar fruta
            if (frutaImg && frutaImg.width > 0) {
                image(frutaImg, posicionFruta.x, posicionFruta.y, salto, salto);
            } else {
                // Fallback: círculo rojo para la fruta
                push();
                fill(255, 0, 0);
                stroke(0);
                ellipse(posicionFruta.x + salto/2, posicionFruta.y + salto/2, salto, salto);
                pop();
            }

            // Dibujar grilla si está activada
            if (verGrilla) {
                this.dibujarGrilla();
            }

            // Actualizar movimiento
            if (frameCount % pausaMovimiento === 0) {
                this.actualizarJuego();
            }
            
        } else {
            // Game Over
            fill(150, 0, 0);
            rect(areaX, areaY, areaAncho, areaAlto);
            
            fill(255, 255, 0);
            textAlign(CENTER, CENTER);
            textSize(36);
            text(textoGameOver, areaX + areaAncho/2, areaY + areaAlto/2 - 40);
            
            textSize(20);
            text("Puntos finales: " + puntos, areaX + areaAncho/2, areaY + areaAlto/2);
            
            textSize(18);
            text("Presiona ESPACIO para jugar de nuevo", areaX + areaAncho/2, areaY + areaAlto/2 + 40);
            text("o ESC para salir", areaX + areaAncho/2, areaY + areaAlto/2 + 65);
        }
    }

    calcularAreaJuego() {
    areaX = margenIzquierdo;
    areaY = tituloAltura + 10 + 100;  
    areaAncho = width - margenIzquierdo - margenDerecho;
    areaAlto = height - areaY - 20;

    // Ajustar área para que sea múltiplo del tamaño de celda
    areaAncho = floor(areaAncho / salto) * salto;
    areaAlto = floor(areaAlto / salto) * salto;

    // Posiciones para textos
    posicionTextoPuntos = { x: areaX + 10, y: areaY + 25 };
    posicionTextoGameOver = { x: areaX + areaAncho / 4, y: areaY + areaAlto / 2 };
}


    dibujarCabeza() {
        let imgCabeza;
        switch (direccionCabeza) {
            case DIRECCIONES.ARRIBA:
                imgCabeza = cabezaArribaImg;
                break;
            case DIRECCIONES.ABAJO:
                imgCabeza = cabezaAbajoImg;
                break;
            case DIRECCIONES.IZQUIERDA:
                imgCabeza = cabezaIzquierdaImg;
                break;
            case DIRECCIONES.DERECHA:
            default:
                imgCabeza = cabezaDerechaImg;
                break;
        }
        
        if (imgCabeza && imgCabeza.width > 0) {
            image(imgCabeza, posicionCabeza.x, posicionCabeza.y, salto, salto);
        } else {
            // Fallback: rectángulo verde para la cabeza
            push();
            fill(0, 255, 0);
            stroke(0);
            rect(posicionCabeza.x, posicionCabeza.y, salto, salto);
            pop();
        }
    }

    dibujarGrilla() {
        stroke(0, 0, 0, 100);
        strokeWeight(1);
        // Líneas verticales
        for (let i = areaX; i <= areaX + areaAncho; i += salto) {
            line(i, areaY, i, areaY + areaAlto);
        }
        // Líneas horizontales
        for (let i = areaY; i <= areaY + areaAlto; i += salto) {
            line(areaX, i, areaX + areaAncho, i);
        }
        noStroke();
    }

    actualizarJuego() {
        if (direccionCabeza === DIRECCIONES.DETENIDO) return;

        // Agregar posición actual de la cabeza al cuerpo
        cuerpoSerpiente.push(createVector(posicionCabeza.x, posicionCabeza.y));

        // Guardar dirección anterior
        direccionAnterior = direccionCabeza;

        // Mover la cabeza
        switch (direccionCabeza) {
            case DIRECCIONES.ARRIBA:
                posicionCabeza.y -= salto;
                break;
            case DIRECCIONES.ABAJO:
                posicionCabeza.y += salto;
                break;
            case DIRECCIONES.IZQUIERDA:
                posicionCabeza.x -= salto;
                break;
            case DIRECCIONES.DERECHA:
                posicionCabeza.x += salto;
                break;
        }

        // Verificar colisiones
        if (this.verificarColisionBordes() || this.verificarColisionCuerpo()) {
            gameOver = true;
            return;
        }

        // Verificar si comió fruta
        if (posicionCabeza.x === posicionFruta.x && posicionCabeza.y === posicionFruta.y) {
            puntos++;
            this.generarNuevaFruta();
            // Aumentar velocidad gradualmente
            if (puntos % 5 === 0 && pausaMovimiento > 3) {
                pausaMovimiento--;
            }
        } else {
            // Remover último segmento si no comió fruta
            cuerpoSerpiente.shift();
        }
    }

    verificarColisionBordes() {
        return (
            posicionCabeza.x < areaX ||
            posicionCabeza.x >= areaX + areaAncho ||
            posicionCabeza.y < areaY ||
            posicionCabeza.y >= areaY + areaAlto
        );
    }

    verificarColisionCuerpo() {
        for (let segmento of cuerpoSerpiente) {
            if (posicionCabeza.x === segmento.x && posicionCabeza.y === segmento.y) {
                return true;
            }
        }
        return false;
    }

    generarNuevaFruta() {
        let intentos = 0;
        do {
            posicionFruta = this.posicionFrutaAleatoria();
            intentos++;
        } while (this.frutaEnSerpiente() && intentos < 100);
    }

    frutaEnSerpiente() {
        // Verificar cabeza
        if (posicionFruta.x === posicionCabeza.x && posicionFruta.y === posicionCabeza.y) {
            return true;
        }
        
        // Verificar cuerpo
        for (let segmento of cuerpoSerpiente) {
            if (posicionFruta.x === segmento.x && posicionFruta.y === segmento.y) {
                return true;
            }
        }
        return false;
    }

    posicionFrutaAleatoria() {
        let celdasX = floor(areaAncho / salto);
        let celdasY = floor(areaAlto / salto);
        
        let celdaX = floor(random(celdasX));
        let celdaY = floor(random(celdasY));
        
        let x = areaX + celdaX * salto;
        let y = areaY + celdaY * salto;

        return createVector(x, y);
    }

    inicializar() {
        puntos = 0;
        gameOver = false;
        gameStarted = false;
        direccionCabeza = DIRECCIONES.DETENIDO;
        direccionAnterior = DIRECCIONES.DETENIDO;
        proximaDireccion = DIRECCIONES.DETENIDO;
        cuerpoSerpiente = [];
        pausaMovimiento = 8;

        // Posición cabeza en centro del área (alineada a la grilla)
        let celdasX = floor(areaAncho / salto);
        let celdasY = floor(areaAlto / salto);
        
        posicionCabeza = createVector(
            areaX + floor(celdasX / 2) * salto,
            areaY + floor(celdasY / 2) * salto
        );

        // Posición fruta aleatoria
        posicionFruta = this.posicionFrutaAleatoria();
    }

    keyPressed() {
        // Controles del juego
        if (!gameOver) {
            let nuevaDireccion = direccionCabeza;
            
            switch (keyCode) {
                case UP_ARROW:
                case 87: // W
                    if (direccionAnterior !== DIRECCIONES.ABAJO) {
                        nuevaDireccion = DIRECCIONES.ARRIBA;
                    }
                    break;
                case DOWN_ARROW:
                case 83: // S
                    if (direccionAnterior !== DIRECCIONES.ARRIBA) {
                        nuevaDireccion = DIRECCIONES.ABAJO;
                    }
                    break;
                case LEFT_ARROW:
                case 65: // A
                    if (direccionAnterior !== DIRECCIONES.DERECHA) {
                        nuevaDireccion = DIRECCIONES.IZQUIERDA;
                    }
                    break;
                case RIGHT_ARROW:
                case 68: // D
                    if (direccionAnterior !== DIRECCIONES.IZQUIERDA) {
                        nuevaDireccion = DIRECCIONES.DERECHA;
                    }
                    break;
            }

            // Si es una dirección válida y el juego no ha comenzado
            if (nuevaDireccion !== direccionCabeza && nuevaDireccion !== DIRECCIONES.DETENIDO) {
                if (!gameStarted) {
                    gameStarted = true;
                    direccionCabeza = nuevaDireccion;
                } else {
                    proximaDireccion = nuevaDireccion;
                }
            }
        }

        // Controles generales
        if (keyCode === ESCAPE) { // ESC - navegar a pantalla01
            // Resetear configuraciones de texto antes de navegar
            textAlign(LEFT, BASELINE);
            textSize(12);
            noStroke();
            fill(0);
            
            nav.seleccionarPagina(0);
            resetearJuego();
            return;
        }

        if (key === 'g' || key === 'G') {
            verGrilla = !verGrilla;
        }

        if (gameOver) {
            if (keyCode === 32) { // ESPACIO
                this.inicializar();
            }
        }
    }

    onEnter() {
        // Resetear configuraciones al entrar a la página
        textAlign(LEFT, BASELINE);
        textSize(12);
        noStroke();
        fill(0);
        rectMode(CORNER);
        imageMode(CORNER);
    }
}

// Resetear el estado cuando se cambie de página
function resetearJuego() {
    juegoInicializado = false;
}