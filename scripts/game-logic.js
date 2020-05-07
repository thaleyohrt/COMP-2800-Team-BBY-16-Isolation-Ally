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
    this.load.spritesheet('player', "images/sampleCharacterSpritesCut.png", {frameWidth:32, frameHeight:49})
}

function create ()
{
    this.anims.create({
        key: 'guy',
        frames: TouchList.anims.generateFrameNumbers('player', {start: 0, end:1 }),
        frameRate:2,
        repeat: -1
    }); 
    game.scale.resize(window.innerWidth, window.innerHeight);
    player = this.physics.add.sprite(600, 800, 'player');
    

    player.setOrigin(0.5, 0.5).setDisplaySize(132, 120).setCollideWorldBounds(true).setDrag(500, 500);
}

function update ()
{

}