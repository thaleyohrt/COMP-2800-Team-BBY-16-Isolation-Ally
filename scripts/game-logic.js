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

//Preloads assets
function preload() {
    this.load.image('road', 'images/Road-Background.png');
    loadPlayerAssets(this);
    loadEnemyAssets(this);
    bgMusic.loop = true;
    bgMusic.play();
    finalScore = 0;
}

//Creates elements and edits those elements
function create() {
    const FONT_SIZE = 40;
    const PAUSE_SIZE = 50;
    const TEXT_Y = 50;
    const PAUSE_X = 30;
    const TEXT_WIDTH = 150;
    let textX = (w - TEXT_WIDTH) / 2;

    game.scale.resize(w, h);
    back[0] = this.add.image((w / 2), (h / 2), 'road').setDisplaySize(w, h + 10);
    back[1] = this.add.image((w / 2), -(h / 2), 'road').setDisplaySize(w, h + 10);
    addPlayer(this);
    this.pauseBtn = this.add.text(PAUSE_X, TEXT_Y, "", {
        fontSize: PAUSE_SIZE + "px",
        color: "yellow",
    });
    pointer = game.input.activePointer;
    this.pauseBtn.setInteractive().on('pointerdown', function () {
        pauseChange();
    });
    scoreText = this.add.text(textX, TEXT_Y, "", {
        fontSize: FONT_SIZE + 'px',
    });
}

//updates every set amount of frames
function update() {
    const PLAY_UNICODE = "\u25B6";
    const PAUSE_UNICODE = "\u275A\u275A";
    const PLAYER_SPEED = 2000;
    let button1 = document.getElementById("resume-button");
    let button2 = document.getElementById("menu-button");

    if (!checked) {
        if (!paused) {
            scoreValue++;
            scoreText.setText((scoreValue / 10).toFixed(1) + "ft");
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
            player.setMaxVelocity(PLAYER_SPEED);

            button1.style.display = "none";
            button2.style.display = "none";

            resumePlayer();
            resumeEnemy();
        } else {
            this.pauseBtn.setText(PLAY_UNICODE);
            pausePlayer();
            pauseEnemy();

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

//Pause button function
function pauseChange() {
    paused = !paused;
    if (paused) {
        bgMusic.pause();
    } else {
        bgMusic.play();
    }
}

//Checks if the user beat their previous highscore
function highScore() {
    localStorage.setItem("score", (scoreValue / 10))
    checked = true;
    firebase.auth().onAuthStateChanged(async user => {
        if (user) {
            let snapshot = await db.collection("users").doc(user.uid).get();
            if (parseInt(localStorage.getItem("score")) > snapshot.data().score) {
                db.collection("users").doc(user.uid).update({
                    score: parseInt(localStorage.getItem("score"))
                }).then(function () {
                    setTimeout(function () {
                        loadGameOver();
                    }, 300);
                })
            } else {
                setTimeout(function () {
                    loadGameOver();
                }, 300);
            }
        }
    });
}

//Runs onload of the game-over screen to place the current score
function current() {
    document.getElementById("score").innerText = "Score: " + localStorage.getItem("score") + "ft";
    let c = document.getElementById("tweet");
    c.innerText = "Tweet";
    c.href = "https://twitter.com/intent/tweet?text=I%20just%20got%20" + localStorage.getItem("score") + "ft,%20on%20isolation-ally.site";
}