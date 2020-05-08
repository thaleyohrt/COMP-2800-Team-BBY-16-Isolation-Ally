let positions = [0, 1, 2];
let positionCoords = [window.innerWidth / 5, window.innerWidth / 2, window.innerWidth / 1.25];

function loadPlayerAssets(main) {
    main.load.image('player', 'images/john.jpg');
}

function addPlayer(main) {
    let player;
    player = main.add.sprite((window.innerWidth / 2), (window.innerHeight / 1.1), 'player');
    
    player.setDisplaySize(90, 90).position = 1;
    
    addMovement(main, player);
}

function addMovement(main, player) {
    main.input.keyboard.on('keydown_A', function (event) {
        if (player.position != 0) {
            player.position = positions[(player.position)-1];
            player.x = positionCoords[player.position];
        }
    });
    main.input.keyboard.on('keydown_D', function (event) {
        if (player.position != 2) {
            player.position = positions[(player.position)+1];
            player.x = positionCoords[player.position];
        }
    });
    main.input.keyboard.on('keydown_LEFT', function (event) {
        if (player.position != 0) {
            player.position = positions[(player.position)-1];
            player.x = positionCoords[player.position];
        }
    });
    main.input.keyboard.on('keydown_RIGHT', function (event) {
        if (player.position != 2) {
            player.position = positions[(player.position)+1];
            player.x = positionCoords[player.position];
        }
    });
}
