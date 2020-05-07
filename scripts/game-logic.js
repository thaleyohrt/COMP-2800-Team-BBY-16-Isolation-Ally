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
    loadPlayerAssets(this);

}

function create ()
{
    this.anims.create({
        key: 'guy',
        frames: TouchList.anims.generateFrameNumbers('player', {start: 0, end:1 }),
        frameRate:2,
        repeat: -1
    }); 
    this.add.image((window.innerWidth / 2), (window.innerHeight / 2), 'road');
    addPlayer(this);
}

function update ()
{

}