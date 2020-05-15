// Game setup
const FPS = 60;
const WIDTH = 800;
const HEIGHT = 600;
let back = [];
let w = window.innerWidth; // width
let h = window.innerHeight; // height
let speed = 5; // game speed
let scoreValue = 0;
let paused = false;
let scoreText;
let pauseBtn;

// Player and enemy lanes
const LEFT = 0;
const MIDDLE = 1;
const RIGHT = 2;

// Player
let player;
let positions = [LEFT, MIDDLE, RIGHT];
let positionCoords = [window.innerWidth / 5, window.innerWidth / 2, window.innerWidth / 1.25];
let lastPressed;

// Enemies
let originalDelay = 1500;
let delay = originalDelay;
let enemyObjects = [];
let enemies;
let enemy = {
    position: 0,
};
let enemyToSpawn;
let nextSpawn; //next spawn time