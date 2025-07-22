let img1;
let primerAnuncio = false;
let arrayAnuncios = [];
let posicionAnuncio;

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
        text('Click to Unplay', 0, height / 15, width);
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
        text('!COMENZAR', width / 2, height / 2 + 10);
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
        text('Inicio', width / 2, height - 10);
        pop();

        //Dibujo los anuncios recorriendo el array
        for(let i = 0; i < arrayAnuncios.length; i++) {
            imageMode(CENTER);
            image(img1, arrayAnuncios[i].posicionX, arrayAnuncios[i].posicionY);
        }
    }

    mousePressed() {
        if (mouseX > width / 2 - 10 && mouseX < width / 2 + 10 && mouseY > height - 20 && mouseY < height - 10) {
            //Si hace click en las letras de "inicio", pasa al primer juego
            print('*** Pasa al primer juego, Galaga Glitch');
            arrayAnuncios = [];
            primerAnuncio = false;
            nav.siguientePagina();
        } else if (primerAnuncio == false && mouseX > width / 2 - 100 && mouseX < width / 2 + 100 && mouseY > height / 2 - 26 && mouseY < height / 2 + 26) {
            //Con el primer click al botón falso, salta el primer anuncio
            print('*** Área de botón falso');
            primerAnuncio = true;
            anuncio();
        } else if (primerAnuncio == true && mouseX < height - 130) {
            //Una vez que ya salió el primer anuncio, aparecen más anuncios sin importar dónde clickee
            print('*** Ahora salen anuncios sin importar donde clickees');
            anuncio();
        } else {
            //Clicks inválidos al inicio
            print('*** Área de click no válido');
        }
    }
}

function anuncio() {
    //Por cada click, crea un objeto nuevo con una nueva posición random para el anuncio
    posicionAnuncio = {
        posicionX: random(0, width), 
        posicionY: random(0, height - 130)
    };
    //Lo agrega al array
    arrayAnuncios.push(posicionAnuncio);
    print('*** Aparece anuncio');
}