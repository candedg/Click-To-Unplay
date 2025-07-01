class Pagina02 extends Pagina {
    draw() {
        background(255, 0, 0);
    }

    mousePressed() {
        
        print('*** Pantalla indice 0 mousePressed');
        nav.siguientePantalla();
    }
}
