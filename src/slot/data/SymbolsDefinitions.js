import A from './symbols/A';
import K from './symbols/K';
import J from './symbols/J';
import Q from './symbols/Q';
import Ten from './symbols/Ten';
import Nine from './symbols/Nine';

import {STRIPS} from './StripsDefinitions';

class SymbolsDefinitions {
    constructor(){
        let symbol_A = new A();
        let symbol_K = new K();
        let symbol_J = new J();
        let symbol_Q = new Q();
        let symbol_Ten = new Ten();
        let symbol_Nine = new Nine();

        this.symbols = [symbol_A, symbol_K, symbol_Q, symbol_J, symbol_Nine, symbol_Ten];
        this.strips = STRIPS.map(strip=>strip.map(symbol_index=>this.symbols[symbol_index]));
    }

    async loadTextures(){
        let promises = this.symbols.map(symbol=>symbol.loadSymbolImage())
        await Promise.all(promises);
    }
}

export default SymbolsDefinitions;