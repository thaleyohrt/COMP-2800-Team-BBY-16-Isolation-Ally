function loadEnemyAssets(main) {

    main.load.image('bonus1', 'images/hand-sanitizer.png')

    main.load.spritesheet('enemy1', 'images/enemy1.png', {
        frameWidth: 323,
        framHeight: 422
    });
    main.load.spritesheet('enemy2', 'images/enemy2.png', {
        frameWidth: 32,
        framHeight: 49
    });
    main.load.spritesheet('enemy3', 'images/enemy3.png', {
        frameWidth: 32,
        framHeight: 49
    });
    main.load.spritesheet('enemy4', 'images/enemy4.png', {
        frameWidth: 32,
        framHeight: 49
    });
    main.load.spritesheet('enemy5', 'images/enemy5.png', {
        frameWidth: 32,
        framHeight: 49
    });
    enemies = ['enemy1', 'enemy2', 'enemy3', 'enemy4', 'enemy5', 'bonus1'];
    nextSpawn = main.time.now + delay;
}

function spawnEnemies(main) {
    let chance = Phaser.Math.Between(0, NUM_OF_ENEMIES + NUM_OF_BONUSES - 1);
    enemyToSpawn = enemies[chance];
    if (main.time.now >= nextSpawn) {
        spawnEnemy(main, chance);
    }
}

function spawnEnemy(main, chance) {
    let lane = Phaser.Math.Between(0, 2); //choses one of the tree lanes
    enemy = main.add.sprite(positionCoords[lane], -100, enemyToSpawn); //spawns enemy at the chosen lane
    if (chance >= NUM_OF_ENEMIES) {
        enemy.bonus = true;
    } else {
        enemy.bonus = false;
    }
    enemy.setDisplaySize(110, 110);
    nextSpawn = main.time.now + delay; //updates when the next spawn should be
    updateDelay();
    enemy.position = lane;
    switch (chance) {
        case 0:
            animations = main.anims.create({
                key: "enemy_anim1",
                frames: main.anims.generateFrameNumbers('enemy1'),
                frameRate: 3,
                repeat: -1
            });
            enemy.anims.play("enemy_anim1");
            break;
        case 1:
            animations = main.anims.create({
                key: "enemy_anim2",
                frames: main.anims.generateFrameNumbers('enemy2'),
                frameRate: 3,
                repeat: -1
            });
            enemy.anims.play("enemy_anim2");
            break;
        case 2:
            animations = main.anims.create({
                key: "enemy_anim3",
                frames: main.anims.generateFrameNumbers('enemy3'),
                frameRate: 3,
                repeat: -1
            });
            enemy.anims.play("enemy_anim3");
            break;
        case 3:
            animations = main.anims.create({
                key: "enemy_anim4",
                frames: main.anims.generateFrameNumbers('enemy4'),
                frameRate: 3,
                repeat: -1
            });
            enemy.anims.play("enemy_anim4");
            break;
        case 4:
            animations = main.anims.create({
                key: "enemy_anim5",
                frames: main.anims.generateFrameNumbers('enemy5'),
                frameRate: 3,
                repeat: -1
            });
            enemy.anims.play("enemy_anim5");
            break;
        default:
            break;
    }
    enemyObjects.push(enemy);
}

function pauseEnemy() {
    animations.pause();
}

function resumeEnemy() {
    animations.resume();
}

function moveEnemies(allEnemies) {
    allEnemies.forEach(function (enemy) {
        if (enemy.y > window.innerHeight + 100) {
            enemy.destroy;
        } else if (!enemy.bonus) {
            enemy.y += enemySpeed;
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
            if (enemy.bonus == false) {
                gameOver = true;
                bgMusic.pause();
                collisionSFX.play();
                highScore();
            } else {
                enemy.visible = false;
                bonusSFX.play();
                scoreValue += 20;
            }
        }
    })
}

function updateDelay() {
    let del = 15;
    speed += 0.05;
    enemySpeed += 0.06;
    delay -= delay / 100 - 3;
    del = Math.log(1.1);
}