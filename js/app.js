

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
    constructor(x, y, w, h, sprite) {
        super(x, y, w, h);
        this.sprite = sprite || 'images/enemy-bug.png';

    }
}

let enemy1 = new Enemy(undefined, 0, 60);
let enemy2 = new Enemy(undefined, 0, 143);
let enemy3 = new Enemy(undefined, 0, 226 );


var allEnemies = [enemy1, enemy2 , enemy3];

console.log(enemy1);


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
