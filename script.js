// Variables globales
let shapes = [];
let randomMode = false;
let colors = [
    '#ff6b6b', '#4ecdc4', '#a8e6cf', '#45b7d1', '#9b59b6',
    '#f7d794', '#f6b93b', '#3498db', '#e84393', '#2ecc71'
];

// Clase para círculos
function Circle(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.speed = {
        x: (Math.random() - 0.5) * 2,
        y: (Math.random() - 0.5) * 2
    };

    // Actualizar la posición
    this.update = function() {
        this.x += this.speed.x;
        this.y += this.speed.y;
        
        // Rebotar en los bordes
        if (this.x < 0 || this.x > width) this.speed.x *= -1;
        if (this.y < 0 || this.y > height) this.speed.y *= -1;
    };

    // Mostrar la forma
    this.display = function() {
        fill(this.color);
        noStroke();
        ellipse(this.x, this.y, this.size, this.size);
    };
}

// Clase para cuadrados
function Square(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.rotation = 0;
    // Velocidad de rotación
    this.speed = {
        x: (Math.random() - 0.5) * 2,
        y: (Math.random() - 0.5) * 2,
        rotation: (Math.random() - 0.5) * 0.1
    };

    // Actualizar la posición
    this.update = function() {
        this.x += this.speed.x;
        this.y += this.speed.y;
        this.rotation += this.speed.rotation;
        
        // Rebotar en los bordes
        if (this.x < 0 || this.x > width) this.speed.x *= -1;
        if (this.y < 0 || this.y > height) this.speed.y *= -1;
    };

    // Mostrar la forma
    this.display = function() {
        push();
        translate(this.x, this.y);
        rotate(this.rotation);
        fill(this.color);
        noStroke();
        rect(-this.size/2, -this.size/2, this.size, this.size);
        pop();
    };
}

// Sketch de Processing.js
var sketchProc = function(processing) {
    processing.setup = function() {
    processing.size(600, 400);
    };

    // Función de dibujo
    processing.draw = function() {
    processing.background(220, 220, 220, 50); // Fondo semi-transparente
        
    // Crear formas aleatorias en Processing.js
    if (randomMode) {
            processing.fill(colors[Math.floor(Math.random() * colors.length)]);
            processing.stroke(0);
            
            // Dibujar líneas aleatorias
            processing.line(
                Math.random() * processing.width,
                Math.random() * processing.height,
                Math.random() * processing.width,
                Math.random() * processing.height
            );
            
            // Dibujar puntos aleatorios
            processing.ellipse(
                Math.random() * processing.width,
                Math.random() * processing.height,
                5, 5
            );
        }
    };
};

// Inicialización de p5.js
function setup() {
    let canvas = createCanvas(600, 400);
    canvas.parent('p5-container');
    background(220);
    
    // Inicializar Processing.js
    const canvasElement = document.getElementById("p5-container").querySelector('canvas');
    new Processing(canvasElement, sketchProc);
    
    // Agregar eventos a los botones
    document.getElementById("start-button").addEventListener("click", startAnimation);
    document.getElementById("clear-button").addEventListener("click", clearCanvas);
    document.getElementById("toggle-mode").addEventListener("click", toggleRandomMode);
}

// Función de dibujo de p5.js
function draw() {
    background(220);
    
    // Dibujar todas las formas
    for (let shape of shapes) {
        shape.update();
        shape.display();
    }
}

// Función para crear formas al hacer clic
function mousePressed() {
    if (!randomMode) {
        // Crear círculo rojo
        shapes.push(new Circle(mouseX, mouseY, 50, '#ff6b6b'));
    } else {
        // Crear forma aleatoria
        const randomShape = Math.random() < 0.5 ? Circle : Square;
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const randomSize = Math.random() * 50 + 30;
        
        // Agregar forma aleatoria al array
        shapes.push(new randomShape(mouseX, mouseY, randomSize, randomColor));
    }
}

// Funciones de control
function startAnimation() {
    alert("¡Animación iniciada!\n\n• Haz clic para crear formas\n• Mueve el mouse para ver los efectos\n• Usa los botones para controlar la animación");
}

// Función para limpiar el canvas
function clearCanvas() {
    shapes = [];
}

// Función para cambiar el modo aleatorio
function toggleRandomMode() {
    randomMode = !randomMode;
    document.getElementById("toggle-mode").textContent = 
        randomMode ? "Modo Normal" : "Modo Aleatorio";
}