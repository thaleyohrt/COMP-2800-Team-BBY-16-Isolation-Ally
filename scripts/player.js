const LEFT = 0;
const MIDDLE = 1;
const RIGHT = 2;

let positions = [LEFT, MIDDLE, RIGHT];
let positionCoords = [window.innerWidth / 5, window.innerWidth / 2, window.innerWidth / 1.25];
let player;

var lastPressed;

function loadPlayerAssets(main) {
    main.load.image('player', 'images/samplePlayer.png');
}

function addPlayer(main) {
    player = main.physics.add.sprite((window.innerWidth / 2), (window.innerHeight / 1.1), 'player');
    player.setDisplaySize(90, 90).position = 1;
    addMovement(main);
}

function addMovement(main) {
    var downX, upX, threshold = 15;
    
    main.input.keyboard.on('keydown_A', function (event) {
        moveLeft();
    });
    main.input.keyboard.on('keydown_D', function (event) {
        moveRight();
    });
    main.input.keyboard.on('keydown_LEFT', function (event) {
        moveLeft();
    });
    main.input.keyboard.on('keydown_RIGHT', function (event) {
        moveRight();
    });

    main.input.on('pointerdown', function (pointer) {
        downX = pointer.x;
    });
              
    main.input.on('pointerup', function (pointer) {
        upX = pointer.x;
        if (upX < downX - threshold){
            moveLeft();
        } else if (upX > downX + threshold) {
            moveRight();
        }
    });
}

function getLastPressed() {
    return lastPressed;
}

function moveLeft() {
    lastPressed = 4; // 4 for left
    player.setVelocityX(0);
    if (player.position != LEFT) {
        player.setAccelerationX(-9000);
        player.position = positions[(player.position)-1];
    }
}

function moveRight() {
    lastPressed = 6; // 6 for right
    player.setVelocityX(0);
    if (player.position != RIGHT) {
        player.setAccelerationX(9000);
        player.position = positions[(player.position)+1];
    }
}
