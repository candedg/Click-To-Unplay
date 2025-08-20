// Página final de resultados

class Pagina04 extends Pagina {
    constructor() {
        super();

        //Variable de la música de fondo
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
        textWrap(WORD);
        stroke(148, 0, 211);
        strokeWeight(10);
        fill(255, 0, 0);
        textFont(fuenteTitulo);
        text('Resultados', width / 2, height / 15);
        text('Créditos', width / 2, height - 180);
        pop();

        // Cuadro de fondo del resultado
        push();
        rectMode(CORNER);
        stroke(148, 0, 211);
        strokeWeight(8);
        fill(255, 255, 0);
        rect(width / 2 - 150, height / 15 + 75, 300, (height - 210) - (height / 15 + 75), 20);
        pop();

        // Texto del resultado
        push();
        textSize(width / 15);
        noStroke();
        fill(0, 0, 255);
        textFont(fuenteTexto);
        textAlign(CENTER, TOP);
        text('¡Felicitaciones!\nHas gastado', width / 2, height / 15 + 100);
        let segundosPasados = Math.floor((finTiempo - comienzaTiempo) / 1000 + contadorAnuncios2 * 15 + contadorAnuncios3 * 10);
        print(segundosPasados);
        textAlign(CENTER, CENTER);
        if (segundosPasados >= 60) {
            print('yes');
            let minutosPasados = Math.floor(segundosPasados / 60);
            text(`${minutosPasados} minutos\n${segundosPasados - minutosPasados * 60} segundos`, width / 2, height / 15 + 70 + ((height - 210) - (height / 15 + 75)) / 2);
        } else {
            text(`${segundosPasados} segundos`, width / 2, height / 15 + 70 + ((height - 210) - (height / 15 + 75)) / 2);
        }
        textAlign(CENTER, BOTTOM);
        text('de tu vida\nen anuncios', width / 2, height - 235);
        pop();

        // Nombres de desarrolladores
        push();
        textAlign(CENTER, BOTTOM);
        textSize(width / 20);
        noStroke();
        fill(255, 0, 0);
        textFont(fuenteTexto);
        text('Arbia, Florencia\nDi Genova, Candela S.\nHara, Celina N.\nMelcon, Abril', width / 2, height - 20);
        pop();
    }

    mousePressed() {
        
    }

    keyPressed() {
        if (key == 'R' || key == 'r') {
            pagina01Sound.stop();
            this.musica01 = false;
            comienzaTiempo = 0;
            finTiempo = 0;
            contadorAnuncios2 = 0;
            contadorAnuncios3 = 0;
            nav.seleccionarPagina(0);
        }
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
