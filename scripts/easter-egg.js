// Plays sound effect, then loads the main menu after a few seconds.
let barrelRollSFX = new Audio("audio/barrel-roll.mp3");
barrelRollSFX.play();
setTimeout(loadMain, 4000);