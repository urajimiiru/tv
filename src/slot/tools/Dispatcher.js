import _ from "underscore";
import {log, warn} from "./Logging";

class Dispatcher {
    static listeners = {};

    static once(event, callback){
        
        let wrapped_callback = (data)=>{
            callback.call(null, data);
            log(`Once ${event} received, unsubscribing!`)
            Dispatcher.unsubscribe(event, wrapped_callback);
        }

        Dispatcher.subscribe(event, wrapped_callback);
    }

    static subscribe(event, callback){
        if(!(event in Dispatcher.listeners)){
            log(`Subscribing, no other listeners for ${event.toString()} `)
            Dispatcher.listeners[event] = [callback];
        }
        else{
            log(`Subscribing,  other listeners for ${event.toString()} exist`)
            Dispatcher.listeners[event].push(callback);
        }
    }

    static unsubscribe(event, callback){
        if(event in Dispatcher.listeners){
            Dispatcher.listeners[event] = _.without(Dispatcher.listeners[event], callback);
            if(Dispatcher.listeners[event].length == 0){
                delete Dispatcher.listeners[event];
            }
        }
    }

    static dispatch(event, data){
        log(`Dispatching ${event.toString()} event`);

        if (event in Dispatcher.listeners){
            for (let listener of Dispatcher.listeners[event]){
                listener.call(null, data);
            }
        }
        else{
            warn(`No one is subscribed for ${event.toString()} event`)
        }
            
    }

}

export default Dispatcher;