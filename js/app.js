// Varables

    var allEnemies = [];

// --------------------------- Common patterns ----------------------------    
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

        // Checking if player was hit by the bug, get the key, touch Reset Button
        checkCollisions() {

            // extra numbers are whitespaces on the pictures
            var left = player.x + 17; 
            var right = player.x + player.w - 17;
            var top = player.y + 82;
            var bottom = player.y + player.h - 30; 

            // check if player was bite by bug
    
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

            // When the player is bit by the bug, he loses one heart
            if (player.collision == true) {
                player.hit += 1;
                allHearts[player.hit - 1].visibility = false;
             
                    this.tryAgain();

                // when the player is bit 5th time he loses key
                if (player.hit == 5) {

                    allEnemies = [];

                    this.lostKey(); 
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

            // reset Button

            var topR = resetButton.y + 70;
            var bottomR = resetButton.y + resetButton.h - 30;
            var leftR = resetButton.x + 30;
            var rightR = resetButton.x + resetButton.w - 30;

            if (left <= rightR && right >= leftR && top <= bottomR && bottom >= topR) {
                this.newGame();
            }
        }

        // After the player gets bit by bug

        tryAgain() {

            // reseting collision
            player.collision = false;

            // player gets back to start postion
            player.x = 201;
            player.y = 380;

            messageText03.visibility = true;

            setTimeout(function() {

                messageText03.visibility = false;

            }, 1200);
        }

        // after the player collects the key

        collected() {

            // the key disappears from the screen
            key.x = -100;
            key.y = -100;

            // key is hidden from the view
            player.keyInvisible = true;

            // door is closed
            openDoor.visibility = true;

            messageText04.visibility = true;

            setTimeout (function(){

                messageText04.visibility = false;

            }, 1200)
        }

        // after the player gets bit 5 times, he loses the key and reset game

        lostKey() {

            allEnemies = [];

            player.keyInvisible = true;

            key.x = -100;
            key.y = -100;

            openDoor.visibility = false;

            setTimeout(function() {

                messageText02.visibility = true;

                setTimeout(function(){

                    messageText02.visibility = false;

                }, 1200)

            }, 1200) 

            this.newGame();
        }

        // new Game or reset game

        newGame() {

            // reseting bugs

            allEnemies = [];
            player.keyInvisible = true;

            setTimeout(function(){

                var positionKey = [100, 200, 300, 400];
                key.positionY();
                key.positionX(positionKey);  
    
                // reseting key, collistion, heart rating
                player.collision = false;
                player.hit = 0;
                openDoor.visibility = false;

                allHearts.forEach(function(heart0){
                    heart0.visibility = true;
                })

                player.x = 201;
                player.y = 380;

                allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];

                messageText01.visibility = true;

                setTimeout(function(){
                    player.keyInvisible = false;

                    messageText01.visibility = false;

                }, 2100);

            }, 1400)
        }

        // After the player won

        win() {

            // player in Witch's house
            player.x = 201;
            player.y = 65;

            messageText05.visibility = true;

            setTimeout(function() {

                messageText05.visibility = false;

            }, 1200) 

            this.newGame();
        }
    };

// ----------------------- Characters -----------------------------

// --- Bug

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
            if (generateX < 0.34) {
                generateX = 0.34
            }
            this.rode = generateX;
        }
    }


    let enemy = new Enemy();
    let enemy1 = new Enemy();
    let enemy2 = new Enemy();
    let enemy3 = new Enemy();
    let enemy4 = new Enemy();
    let enemy5 = new Enemy();
    let enemy6 = new Enemy();
    let enemy7 = new Enemy();


    allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];


// --- Player (the user)    

    class Player extends Point {

        constructor(sprite, x, y, w, h, collision, hit, keyInvisible) {
            super(w, h, collision);
            this.sprite = sprite || 'images/char-horn-girl.png';
            this.x = x || 201;
            this.y = y || 380;
            this.hit = hit || 0;
            this.keyInvisible = keyInvisible || false;
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

                if (this.y >= 100 && this.y <= (ctx.canvas.height - (this.h * 1.1))) {
                    this.y += (this.w * 0.25);
                }

            } else if (key == 'up') {

                if (this.y > 111 && this.y <= (ctx.canvas.height - (this.h * 0.5))) {
                    this.y -= (this.w * 0.25);
                }
            }
            
            // Check if the player win
            if (player.y <= 113 && player.keyInvisible == true) {
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


// --- Key - attribute to collect    

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

// --- Messeges

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
        ctx.font = fontSize + 'px Tooney Loons';
        ctx.fillStyle = '#1a2047';
        ctx.textAlign = 'left';

        // Displaying text with linebreaks

        var textArray = this.text.split('<br>');
        this.y = player.y -4;

        for (var i = 0; i < textArray.length; i++) {
            ctx.fillText(textArray[i], player.x - 68, this.y);
            this.y += (fontSize + 6);
        }
    }
}

var messageText01 = new MessageText('Omg!<br>Bugs are<br>everywhere!');
var messageText02 = new MessageText("Help me!<br>I've lost<br>get the key!");
var messageText03 = new MessageText("Bug's bit me!<br>it hurts<br>...cry!");
var messageText04 = new MessageText('I have a key!<br>I am so<br>happy!!!');
var messageText05 = new MessageText("I made it!<br>Let's have <br>cookies!");

var messageList = [messageText01, messageText02, messageText03, messageText04, messageText05]


// --- Open doors in th game    

class Door extends Point {

    constructor(sprite, visibility, x, y, w, h) {
        super(sprite, x, y, w, h);
        this.sprite = sprite || 'images/Door-close01.png';
        this.x = x || 201;
        this.y = y || 83;
        this.w = w;
        this.h = h;
        this.visibility = visibility;
    }      
}

var openDoor = new Door('images/Door-open03.png', false);
var closeDoor = new Door();


// --- Hearts rating

class Heart extends Point {
    constructor(x, visibility, sprite, y, w, h) {
        super(sprite, x, y, w, h);
        this.visibility = visibility || true;
        this.sprite = sprite || 'images/Heart_small.png';
        this.x = x || 0;
        this.y = y || 560;
        this.w = w;
        this.h = h;
    }
}

var heart = new Heart(275);
var heart1 = new Heart(320);
var heart2 = new Heart(365);
var heart3 = new Heart(410);
var heart4 = new Heart(455);

var allHearts = [heart, heart1, heart2, heart3, heart4];

// --- Reset Button

class Reset extends Point {
    constructor(sprite, x, y, w, h) {
        super(w, h);
        this.x = x || -10;
        this.y = y || 480;
        this.sprite = sprite || 'images/Rock.png';
    }
};

var resetButton = new Reset();










