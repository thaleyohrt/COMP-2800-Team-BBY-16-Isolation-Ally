const FPS = 60;
const WIDTH = 800;
const HEIGHT = 600;
const FONT_SIZE = 40;
const TEXT_WIDTH = 300;
const TEXT_Y = 50;

let w = window.innerWidth; // width
let h = window.innerHeight; // height
let textX = (w - TEXT_WIDTH) / 2;
let num = 0;
let score;

$("body").css("overflow", "hidden");
let back = [];
let config = {
    type: Phaser.AUTO,
    width: WIDTH,
    height: HEIGHT,
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
let speed = 5; //game speed

function preload() {
    this.load.image('road', 'images/Road-Background.png');
    loadPlayerAssets(this);
    loadEnemyAssets(this);
}

function create() {

    game.scale.resize(w, h);
    back[0] = this.add.image((w / 2), (h / 2), 'road').setDisplaySize(w, h + 3);
    back[1] = this.add.image((w / 2), -(h / 2), 'road').setDisplaySize(w, h + 3);
    addPlayer(this);
    score = this.add.text(textX, TEXT_Y, "Score: ", {
        fontSize: FONT_SIZE + 'px'
    });
}

function update() {
    num++;
    score.setText("Score: " + (num / 10).toFixed(1) + "ft");
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
}
