function Ship() {
  this.s = 50;   // tamaño de la nave (ancho/alto de la imagen)
  this.v = 5;    // velocidad horizontal
  this.x = width / 2;
  this.y = height - (this.s * 1.75);

  // Dibuja centrando la imagen en x
  this.show = function () {
    image(imgs[0], this.x - this.s / 2, this.y, this.s, this.s);
  }

  this.update = function () {
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) { // Flecha derecha o 'D'
      this.x += this.v;
    }
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) { // Flecha izquierda o 'A'
      this.x -= this.v;
    }

    // límites del canvas
    if (this.x < this.s / 2) this.x = this.s / 2;
    if (this.x > width - this.s / 2) this.x = width - this.s / 2;
  }


}
