import * as BABYLON from 'babylonjs';
import { createNoiseMaterial, createSpinButtonMaterial,  createGroundMaterial } from './MaterialFactory';
import EffectsFactory from './EffectsFactory';
import ButtonsHandlers from '../buttons/ButtonsHandlers';
import * as console from '../tools/Logging';

import {NUM_ROWS, NUM_STRIPS} from '../config/Default';

class  SceneBuilder {

    constructor(scene){
        this.scene = scene;
    }

    init( meshes, materials, strips, spin_manager){
        console.info("SceneBuilder.init()");
        //when tiling the reels
        const X_OFFSET = 4.4;
        const Y_OFFSET = 2.9;
        
        let lights = EffectsFactory.createLights(this.scene);
        let shadowGenerator = EffectsFactory.createShadowGenerator(lights);
        let glow = EffectsFactory.createGlow(this.scene);

        let tv = meshes.find( m=> m.name == "tv");
        let screen = meshes.find( m=> m.name == "glass");
        
        let createDecoration = (position, rotation) => {    
            let decorative_tv = tv.clone("decoration");
            let decoration_screen = screen.clone("decoration_screen");
            decoration_screen.parent = decorative_tv;
            decoration_screen.material = createNoiseMaterial(this.scene);
            decorative_tv.position = position;
            decorative_tv.rotation = rotation;
            
            decorative_tv.rotation = rotation;// new BABYLON.Vector3(0, -Math.PI/2, 0);
            decorative_tv.position = position;//new BABYLON.Vector3(-13, 0, -10)
        }

        let createReelSlot = (strip_index, strip_offset)=>{
            let slot_gfx = tv.clone();
            let slot_display = screen.clone();
            slot_display.parent = slot_gfx;
            slot_display.material = new BABYLON.StandardMaterial();

            let strip_texture = strips.createReelTexture(strip_index, strip_offset);
            spin_manager.setStripTexture(strip_index, strip_offset, strip_texture);

            slot_display.material.diffuseTexture = strip_texture;
            slot_display.material.emissiveColor = BABYLON.Color3.Green();

            glow.addIncludedOnlyMesh(slot_display);

            slot_gfx.position = new BABYLON.Vector3(
                strip_index * X_OFFSET + .7* Math.random() - 9,
                strip_offset * Y_OFFSET,
                .5-Math.random()
            );

            slot_gfx.rotation = new BABYLON.Vector3(
                0,
                -.15 + Math.random() * .3,
                -.1 + Math.random() * .2
            );

            slot_gfx.receiveShadows = true;
            shadowGenerator.getShadowMap().renderList.push(slot_gfx);
        }
        
        for (let strip_index = 0 ; strip_index < NUM_STRIPS ; ++ strip_index){
            for (let strip_offset = 0 ; strip_offset < NUM_ROWS ; ++strip_offset){
                createReelSlot(strip_index, strip_offset);
            }
        }

        //input
        let spin_gfx = tv.clone("btn_spin_gfx");
        let spin = screen.clone("btn_spin");

        spin.parent = spin_gfx;
        spin.material = createSpinButtonMaterial(this.scene);

        ButtonsHandlers.initKeyboard(this.scene);
        ButtonsHandlers.initSpinButton(spin, this.scene, glow);     

        spin_gfx.receiveShadows = true;
        shadowGenerator.getShadowMap().renderList.push(spin_gfx);

        spin_gfx.rotation.x = .9 * Math.PI/2;
        spin_gfx.position = new BABYLON.Vector3(8, 0, -10)
        
        //spam
        createDecoration(new BABYLON.Vector3(-13, 0, -10), new BABYLON.Vector3(0, -Math.PI/2, 0));

        //ground
        let ground = meshes.find(m=>m.name=="ground");
        if(ground){
            this.scene.addMesh(ground);
            ground.material = createGroundMaterial(this.scene);
            ground.receiveShadows = true;
            shadowGenerator.getShadowMap().renderList.push(ground);
        }    
    }

    createCamera(scene){
        let camera = new BABYLON.UniversalCamera("camera", new BABYLON.Vector3(0, 33, -70), scene);
        camera.setTarget(BABYLON.Vector3.Zero());
        camera.fov = .9;

        let camera_in = new BABYLON.Animation(
            "camera_in", 
            "position", 
            60, 
            BABYLON.Animation.ANIMATIONTYPE_VECTOR3, 
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
        );

        let camera_in_keys = []; 

        camera_in_keys.push({
            frame: 0,
            value: new BABYLON.Vector3(0, 33, -70),
            outTangent: new BABYLON.Vector3(0, 0, 0)
          });
        
          camera_in_keys.push({
            frame: 60,
            inTangent: new BABYLON.Vector3(0, 0, 0),
            value: new BABYLON.Vector3(0, 30, -70),
            outTangent:new BABYLON.Vector3(0, 0, -.1),
          });
        
          camera_in_keys.push({
            frame: 200,
            inTangent: BABYLON.Vector3.Zero(),
            value: new BABYLON.Vector3(0, 10, -20),
          });

        camera_in.setKeys(camera_in_keys);
        camera.animations = [camera_in];

        return camera;
    }

}

export default SceneBuilder;
