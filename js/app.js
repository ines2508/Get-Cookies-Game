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
            var positionGenerator = Math.floor(Math.random() * positionList.length);
            var position = positionList[positionGenerator];
            this.y = position;
        }

        // Generate position X (used only once for bugs, when start)
        positionX(list) {

            var positionGenerator = Math.floor(Math.random() * list.length);
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
                    console.log('Ups')
                    player.hit = 0;
                }


            }

            // collect the key

            var topK = key.y + 50;
            var bottomK = key.y + key.h - 30;
            var leftK = key.x + 30;
            var rightK = key.x + key.w - 30;

            if (left <= rightK && right >= leftK && top <= bottomK && bottom >= topK) {
                this.collected();
            }
        }

        // After the player was hit
        tryAgain() {

            openDoor.visibility = false;

            player.hasKey = true;

            player.x = 201;
            player.y = 380;

            messageText03.visibility = true;
            player.collision = false;
            console.log(player.hit);

            setTimeout(function() {

                var positionKey = [100, 200, 300, 400];
                key.positionY();
                key.positionX(positionKey);    
                messageText03.visibility = false;
                messageText02.visibility = true;

           //     player.hit = 0;

                setTimeout(function(){

                    messageText02.visibility = false;
                    player.hasKey = false;
    
                }, 1200)

            }, 750) 

           
        }

        // after the player get the key
        collected() {

            key.x = -100;
            key.y = -100;
            player.hasKey = true;
            openDoor.visibility = true;

            messageText04.visibility = true;

            setTimeout (function(){

                messageText04.visibility = false;

            }, 500)
        }


        // After the player won
        win() {

            player.x = 200;
            player.y = 65;

            messageText05.visibility = true;

            allEnemies = [];

            var positionKey = [100, 200, 300, 400];
            key.positionY();
            key.positionX(positionKey);

            setTimeout(function() {

                openDoor.visibility = false;
                player.x = 201;
                player.y = 380;
                messageText05.visibility = false;
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




// Key - attribute to collect    

    class Key extends Point {

        constructor(sprite, x, y, w, h) {

            super(sprite, x, y, w, h);
            this.sprite = sprite || 'images/Key.png';
            this.x = x || -100;
            this.y = y || -100;

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
        this.sprite = sprite || 'images/SpeechBubble01.png';
        this.x = x || 0;
        this.y = y || 0;
        this.w = w;
        this.h = h;
        this.visibility = visibility || false;
    }   
     render() {

        ctx.drawImage(Resources.get(this.sprite), player.x - 80, player.y - 100);

        var fontSize = 15;
        ctx.font = fontSize + 'px Helvetica';
        ctx.fillStyle = '#1a2047';
        ctx.textAlign = 'center';

        // Displaying text with line break

        var textArray = this.text.split('<br>');
        this.y = player.y -4;

        for (var i = 0; i < textArray.length; i++) {
            ctx.fillText(textArray[i], player.x - 30, this.y);
            this.y += (fontSize + 6);

        }
    }

}
var messageText01 = new MessageText('Omg!<br>Bugs are<br>everywhere!');
var messageText02 = new MessageText('Help me!<br>I need to<br>get the key!');
var messageText03 = new MessageText('Bug hits me!<br>and ...I lost<br>...the key!');
var messageText04 = new MessageText('I have a key!<br>I am so<br>happy!!!');
var messageText05 = new MessageText('I made it!<br>Thank you,<br>for help!');

// Open doors in th game    

class Door extends Point {

    constructor(sprite, x, y, w, h, visibility) {
        super(sprite, x, y, w, h);
        this.sprite = sprite || 'images/Ramp-South.png';
        this.x = x || 200;
        this.y = y || 30;
        this.w = w;
        this.h = h;
        this.visibility = visibility || false;
    }      
}

var openDoor = new Door();










