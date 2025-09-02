// Página final de resultados
class Pagina04 extends Pagina {
    constructor() {
        super();
        this.musica01 = false;
    }

    draw() {
        background(0, 255, 0);

        // Reproduce música en loop
        if (!this.musica01) {
            this.musica01 = true;
            pagina01Sound.setVolume(0.2);
            pagina01Sound.loop();
        }

        // Títulos grandes
        push();
        textAlign(CENTER, TOP);
        textSize(width / 12);
        stroke(148, 0, 211);
        strokeWeight(10);
        fill(255, 0, 0);
        textFont(fuenteTitulo);
        text('Resultados', width / 2, height / 15);
        text('Créditos', width / 2, height - 180);
        pop();

        // Cuadro de fondo del resultado
        let cuadroAncho = 360 - 30;
        let cuadroAlto = (height - 300) - 30 - 50;
        let cuadroX = width / 2 - cuadroAncho / 2;
        let cuadroY = height / 6 + 15;



        push();
        rectMode(CORNER);
        stroke(148, 0, 211);
        strokeWeight(8);
        fill(255, 255, 0);
        rect(cuadroX, cuadroY, cuadroAncho, cuadroAlto, 20);
        pop();

        // Texto del resultado dentro del cuadro amarillo
        push();
        textFont(fuenteTexto);
        noStroke();
        textAlign(CENTER, CENTER);

        // Mensaje de felicitaciones arriba
        textSize(width / 22);
        fill(0, 0, 255);
        let mensajeY = cuadroY + (cuadroAlto * 0.25);
        text("¡Felicitaciones!\nHas gastado\ntiempo de tu vida en ver:", width / 2, mensajeY);

        // Resultado en el medio
        textSize(width / 12);
        fill(200, 0, 0);
        let resultadoY = cuadroY + (cuadroAlto * 0.55);
        text(`${totalAnuncios} anuncios`, width / 2, resultadoY);

        // Mensaje de reset abajo
        textSize(width / 24);
        fill(0, 100, 0);
        let resetY = cuadroY + (cuadroAlto * 0.85);
        text("Presiona R para resetear", width / 2, resetY);

        pop();

        // Nombres de desarrolladores
        push();
        textAlign(CENTER, BOTTOM);
        textSize(width / 22);
        noStroke();
        fill(255, 0, 0);
        textFont(fuenteTexto);
        text('Arbia, Florencia\nDi Genova, Candela S.\nHara, Celina N.\nMelcon, Abril', width / 2, height - 20);
        pop();
    }

    keyPressed() {
        if (key == 'R' || key == 'r') {
            pagina01Sound.stop();
            this.musica01 = false;
            totalAnuncios = 0; // reset contador global
            nav.seleccionarPagina(0);
        }
    }

    onEnter() {
        textAlign(LEFT, BASELINE);
        textSize(12);
        noStroke();
        fill(0);
        rectMode(CORNER);
        imageMode(CORNER);
    }
}
