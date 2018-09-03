import * as BABYLON from 'babylonjs';

export function createFresnelMaterial(scene){
    var xray_mat = new BABYLON.StandardMaterial("XRAY", scene);
    xray_mat.emissiveColor = new BABYLON.Color3(1, 1, 1);
    xray_mat.alpha = 0.1;
    var fresnel_params = new BABYLON.FresnelParameters();
    fresnel_params.isEnabled = true;
    fresnel_params.leftColor = new BABYLON.Color3(0.5, 0.6, 1);
    fresnel_params.rightColor = new BABYLON.Color3(0, 0, 0);
    fresnel_params.power = 2;
    fresnel_params.bias = 0.1;
    var fresnel_params2 = new BABYLON.FresnelParameters();
    fresnel_params2.isEnabled = true;
    fresnel_params2.leftColor = new BABYLON.Color3(1, 1, 1);
    fresnel_params2.rightColor = new BABYLON.Color3(0.2, 0.2, 0.2);
    fresnel_params2.power = 2;
    fresnel_params2.bias = 0.5;
    xray_mat.emissiveFresnelParameters = fresnel_params;
    xray_mat.opacityFresnelParameters = fresnel_params2;
    return xray_mat;
}

export function createNoiseMaterial(scene){
    let noiseTexture = new BABYLON.NoiseProceduralTexture("PERLIN", 256, scene);
    noiseTexture.animationSpeedFactor = 20;
    noiseTexture.persistence = 5;
    noiseTexture.brightness = 1.9;
    noiseTexture.octaves = 13;

    let material = new BABYLON.StandardMaterial("NOISE", scene)
    material.diffuseTexture = noiseTexture;
    material.emissiveColor = BABYLON.Color3.White();
    return material;
}

export function createPBRMaterial(scene){
    var pbr = new BABYLON.PBRMetallicRoughnessMaterial("PBR", scene);
    pbr.baseColor = new BABYLON.Color3(1.000, 0.766, 0.336);
    pbr.metallic = .6;
    pbr.roughness = 0.7;
    return pbr;
}

export function createSpinButtonMaterial(scene){
    let diff = new BABYLON.Texture("/textures/spin.png", scene);
    var material = new BABYLON.StandardMaterial("SPIN", scene);
    material.diffuseTexture = diff;

    return material;
}

export function createGroundMaterial(scene){
    let ground_diffuse = new BABYLON.Texture("/textures/Concrete_Damaged_001_COLOR.jpg", scene);
    let ground_bump = new BABYLON.Texture("/textures/Concrete_Damaged_001_NORM.jpg", scene);

    for (let texture of [ground_bump, ground_diffuse]){
        texture.uScale = 5;
        texture.vScale = 5;
    }

    var material = new BABYLON.StandardMaterial("GROUND", scene);
    material.diffuseTexture = ground_diffuse;
    material.bumpTexture = ground_bump;
    material.bumpTexture.level = 1;

    material.useParallax = true;
    material.useParallaxOcclusion = true;
    material.parallaxScaleBias = 0.1;
    material.specularPower = 30.0;
	material.specularColor = new BABYLON.Color3(.3 , .3, .3);

    return material;
}