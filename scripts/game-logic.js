$("body").css("overflow", "hidden");
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

function preload()
{
    this.load.image('road', 'images/Road-Background.png');
    loadPlayerAssets(this);
}

function create ()
{
    game.scale.resize(w, h);
    this.add.image((w / 2), (h / 2), 'road').setDisplaySize(w, h);
    addPlayer(this);
}

function update ()
{

}