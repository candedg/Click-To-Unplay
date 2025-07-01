class Pagina03 extends Pagina {
    draw() {
        background(0, 0, 255);

    }

    mousePressed() {
        
        print('*** Pantalla indice 0 mousePressed');
        nav.siguientePantalla();
    }
}
