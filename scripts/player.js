const LEFT = 0;
const MIDDLE = 1;
const RIGHT = 2;

let positions = [LEFT, MIDDLE, RIGHT];
let positionCoords = [window.innerWidth / 5, window.innerWidth / 2, window.innerWidth / 1.25];
let player;

function loadPlayerAssets(main) {
    main.load.image('player', 'images/samplePlayer.png');
}

function addPlayer(main) {
    player = main.add.sprite((window.innerWidth / 2), (window.innerHeight / 1.1), 'player');
    player.setDisplaySize(90, 90).position = MIDDLE;
    addMovement(main);
}

function addMovement(main) {
    let barrelRoll = 0;
    main.input.keyboard.on('keydown_A', function (event) {
        if (player.position != LEFT) {
            player.position = positions[(player.position)-1];
            player.x = positionCoords[player.position];
        }
    });
    main.input.keyboard.on('keydown_D', function (event) {
        if (player.position != RIGHT) {
            player.position = positions[(player.position)+1];
            player.x = positionCoords[player.position];
        }
    });
    main.input.keyboard.on('keydown_LEFT', function (event) {
        if (player.position != LEFT) {
            player.position = positions[(player.position)-1];
            player.x = positionCoords[player.position];
        }
        if (barrelRoll == 3) {
            barrelRoll++;
        } else {
            barrelRoll = 0;
        }
    });
    main.input.keyboard.on('keydown_RIGHT', function (event) {
        if (player.position != RIGHT) {
            player.position = positions[(player.position)+1];
            player.x = positionCoords[player.position];
        }
        if (barrelRoll == 1) {
            barrelRoll++;
        } else {
            barrelRoll = 0;
        }
    });
    
    main.input.keyboard.on('keydown_UP', function(event) {
        if (barrelRoll == 0) {
            barrelRoll++;
        } else if (barrelRoll == 4) {
            loadEaster();
        } else {
            barrelRoll = 0;
        }
    })
    main.input.keyboard.on('keydown_DOWN', function(event) {
        if (barrelRoll == 2) {
            barrelRoll++;
        } else {
            barrelRoll = 0;
        }
    })

}
