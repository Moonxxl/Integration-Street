const player = document.getElementById("player");
const world = document.getElementById("world");
const bg = document.getElementById("background");

let x = 200;
let speed = 10;
let keys = {};
let frame = 0;
let facingLeft = false;
let gameRunning = false;

const walkingFrames = [
    "walk1.png",
    "walk2.png",
    "walk3.png",
    "walk4.png"
];

const locations = {
    1: { type: 'image', bg: 'pizzeria.png', text: '', objectPosition: 'center' },
    2: { type: 'image', bg: 'yogastudio.png', text: '', objectPosition: '0% 50%' },
    3: { type: 'image', bg: 'laundry.png', text: '', objectPosition: '50% 50%' }
};

let bgWidth = 0;

// get ACTUAL rendered background width
bg.onload = () => {
    bgWidth = bg.getBoundingClientRect().width;
};

document.addEventListener("keydown", e => {
    keys[e.key] = true;
});

document.addEventListener("keyup", e => {
    keys[e.key] = false;
});

function clampCamera(val) {
    const min = window.innerWidth - bgWidth;
    const max = 0;

    return Math.max(min, Math.min(max, val));
}

function update() {

    if (!gameRunning) return;

    let moving = false;

    // keep width updated
    bgWidth = bg.getBoundingClientRect().width;

    // movement
    if (keys["ArrowRight"] || keys["d"]) {
        x += speed;
        moving = true;
        facingLeft = false;
    }

    if (keys["ArrowLeft"] || keys["a"]) {
        x -= speed;
        moving = true;
        facingLeft = true;
    }

    // stop player at edges
    x = Math.max(0, Math.min(bgWidth - 120, x));

    // camera follow
    let camX = -x + window.innerWidth / 2 - 60;
    world.style.left = clampCamera(camX) + "px";

    // walking animation
    if (moving) {
        frame += 0.2;

        let index = Math.floor(frame) % 4;
        player.src = walkingFrames[index];
    } else {
        player.src = "walk1.png";
        frame = 0;
    }

    // move player
    player.style.left = x + "px";

    // flip sprite
    if (facingLeft) {
        player.classList.add("facing-left");
    } else {
        player.classList.remove("facing-left");
    }

    requestAnimationFrame(update);
}

// Add event listener for start button
document.getElementById('start-btn').addEventListener('click', function() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    gameRunning = true;
    update(); // Start the game loop
});

// Add event listener for back button
document.getElementById('back-btn').addEventListener('click', function() {
    if (currentLocation) {
        exitLocation();
    } else {
        gameRunning = false;
        document.getElementById('game').style.display = 'none';
        document.getElementById('start-screen').style.display = 'flex';
    }
});

// Add event listeners for enter buttons
document.querySelectorAll('.enter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const id = btn.id.split('-')[1];
        enterLocation(id);
    });
});

function enterLocation(id) {
    currentLocation = id;
    const loc = locations[id];
    bg.src = loc.bg;
    bg.style.backgroundColor = '';
    bg.style.objectPosition = loc.objectPosition;
    bg.style.objectFit = loc.objectFit || 'cover';
    world.style.left = '0px'; // Reset camera position
    bg.onload = () => {
        bgWidth = bg.getBoundingClientRect().width;
    };
    x = 200;
    document.querySelectorAll('.enter-btn').forEach(btn => btn.style.display = 'none');
    document.getElementById('location-text').style.display = 'none';
    player.style.display = 'none';
    gameRunning = false;
}

function exitLocation() {
    bg.src = 'background.png';
    bg.style.backgroundColor = '';
    x = 200;
    currentLocation = null;
    document.querySelectorAll('.enter-btn').forEach(btn => btn.style.display = 'block');
    document.getElementById('location-text').style.display = 'none';
    player.style.display = 'block';
    gameRunning = true;
    update();
    // Update bgWidth after load
    bg.onload = () => {
        bgWidth = bg.getBoundingClientRect().width;
    };
}
