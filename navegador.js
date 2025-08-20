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

            // Llamar setup si existe
            if (this.paginaActual.setup) {
                this.paginaActual.setup();
            }

            // Llamar onEnter si existe
            if (this.paginaActual.onEnter) {
                this.paginaActual.onEnter();
            }
        }
    }

    siguientePagina() {
        // Llamar onExit de la página actual antes de cambiar
        if (this.paginaActual && this.paginaActual.onExit) {
            this.paginaActual.onExit();
        }

        let i = (this.incidePagina + 1) % this.paginas.length;
        this.incidePagina = i;
        this.paginaActual = this.paginas[i];

        // Resetear configuraciones globales de p5.js
        this.resetearConfiguracionesGlobales();

        // Llamar setup si existe
        if (this.paginaActual.setup) {
            this.paginaActual.setup();
        }

        // Llamar onEnter si existe
        if (this.paginaActual.onEnter) {
            this.paginaActual.onEnter();
        }
    }

    previaPagina() {
        // Llamar onExit de la página actual antes de cambiar
        if (this.paginaActual && this.paginaActual.onExit) {
            this.paginaActual.onExit();
        }

        let i = (this.incidePagina - 1) % this.paginas.length;
        if (i < 0) { i = this.paginas.length - 1 }
        this.incidePagina = i;
        this.paginaActual = this.paginas[i];

        // Resetear configuraciones globales de p5.js
        this.resetearConfiguracionesGlobales();

        // Llamar setup si existe
        if (this.paginaActual.setup) {
            this.paginaActual.setup();
        }

        // Llamar onEnter si existe
        if (this.paginaActual.onEnter) {
            this.paginaActual.onEnter();
        }
    }

    seleccionarPagina(i) {
        if (i >= 0 && i < this.paginas.length) {
            // Llamar onExit de la página actual antes de cambiar
            if (this.paginaActual && this.paginaActual.onExit) {
                this.paginaActual.onExit();
            }

            this.incidePagina = i;
            this.paginaActual = this.paginas[i];

            // Resetear configuraciones globales de p5.js
            this.resetearConfiguracionesGlobales();

            // Llamar setup si existe
            if (this.paginaActual.setup) {
                this.paginaActual.setup();
            }

            // Llamar onEnter si existe
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
    preload() { }
    setup() { }
    draw() { }
    mousePressed() { }
    keyPressed() { }
    onEnter() { } // Método opcional que se llama al entrar a la página
    onExit() { }  // Método opcional que se llama al salir de la página
}