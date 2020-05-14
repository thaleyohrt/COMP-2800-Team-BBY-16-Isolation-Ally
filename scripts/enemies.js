const DELAY = 1000;
let enemies;
let enemy;
let enemyToSpawn;
let nextSpawn; //next spawn time
let enemyObjects = [];

function loadEnemyAssets(main) {
    main.load.image('enemy1', 'images/testEnemy1.png');
    main.load.image('enemy2', 'images/testEnemy2.png');
    enemies = ['enemy1', 'enemy2'];
    nextSpawn = main.time.now+DELAY;
}

function spawnEnemies (main) {
    
    let chance = Phaser.Math.Between(0, 100);
    if (chance >= 90) {
        enemyToSpawn = enemies[0];
    } else {
        enemyToSpawn = enemies[1];
    }

    if (main.time.now >= nextSpawn) {
        spawnEnemy(main);
    }
    
}

function spawnEnemy(main) {
    let position = Phaser.Math.Between(0, 2); //choses one of the tree lanes
    enemy = main.add.sprite(positionCoords[position], -100, enemyToSpawn); //spawns enemy at the chosen lane
    enemy.setDisplaySize(90, 90);
    nextSpawn = main.time.now+DELAY; //updates when the next spawn should be
    
    enemyObjects.push(enemy);
//    console.log(enemyObjects);
}

function moveEnemies(allEnemies) {
    allEnemies.forEach(function(enemy){
        if (enemy.y > window.innerHeight+100) {
            enemy.destroy;
        } else {
            enemy.y += speed;
        }
    })
}


