let num = 0;

$("body").css("overflow", "hidden");
let back = [];
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    fps: {
        target: 60,
        forceSetTimeOut: true
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

var w = window.innerWidth; //width
var h = window.innerHeight; //height

function preload() {

    this.load.image('road', 'images/Road-Background.png');
    loadPlayerAssets(this);

}

function create() {
    game.scale.resize(w, h);
    back[0] = this.add.image((w / 2), (h / 2), 'road').setDisplaySize(w, h + 3);
    back[1] = this.add.image((w / 2), -(h / 2), 'road').setDisplaySize(w, h + 3);
    addPlayer(this);
    score = this.add.text(200, 50, "Score: ", {
        fontSize: '48px'
    });
}

function update() {
    num++;
    score.setText("Score: " + num);
    back[1].y += 5;
    back[0].y += 5;
    if (back[0].y >= h * 1.5) {
        back[0].y = -(h / 2);
    }
    if (back[1].y >= h * 1.5) {
        back[1].y = -(h / 2);
    }
}
