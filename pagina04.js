// Página final de resultados

class Pagina04 extends Pagina {
    constructor() {
        super();
    }

    draw() {
        background(0, 255, 0);

        // Títulos grandes
        push();
        textAlign(CENTER, TOP);
        textSize(width / 8);
        textWrap(WORD);
        stroke(148, 0, 211);
        strokeWeight(10);
        fill(255, 0, 0);
        text('Resultados', width / 2, height / 15);
        text('Créditos', width / 2, height - 180);
        pop();

        // Cuadro de fondo del resultado
        push();
        rectMode(CORNER);
        stroke(148, 0, 211);
        strokeWeight(8);
        fill(255, 255, 0);
        rect(width / 2 - 150, height / 15 + 75, 300, 230, 20);
        pop();

        // Texto base del resultado
        push();
        textAlign(CENTER, TOP);
        textSize(width / 15);
        noStroke();
        fill(0, 0, 255);
        text('¡Felicitaciones!\nHas gastado', width / 2, height / 15 + 100);
        text('de tu vida\nen este juego', width / 2, height / 15 + 220);
        pop();

        // Nombres de desarrolladores
        push();
        textAlign(CENTER, BOTTOM);
        textSize(width / 20);
        noStroke();
        fill(255, 0, 0);
        text('Arbia, Florencia\nDi Genova, Candela S.\nHara, Celina N.\nMelcon, Abril', width / 2, height - 20);
        pop();
    }

    mousePressed() {
        
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
