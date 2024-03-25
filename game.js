const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Ajusta el tamaño del canvas al tamaño de la ventana
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Define el jugador
const player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    width: 40, // Ancho de la hitbox del jugador (en píxeles)
    height: 80, // Altura de la hitbox del jugador (en píxeles)
    speed: 5, // Velocidad de movimiento (en píxeles por fotograma)
    velocityX: 0, // Velocidad horizontal actual del jugador (en píxeles por fotograma)
    velocityY: 0, // Velocidad vertical actual del jugador (en píxeles por fotograma)
    color: '#ff0000', // Color del jugador (cambiable)
    direction: 'down', // Dirección actual del jugador
    sprites: {
        up: [new Image(), new Image(), new Image()],
        down: [new Image(), new Image(), new Image()],
        left: [new Image(), new Image(), new Image()],
        right: [new Image(), new Image(), new Image()]
    },
    spriteIndex: 1, // Índice del sprite actual
    spriteWidth: 80, // Ancho del sprite (en píxeles)
    frameCounter: 1 // Contador de cuadros
};

// Define las rutas de los sprites para cada dirección y cada parte
const spritePaths = {
    up: ['assets/top1.png', 'assets/top2.png', 'assets/top3.png'],
    down: ['assets/down1.png', 'assets/down2.png', 'assets/down3.png'],
    left: ['assets/left1.png', 'assets/left2.png', 'assets/left3.png'],
    right: ['assets/right1.png', 'assets/right2.png', 'assets/right3.png']
};

// Carga los sprites
let loadedImages = 0;
for (let direction in player.sprites) {
    for (let i = 0; i < player.sprites[direction].length; i++) {
        player.sprites[direction][i].onload = () => {
            loadedImages++;
            if (loadedImages === 12) { // Verifica si todas las imágenes están cargadas
                startGame();
            }
        };
        player.sprites[direction][i].src = spritePaths[direction][i];
    }
}

// Función para iniciar el juego después de cargar todas las imágenes
function startGame() {
    // Bucle de animación para actualizar y dibujar el juego
    function gameLoop() {
        update();
        draw();
        requestAnimationFrame(gameLoop);
    }
    
    // Inicia el bucle de animación
    gameLoop();
}

// Dibuja el jugador
function drawPlayer() {
    ctx.drawImage(player.sprites[player.direction][player.spriteIndex], player.x - player.spriteWidth / 2, player.y - player.height / 2, player.spriteWidth, player.height);
}

// Actualiza la posición del jugador en cada cuadro de animación
function update() {
    // Aplica la velocidad actual del jugador a su posición
    player.x += player.velocityX;
    player.y += player.velocityY;

    // Limita la posición del jugador para que no salga del canvas
    player.x = Math.max(player.width / 2, Math.min(canvas.width - player.width / 2, player.x));
    player.y = Math.max(player.height / 2, Math.min(canvas.height - player.height / 2, player.y));

    // Cambia la dirección del jugador según la velocidad
    if (player.velocityX > 0) {
        player.direction = 'right';
    } else if (player.velocityX < 0) {
        player.direction = 'left';
    } else if (player.velocityY > 0) {
        player.direction = 'down';
    } else if (player.velocityY < 0) {
        player.direction = 'up';
    }

    // Actualiza el índice del sprite según la dirección del jugador y el contador de cuadros
    player.frameCounter++;
    if (player.frameCounter >= 10) { // Cambia el número para ajustar la velocidad del cambio de sprites
        player.frameCounter = 0;
        player.spriteIndex = (player.spriteIndex + 1) % 3; // 3 es la cantidad de sprites disponibles para cada dirección
    }
}

// Dibuja el canvas y el jugador
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
}

// Maneja el movimiento del jugador
window.addEventListener('keydown', (event) => {
    switch(event.key) {
        case 'w':
            player.velocityY = -player.speed;
            break;
        case 'a':
            player.velocityX = -player.speed;
            break;
        case 's':
            player.velocityY = player.speed;
            break;
        case 'd':
            player.velocityX = player.speed;
            break;
    }
});

// Restablece la velocidad al soltar la tecla de movimiento
window.addEventListener('keyup', (event) => {
    switch(event.key) {
        case 'w':
        case 's':
            player.velocityY = 0;
            break;
        case 'a':
        case 'd':
            player.velocityX = 0;
            break;
    }
});

// Vuelve a ajustar el tamaño del canvas si la ventana cambia de tamaño
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    draw();
});
