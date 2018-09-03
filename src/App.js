import React, {Component} from 'react';
import GameLogic from './slot/GameLogic';

import BabylonScene from './BabylonScene';

class App extends Component {
    constructor(props){
        super(props);
        this.game = new GameLogic();
    }
    
    onSceneMount = (e) => {
        const { canvas, scene, engine } = e;
        this.game.init(canvas, scene, engine);
    }

    render() {               
        return (
            <div>
                <BabylonScene onSceneMount={this.onSceneMount} />
            </div>
        )
    }
}

export default App;