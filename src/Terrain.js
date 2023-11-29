class Terrain{
    constructor(renderChunksRadius){
        this.renderChunksRadius = renderChunksRadius;
        this.terreno = [];
        this.iCentral = 0;
        this.jCentral = 0;

        this.cargarTerreno();
    }

    dibujar(x,y,modelo){

        // un metro son 10 unidades, un chunk tiene 16m²
        const iC = Math.floor(x / 160);
        const jC = Math.floor(y / 160);

        if (this.iCentral != iC || this.jCentral != jC) {

            this.iCentral = iC;;
            this.jCentral = jC;

            this.cargarTerreno(modelo);
        }

        for (let i = 0; i < this.terreno.length; i++) {
            const linea = this.terreno[i];
            for (let j = 0; j < linea.length; j++) {
                const chunk = linea[j];
                chunk.dibujar();                
            }
        }
    }

    cargarTerreno(modelo){
        console.log("generando terreno");
        const iInicial = this.iCentral-this.renderChunksRadius;
        const iFinal = this.iCentral+this.renderChunksRadius;
        console.log("i inicial,final",iInicial,iFinal);

        for (let i = iInicial; i < iFinal; i++) {
            console.log(i);
            const linea = []
            for (let j = this.jCentral-this.renderChunksRadius; j < this.jCentral+this.renderChunksRadius; j++) {
                const chunk = new Chunk(i,j,modelo);
                linea.push(chunk);
            }
            this.terreno.push(linea);
        }

    }
    
}