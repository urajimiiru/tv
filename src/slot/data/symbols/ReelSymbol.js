import * as console from "../../tools/Logging";

class ReelSymbol {
    loadSymbolImage(){
        return new Promise((resolve)=>{
            let symbol_name = this.constructor.name;
            console.info("Loading symbol image", symbol_name);
            this.image = new Image();

            this.image.src = `/textures/symbols/${symbol_name}.png`;
            this.image.onload = ()=> {
                resolve();
                console.log(`Symbol ready ${symbol_name}`);
            }
        })
    }
}

export default ReelSymbol;