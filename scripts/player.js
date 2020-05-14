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
    main.input.keyboard.on('keydown_A', function (event) {
        lastPressed = 4; // 4 for left
        player.setVelocityX(0);
        if (player.position != LEFT) {
            player.setAccelerationX(-9000);
            player.position = positions[(player.position)-1];
        }
    });
    main.input.keyboard.on('keydown_D', function (event) {
        lastPressed = 6; // 6 for right
        player.setVelocityX(0);
        console.log("lastP: " + lastPressed);
        if (player.position != RIGHT) {
            player.setAccelerationX(9000);
            player.position = positions[(player.position)+1];
        }
    });
    main.input.keyboard.on('keydown_LEFT', function (event) {
        lastPressed = 4; // 4 for left
        player.setVelocityX(0);
        if (player.position != LEFT) {
            player.setAccelerationX(-9000);
            player.position = positions[(player.position)-1];
        }
    });
    main.input.keyboard.on('keydown_RIGHT', function (event) {
        lastPressed = 6; // 6 for right
        player.setVelocityX(0);
        console.log("lastP: " + lastPressed);
        if (player.position != RIGHT) {
            player.setAccelerationX(9000);
            player.position = positions[(player.position)+1];
        }
    });
}

function getPressed() {
    return lastPressed;
}
