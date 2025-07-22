class Pagina02 extends Pagina {
    draw() {
        background(255, 0, 0);

        fill(6, 6, 26);
        rect(0, 0, width, height - 50);

        //Texto título
        push();
        textAlign(CENTER);
        textSize(width / 5);
        textWrap(WORD);
        stroke(148, 0, 211);
        strokeWeight(10);
        fill(0, 255, 0);
        text('Galaga Glitch', 0, height / 15, width);
        pop();
    }

    mousePressed() {
        print('*** Pasa al segundo juego, Spaspic Snake');
        nav.siguientePagina();
    }
}
