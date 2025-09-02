// Variables globales para Snake
let posicionCabeza;
let posicionFruta;
let cuerpoSerpiente = []; // Array para el cuerpo de la serpiente

let puntos = 0;
let gameOver = false;
let gameStarted = false;

// Sistema de anuncios
let manzanasGratis = 3; // Contador de manzanas gratis
let mostrandoOfertaAnuncio = false; // Si está mostrando la oferta de ver anuncio
let mostrandoAnuncio = false; // Si está mostrando el anuncio
let anuncioActual = null; // Imagen del anuncio actual
let tiempoInicioAnuncio = 0; // Tiempo cuando empezó el anuncio
let duracionAnuncio = 10000; // 10 segundos en milisegundos
let frutaPendiente = false; // Si hay una fruta esperando a ser comida después del anuncio

// Sistema de duplicador de puntaje
let tiempoInicioJuego = 0; // Tiempo cuando empezó el juego
let duplicadorVisible = false; // Si el duplicador está visible
let posicionDuplicador = null; // Posición del duplicador
duplicadorImg = null; // Imagen del duplicador (se carga globalmente)
let tiempoUltimoDuplicador = 0; // Último tiempo que apareció un duplicador
let intervaloDuplicador = 30000; // 30 segundos en milisegundos
const anchoDuplicador = 70; // Ancho fijo del duplicador
let altoDuplicador = 70; // Alto del duplicador (se calculará proporcionalmente)

// Sistema de anuncios especiales (cada 5 manzanas) - CORREGIDO
let contadorManzanas = 0; // Contador de manzanas comidas
let anuncioEspecialActivo = false; // Si hay un anuncio especial en lugar de manzana
let posicionAnuncioEspecial = null; // Posición del anuncio especial
let imagenAnuncioEspecial = null; // Imagen del anuncio especial actual
const tamanoAnuncioEspecial = 30; // 30x30 px

// Área de juego adaptada
const margenIzquierdo = 10;
const margenDerecho = 10;
const margenArribaTitulo = 0;

let areaX, areaY, areaAncho, areaAlto;

const colorArea = [238, 232, 170]; // paleGoldenRod

const salto = 25; // tamaño de la celda y salto

let verGrilla = false;

let pausaMovimiento = 15; // frames para mover la serpiente (más rápido)

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
    constructor() {
        super();
        //Variable de la música de fondo
        this.musica03 = false;
    }

    // NUEVO MÉTODO: resetear completamente el estado del Snake
    resetearEstadoSnake() {

        // Reset de variables del juego
        puntos = 0;
        gameOver = false;
        gameStarted = false;

        // Reset de direcciones
        direccionCabeza = DIRECCIONES.DETENIDO;
        direccionAnterior = DIRECCIONES.DETENIDO;
        proximaDireccion = DIRECCIONES.DETENIDO;

        // Reset del cuerpo
        cuerpoSerpiente = [];

        // Reset de velocidad
        pausaMovimiento = 15;

        // Reset del sistema de anuncios
        manzanasGratis = 3;
        mostrandoOfertaAnuncio = false;
        mostrandoAnuncio = false;
        anuncioActual = null;
        frutaPendiente = false;

        // Reset del sistema de anuncios especiales
        contadorManzanas = 0;
        anuncioEspecialActivo = false;
        posicionAnuncioEspecial = null;
        imagenAnuncioEspecial = null;

        // Reset del sistema de duplicador
        tiempoInicioJuego = 0;
        duplicadorVisible = false;
        posicionDuplicador = null;
        tiempoUltimoDuplicador = 0;

        // Reset de otras variables
        verGrilla = false;
        juegoInicializado = false;

    }

    draw() {
        // Fondo azul para toda la pantalla
        background(0, 0, 255);

        // Reproduce música en loop
        if (!this.musica03) {
            this.musica03 = true;
            pagina03Sound.setVolume(0.2);
            pagina03Sound.loop();
        }

        // Si está mostrando anuncio, solo mostrar el anuncio
        if (mostrandoAnuncio) {
            this.dibujarAnuncio();
            return;
        }

        // Calcular altura del título
        tituloAltura = height / 8;

        // Texto título arriba centrado
        push();
        textAlign(CENTER, CENTER);
        textSize(width / 8);
        textWrap(WORD);
        stroke(0, 255, 0);
        strokeWeight(10);
        fill(255, 0, 0);
        textFont(fuenteTitulo);
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

        // Mostrar puntos y manzanas gratis restantes
        push();
        fill(0);
        textAlign(LEFT, BASELINE);
        textSize(20);
        textFont(fuenteTexto);
        text(textoPuntos + puntos, posicionTextoPuntos.x, posicionTextoPuntos.y);
        pop();

        // Si está mostrando la oferta de anuncio
        if (mostrandoOfertaAnuncio) {
            this.dibujarOfertaAnuncio();
            return;
        }

        if (!gameStarted && !gameOver) {
            // Mostrar mensaje de inicio
            fill(0);
            textAlign(CENTER, CENTER);
            textSize(18);
            text(textoInicio, areaX + areaAncho / 2, areaY + areaAlto / 2);

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
            // Verificar si debe aparecer el duplicador
            if (gameStarted && !duplicadorVisible && !mostrandoOfertaAnuncio && !mostrandoAnuncio) {
                let tiempoTranscurrido = millis() - tiempoInicioJuego;
                if (tiempoTranscurrido - tiempoUltimoDuplicador >= intervaloDuplicador) {
                    this.crearDuplicador();
                    tiempoUltimoDuplicador = tiempoTranscurrido;
                }
            }

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

            // Dibujar fruta o anuncio especial
            if (anuncioEspecialActivo && posicionAnuncioEspecial && imagenAnuncioEspecial) {
                // Dibujar anuncio especial
                if (imagenAnuncioEspecial.width > 0) {
                    image(imagenAnuncioEspecial, posicionAnuncioEspecial.x, posicionAnuncioEspecial.y, tamanoAnuncioEspecial, tamanoAnuncioEspecial);
                } else {
                    // Fallback: cuadrado morado para anuncio especial
                    push();
                    fill(255, 0, 255);
                    stroke(255, 255, 0);
                    strokeWeight(2);
                    rect(posicionAnuncioEspecial.x, posicionAnuncioEspecial.y, tamanoAnuncioEspecial, tamanoAnuncioEspecial);
                    fill(255);
                    textAlign(CENTER, CENTER);
                    textSize(8);
                    text("AD", posicionAnuncioEspecial.x + tamanoAnuncioEspecial / 2, posicionAnuncioEspecial.y + tamanoAnuncioEspecial / 2);
                    pop();
                }
            } else {
                // Dibujar fruta normal
                if (frutaImg && frutaImg.width > 0) {
                    image(frutaImg, posicionFruta.x, posicionFruta.y, salto, salto);
                } else {
                    // Fallback: círculo rojo para la fruta
                    push();
                    fill(255, 0, 0);
                    stroke(0);
                    ellipse(posicionFruta.x + salto / 2, posicionFruta.y + salto / 2, salto, salto);
                    pop();
                }
            }

            // Dibujar duplicador si está visible
            if (duplicadorVisible && posicionDuplicador) {
                if (duplicadorImg && duplicadorImg.width > 0) {
                    image(duplicadorImg, posicionDuplicador.x, posicionDuplicador.y, anchoDuplicador, altoDuplicador);
                } else {
                    // Fallback: rectángulo dorado para el duplicador
                    push();
                    fill(255, 215, 0); // Dorado
                    stroke(255, 255, 0);
                    strokeWeight(2);
                    rect(posicionDuplicador.x, posicionDuplicador.y, anchoDuplicador, altoDuplicador);
                    fill(0);
                    textAlign(CENTER, CENTER);
                    textSize(10);
                    text("x2", posicionDuplicador.x + anchoDuplicador / 2, posicionDuplicador.y + altoDuplicador / 2);
                    pop();
                }
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
            push();
            textFont(fuenteTexto);
            text(textoGameOver, areaX + areaAncho / 2, areaY + areaAlto / 2 - 40);

            textSize(20);
            text("Puntos finales: " + puntos, areaX + areaAncho / 2, areaY + areaAlto / 2);
            pop();

            textSize(18);
            text("Presiona ESPACIO para jugar de nuevo", areaX + areaAncho / 2, areaY + areaAlto / 2 + 40);
            text("o ESC para salir", areaX + areaAncho / 2, areaY + areaAlto / 2 + 65);
        }

        // Dibujar botones de selección de juego en la parte inferior
        this.dibujarBotonesSeleccion();
    }

    dibujarBotonesSeleccion() {
        // Área de botones en la franja roja inferior
        let franjaY = height - 50;
        let botonAncho = 120;
        let botonAlto = 35;
        let espacioEntreBotones = 20;

        // Calcular posiciones centradas
        let totalAnchoBotones = (botonAncho * 2) + espacioEntreBotones;
        let inicioX = (width - totalAnchoBotones) / 2;

        let botonGalagaX = inicioX;
        let botonSnakeX = inicioX + botonAncho + espacioEntreBotones;
        let botonesY = franjaY + (50 - botonAlto) / 2;

        // Botón GALAGA
        push();
        rectMode(CORNER);
        stroke(148, 0, 211);
        strokeWeight(3);
        fill(0, 255, 0);
        rect(botonGalagaX, botonesY, botonAncho, botonAlto, 10);

        // Texto del botón Galaga
        textAlign(CENTER, CENTER);
        textSize(16);
        noStroke();
        fill(0, 0, 255);
        textFont(fuenteTexto);
        text('GALAGA', botonGalagaX + botonAncho / 2, botonesY + botonAlto / 2);
        pop();

        // Botón SNAKE
        push();
        rectMode(CORNER);
        stroke(148, 0, 211);
        strokeWeight(3);
        fill(255, 255, 0);
        rect(botonSnakeX, botonesY, botonAncho, botonAlto, 10);

        // Texto del botón Snake
        textAlign(CENTER, CENTER);
        textSize(16);
        noStroke();
        fill(255, 0, 0);
        textFont(fuenteTexto);
        text('SNAKE', botonSnakeX + botonAncho / 2, botonesY + botonAlto / 2);
        pop();
    }

    dibujarOfertaAnuncio() {
        // Fondo semi-transparente
        push();
        fill(0, 0, 0, 150);
        rect(areaX, areaY, areaAncho, areaAlto);
        pop();

        // Área del mensaje
        let mensajeX = areaX + 20;
        let mensajeY = areaY + areaAlto / 2 - 80;
        let mensajeAncho = areaAncho - 40;
        let mensajeAlto = 160;

        // Fondo del mensaje
        push();
        fill(255, 255, 255);
        stroke(0);
        strokeWeight(2);
        rect(mensajeX, mensajeY, mensajeAncho, mensajeAlto, 10);
        pop();

        // Texto del mensaje
        push();
        fill(0);
        textAlign(CENTER, CENTER);
        textSize(18);
        text("Se te agotaron las manzanas gratis", areaX + areaAncho / 2, mensajeY + 30);
        text("¿Mirar anuncio para seguir jugando?", areaX + areaAncho / 2, mensajeY + 55);
        pop();

        // Botones
        let botonAncho = 80;
        let botonAlto = 40;
        let espacioBotones = 40;
        let botonSiX = areaX + areaAncho / 2 - botonAncho - espacioBotones / 2;
        let botonNoX = areaX + areaAncho / 2 + espacioBotones / 2;
        let botonesY = mensajeY + 100;

        // Botón SÍ
        push();
        fill(0, 255, 0);
        stroke(0);
        strokeWeight(2);
        rect(botonSiX, botonesY, botonAncho, botonAlto, 5);
        fill(0);
        textAlign(CENTER, CENTER);
        textSize(16);
        text("SÍ", botonSiX + botonAncho / 2, botonesY + botonAlto / 2);
        pop();

        // Botón NO
        push();
        fill(255, 0, 0);
        stroke(0);
        strokeWeight(2);
        rect(botonNoX, botonesY, botonAncho, botonAlto, 5);
        fill(0);
        textAlign(CENTER, CENTER);
        textSize(16);
        text("NO", botonNoX + botonAncho / 2, botonesY + botonAlto / 2);
        pop();
    }

    dibujarAnuncio() {
        // Verificar si han pasado los 10 segundos
        if (millis() - tiempoInicioAnuncio >= duracionAnuncio) {
            this.terminarAnuncio();
            return;
        }

        // Mostrar anuncio ocupando todo el canvas
        if (anuncioActual && anuncioActual.width > 0) {
            // Escalar la imagen para que ocupe todo el ancho del canvas
            let aspectRatio = anuncioActual.height / anuncioActual.width;
            let alturaEscalada = width * aspectRatio;

            // Centrar verticalmente si es necesario
            let y = (height - alturaEscalada) / 2;

            image(anuncioActual, 0, y, width, alturaEscalada);
        } else {
            // Fallback si no carga la imagen
            push();
            fill(255, 0, 255);
            rect(0, 0, width, height);
            fill(255);
            textAlign(CENTER, CENTER);
            textSize(24);
            text("ANUNCIO", width / 2, height / 2);
            pop();
        }

        // Contador de tiempo restante
        let tiempoRestante = Math.ceil((duracionAnuncio - (millis() - tiempoInicioAnuncio)) / 1000);
        push();
        fill(255, 255, 255, 200);
        stroke(0);
        strokeWeight(2);
        rect(width - 100, 10, 90, 30, 5);
        fill(0);
        textAlign(CENTER, CENTER);
        textSize(14);
        text(tiempoRestante + "s", width - 55, 25);
        pop();
    }

    terminarAnuncio() {
        mostrandoAnuncio = false;
        anuncioActual = null;

        if (frutaPendiente) {
            // Comer la fruta que activó el anuncio
            this.comerFruta();
            frutaPendiente = false;
        }
    }

    comerFruta() {
        // NUEVO: Reproducir sonido cuando come fruta
        if (snakeComeSound && snakeComeSound.isLoaded()) {
            snakeComeSound.play();
        }

        puntos++;
        contadorManzanas++;

        this.generarNuevaFruta();
        // Aumentar velocidad gradualmente
        if (puntos % 5 === 0 && pausaMovimiento > 3) {
            pausaMovimiento--;
        }
    }

    //comer anuncio especial
    comerAnuncioEspecial() {

        // NUEVO: Reproducir sonido base cuando come
        if (snakeComeSound && snakeComeSound.isLoaded()) {
            snakeComeSound.play();

            // Reproducir sonido adicional de anuncio después del sonido base
            if (snakeComeAnuncioSound && snakeComeAnuncioSound.isLoaded()) {
                // Usar setTimeout para reproducir el segundo sonido después del primero
                setTimeout(() => {
                    snakeComeAnuncioSound.play();
                }, 300); // Esperar 300ms antes de reproducir el segundo sonido
            }
        }

        // Añadir 4 puntos (en lugar de 1 como la fruta normal)
        puntos += 4;

        // Añadir 4 segmentos al cuerpo
        for (let i = 0; i < 4; i++) {
            if (cuerpoSerpiente.length > 0) {
                let ultimoSegmento = cuerpoSerpiente[cuerpoSerpiente.length - 1];
                cuerpoSerpiente.push(createVector(ultimoSegmento.x, ultimoSegmento.y));
            } else {
                // Si no hay cuerpo, agregar en la posición actual de la cabeza
                cuerpoSerpiente.push(createVector(posicionCabeza.x, posicionCabeza.y));
            }
        }

        // Mostrar anuncio grande
        this.activarAnuncioEspecial();

        // Resetear el sistema para las próximas 5 manzanas normales
        contadorManzanas = 0;
        anuncioEspecialActivo = false;
        posicionAnuncioEspecial = null;
        imagenAnuncioEspecial = null;

        // Generar nueva fruta normal
        this.generarNuevaFruta();

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
        if (direccionCabeza === DIRECCIONES.DETENIDO || mostrandoOfertaAnuncio || mostrandoAnuncio) return;

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

        // VERIFICAR COLISIONES Y REPRODUCIR SONIDO AL PERDER
        if (this.verificarColisionBordes() || this.verificarColisionCuerpo()) {
            // Reproducir sonido cuando pierde (toca pared o su propio cuerpo)
            if (snakePierdeSound && snakePierdeSound.isLoaded()) {
                snakePierdeSound.play();
            }

            gameOver = true;
            return;
        }

        // Verificar si comió fruta o anuncio especial
        if (anuncioEspecialActivo && this.verificarColisionAnuncioEspecial()) {
            // Comió anuncio especial
            this.comerAnuncioEspecial();
        } else if (!anuncioEspecialActivo && posicionCabeza.x === posicionFruta.x && posicionCabeza.y === posicionFruta.y) {
            // Comió fruta normal
            if (manzanasGratis > 0) {
                // Tiene manzanas gratis, puede comer normalmente
                manzanasGratis--;
                this.comerFruta();
            } else {
                // No tiene manzanas gratis, mostrar oferta de anuncio
                mostrandoOfertaAnuncio = true;
                frutaPendiente = true;
                return;
            }
        }
        // Verificar si tocó el duplicador
        else if (duplicadorVisible && this.verificarColisionDuplicador()) {
            this.activarDuplicador();
        }
        else {
            // Remover último segmento si no comió nada
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
    // CORREGIDO: verificar colisión con anuncio especial
    verificarColisionAnuncioEspecial() {
        if (!anuncioEspecialActivo || !posicionAnuncioEspecial) return false;

        // El anuncio especial es más pequeño (30x30) pero la colisión debe funcionar igual
        return (posicionCabeza.x === posicionAnuncioEspecial.x &&
            posicionCabeza.y === posicionAnuncioEspecial.y);
    }

    // CORREGIDO: generar nueva fruta o anuncio especial
    generarNuevaFruta() {

        // Verificar si debe aparecer anuncio especial (cada 5 manzanas)
        if (contadorManzanas > 0 && contadorManzanas % 5 === 0) {
            this.generarAnuncioEspecial();
        } else {
            // Generar fruta normal
            anuncioEspecialActivo = false;
            let intentos = 0;
            do {
                posicionFruta = this.posicionFrutaAleatoria();
                intentos++;
            } while (this.frutaEnSerpiente() && intentos < 100);
        }
    }

    // NUEVO MÉTODO: generar anuncio especial
    generarAnuncioEspecial() {
        anuncioEspecialActivo = true;

        // Seleccionar imagen aleatoria para el anuncio especial
        let indiceAleatorio = floor(random(anuncios.length));
        imagenAnuncioEspecial = anuncios[indiceAleatorio];

        // Generar posición aleatoria (alineada a la grilla como las frutas normales)
        let intentos = 0;
        do {
            posicionAnuncioEspecial = this.posicionFrutaAleatoria();
            intentos++;
        } while (this.anuncioEspecialEnSerpiente() && intentos < 100);

    }

    // NUEVO MÉTODO: verificar si el anuncio especial está en la serpiente
    anuncioEspecialEnSerpiente() {
        // Verificar cabeza
        if (posicionAnuncioEspecial.x === posicionCabeza.x && posicionAnuncioEspecial.y === posicionCabeza.y) {
            return true;
        }

        // Verificar cuerpo
        for (let segmento of cuerpoSerpiente) {
            if (posicionAnuncioEspecial.x === segmento.x && posicionAnuncioEspecial.y === segmento.y) {
                return true;
            }
        }
        return false;
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

    crearDuplicador() {
        if (!duplicadorImg) return; // No crear si no está cargada la imagen

        let intentos = 0;
        const maxIntentos = 50;
        let x, y;

        // Calcular alto proporcionalmente
        if (duplicadorImg.width > 0) {
            let aspectRatio = duplicadorImg.height / duplicadorImg.width;
            altoDuplicador = anchoDuplicador * aspectRatio;
        }

        do {
            // Generar posición aleatoria dentro del área de juego
            x = random(areaX, areaX + areaAncho - anchoDuplicador);
            y = random(areaY, areaY + areaAlto - altoDuplicador);
            intentos++;
        } while (intentos < maxIntentos && (this.duplicadorColisionaConSerpiente(x, y) || this.duplicadorColisionaConFruta(x, y)));

        posicionDuplicador = createVector(x, y);
        duplicadorVisible = true;

    }

    duplicadorColisionaConSerpiente(x, y) {
        // Verificar colisión con cabeza
        if (this.rectanguloDentroDeRectangulo(x, y, anchoDuplicador, altoDuplicador,
            posicionCabeza.x, posicionCabeza.y, salto, salto)) {
            return true;
        }

        // Verificar colisión con cuerpo
        for (let segmento of cuerpoSerpiente) {
            if (this.rectanguloDentroDeRectangulo(x, y, anchoDuplicador, altoDuplicador,
                segmento.x, segmento.y, salto, salto)) {
                return true;
            }
        }
        return false;
    }

    duplicadorColisionaConFruta(x, y) {
        return this.rectanguloDentroDeRectangulo(x, y, anchoDuplicador, altoDuplicador,
            posicionFruta.x, posicionFruta.y, salto, salto);
    }

    rectanguloDentroDeRectangulo(x1, y1, w1, h1, x2, y2, w2, h2) {
        return !(x1 + w1 < x2 || x1 > x2 + w2 || y1 + h1 < y2 || y1 > y2 + h2);
    }

    verificarColisionDuplicador() {
        if (!duplicadorVisible || !posicionDuplicador) return false;

        return this.rectanguloDentroDeRectangulo(
            posicionCabeza.x, posicionCabeza.y, salto, salto,
            posicionDuplicador.x, posicionDuplicador.y, anchoDuplicador, altoDuplicador
        );
    }

    activarDuplicador() {

        // NUEVO: Reproducir sonido base cuando toca el duplicador
        if (snakeComeSound && snakeComeSound.isLoaded()) {
            snakeComeSound.play();

            // Reproducir sonido específico del duplicador después del sonido base
            if (snakeDuplicadorSound && snakeDuplicadorSound.isLoaded()) {
                setTimeout(() => {
                    snakeDuplicadorSound.play();
                }, 300); // Esperar 300ms antes de reproducir el sonido del duplicador
            }
        }

        // Duplicar puntos
        puntos = puntos * 2;

        // Duplicar tamaño de la serpiente (agregar segmentos igual al tamaño actual)
        let longitudActual = cuerpoSerpiente.length;
        for (let i = 0; i < longitudActual; i++) {
            // Agregar segmento en la última posición del cuerpo
            if (cuerpoSerpiente.length > 0) {
                let ultimoSegmento = cuerpoSerpiente[cuerpoSerpiente.length - 1];
                cuerpoSerpiente.push(createVector(ultimoSegmento.x, ultimoSegmento.y));
            }
        }

        // Duplicar velocidad (reducir pausa a la mitad, mínimo 1)
        pausaMovimiento = Math.max(1, Math.floor(pausaMovimiento / 2));

        // Ocultar duplicador
        duplicadorVisible = false;
        posicionDuplicador = null;

    }

    // NUEVO MÉTODO: activar anuncio especial (mostrar anuncio grande)
    activarAnuncioEspecial() {
        mostrandoAnuncio = true;
        tiempoInicioAnuncio = millis();

        // Usar la misma imagen del anuncio especial pequeño para el grande
        anuncioActual = imagenAnuncioEspecial;

    }

    inicializar() {
        puntos = 0;
        gameOver = false;
        gameStarted = false;
        direccionCabeza = DIRECCIONES.DETENIDO;
        direccionAnterior = DIRECCIONES.DETENIDO;
        proximaDireccion = DIRECCIONES.DETENIDO;
        cuerpoSerpiente = [];
        pausaMovimiento = 15;

        // Resetear sistema de anuncios
        manzanasGratis = 3;
        mostrandoOfertaAnuncio = false;
        mostrandoAnuncio = false;
        anuncioActual = null;
        frutaPendiente = false;

        // CORREGIDO: resetear sistema de anuncios especiales
        contadorManzanas = 0;
        anuncioEspecialActivo = false;
        posicionAnuncioEspecial = null;
        imagenAnuncioEspecial = null;

        // Resetear sistema de duplicador
        tiempoInicioJuego = millis();
        duplicadorVisible = false;
        posicionDuplicador = null;
        tiempoUltimoDuplicador = 0;

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

    mousePressed() {
        let franjaY = height - 50;
        let botonAncho = 120;
        let botonAlto = 35;
        let espacioEntreBotones = 20;

        let totalAnchoBotones = (botonAncho * 2) + espacioEntreBotones;
        let inicioX = (width - totalAnchoBotones) / 2;

        let botonGalagaX = inicioX;
        let botonSnakeX = inicioX + botonAncho + espacioEntreBotones;
        let botonesY = franjaY + (50 - botonAlto) / 2;

        // Lógica para el botón GALAGA
        if (mouseX >= botonGalagaX && mouseX <= botonGalagaX + botonAncho &&
            mouseY >= botonesY && mouseY <= botonesY + botonAlto) {
            pagina03Sound.stop();
            this.musica03 = false;
            nav.seleccionarPagina(1); // Página Galaga
            return;
        }

        // Lógica para el botón SNAKE (recargar la página actual)
        if (mouseX >= botonSnakeX && mouseX <= botonSnakeX + botonAncho &&
            mouseY >= botonesY && mouseY <= botonesY + botonAlto) {
            // No es necesario detener la música, pero es buena práctica resetear el estado
            this.resetearEstadoSnake();
            return;
        }
    }
    iniciarAnuncio() {
        mostrandoOfertaAnuncio = false;
        mostrandoAnuncio = true;
        tiempoInicioAnuncio = millis();

        // Seleccionar anuncio aleatorio
        let indiceAleatorio = floor(random(anuncios.length));
        anuncioActual = anuncios[indiceAleatorio];


        contadorAnuncios3++;
    }

    keyPressed() {
        // Si está mostrando anuncio, no permitir controles
        if (mostrandoAnuncio) return;

        // Controles del juego
        if (!gameOver && !mostrandoOfertaAnuncio) {
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
                    tiempoInicioJuego = millis(); // Inicializar tiempo de juego
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

            pagina03Sound.stop();
            this.musica03 = false;
            nav.siguientePagina();
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

    onExit() {
        // Detener música y resetear estado al salir
        if (pagina03Sound && pagina03Sound.isPlaying()) {
            pagina03Sound.stop();
        }
        this.musica03 = false;

        // Resetear completamente el juego cuando se sale de la página
        this.resetearEstadoSnake();

    }
}

// Resetear el estado cuando se cambie de página
function resetearJuego() {
    juegoInicializado = false;
}