import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';

import MockServer from './server/MockServer';
import SceneBuilder from './display/SceneBuilder';

import ReelsSpinManager from './display/spin/ReelsSpinManager';
import StripTextureManager from './display/StripTextureManager';
import {sleep} from './tools/Tools';

class GameLogic {

    async init( canvas, scene, engine ){

        this.scene = scene;
        this.engine = engine;
        this.canvas = canvas;

        this.server = new MockServer();
        this.graphics = new SceneBuilder(scene);
        this.strips = new StripTextureManager();

        this.spin_manager = new ReelsSpinManager(this.server);

        await this.strips.initSymbols();

        this.spin_manager.showResults(this.server.getResults());

        BABYLON.SceneLoader.LoadAssetContainer(
            "./scenes/", 
            "template.babylon", 
            scene,  
            ({meshes, materials})=> this.graphics.init(meshes, materials, this.strips, this.spin_manager)
        );

        this.camera = this.graphics.createCamera(scene);

        engine.runRenderLoop(() => {
            if (scene) {
                scene.render();
            }
        });

        scene.actionManager = new BABYLON.ActionManager(scene);

        var pipeline = new BABYLON.DefaultRenderingPipeline(
            "default",
            false, 
            scene,
            [this.camera]
        );
        
        pipeline.samples = 2;
        pipeline.chromaticAberrationEnabled = true;
        pipeline.chromaticAberration.aberrationAmount = 70;
        pipeline.chromaticAberration.radialIntensity = 3;

        pipeline.grainEnabled = true;
        pipeline.grain.intensity = 7;        
        pipeline.grain.animated = true;

        await sleep(1000);
        scene.beginAnimation(this.camera, 0, 200, false);
    }    
}

export default GameLogic;