const FPS = 60;
const WIDTH = 800;
const HEIGHT = 600;
const FONT_SIZE = 40;
const PAUSE_SIZE = 50;
const TEXT_WIDTH = 300;
const TEXT_Y = 50;
const PAUSE_X = 30;
const PLAY_UNICODE = "\u25B6";
const PAUSE_UNICODE = "\u275A\u275A";

let w = window.innerWidth; // width
let h = window.innerHeight; // height
let textX = (w - TEXT_WIDTH) / 2;
let speed = 5; // game speed
let scoreValue = 0;
let scoreText;
let pauseBtn;
let paused = false;

$("body").css("overflow", "hidden");
let back = [];
let config = {
    type: Phaser.AUTO,
    width: WIDTH,
    height: HEIGHT,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
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

function preload() {
    this.load.image('road', 'images/Road-Background.png');
    loadPlayerAssets(this);
    loadEnemyAssets(this);
}

function create() {
    game.scale.resize(w, h);
    back[0] = this.add.image((w / 2), (h / 2), 'road').setDisplaySize(w, h + 10);
    back[1] = this.add.image((w / 2), -(h / 2), 'road').setDisplaySize(w, h + 10);
    addPlayer(this);
    this.pauseBtn = this.add.text(PAUSE_X, TEXT_Y, PAUSE_UNICODE, {
        fontSize: PAUSE_SIZE + "px",
        color: "yellow"
    });
    pointer = game.input.activePointer;
    this.pauseBtn.setInteractive().on('pointerdown', function(){
        paused = !paused;
    });
    scoreText = this.add.text(textX, TEXT_Y, "Score: ", {
        fontSize: FONT_SIZE + 'px'
    });
}

var button1 = document.getElementById("resume-button");
var button2 = document.getElementById("menu-button");

function update() {
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
        player.setMaxVelocity(500 + (scoreValue/1)); //maximum speed at which the player changes lanes. Increases at the game progresses.

        button1.style.display = "none";
        button2.style.display = "none";
    } else {
        this.pauseBtn.setText(PLAY_UNICODE);
        
        button1.style.display = "block";
        button2.style.display = "block";
    }
    
    
    var lastPressed;
    if (player.x <= positionCoords[player.position]) {
        if (getLastPressed() == 4) {
            player.setAccelerationX(0);
            player.setVelocityX(0);
            player.x = positionCoords[player.position];
        }      
    }
    
    if (player.x >= positionCoords[player.position]) {
        if (getLastPressed() == 6) {
            player.setAccelerationX(0);
            player.setVelocityX(0);
            player.x = positionCoords[player.position];
        }
    }
    
}

function pauseChange(){
    paused = !paused;
}
