// Game setup
const FPS = 60;
const WIDTH = 800;
const HEIGHT = 600;
let back = [];
let w = window.innerWidth; // width
let h = window.innerHeight; // height
let speed = 5; // game speed
let paused = false;
let gameOver = false;
let pauseBtn;
let scoreValue = 0;
let scoreText;
let checked = false; // High score database check
let bgMusic = new Audio("audio/bg-music.mp3");

// Player and enemy lanes
const LEFT = 0;
const MIDDLE = 1;
const RIGHT = 2;

// Player
let player;
let positions = [LEFT, MIDDLE, RIGHT];
let positionCoords = [window.innerWidth / 5, window.innerWidth / 2, window.innerWidth / 1.25];
let lastPressed;
let moveSFX = new Audio("audio/move.wav");

// Enemies
const initialDelay = 1500;
let delay = initialDelay;
let enemyObjects = [];
let enemies;
let enemy = {
    position: 0,
};
let enemyToSpawn;
let nextSpawn; //next spawn time
let collisionSFX = new Audio("audio/collision.mp3");