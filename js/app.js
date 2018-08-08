


class Point {
    constructor(sprite, x, y, w, h) {
        this.sprite = sprite;
        this.x = x || 0;
        this.y = y || 0;
        this.w = w || 101;
        this.h = h || 171;
    }
    update(dt) {

    }
    render() {

        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

class Enemy extends Point {
    constructor(x, y, w, h, sprite, addRode, par01, par02, par03, delay) {
        super(x, y, w, h);
        this.sprite = sprite || 'images/enemy-bug.png';
        this.addRode = addRode || 0.25;
        this.par01 = par01 || 0.5;
        this.par02 = par02 || 25;
        this.par03 = par03 || 1.2;
        this.delay = delay || 505;


    }
    update(dt) {

      //  this.x += (this.x * dt + this.speed) * 0.3;
     //   this.x += (this.x * dt + this.speed) * Math.random() * 0.3;
    //    this.x += (this.x * dt + Math.random()) * 0.3;
     //     this.x += (this.x * dt + this.speed) / Math.random() * 0.1;
     //     this.x += (((this.x * dt + this.addRode) / Math.random() - this.par01) / this.par02) * this.par03;
          this.x += (((this.x * dt + this.addRode) / Math.random() - this.par01) / this.par02) * this.par03;



          if (this.x >= this.delay) {
              this.x = 0;
              console.log(enemy1)

          }


    }
}

let enemy1 = new Enemy(undefined, 0, 60, undefined, undefined, 0.15);
let enemy2 = new Enemy(undefined, 0, 143, undefined, undefined, 0.25, undefined, 15);
let enemy3 = new Enemy(undefined, 0, 226, undefined, undefined, 0 , 0.8 , 5, 1.2, 800 );
let enemy4 = new Enemy(undefined, 1, 60, undefined, undefined, 0.25, undefined, 15, 1.5, 600);
let enemy5 = new Enemy(undefined, 0, 226, undefined, undefined, 0.25, 0.8);
let enemy6 = new Enemy(undefined, 0, 143, undefined, undefined, 0.5, 0.8, 22, 1, 650);





var allEnemies = [enemy1, enemy2 , enemy3, enemy4, enemy5, enemy6];




class Player extends Point {
    constructor(x, y, w, h, sprite) {
        super(x, y, w, h);
        this.sprite = sprite || 'images/char-boy.png';
    }

    handleInput(key) {

        if (key == 'right') {

            if (this.x >= 0 && this.x <= (ctx.canvas.width - (this.w * 1.2))) {
                this.x += (this.w * 0.25);
            }

        } else if (key == 'left') {

            if (this.x > (this.w * 0.25) && this.x <= (ctx.canvas.width - (this.w * 0.5))) {
                this.x -= (this.w * 0.25);
            }

        } else if (key == 'down') {

            if (this.y >= 0 && this.y <= (ctx.canvas.height - (this.h * 1.4))) {
                this.y += (this.w * 0.25);
            }

        } else if (key == 'up') {

            if (this.y > 0 && this.y <= (ctx.canvas.height - (this.h * 0.5))) {
                this.y -= (this.w * 0.25);
            }
            if (this.y <= 0) {
                player.win()
            }
        }
    }
    win() {
        console.log("I won!")
    }
    
    
}

let player = new Player(undefined, 201, 380);
console.log(player);






document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
