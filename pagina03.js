class Pagina03 extends Pagina {
    draw() {
        background(0, 0, 255);

        //Texto título
        push();
        textAlign(CENTER);
        textSize(width / 5);
        textWrap(WORD);
        stroke(0, 255, 0);
        strokeWeight(10);
        fill(255, 0, 0);
        text('Spasmic Snake', 0, height / 15, width);
        pop();
    }

    mousePressed() {
        print('*** Vuelve a la p[agina de inicio');
        nav.siguientePagina();
    }
}
