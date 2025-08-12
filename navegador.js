class Navegador {
    constructor() {
        this.paginas = [];
        this.incidePagina = null;
        this.paginaActual = null;
    }

    agregarPagina(p) {
        this.paginas.push(p);
        if (!this.paginaActual) {
            this.incidePagina = 0;
            this.paginaActual = p;
            // Llamar onEnter si existe el método
            if (this.paginaActual.onEnter) {
                this.paginaActual.onEnter();
            }
        }
    }

    siguientePagina() {
        let i = (this.incidePagina + 1) % this.paginas.length;
        this.incidePagina = i;
        this.paginaActual = this.paginas[i];
        
        // Resetear configuraciones globales de p5.js
        this.resetearConfiguracionesGlobales();
        
        // Llamar onEnter si existe el método
        if (this.paginaActual.onEnter) {
            this.paginaActual.onEnter();
        }
    }

    previaPagina() {
        let i = (this.incidePagina - 1) % this.paginas.length;
        if (i < 0) { i = this.paginas.length - 1 }
        this.incidePagina = i;
        this.paginaActual = this.paginas[i];
        
        // Resetear configuraciones globales de p5.js
        this.resetearConfiguracionesGlobales();
        
        // Llamar onEnter si existe el método
        if (this.paginaActual.onEnter) {
            this.paginaActual.onEnter();
        }
    }

    seleccionarPagina(i) {
        if (i >= 0 && i < this.paginas.length) {
            this.incidePagina = i;
            this.paginaActual = this.paginas[i];
            
            // Resetear configuraciones globales de p5.js
            this.resetearConfiguracionesGlobales();
            
            // Llamar onEnter si existe el método
            if (this.paginaActual.onEnter) {
                this.paginaActual.onEnter();
            }
        } else {
            console.log('*** Error: indice de pagina fuera de rango');
        }
    }

    resetearConfiguracionesGlobales() {
        // Resetear todas las configuraciones de p5.js a sus valores por defecto
        textAlign(LEFT, BASELINE);
        textSize(12);
        noStroke();
        fill(0);
        rectMode(CORNER);
        imageMode(CORNER);
        textWrap(WORD);
        strokeWeight(1);
    }
}

class Pagina {
    constructor() { }
    draw() { }
    mousePressed() { }
    keyPressed() { }
    onEnter() { } // Método opcional que se llama al entrar a la página
}