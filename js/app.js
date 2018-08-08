class Point {
    constructor(sprite, x, y, w, h) {
        this.sprite = sprite;
        this.x = x || 0;
        this.y = y || 0;
        this.w = w || 171;
        this.h = h || 101;
    }
    update(dt) {

    }
    render() {

        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

class Enemy extends Point {
    constructor(sprite, x, y, w, h) {
        super(x, y, w, h);
        this.sprite = sprite || 'images/enemy-bug.png';
    }
}

let enemy = new Enemy();
var allEnemies = [new Enemy(), new Enemy() , new Enemy()];


class Player extends Point {
    constructor(sprite, x, y, w, h) {
        super(x, y, w, h)
        this.sprite = sprite || 'images/char-boy.png';
    }
}

let player = new Player();











// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
