
// --------------------------- Common patterns ----------------------------    
    
// VECTOR

    class Vector {

        constructor(sprite, x, y, w, h, touchVector) {
            this.sprite = sprite;
            this.x = x || 0;
            this.y = y || 0;
            this.w = w || 101;
            this.h = h || 171;
            this.touchVector = touchVector || false;
        }

        update(dt) {

            this.vectorTouch();
        }

        render() {

            ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        }
        
        // Generate position Y
        positionY() {

            let positionList = [143, 226, 309];
            let positionGenerator = Math.floor(Math.random() * positionList.length);
            let position = positionList[positionGenerator];
            this.y = position;
        }

        // Generate position X (used only once for bugs, when start)
        positionX(list) {

            let positionGenerator = Math.floor(Math.random() * list.length);
            let positionXstart = list[positionGenerator];
            this.x = positionXstart;
        }

        // Checking if the vectors touch each other (collision)
        vectorTouch() {

            // Player's dimensions 
            // extra numbers are whitespaces on the pictures
            let left = player.x + 17; 
            let right = player.x + player.w - 17;
            let top = player.y + 82;
            let bottom = player.y + player.h - 30; 


        // BUG BITES

            allEnemies.forEach(function(enemy) {

                // Bug's dimensions
                let rightB = enemy.x + enemy.w - 17;
                let leftB = enemy.x + 17;
                let bottomB = enemy.y + enemy.h - 38;
                let topB = enemy.y + 82;
        
                // Check if Player was bitten by Bug
                if (left <= rightB && right >= leftB && top <= bottomB && bottom >= topB) {
                    player.touchVector = true;
                    
                    return player.touchVector;
                }
            })

            // When Player is bitten by the bug, he loses one heart
            if (player.touchVector == true) {

                player.hit += 1;
                allHearts[player.hit - 1].visibility = false;
             
                // Player backs to start position
                this.tryAgain();

                // When Player is bitten 5th time he loses key
                if (player.hit == 5) {

                    allEnemies = [];

                    // Entry function to reset game
                    this.lostKey(); 
                } 
            }


        // KEY COLLECTED

            // Key's dimensions
            let topK = key.y + 50;
            let bottomK = key.y + key.h - 30;
            let leftK = key.x + 30;
            let rightK = key.x + key.w - 30;

            // Check if Player collects the key
            if (left <= rightK && right >= leftK && top <= bottomK && bottom >= topK) {
                this.collected();
            }

        // RESET BUTTON

            // Reset Button's dimensions
            let topR = resetButton.y + 70;
            let bottomR = resetButton.y + resetButton.h - 30;
            let leftR = resetButton.x + 30;
            let rightR = resetButton.x + resetButton.w - 30;

            // Check if Player touches the Reset Button
            if (left <= rightR && right >= leftR && top <= bottomR && bottom >= topR) {
                this.newGame();
            }
        }

        // After Bug bites Player
        tryAgain() {

            // Resetting touchVector
            player.touchVector = false;

            // Player gets back to start postion
            player.x = 201;
            player.y = 380;

            // Message shows up
            messageText03.visibility = true;

            setTimeout(function() {

                messageText03.visibility = false;

            }, 1200);
        }

        // After Player collects Key
        collected() {

            // Key disappears from the screen
            key.x = -100;
            key.y = -100;

            // Key is hidden from the view
            player.keyInvisible = true;

            // Door is closed
            openDoor.visibility = true;

            // Message shows up
            messageText04.visibility = true;

            setTimeout (function(){

                messageText04.visibility = false;

            }, 1200)
        }

        // After Player gets bitten 5th times, he loses Key and reset game
        lostKey() {

            allEnemies = [];

            player.keyInvisible = true;

            key.x = -100;
            key.y = -100;

            openDoor.visibility = false;

            // Message shows up
            setTimeout(function() {

                messageText02.visibility = true;

                setTimeout(function(){

                    messageText02.visibility = false;

                }, 1200)

            }, 1200) 

            // Start Rest/New Game function
            this.newGame();
        }

        // New Game or Reset Game
        newGame() {

            // Resetting bugs

            allEnemies = [];
            player.keyInvisible = true;

            setTimeout(function(){

                // Resetting Key
                let positionKey = [100, 200, 300, 400];
                key.positionY();
                key.positionX(positionKey);  
    
                // Resetting Bug bites, Heart rating
                player.touchVector = false;
                player.hit = 0;
                openDoor.visibility = false;

                allHearts.forEach(function(heart0){
                    heart0.visibility = true;
                })
                
                // Setting up Player, Bugs
                player.x = 201;
                player.y = 380;

                allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5];

                // enemy6, enemy7

                // Message shows up
                messageText01.visibility = true;

                setTimeout(function(){
                    player.keyInvisible = false;

                    messageText01.visibility = false;

                }, 2100);

            }, 2200)
        }

        // After Player won
        win() {

            // Player is in Witch's house
            player.x = 201;
            player.y = 65;
            cookie.visibility = true;

            // Message shows up
            messageText05.visibility = true;

            setTimeout(function() {

                messageText05.visibility = false;
                cookie.visibility = false;


            }, 2000) 

            // Resetting Game
            this.newGame();
        }
    };


// ----------------------- Individuals  -----------------------------

// BUG

    class Enemy extends Vector {
        constructor(sprite, x, y, w, h, rode, touchVector) {
            super(x, w, h, touchVector);
            this.sprite = sprite || 'images/enemy-bug.png';
            this.y = y;
            this.rode = rode;

            this.positionY();
            this.generator();

            let positionList = [-101, 100, 250, 320, 400];
            this.positionX(positionList);
        }

        // Generator for speed
        generator() {
            let generateX = Math.random();
        
            // Make sure the bug's speed is not too low
            if (generateX < 0.20) {
                generateX = 0.35
            };

            this.rode = generateX;
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
    }

    let enemy1 = new Enemy();
    let enemy2 = new Enemy();
    let enemy3 = new Enemy();
    let enemy4 = new Enemy();
    let enemy5 = new Enemy();
    let enemy6 = new Enemy();
    let enemy7 = new Enemy();
    let enemy8 = new Enemy();


    let allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5];
    // enemy6, enemy7, enemy8


    // PLAYER
    class Player extends Vector {

        constructor(sprite, x, y, w, h, touchVector, hit, keyInvisible) {
            super(w, h, touchVector);
            this.sprite = sprite || 'images/char-horn-girl.png';
            this.x = x || 201;
            this.y = y || 380;
            this.hit = hit || 0;
            this.keyInvisible = keyInvisible || false;
        }

        // To move Player and make sure he will not get out of the screen
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
            
            // Check if Player win
            if (player.y <= 113 && player.keyInvisible == true) {
                if (player.x >= 200 && player.x <= 240) { 
                    this.win();
                }
            } 
        }
    }

    // Checking which arrow key was pressed
    document.addEventListener('keyup', function(e) {
        let allowedKeys = {
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down'
        };

        player.handleInput(allowedKeys[e.keyCode]);
    });

    let player = new Player();


// KEY - attribute to collect    

    class Key extends Vector {

        constructor(sprite, x, y, w, h) {

            super(sprite, x, y, w, h);
            this.sprite = sprite || 'images/Key.png';
            this.x = x || -100;
            this.y = y || -100;

            let positionKey = [100, 200, 300, 400];
            this.positionY();
            this.positionX(positionKey);
        }
    }

    let key = new Key();


// MESSAGE

    class MessageText extends Vector {

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

            let fontSize = 15;
            ctx.font = fontSize + 'px Tooney Loons';
            ctx.fillStyle = '#1a2047';
            ctx.textAlign = 'left';

            // Displaying text with linebreaks

            let textArray = this.text.split('<br>');
            this.y = player.y -4;

            for (let i = 0; i < textArray.length; i++) {
                ctx.fillText(textArray[i], player.x - 68, this.y);
                this.y += (fontSize + 6);
            }
        }
    }

    let messageText01 = new MessageText('Omg!<br>Bugs are<br>everywhere!');
    let messageText02 = new MessageText("Help me!<br>I've lost<br> the key!");
    let messageText03 = new MessageText("Bug's bit me!<br>it hurts<br>...cry!");
    let messageText04 = new MessageText('I have a key!<br>I am so<br>happy!!!');
    let messageText05 = new MessageText("I've made it!<br>Let's have <br>cookies!");

    let messageList = [messageText01, messageText02, messageText03, messageText04, messageText05]


// DOOR    

    class Door extends Vector {

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

    let openDoor = new Door('images/Door-open03.png', false);
    let closeDoor = new Door();


// HEART RATING

    class Heart extends Vector {
        constructor(x, visibility, sprite, y, w, h) {
            super(sprite, x, y, w, h);
            this.visibility = visibility || true;
            this.sprite = sprite || 'images/Heart-small.png';
            this.x = x || 0;
            this.y = y || 560;
            this.w = w;
            this.h = h;
        }
    }

    let heart = new Heart(275);
    let heart1 = new Heart(320);
    let heart2 = new Heart(365);
    let heart3 = new Heart(410);
    let heart4 = new Heart(455);

    let allHearts = [heart, heart1, heart2, heart3, heart4];


// RESET BUTTON

    class Reset extends Vector {
        constructor(sprite, x, y, w, h) {
            super(w, h);
            this.x = x || -10;
            this.y = y || 480;
            this.sprite = sprite || 'images/Rock.png';
        }
    };

    let resetButton = new Reset();

// COOKIE

    class Cookie extends Vector {
        constructor(visibility, sprite, x, y, w, h) {
            super(x, y);
            this.sprite = sprite || 'images/Cookie.png';
            this.x = x || 230;
            this.y =  y || 184;
            this.w = w || 40;
            this.h = h || 68;
            this.visibility = visibility || false;
        }
    }

    let cookie = new Cookie();