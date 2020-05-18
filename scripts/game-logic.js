let config = {
    type: Phaser.AUTO,
    width: WIDTH,
    height: HEIGHT,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 0
            },
            debug: false
        }
    },
    fps: {
        target: FPS,
        forceSetTimeOut: true
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
let game = new Phaser.Game(config);

$("body").css("overflow", "hidden");

function preload() {
    this.load.image('road', 'images/Road-Background.png');
    loadPlayerAssets(this);
    loadEnemyAssets(this);
    bgMusic.play();
    finalScore = 0;
}

function create() {
    const FONT_SIZE = 40;
    const PAUSE_SIZE = 50;
    const TEXT_Y = 50;
    const PAUSE_X = 30;
    const TEXT_WIDTH = 300;
    let textX = (w - TEXT_WIDTH) / 2;

    game.scale.resize(w, h);
    back[0] = this.add.image((w / 2), (h / 2), 'road').setDisplaySize(w, h + 10);
    back[1] = this.add.image((w / 2), -(h / 2), 'road').setDisplaySize(w, h + 10);
    addPlayer(this);
    this.pauseBtn = this.add.text(PAUSE_X, TEXT_Y, "", {
        fontSize: PAUSE_SIZE + "px",
        color: "yellow"
    });
    pointer = game.input.activePointer;
    this.pauseBtn.setInteractive().on('pointerdown', function () {
        pauseChange();
    });
    scoreText = this.add.text(textX, TEXT_Y, "Score: ", {
        fontSize: FONT_SIZE + 'px'
    });
}

function update() {
    const PLAY_UNICODE = "\u25B6";
    const PAUSE_UNICODE = "\u275A\u275A";
    let button1 = document.getElementById("resume-button");
    let button2 = document.getElementById("menu-button");

    if (!checked) {
        if (!paused) {
            scoreValue++;
            scoreText.setText("Score: " + (scoreValue / 10).toFixed(1) + "ft");
            this.pauseBtn.setText(PAUSE_UNICODE);
            back[1].y += speed;
            back[0].y += speed;

            if (back[0].y >= h * 1.5) {
                back[0].y = -(h / 2);
            }
            if (back[1].y >= h * 1.5) {
                back[1].y = -(h / 2);
            }
            spawnEnemies(this);
            moveEnemies(enemyObjects);
            checkCollision(enemyObjects);
            player.setMaxVelocity(500 + (scoreValue / 1)); //maximum speed at which the player changes lanes. Increases at the game progresses.

            button1.style.display = "none";
            button2.style.display = "none";

            resumePlayer();
        } else {
            this.pauseBtn.setText(PLAY_UNICODE);
            pausePlayer();

            button1.style.display = "block";
            button2.style.display = "block";
        }

        if (player.x <= positionCoords[player.position]) {
            if (getLastPressed() == LEFT) {
                player.setAccelerationX(0);
                player.setVelocityX(0);
                player.x = positionCoords[player.position];
            }
        }

        if (player.x >= positionCoords[player.position]) {
            if (getLastPressed() == RIGHT) {
                player.setAccelerationX(0);
                player.setVelocityX(0);
                player.x = positionCoords[player.position];
            }
        }
    }
}

function pauseChange() {
    paused = !paused;
}

function highScore() {
    checked = true;
    firebase.auth().onAuthStateChanged(async user => {
        if (user) {
            let snapshot = await db.collection("users").doc(user.uid).get();
            if ((scoreValue / 10) > snapshot.data().score) {
                db.collection("users").doc(user.uid).update({
                    score: (scoreValue / 10)
                }).then(function () {
                    setTimeout(function () {
                        loadGameOver();
                    }, 300)
                });
            } else {
                setTimeout(function () {
                    loadGameOver();
                }, 300)
            }
        }
    });
}