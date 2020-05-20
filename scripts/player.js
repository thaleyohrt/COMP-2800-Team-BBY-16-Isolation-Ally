function loadPlayerAssets(main) {
    main.load.spritesheet('player', 'images/player.png', {
        frameWidth: 322,
        framHeight: 420
    });
}

function addPlayer(main) {
    player = main.physics.add.sprite((window.innerWidth / 2), (window.innerHeight / 1.1), 'player');
    animations = main.anims.create({
        key: "player_anim",
        frames: main.anims.generateFrameNumbers('player'),
        frameRate: 3,
        repeat: -1
    });

    player.setDisplaySize(120, 120).position = MIDDLE;

    addMovement(main);

    player.anims.play("player_anim");
}

function pausePlayer() {
    player.anims.pause();
}

function resumePlayer() {
    player.anims.resume();
}

function addMovement(main) {
    let downX; 
    let upX;
    let downY;
    let upY;
    let threshold = 25;

    // Keyboard controls
    main.input.keyboard.on('keydown_LEFT', function (event) {
        moveLeft();
    });
    main.input.keyboard.on('keydown_A', function (event) {
        moveLeft();
    });
    main.input.keyboard.on('keydown_RIGHT', function (event) {
        moveRight();
    });
    main.input.keyboard.on('keydown_D', function (event) {
        moveRight();
    });

    // Swipe controls
    main.input.on('pointerdown', function (pointer) {
        downX = pointer.x;
        downY = pointer.y;
    });
    main.input.on('pointerup', function (pointer) {
        upX = pointer.x;
        upY = pointer.y;
        if (upX < downX - threshold) {
            moveLeft();
        } else if (upX > downX + threshold) {
            moveRight();
        }

        if (upY < downY - threshold) {
            moveUp();
        } else if (upY > downY + threshold) {
            moveDown();
        }


    });

    // Easter egg
    main.input.keyboard.on('keydown_UP', function (event) {
        moveUp();
    });
    main.input.keyboard.on('keydown_W', function (event) {
        moveUp();
    });
    main.input.keyboard.on('keydown_DOWN', function (event) {
        moveDown();
    });
    main.input.keyboard.on('keydown_S', function (event) {
        moveDown();
    });
}

function getLastPressed() {
    return lastPressed;
}

function moveLeft() {
    if (!gameOver && !paused) {
        lastPressed = LEFT;
        moveSFX.play();
        player.setVelocityX(0);
        if (player.position != LEFT) {
            player.setAccelerationX(-9000);
            player.position = positions[(player.position) - 1];
        }
    }
    
    // Easter egg
    if (barrelRoll == 3) {
        barrelRoll++;
    } else {
        barrelRoll = 0;
    }
}

function moveRight() {
    if (!gameOver && !paused) {
        lastPressed = RIGHT;
        moveSFX.play();
        player.setVelocityX(0);
        if (player.position != RIGHT) {
            player.setAccelerationX(9000);
            player.position = positions[(player.position) + 1];
        }
    }

    //Easter egg
    if (barrelRoll == 1) {
        barrelRoll++;
    } else {
        barrelRoll = 0;
    }
}

function moveUp() {
    if (barrelRoll == 0) {
        barrelRoll++;
    } else if (barrelRoll == 4) {
        loadEaster();
    } else {
        barrelRoll = 0;
    }
}

function moveDown() {
    if (barrelRoll == 2) {
        barrelRoll++;
    } else {
        barrelRoll = 0;
    }
}