/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine makes the canvas' context (ctx) object globally available to make 
 * writing app.js a little simpler to work with.
 */

var Engine = (function(global) {
    /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas elements height/width and add it to the DOM.
     */
    var doc = global.document,
        win = global.window,
        gameContainer = document.querySelector('#game'),
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    canvas.width = 505;
    canvas.height = 606;

    gameContainer.appendChild(canvas);

    /* This function serves as the kickoff point for the game loop itself
     * and handles properly calling the update and render methods.
     */
    function main() {
        /* Get our time delta information which is required if your game
         * requires smooth animation. Because everyone's computer processes
         * instructions at different speeds we need a constant value that
         * would be the same for everyone (regardless of how fast their
         * computer is) - hurray time!
         */
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        /* Call our update/render functions, pass along the time delta to
         * our update function since it may be used for smooth animation.
         */
        update(dt);
        render();

        /* Set our lastTime variable which is used to determine the time delta
         * for the next time this function is called.
         */
        lastTime = now;

        /* Use the browser's requestAnimationFrame function to call this
         * function again as soon as the browser is able to draw another frame.
         */
        win.requestAnimationFrame(main);
    }

    /* This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.
     */
    function init() {
        reset();
        lastTime = Date.now();
        main();
    
    }

    /* This function is called by main (our game loop) and itself calls all
     * of the functions which may need to update entity's data. Based on how
     * you implement your collision detection (when two entities occupy the
     * same space, for instance when your character should die), you may find
     * the need to add an additional function call here. For now, we've left
     * it commented out - you may or may not want to implement this
     * functionality this way (you could just implement collision detection
     * on the entities themselves within your app.js file).
     */
    function update(dt) {
        updateEntities(dt);
    }

    /* This is called by the update function and loops through all of the
     * objects within your allEnemies array as defined in app.js and calls
     * their update() methods. It will then call the update function for your
     * player object. These update methods should focus purely on updating
     * the data/properties related to the object. Do your drawing in your
     * render methods.
     */
    function updateEntities(dt) {

        openDoor.update();
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        player.update();
        key.update();
        messageText05.update();
        messageText03.update();
        messageText04.update();
        messageText02.update();

    }

    /* This function initially draws the "game level", it will then call
     * the renderEntities function. Remember, this function is called every
     * game tick (or loop of the game engine) because that's how games work -
     * they are flipbooks creating the illusion of animation but in reality
     * they are just drawing the entire screen over and over.
     */
    function render() {
        /* This array holds the relative URL to the image used
         * for that particular row of the game level.
         */
        var roof ='images/Roof-South-West.png';
        var roof2 = 'images/Roof-South.png';
        var roof3 = 'images/Roof-South-East.png';
        var window = 'images/Window-Tall.png';
        var door0 = 'images/Door-Tall-Closed.png';
        var door1 = 'images/Wood-Block.png';
        var doorOpen = 'images/Door-Tall-Open.png';

                

        var rowImages = [
                'images/Brown-Block.png',   // Top row is block
                'images/Brown-Block.png',   // Top row is block
                'images/stone-block.png',   // Row 1 of 3 of stone
                'images/stone-block.png',   // Row 2 of 3 of stone
                'images/stone-block.png',   // Row 3 of 3 of stone
                'images/Wall-Block.png',   // Row 1 of 2 of dirt block
            //    'images/Wall-Block.png'    // Row 2 of 2 of dirt blocks
            ],
        //    numRows = 6,

            numRows = 6,
            numCols = 5,
            row, col;

        
        // Before drawing, clear existing canvas
        ctx.clearRect(0,0,canvas.width,canvas.height)

        /* Loop through the number of rows and columns we've defined above
         * and, using the rowImages array, draw the correct image for that
         * portion of the "grid"
         */


        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                /* The drawImage function of the canvas' context element
                 * requires 3 parameters: the image to draw, the x coordinate
                 * to start drawing and the y coordinate to start drawing.
                 * We're using our Resources helpers to refer to our images
                 * so that we get the benefits of caching these images, since
                 * we're using them over and over.
                 */


               ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
                ctx.drawImage(Resources.get(window), 101, 50, 101, 83);
                ctx.drawImage(Resources.get(window), 3 * 101, 50, 101, 83);
                ctx.drawImage(Resources.get(door1), 2 * 101, 145, 101, 83);
                ctx.drawImage(Resources.get(door0), 2 * 101, 18, 101, 171);
                ctx.drawImage(Resources.get(roof), 0, 0, 101, 83);
                ctx.drawImage(Resources.get(roof2), 101, 0, 101, 83);
                ctx.drawImage(Resources.get(roof2), 2 * 101, 0, 101, 83);
                ctx.drawImage(Resources.get(roof2), 3 * 101, 0, 101, 83);
                ctx.drawImage(Resources.get(roof3), 4 * 101, 0, 101, 83);

            }
        }

        renderEntities();
    }

    /* This function is called by the render function and is called on each game
     * tick. Its purpose is to then call the render functions you have defined
     * on your enemy and player entities within app.js
     */
    function renderEntities() {
        /* Loop through all of the objects within the allEnemies array and call
         * the render function you have defined.
         */

        if (openDoor.visibility) {
            openDoor.render();
        }

        allEnemies.forEach(function(enemy) {
            enemy.render();
        });

        player.render();

        if (player.hasKey == false) {
            key.render();
        };

        if (messageText05.visibility) {
            messageText05.render();
        };

        if (messageText03.visibility) {
            messageText03.render();
        };

        if (messageText04.visibility) {
            messageText04.render();
        };

        if (messageText02.visibility) {
            messageText02.render();
        };

    }

    /* This function does nothing but it could have been a good place to
     * handle game reset states - maybe a new game menu or a game over screen
     * those sorts of things. It's only called once by the init() method.
     */
    function reset() {

    }

    /* Go ahead and load all of the images we know we're going to need to
     * draw our game level. Then set init as the callback method, so that when
     * all of these images are properly loaded our game will start.
     */
    Resources.load([
        'images/Roof-South-West.png',
        'images/Roof-South.png',
        'images/Roof-South-East.png',
        'images/Window-Tall.png',
        'images/Door-Tall-Closed.png',
        'images/Door-Tall-Open.png',
        'images/Wood-Block.png',
        'images/stone-block.png',
        'images/Brown-Block.png',
        'images/Wall-Block.png',
        'images/Ramp-South.png',
        'images/enemy-bug.png',
        'images/char-horn-girl.png',
        'images/Key.png',
        'images/SpeechBubble01.png',

    ]);
    Resources.onReady(init);

    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developers can use it more easily
     * from within their app.js files.
     */
    global.ctx = ctx;
})(this);


