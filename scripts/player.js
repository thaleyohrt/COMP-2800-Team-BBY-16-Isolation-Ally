function loadPlayerAssets(main) {
    main.load.image('player', 'images/john.jpg');
}

function addPlayer(main) {
    var player;
    player = main.add.sprite((window.innerWidth / 2), (window.innerHeight / 1.1), 'player');
    
    player.setOrigin(0.5, 0.5).setDisplaySize(90, 90).setCollideWorldBounds(true).setDrag(500, 500);
    
    addMovement(main, player);
}

function addMovement(main, player) {
    main.input.keyboard.on('keydown_W', function (event) {
        player.setAccelerationY(-800);
    });
    main.input.keyboard.on('keydown_S', function (event) {
        player.setAccelerationY(800);
    });
    main.input.keyboard.on('keydown_A', function (event) {
        player.setAccelerationX(-800);
    });
    main.input.keyboard.on('keydown_D', function (event) {
        player.setAccelerationX(800);
    });
}