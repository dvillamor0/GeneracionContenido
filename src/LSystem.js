class LSystem {
    constructor(axiom, rules,render) {
      this.sentence = axiom;
      this.rules = rules;
      this.render = render;
  
      this.angulo = 2;
      this.escala = 0.015;
  
      let masLargo = 0;
      const llaves = Object.keys(this.rules);
      for (let i = 0; i < llaves.length; i++) {
        const regla = this.rules[llaves[i]];
        if (masLargo < regla.length) {
          masLargo = regla.length;
        }
      }
  
      this.n = masLargo;
  
    }
  
    generar(h) {
      this.h = h;
      for (let i = 0; i < (this.n ** (h-1)-1); i++) {
        const caracter = this.sentence[i];
        if (caracter) {
          const agregados = this.rules[caracter];
  
          for (let j = 0; j < this.n; j++) {
            const charsito = agregados[j];
            if (charsito) {
              this.sentence.push(charsito);
            }else{
              this.sentence.push("");
            }
          }
  
        }
  
      }
    }
  
    inorder(i) {
      // Verifica si el índice está dentro de los límites del arreglo
      if (i >= 0 && i < this.sentence.length) {
        const letra = this.sentence[i];
        if (letra != "") {
          // Visita el nodo actual
          push();
          //console.log(letra,i);
          const puntoFinal = this.render[letra]();
          translate(puntoFinal.x,puntoFinal.y,puntoFinal.z);
          rotate(this.angulo,[0,1,0]);
          scale(1 - (this.escala * i));
          stroke(128,64 + 10 * i,0);
          
          // Realiza el recorrido inorder en los hijos del nodo actual
          for (let j = 0; j < this.n; j++) {
            this.inorder(this.n * i + j + 1);
          }
          //console.log(i);
          pop();
        }
      }
    }
  
  
    dibujar(){
      stroke(128,64,0);
      this.inorder(0);
      noStroke();
    }
  }