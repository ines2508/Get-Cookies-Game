
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

    // Checking if player was hit by the bug
    checkCollisions() {

        // extra numbers are whitespaces on the pictures
        var left = player.x + 17; 
        var right = player.x + player.w - 17;
        var top = player.y + 82;
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

        // When the player was hit
        if (player.collision == true) {

            this.tryAgain();
        }
    }

    // After the player was hit
    tryAgain() {
        player.x = 201;
        player.y = 380;
        console.log("They hit me!");

        player.collision = false;
    }

    // After the player won
    win() {
        player.y = -10;
        console.log("you won!")

        setTimeout(function() {
            player.x = 201;
            player.y = 380;
        }, 2000)        
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

        // Speed generator with made up random values

        this.x += (this.x * dt + this.rode + 4.5) * this.rode * 0.75 ;

        // When the bugs get out of the screen they come back
        if (this.x >= 505) {
            this.x = -101;
            this.positionY();
            this.generator();
        }
    }

    // Set bugs at the random track
    positionY() {
        var positionList = [60, 143, 226];
        var positionGenerator = Math.floor((Math.random() * 3) + 0);
        var position = positionList[positionGenerator];
        this.y = position;
    }

    // Used only once at start, otherwise the player will win
    positionX() {
        var positionList = [-101, 0, 50, 100, 150, 350];
        var positionGenerator = Math.floor((Math.random() * 6) + 0);
        var positionXstart = positionList[positionGenerator];
        this.x = positionXstart;
    }

    generator() {
        var generateX = Math.random();

        // Make sure the bug's speed is not too low
        if (generateX < 0.32) {
            generateX = 0.32
        }
        this.rode = generateX;
    }
}


// New bugs from class
let enemy = new Enemy();
let enemy1 = new Enemy();
let enemy2 = new Enemy();
let enemy3 = new Enemy();
let enemy4 = new Enemy();
let enemy5 = new Enemy();
let enemy6 = new Enemy();

var allEnemies = [enemy1, enemy2 , enemy3, enemy4, enemy5];



class Player extends Point {

    constructor(x, y, w, h, sprite, collision) {
        super(w, h, collision);
        this.x = x || 201;
        this.y = y || 380;
        this.sprite = sprite || 'images/char-boy.png';
    }

    // to move the player and make sure he will not get out of the screen
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
        }
        
        // Check is the player win
        if (player.y <= 5) {    
            this.win()
        }
    }
}

let player = new Player();


// Checking which arrow key was pressed
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

