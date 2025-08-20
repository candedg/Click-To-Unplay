function Bullet(x, y) {
  // Si no pasan coordenadas, usa la nave como centro (disparo normal)
  this.x = x !== undefined ? x : ship.x;
  this.y = y !== undefined ? y : ship.y;

  this.s = 5;
  this.v = 6.5;
  this.colors = ["white", "lightgray", "darkgray", "cornflowerblue", "skyblue", "navyblue", "blue"];
  this.c = random(this.colors);

  this.show = function () {
    fill(this.c);
    ellipse(this.x, this.y, this.s);
  }

  this.update = function () {
    this.y -= this.v;
  }

  this.checkCollision = function (b) {
    for (var i = 0; i < aliens.length; i++) {
      if (this.x >= aliens[i].x && this.x <= aliens[i].x + aliens[i].s) {
        if (this.y >= aliens[i].y && this.y <= aliens[i].y + aliens[i].s) {
          // Matar alien y eliminar bala
          b.x = width * 2;
          aliens.splice(i, 1);
        }
      }
    }
  }
}

