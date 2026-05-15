document.getElementById('start-btn').addEventListener('click', function() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('game').style.display = 'block';
});

let sprite = document.getElementById('sprite');
let position = 400; // initial left position in pixels

document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
        position -= 10;
        sprite.style.left = position + 'px';
    } else if (e.key === 'ArrowRight') {
        position += 10;
        sprite.style.left = position + 'px';
    }
});
