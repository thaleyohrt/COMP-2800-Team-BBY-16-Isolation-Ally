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

// Game interface
const FONT_SIZE = 40;
const PAUSE_SIZE = 50;
const TEXT_WIDTH = 300;
const TEXT_Y = 50;
const PAUSE_X = 30;
const PLAY_UNICODE = "\u25B6";
const PAUSE_UNICODE = "\u275A\u275A";
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
const DELAY = 1000;
let enemyObjects = [];
let enemies;
let enemy = {
    position: 0,
};
let enemyToSpawn;
let nextSpawn; //next spawn time