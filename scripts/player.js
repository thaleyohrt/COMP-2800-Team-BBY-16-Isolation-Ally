const LEFT = 0;
const MIDDLE = 1;
const RIGHT = 2;

let positions = [LEFT, MIDDLE, RIGHT];
let positionCoords = [window.innerWidth / 5, window.innerWidth / 2, window.innerWidth / 1.25];
let player;

var lastPressed;

function loadPlayerAssets(main) {
    main.load.spritesheet('player', 'images/sampleCharacterSpritesCut3.png', {
        frameWidth: 32,
        framHeight: 49
    });
}

function addPlayer(main) {
    player = main.physics.add.sprite((window.innerWidth / 2), (window.innerHeight / 1.1), 'player');
    main.anims.create({ 
        key: "player_anim",
        frames: main.anims.generateFrameNumbers('player'),
        frameRate: 3,
        repeat: -1
    });

    player.setDisplaySize(120, 120).position = MIDDLE;
    
    addMovement(main);

    player.anims.play("player_anim");
}

function addMovement(main) {
    var downX, upX, threshold = 15;
    let barrelRoll = 0;
    
    main.input.keyboard.on('keydown_A', function (event) {
        moveLeft();
    });
    main.input.keyboard.on('keydown_D', function (event) {
        moveRight();
    });
    main.input.keyboard.on('keydown_LEFT', function (event) {
        if (barrelRoll == 3) {
            barrelRoll++;
        } else {
            barrelRoll = 0;
        }
        moveLeft();
    });
    main.input.keyboard.on('keydown_RIGHT', function (event) {
        if (barrelRoll == 1) {
            barrelRoll++;
        } else {
            barrelRoll = 0;
        }
        moveRight();
    });
    main.input.keyboard.on('keydown_UP', function(event) {
        if (barrelRoll == 0) {
            barrelRoll++;
        } else if (barrelRoll == 4) {
            loadEaster();
        } else {
            barrelRoll = 0;
        }
    });
    main.input.keyboard.on('keydown_DOWN', function(event) {
        if (barrelRoll == 2) {
            barrelRoll++;
        } else {
            barrelRoll = 0;
        }
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
