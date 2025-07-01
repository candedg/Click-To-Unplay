let img1;

function preload() {
  img1 = loadImage("/data/Image-not-found.png");
}

class Pagina01 extends Pagina {
    draw() {
        background(0, 255, 0);

        //Texto título
        push();
        textAlign(CENTER);
        textSize(width / 5);
        textWrap(WORD);
        stroke(148, 0, 211);
        strokeWeight(10);
        fill(255, 0, 0);
        text('Click to Unplay', 0, height/15, width);
        pop();

        //Dibujo rectángulo del botón falso
        push();
        rectMode(CENTER);
        stroke(148, 0, 211);
        strokeWeight(8);
        fill(255, 255, 0);
        rect(width / 2, height / 2, 210, 60, 20);
        pop();

        //Texto no comenzar
        push();
        textAlign(CENTER);
        textSize(width / 15);
        noStroke();
        fill(0, 0, 255);
        text('!COMENZAR', width/2, height/2 + 10);
        pop();

        // //Cuadrado para ver área de click del inicio
        // push();
        // noStroke();
        // fill(255, 0, 0);
        // rect(width/2 - 10, height-20, 20, 10);
        // pop();

        //Texto inicio real
        push();
        textAlign(CENTER);
        textSize(width / 50);
        noStroke();
        fill(0, 100, 0, 90);
        text('Inicio', width/2, height - 10);
        pop();
    }

    mousePressed() {
        if(mouseX > width/2 - 10 && mouseX < width/2 + 10 && mouseY > height - 20 && mouseY < height - 10) {
            print('*** Pasa de página de inicio al primer juego');
            nav.siguientePagina();
        } else if (mouseX > width/2 - 105 && mouseX < width/2 + 105 && mouseY > height/2 - 30 && mouseY < height/2 + 30) {
            print('*** Área de botón falso');
            //TO DO: indicaciones para que cada vez que se presiona en el botón, salta un anuncio en un lugar random
        } else {
            print('*** Área de click no válido');
        }
        
    }
}

