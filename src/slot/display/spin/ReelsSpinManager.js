import Dispatcher from '../../tools/Dispatcher';
import {SPIN_START, SPIN_END} from '../../enum/EventTypes';
import {STOP_DURATION, STOP_DELTA} from '../../config/Default';

import * as console from '../../tools/Logging';
import {sleep} from '../../tools/Tools';

class ReelsSpinManager {
    constructor(server){
        this.reel_textures = [[],[],[],[],[]];
        this.intervals = [[],[],[],[],[]];
        this.server = server;

        Dispatcher.subscribe(SPIN_START, this.invokeSpin);
        Dispatcher.subscribe(SPIN_END, this.invokeStop)
    }

    invokeSpin = ()=> this.startSpin();
    invokeStop = (results) => this.stopSpin(results);
    clearSpin = ()=> this.intervals.map(arr=>arr.map((i)=>clearInterval(i)));


    async startSpin(){
        let results = this.server.getResults();
        console.info(".startSpin()");

        if(this.spinning){
            return;
        }

        this.spinning = true;
        this.clearSpin();

        this.intervals = this.reel_textures.map(
            (reel)=>reel.map(
                    (slot)=>{
                        let speed = 1.01;
                        return setInterval( ()=> {
                            slot.vOffset+=speed/100;
                            speed*=1.05;
                        }, 30);
                    }
                )
            );

        await sleep(STOP_DURATION*1000);
        this.invokeStop(results);
    }

    async stopSpin(results){
        console.info(".stopSpin()");

        for (let reel_index = 0; reel_index < this.reel_textures.length ; ++reel_index){
            console.info(".stopSpin() stopping reel: ", reel_index);
            
            await sleep(reel_index*STOP_DELTA*1000);
            this.intervals[reel_index].map((interval)=>clearInterval(interval));

            for (let row = 0 ; row < this.reel_textures[reel_index].length; ++row){
                let t = this.reel_textures[reel_index][row];
                t.vOffset = ( results[reel_index] + row - 1) * t.vScale ;
            }
        }

        this.spinning = false;
    }

    showResults(results){
        for (let reel_index = 0; reel_index < this.reel_textures.length ; ++reel_index){
            console.info(".showResults() results: ", results);
            
            for (let row = 0 ; row < this.reel_textures[reel_index].length; ++row){
                let t = this.reel_textures[reel_index][row];
                t.vOffset = ( results[reel_index] + row - 1) * t.vScale ;
            }
        }
     }

    setStripTexture(reel_index, y_offset, texture){
        this.reel_textures[reel_index][y_offset] = texture;
    }
}

export default ReelsSpinManager;