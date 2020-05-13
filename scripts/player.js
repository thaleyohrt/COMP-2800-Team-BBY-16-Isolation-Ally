let positions = [0, 1, 2];
let positionCoords = [window.innerWidth / 5, window.innerWidth / 2, window.innerWidth / 1.25];

function loadPlayerAssets(main) {
    main.load.spritesheet('player', 'images/sampleCharacterSpritesCut.png', {
        frameWidth: 32,
        framHeight: 49
    });
}

function addPlayer(main) {
    let player;
    player = main.add.sprite((window.innerWidth / 2), (window.innerHeight / 1.1), 'player');
    main.anims.create({ 
        key: "player_anim",
        frames: main.anims.generateFrameNumbers('player'),
        frameRate: 3,
        repeat: -1
    });

    player.setDisplaySize(90, 90).position = 1;
    
    addMovement(main, player);

    player.anims.play("player_anim");
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
