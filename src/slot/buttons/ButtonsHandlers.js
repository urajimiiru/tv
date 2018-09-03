import * as BABYLON from 'babylonjs';

import Dispatcher from '../tools/Dispatcher';
import {SPIN_START} from '../enum/EventTypes';

function initKeyboard(scene){
   
    scene.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            {
                trigger: BABYLON.ActionManager.OnKeyUpTrigger,
                parameter: ' '
            },
            ()=>Dispatcher.dispatch(SPIN_START)
        )
    );
}

function initSpinButton(mesh, scene, glow){
    if(!mesh.actionManager){
        mesh.actionManager = new BABYLON.ActionManager(scene);
    }

    mesh.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
                BABYLON.ActionManager.OnLeftPickTrigger, 
                ()=>Dispatcher.dispatch(SPIN_START)
            )
        );

    mesh.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
                BABYLON.ActionManager.OnPointerOverTrigger, 
                ()=>glow.addIncludedOnlyMesh(mesh)
            )
        );

    mesh.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
                BABYLON.ActionManager.OnPointerOutTrigger, 
                ()=> glow.removeIncludedOnlyMesh(mesh)
            )
        );
}

export default {
    initKeyboard,
    initSpinButton
}
