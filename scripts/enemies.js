this.time.addEvent({ //create
        delay: 100,
        loop: true,
        callback: addAlien
    });

function addAlien () {
    var alien = group.get(Phaser.Math.Between(250, 800), Phaser.Math.Between(-64, 0));

    if (!alien) return; // None free

    activateAlien(alien);
}

function activateAlien (alien) {
    alien
    .setActive(true)
    .setVisible(true)
    .setTint(Phaser.Display.Color.RandomRGB().color)
    .play('creep');
}