function setup() 
{
	canvas = createCanvas(window.innerWidth, window.innerHeight, WEBGL);
    canvas.parent("canvas");

    //chunk = new Chunk(0,0);

    suelo = new Terrain(2);
    camera = new Camera();
    //noCursor();

    windowResized();
}

function preload() {
    modelo = loadModel('./assets/caballo.obj', true);
}

function draw() {
    background(127,205,255);
    frameRate(24);
    ambientLight(128);
    noStroke();

    camera.update();

    // Apply transformations based on camera angles and position
    //translate(width / 2, height / 2);
    rotateX(camera.angleX);
    rotateY(camera.angleY);
    translate(-camera.position.x, -camera.position.y, -camera.position.z);
    push();
    translate(camera.position.x, camera.position.y, camera.position.z);
    sphere(40);
    pop();
    suelo.dibujar(camera.position.x, camera.position.z, modelo);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }