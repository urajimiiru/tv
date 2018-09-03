
import * as BABYLON from 'babylonjs';

function createGodrays(engine, scene, camera) {
    var godrays = new BABYLON.VolumetricLightScatteringPostProcess('godrays', 1.0, camera, null, 70, BABYLON.Texture.BILINEAR_SAMPLINGMODE, engine, false);
    godrays.mesh.material.diffuseTexture = new BABYLON.Texture('textures/godraysun.png', scene, true, false, BABYLON.Texture.BILINEAR_SAMPLINGMODE);
    godrays.mesh.material.diffuseTexture.hasAlpha = true;
    godrays.mesh.position = new BABYLON.Vector3(0, 200, 350);
    godrays.mesh.scaling = new BABYLON.Vector3(100, 100, 100);
    return godrays;
}

function createGlow(scene){
    let gl = new BABYLON.GlowLayer("glow", scene, { 
        mainTextureSamples: 4 
    });

    gl.customEmissiveColorSelector = function(mesh, subMesh, material, result) {
            result.set(.3, .6+Math.random()*.1 , .3, 1);
    }
    gl.intensity = .4;

    return gl;
}

function createLights(scene){
    var light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(-1, -2, -1), scene);
	light.position = new BABYLON.Vector3(20, 40, 20);
	light.intensity = .7;
    light.autoUpdateExtends = false;

    let hemi  = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    hemi.intensity = .5;

    return light;
}

function createShadowGenerator(light){
    var shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
    shadowGenerator.useContactHardeningShadow = true;
    shadowGenerator.getShadowMap().refreshRate = BABYLON.RenderTargetTexture.REFRESHRATE_RENDER_ONCE;

    return shadowGenerator;
}

export default {
    createLights,
    createShadowGenerator,
    createGodrays,
    createGlow
}