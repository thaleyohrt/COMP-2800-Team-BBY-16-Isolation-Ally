function loadEnemyAssets(main) {
    main.load.image('enemy1', 'images/enemy1still.png');
    main.load.image('enemy2', 'images/enemy2still.png');
    main.load.image('enemy3', 'images/enemy3still.png');
    main.load.image('enemy4', 'images/enemy4still.png');
    main.load.image('enemy5', 'images/enemy5still.png');
    enemies = ['enemy1', 'enemy2', 'enemy3', 'enemy4', 'enemy5'];
    nextSpawn = main.time.now + delay;
}

function spawnEnemies(main) {
    let chance = Phaser.Math.Between(0, 4);
    enemyToSpawn = enemies[chance];
    if (main.time.now >= nextSpawn) {
        spawnEnemy(main);
    }
}

function spawnEnemy(main) {
    let lane = Phaser.Math.Between(0, 2); //choses one of the tree lanes
    enemy = main.add.sprite(positionCoords[lane], -100, enemyToSpawn); //spawns enemy at the chosen lane
    enemy.setDisplaySize(110, 110);
    nextSpawn = main.time.now + delay; //updates when the next spawn should be
    updateDelay();
    enemy.position = lane;
    enemyObjects.push(enemy);
}

function moveEnemies(allEnemies) {
    allEnemies.forEach(function (enemy) {
        if (enemy.y > window.innerHeight + 100) {
            enemy.destroy;
        } else {
            enemy.y += speed;
        }
    })
}

function checkCollision(allEnemies) {
    allEnemies.forEach(function (enemy) {
        if ((enemy.y > (window.innerHeight / 1.1) - 90 && enemy.y < (window.innerHeight / 1.1) + 45) &&
            (((enemy.x >= window.innerWidth / 5 - 45 && player.x >= window.innerWidth / 5 - 45) &&
                    (enemy.x <= window.innerWidth / 5 + 45 && player.x <= window.innerWidth / 5 + 45)) ||
                ((enemy.x >= window.innerWidth / 2 - 45 && player.x >= window.innerWidth / 2 - 45) &&
                    (enemy.x <= window.innerWidth / 2 + 45 && player.x <= window.innerWidth / 2 + 45)) ||
                ((enemy.x >= window.innerWidth / 1.25 - 45 && player.x >= window.innerWidth / 1.25 - 45) &&
                    (enemy.x <= window.innerWidth / 1.25 + 45 && player.x <= window.innerWidth / 1.25 + 45)))) {
            gameOver = true;
            bgMusic.pause();
            collisionSFX.play();
            highScore();
        }
    })
}

function updateDelay() {
    let del = 15;
    speed += 0.05;
    delay -= delay / 100 - 3;
    del = Math.log(1.1);
}