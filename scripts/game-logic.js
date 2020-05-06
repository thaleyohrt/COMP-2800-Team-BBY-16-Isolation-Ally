var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};


function startGame(){
    document.body.style.backgroundImage = "url('images/Road-Background.png')";
    document.body.style.backgroundSize = "cover";
}