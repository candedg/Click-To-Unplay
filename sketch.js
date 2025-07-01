let nav = new Navegador();

function setup() {
  createCanvas(400, windowHeight);

  let p = new Pagina01();
  nav.agregarPagina(p);
  p = new Pagina02();
  nav.agregarPagina(p);
  p = new Pagina03();
  nav.agregarPagina(p);
}

function draw() {
  nav.paginaActual.draw();
}

function mousePressed() {
  nav.paginaActual.mousePressed();
}

function keyPressed() {
  // if (keyCode === RIGHT_ARROW) {
  //   nav.siguientePantalla();
  //   print(nav.incidePantalla);
  // } else if (keyCode === LEFT_ARROW) {
  //   nav.previaPantalla();
  //   print(nav.incidePantalla);
  // }

  // if(int(key) >= 0 && int(key) < nav.pantallas.length) {
  //   nav.seleccionarPantalla(int(key));
  //   print(nav.incidePantalla);
  // }

  nav.paginaActual.keyPressed();
}
