// Varables

    var allEnemies = [];


// Game common pattern    
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
            var positionList = [143, 226, 309];
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

        // Checking if player was hit by the bug or get the key
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
                player.hit += 1;

                this.tryAgain();

                if (player.hit == 5) {
                    this.reset();
                }
            }

            // collect the key

            var topK = key.y + 50;
            var bottomK = key.y + key.h - 30;
            var leftK = key.x + 30;
            var rightK = key.x + key.w - 30;

            if (left <= rightK && right >= leftK && top <= bottomK && bottom >= topK) {
                player.hasKey = true;
                key.x = 0;
                key.y = 0;
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
            var positionKey = [100, 200, 300, 400];
            key.positionY();
            key.positionX(positionKey);

            setTimeout(function() {

                message2.visibility = false;
                player.hit = 0;
                player.hasKey = false;

            }, 750) 
        }

        // after the player get the key
        collected() {
            message3.visibility = true;
            message3.x = player.x -70;
            message3.y = player.y + 40;

            setTimeout (function(){

                message3.visibility = false;

            }, 500)
        }


        // After the player won
        win() {
            player.x = 200;
            player.y = 65;

            message1.visibility = true;
            message1.x = player.x -70;
            message1.y = player.y + 40;
            allEnemies = [];

            var positionKey = [100, 200, 300, 400];
            key.positionY();
            key.positionX(positionKey);

            setTimeout(function() {

                player.x = 201;
                player.y = 380;
                message1.visibility = false;
                allEnemies = [enemy1, enemy2];
                player.hit = 0;
                player.hasKey = false;

            }, 2000) 
        }
    }



// Enemy - bad character of the game

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


// List of bad characters

    let enemy = new Enemy();
    let enemy1 = new Enemy();
    let enemy2 = new Enemy();
    let enemy3 = new Enemy();
    let enemy4 = new Enemy();
    let enemy5 = new Enemy();
    let enemy6 = new Enemy();

    allEnemies = [enemy1, enemy2];


// Player - good character of the game (the user)    

    class Player extends Point {

        constructor(sprite, x, y, w, h, collision, hit, hasKey) {
            super(w, h, collision);
            this.sprite = sprite || 'images/char-horn-girl.png';
            this.x = x || 201;
            this.y = y || 380;
            this.hit = hit || 0;
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

                if (this.y >= 100 && this.y <= (ctx.canvas.height - (this.h * 1.4))) {
                    this.y += (this.w * 0.25);
                }

            } else if (key == 'up') {

                if (this.y > 111 && this.y <= (ctx.canvas.height - (this.h * 0.5))) {
                    this.y -= (this.w * 0.25);
                }
            }
            
            // Check if the player win
            if (player.y <= 113 && player.hasKey == true) {
                if (player.x >= 200 && player.x <= 240) { 
                    this.win();
                }
            } 
        }
    }

    let player = new Player();


// Moving the player

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


// Messages in th game    

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


// Key - attribute to collect    

    class Key extends Point {

        constructor(sprite, x, y, w, h) {

            super(sprite, x, y, w, h);
            this.sprite = sprite || 'images/Key.png';
            this.x = x;
            this.y = y;

            var positionKey = [100, 200, 300, 400];
            this.positionY();
            this.positionX(positionKey);
        }
    }

    var key = new Key();

// text render

class MessageText extends Point {

    constructor(text, sprite, x, y, w, h, visibility) {
        super(sprite, x, y, w, h);
        this.text = text || 'Hello,<br>This is me!';
        this.sprite = sprite || 'images/SpeechBubble.png';
        this.x = x || 0;
        this.y = y || 0;
        this.w = w;
        this.h = h;
        this.visibility = visibility || true;
    }   
     render() {

        ctx.drawImage(Resources.get(this.sprite), player.x + 80, player.y - 100);

        var fontSize = 15;
        ctx.font = fontSize + 'px Helvetica';
        ctx.fillStyle = '#1a2047';
        ctx.textAlign = 'center';

        // Displaying text with line break

        var textArray = this.text.split('<br>');
        this.y = player.y -5;

        for (var i = 0; i < textArray.length; i++) {
            ctx.fillText(textArray[i], player.x + 132, this.y);
            this.y += (fontSize + 6);

        }

    }

}
var messageText01 = new MessageText('Omg!<br>Bugs are<br>everywhere!');
var messageText02 = new MessageText('Help me!<br>I need to<br>get the key!');
var messageText03 = new MessageText('Bug hits me!<br>and ...I lost<br>...the key!');
var messageText04 = new MessageText('I have a key!<br>I am so<br>happy!!!');
var messageText = new MessageText('I made it!<br>Thank you,<br>for help!');






