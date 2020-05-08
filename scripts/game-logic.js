$("body").css("overflow", "hidden");
let back = [];
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

var w = window.innerWidth ; //width
var h = window.innerHeight; //height
var speed = 5; //game speed

function preload()
{
    this.load.image('road', 'images/Road-Background.png');
    loadPlayerAssets(this);
}

function create ()
{
    game.scale.resize(w, h);
    back[0] = this.add.image((w / 2), (h / 2), 'road').setDisplaySize(w, h + 3);
    back[1] = this.add.image((w / 2), -(h / 2), 'road').setDisplaySize(w, h + 3);
    addPlayer(this);
}

function update ()
{
    back[1].y += speed;
    back[0].y += speed;
    if (back[0].y >= h * 1.5){
        back[0].y = -(h / 2);
    }
    if (back[1].y >= h * 1.5){
        back[1].y = -(h / 2);
    }
}
