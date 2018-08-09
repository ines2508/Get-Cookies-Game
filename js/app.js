
class Point {
    constructor(sprite, x, y, w, h, collision) {
        this.sprite = sprite;
        this.x = x || 0;
        this.y = y || 0;
        this.w = w || 101;
        this.h = h || 171;
        this.collision = collision || false;
    }


    update(dt) {

        this.checkCollisions();
    }

    render() {

        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    checkCollisions() {

        // extra numbers are whitespaces on the pictures
        var left = player.x + 17; 
        var right = player.x + player.w - 17;
        var top = player.y + 75;
        var bottom = player.y + player.h - 30; 
   
        allEnemies.forEach(function(enemy) {
            var rightB = enemy.x + enemy.w - 17;
            var leftB = enemy.x + 17;
            var bottomB = enemy.y + enemy.h - 38;
            var topB = enemy.y + 82;
    
            if (left <= rightB && right >= leftB && top <= bottomB && bottom >= topB) {
                player.collision = true;
            return player.collision;
            }
        })

        if (player.collision == true) {
            player.tryAgain();
        }
    }

}

class Enemy extends Point {
    constructor(x, y, w, h, sprite, rode, collision) {
        super(x, w, h, collision);
        this.sprite = sprite || 'images/enemy-bug.png';
        this.y = y;
        this.rode = rode;
        this.positionY();
        this.generator();
        this.positionX();
    }

    update(dt) {

        this.x += (this.x * dt + this.rode + 4.5) * this.rode * 0.75 ;

        if (this.x >= 505) {
            this.x = -101;
            this.positionY();
            this.generator();
        }
    }

    positionY() {
        var positionList = [60, 143, 226];
        var positionGenerator = Math.floor((Math.random() * 3) + 0);
        var position = positionList[positionGenerator];
        this.y = position;
    }

    positionX() {
        var positionList = [-101, 0, 50, 100, 150, 350];
        var positionGenerator = Math.floor((Math.random() * 6) + 0);
        var positionXstart = positionList[positionGenerator];
        this.x = positionXstart;
    }

    generator() {
        var generateX = Math.random();
        if (generateX < 0.32) {
            generateX = 0.32
        }
        this.rode = generateX;
    }
}

let enemy = new Enemy();
let enemy1 = new Enemy(undefined, undefined, undefined, undefined, undefined);
let enemy2 = new Enemy(undefined, undefined, undefined, undefined, undefined);
let enemy3 = new Enemy(undefined, undefined, undefined, undefined, undefined);
let enemy4 = new Enemy(undefined, undefined, undefined, undefined, undefined);
let enemy5 = new Enemy(undefined, undefined, undefined, undefined, undefined);
let enemy6 = new Enemy(undefined, undefined, undefined, undefined, undefined);

var allEnemies = [enemy1, enemy2 , enemy3, enemy4];


class Player extends Point {
    constructor(x, y, w, h, sprite, collision) {
        super(x, y, w, h, collision);
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
        player.reset();
    }

    tryAgain() {
        console.log("They hit me!")
        player.reset();
    }
    reset() {
        this.x = 201;
        this.y = 380;
    }   
    
}

let player = new Player(undefined, 201, 380);


document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
