var allEnemies = [];

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
    
    // Generate position Y
    positionY() {
        var positionList = [60, 143, 226];
        var positionGenerator = Math.floor((Math.random() * 3) + 0);
        var position = positionList[positionGenerator];
        this.y = position;
    }

    // Generate position X (used only once for bugs, when start)
    positionX(list) {
        var positionGenerator = Math.floor((Math.random() * list.length) + 0);
        var positionXstart = list[positionGenerator];
        this.x = positionXstart;
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

        // When the player was hit by bug
        if (player.collision == true) {

            this.tryAgain();
        }

        // key

        var topK = key.y + 50;
        var bottomK = key.y + key.h - 30;
        var leftK = key.x + 30;
        var rightK = key.x + key.w - 30;

        if (left <= rightK && right >= leftK && top <= bottomK && bottom >= topK) {
            player.hasKey = true;
            this.collected();
            return player.hasKey;
        }
    }

    // After the player was hit
    tryAgain() {
        player.x = 201;
        player.y = 380;

        message2.visibility = true;
        player.collision = false;

        setTimeout(function() {

            message2.visibility = false;    

        }, 550) 
    }

    collected() {
        message3.visibility = true;
        message3.x = player.x -70;
        message3.y = player.y + 40;

        setTimeout (function(){
            message3.visibility = false;
            key.x = 280;
            key.y = 0;
            player.hasKey = false;
        })

    }

    // After the player won
    win() {
        player.y = 0;
        message1.visibility = true;
        message1.x = player.x -70;
        message1.y = player.y + 40;
        allEnemies = [];

        setTimeout(function() {

            player.x = 201;
            player.y = 380;
            message1.visibility = false;
            player.hasKey = false;
            allEnemies = [enemy1, enemy2 , enemy3, enemy4];

        }, 2000) 
    }
}


class Enemy extends Point {
    constructor(sprite, x, y, w, h, rode, collision) {
        super(x, w, h, collision);
        this.sprite = sprite || 'images/enemy-bug.png';
        this.y = y;
        this.rode = rode;

        this.positionY();
        this.generator();
        var positionList = [-101, 0, 50, 100, 150, 350];

        this.positionX(positionList);
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

allEnemies = [enemy1, enemy2 , enemy3, enemy4];


class Player extends Point {

    constructor(sprite, x, y, w, h, collision, hasKey) {
        super(w, h, collision);
        this.sprite = sprite || 'images/char-horn-girl.png';
        this.x = x || 201;
        this.y = y || 380;
        this.hasKey = hasKey || false;
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
        
        // Check if the player win
        if (player.y <= 5) { 
            this.win();
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


class Message extends Point {

    constructor(sprite, x, y, w, h, visibility) {
        super(sprite, x, y, w, h);
        this.sprite = sprite;
        this.x = x;
        this.y = y;
        this.w = w || 95;
        this.h = h || 49;
        this.visibility = visibility || false;
    }    
}
var message1 = new Message('images/i_won.png');
var message2 = new Message('images/bad_bug.png', player.x + 40, player.y - 30, 92, 85);
var message3 = new Message('images/i_won.png');

class Key extends Point {

    constructor(sprite, x, y, w, h) {
        super(sprite, x, y, w, h);
        this.sprite = sprite || 'images/Key.png';

        var positionKey = [0, 100, 200, 300, 400];
        this.positionY();
        this.positionX(positionKey);



    }

}

var key = new Key();

