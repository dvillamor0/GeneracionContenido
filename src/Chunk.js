class Chunk{
    constructor(i,j){
        this.escala = 0.01;
        this.influencia = 100;

        this.xMin = i * 16;
        this.xMax = ((i + 1) * 16) ;

        this.yMin = j * 16;
        this.yMax = ((j + 1) * 16) ;

        this.terrain = this.perling();

        console.log("chunk generado:",i,j);

        this.arbol = Math.random() > 0.9;

        if (this.arbol) {
            this.lsystem = new LSystem(
                //axioma
                ["A"],
          
                //reglas
                {
                  "A": "CB",
                  "B": "CA",
                  "C": "BA",
                },
          
                //render
                {
                  "A": A,
                  "B": B,
                  "C": C
                }
              );
    
            const escala = Math.random() * 10;
            const angulo = Math.random();
    
            this.lsystem.escala = escala * 0.001;
            this.lsystem.angulo = angulo + 1;
            this.lsystem.sentence = ["A"];
            this.lsystem.generar(6);   
        }

        this.animal = Math.random() < 0.5 && this.arbol;
        if (this.animal) {
            this.modelo = modelo;

            this.reactionDiffusion = new ReactionDiffusion(128,15,Math.random() * 0.3 + 1.4);

            this.reactionDiffusion.simular();
            this.textura = this.reactionDiffusion.preview();
        }
        
    }

    perling(){
        const ruido = []

        for (let fila = 0; fila <= this.xMax - this.xMin; fila++) {
            let lista = [];
            for (let columna = 0; columna <= this.yMax - this.yMin; columna++) {
                lista.push(0);
            }
            ruido.push(lista);
        }
        
        //necesita las coordenadas reales para encajar el ruido
        for (let x = this.xMin; x <= this.xMax; x++) {
            for (let y = this.yMin; y <= this.yMax; y++) {
                ruido[x-this.xMin][y-this.yMin] = noise(x * this.escala, y * this.escala) * this.influencia;
            }
        }

        //console.log("perling generado:",this.xMin,this.xMax);

        return ruido;
    }

    async dibujar() {

        //console.log("dibujando chunk:",this.xMin,this.xMax);

        push();
        const escala = 10;
        translate(this.xMin * escala, 0, this.yMin * escala);
        if (this.arbol) {
            push();
            const elevacion = this.terrain[0][0];
            translate(0,elevacion * escala,0);
            this.lsystem.dibujar();

            if (this.animal) {
                push();
                translate(0,-90,0);
                rotate(noise(this.xMin,this.yMin) * Math.PI,[0,1,0]);
                texture(this.textura);
                model(this.modelo);
                pop();
            }

            pop();
        }
        scale(escala);

        for (let x = 0; x < this.terrain.length - 1; x++) {
            fill(53,104,45);
            beginShape(TRIANGLE_STRIP);
            for (let y = 0; y < this.terrain[0].length; y++) {
                vertex(x, this.terrain[x][y], y);
                vertex(x + 1, this.terrain[x + 1][y], y);
            }
            endShape();
        }

        pop();
    }
}

function A() {
    const puntoFinal = createVector(0, -50, 0);
    line(0,0,0,puntoFinal.x, puntoFinal.y, puntoFinal.z);
    return puntoFinal
  }
  
  function B() {
    const puntoFinal = createVector(50, -50, -50);
    line(0,0,0,puntoFinal.x, puntoFinal.y, puntoFinal.z);
    return puntoFinal
  }
  
  function C() {
    const puntoFinal = createVector(-50, -50, 50);
    line(0,0,0,puntoFinal.x, puntoFinal.y, puntoFinal.z);
    return puntoFinal
  }