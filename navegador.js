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
            this.paginaActual = p
        }
    }

    siguientePagina() {
        let i = (this.incidePagina + 1) % this.paginas.length;
        this.incidePagina = i;
        this.paginaActual = this.paginas[i];
    }

    previaPagina() {
        let i = (this.incidePagina - 1) % this.paginas.length;
        if (i < 0) { i = this.paginas.length - 1 }
        this.incidePagina = i;
        this.paginaActual = this.paginas[i];
    }

    seleccionarPagina(i) {
        if (i >= 0 && i < this.paginas.length) {
            this.incidePagina = i;
            this.paginaActual = this.paginas[i];
        } else {
            print('*** Error: indice de pagina fuera de rango');
        }
    }
}

class Pagina {
    constructor() { }
    draw() { }
    mousePressed() { }
    keyPressed() { }
}
