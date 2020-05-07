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

function preload()
{
    this.load.image('road', 'images/Road-Background.png');
}

function create ()
{
    game.scale.resize(window.innerWidth, window.innerHeight);
    this.add.image((window.innerWidth / 2), (window.innerHeight / 2), 'road');
}

function update ()
{

}