import * as BABYLON from 'babylonjs';
import SymbolsDefinitions from '../data/SymbolsDefinitions';
import {STRIPS} from '../data/StripsDefinitions';

const SYMBOL_WIDTH = 256;

class StripTextureManager {
    constructor(scene){
        this.scene = scene;
        this.symbols = new SymbolsDefinitions();
    }

    async initSymbols(){
        await this.symbols.loadTextures();
    }
    
    createReelTexture(reel_index, offset_y){
        let width = SYMBOL_WIDTH;
        let height = STRIPS[reel_index].length*SYMBOL_WIDTH;

        let texture = new BABYLON.DynamicTexture(`strip${reel_index}`, {width, height}, this.scene);
        this._drawStrip(texture, this.symbols.strips[reel_index]);

        texture.vOffset = offset_y * texture.vScale;
        texture.wrapV = true;

        return texture;        
    }

    _drawStrip(texture, symbols_definitions){
        let ctx = texture.getContext();
        let idx = 0;
        for (let symbol of symbols_definitions){
            ctx.drawImage(
                symbol.image, 
                0, 
                0, 
                SYMBOL_WIDTH, 
                SYMBOL_WIDTH, 
                0, 
                (idx++)*SYMBOL_WIDTH, 
                SYMBOL_WIDTH, 
                SYMBOL_WIDTH
            );
        }

        texture.vScale = 1/symbols_definitions.length;
        texture.uScale = 1;
        texture.update();
    }

}

export default StripTextureManager;