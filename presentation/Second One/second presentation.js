
//const childNo1 = document.querySelector('#first-presentation-child')
var hologram = bodymovin.loadAnimation({
    container: childNo1,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: "../Animations/animation hologram/data.json"
  })



  
  // hologram.id = "hologram-projector"
  // const hologramEl = document.querySelector('.parent').children[0].children[2]
  // hologram
  // width: 43%;
  //   height: 11%;
  //   transform: translate3d(0px, 0px, 0px);
  //   position: relative;
  //   z-index: 3;
  //   border: 3px solid blue;
  //   margin: 0 auto;



// hologramEl.style.width = "43%"
// hologramEl.style.height = "11%"
// hologramEl.style.position = "relative"
// // hologramEl.style.z-index = "3"
// hologramEl.style.border = "3px solid blue"
// hologramEl.style.margin = "0 auto"














//Hologram Functinality


THREE.VolumetericLightShader = {
  uniforms: {
    tDiffuse: { value: null },
    lightPosition: { value: new THREE.Vector2(0.5, 0.5) },
    exposure: { value: 0.07 },
    decay: { value: 1 },
    density: { value: 10 },
    weight: { value: 1 },
    samples: { value: 100 } },


  vertexShader: [
  "varying vec2 vUv;",
  "void main() {",
  "vUv = uv;",
  "gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);",
  "}"].
  join("\n"),

  fragmentShader: [
  "varying vec2 vUv;",
  "uniform sampler2D tDiffuse;",
  "uniform vec2 lightPosition;",
  "uniform float exposure;",
  "uniform float decay;",
  "uniform float density;",
  "uniform float weight;",
  "uniform int samples;",
  "const int MAX_SAMPLES = 100;",
  "void main()",
  "{",
  "vec2 texCoord = vUv;",
  "vec2 deltaTextCoord = texCoord - lightPosition;",
  "deltaTextCoord *= 1.0 / float(samples) * density;",
  "vec4 color = texture2D(tDiffuse, texCoord);",
  "float illuminationDecay = 1.0;",
  "for(int i=0; i < MAX_SAMPLES; i++)",
  "{",
  "if(i == samples) {",
  "break;",
  "}",
  "texCoord += deltaTextCoord;",
  "vec4 sample = texture2D(tDiffuse, texCoord);",
  "sample *= illuminationDecay * weight;",
  "color += sample;",
  "illuminationDecay *= decay;",
  "}",
  "gl_FragColor = color * exposure;",
  "}"].
  join("\n") };

THREE.AdditiveBlendingShader = {
  uniforms: {
    tDiffuse: { value: null },
    tAdd: { value: null } },


  vertexShader: [
  "varying vec2 vUv;",
  "void main() {",
  "vUv = uv;",
  "gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);",
  "}"].
  join("\n"),

  fragmentShader: [
  "uniform sampler2D tDiffuse;",
  "uniform sampler2D tAdd;",
  "varying vec2 vUv;",
  "void main() {",
  "vec4 color = texture2D(tDiffuse, vUv);",
  "vec4 add = texture2D(tAdd, vUv);",
  "gl_FragColor = color + add;",
  "}"].
  join("\n") };

THREE.PassThroughShader = {
  uniforms: {
    tDiffuse: { value: null } },


  vertexShader: [
  "varying vec2 vUv;",
  "void main() {",
  "vUv = uv;",
  "gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);",
  "}"].
  join("\n"),

  fragmentShader: [
  "uniform sampler2D tDiffuse;",
  "varying vec2 vUv;",
  "void main() {",
  "gl_FragColor = texture2D(tDiffuse, vec2(vUv.x, vUv.y));",
  "}"].
  join("\n") };


const getImageTexture2 = (image, density = 1) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const { width1, height1 } = image;

  canvas.setAttribute('width', width1 * density);
  canvas.setAttribute('height', height1 * density);
  canvas.style.width = `${width1}px`;
  canvas.style.height1 = `${height1}px`;

  ctx.drawImage(image, 0, 0, width1 * density, height1 * density);

  return canvas;
};

const width1 = 1280;
const height1 = 720;
const lightColor1 = 0xffffff;
const DEFAULT_LAYER1 = 0;
const OCCLUSION_LAYER1 = 1;
const renderScale = .25;
const gui = new dat.GUI();
const clock = new THREE.Clock();

let composer,
filmPass,
badTVPass,
bloomPass,
occlusionComposer,
itemMesh,
occMesh,
occRenderTarget,
lightSource,
vlShaderUniforms;
 
 const projectorSelector = document.querySelector('#projector')
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, width1 / height, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  antialias: false,alpha :true });
 
 
renderer.setSize(width1, height1);
document.querySelectorAll('#first-presentation-child')[1].appendChild(renderer.domElement);






function setupScene() {
  lightSource = new THREE.Object3D();
  lightSource.position.x = 0;
  lightSource.position.y = -15;
  lightSource.position.z = -15;

  const itemGeo = new THREE.PlaneGeometry(9, 2.1);
  const itemMaterial = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.7 });

  const img = new Image();
  img.src = '../Images/M.J..png';
  img.crossOrigin = 'Anonymous';

  img.onload = function () {
    const itemTexture = new THREE.Texture(
    getImageTexture2(img),
    null,
    THREE.ClampToEdgeWrapping,
    THREE.ClampToEdgeWrapping,
    null,
    //THREE.LinearFilter
    );
    


    itemTexture.needsUpdate = true;
    itemMaterial.map = itemTexture;

    itemMesh = new THREE.Mesh(itemGeo, itemMaterial);
    scene.add(itemMesh);

    const occItemMaterial = new THREE.MeshBasicMaterial({ color: lightColor1 });
    occItemMaterial.map = itemTexture;
    occMesh = new THREE.Mesh(itemGeo, occItemMaterial);
    occMesh.layers.set(OCCLUSION_LAYER1);
    scene.add(occMesh);
  };

  camera.position.z = 4.5;
}

function setupPostprocessing() {
  occRenderTarget = new THREE.WebGLRenderTarget(width1 * renderScale, height * renderScale);

  // Blur passes
  const hBlur = new THREE.ShaderPass(THREE.HorizontalBlurShader);
  const vBlur = new THREE.ShaderPass(THREE.VerticalBlurShader);
  const bluriness = 7;
  hBlur.uniforms.h.value = bluriness / width1;
  vBlur.uniforms.v.value = bluriness / height1;

  // Bad TV Pass
  badTVPass = new THREE.ShaderPass(THREE.BadTVShader);
  badTVPass.uniforms.distortion.value = 1.9;
  badTVPass.uniforms.distortion2.value = 1.2;
  badTVPass.uniforms.speed.value = 0.1;
  badTVPass.uniforms.rollSpeed.value = 0;

  // Volumetric Light Pass
  const vlPass = new THREE.ShaderPass(THREE.VolumetericLightShader);
  vlShaderUniforms = vlPass.uniforms;
  vlPass.needsSwap = false;

  // Occlusion Composer
  occlusionComposer = new THREE.EffectComposer(renderer, occRenderTarget);
  occlusionComposer.addPass(new THREE.RenderPass(scene, camera));
  occlusionComposer.addPass(hBlur);
  occlusionComposer.addPass(vBlur);
  occlusionComposer.addPass(hBlur);
  occlusionComposer.addPass(vBlur);
  occlusionComposer.addPass(hBlur);
  occlusionComposer.addPass(badTVPass);
  occlusionComposer.addPass(vlPass);

  // Bloom pass
  bloomPass = new THREE.UnrealBloomPass(width1 / height1, 0, .8, .3);

  // Film pass
  filmPass = new THREE.ShaderPass(THREE.FilmShader);
  filmPass.uniforms.sCount.value = 1200;
  filmPass.uniforms.grayscale.value = false;
  filmPass.uniforms.sIntensity.value = 1.5;
  filmPass.uniforms.nIntensity.value = 0.2;

  // Blend occRenderTarget into main render target 
  const blendPass = new THREE.ShaderPass(THREE.AdditiveBlendingShader);
  blendPass.uniforms.tAdd.value = occRenderTarget.texture;
  blendPass.renderToScreen = true;

  // Main Composer
  composer = new THREE.EffectComposer(renderer);
  composer.addPass(new THREE.RenderPass(scene, camera));
  composer.addPass(bloomPass);
  composer.addPass(badTVPass);
  composer.addPass(filmPass);
  composer.addPass(blendPass);
}

function onFrame() {
  requestAnimationFrame(onFrame);
  update();
  render();
}

function update() {
  const timeDelta = clock.getDelta();
  const elapsed = clock.getElapsedTime();

  filmPass.uniforms.time.value += timeDelta;
  badTVPass.uniforms.time.value += 0.01;

  if (itemMesh) {
    itemMesh.rotation.y = Math.sin(elapsed / 2) / 15;
    itemMesh.rotation.z = Math.cos(elapsed / 2) / 50;
    occMesh.rotation.copy(itemMesh.rotation);
  }
}

function render() {
  camera.layers.set(OCCLUSION_LAYER1);
  //renderer.setClearColor(0x292929);
  occlusionComposer.render();

  camera.layers.set(DEFAULT_LAYER1);
 // renderer.setClearColor(0x292929);
  composer.render();
}

function setupGUI() {
  let folder,
  min,
  max,
  step,
  updateShaderLight = function () {
    const p = lightSource.position.clone(),
    vector = p.project(camera),
    x = (vector.x + 1) / 2,
    y = (vector.y + 1) / 2;
    vlShaderUniforms.lightPosition.value.set(x, y);
  };

  updateShaderLight();

  // Bloom Controls
  folder = gui.addFolder('Bloom');
  folder.add(bloomPass, 'radius').
  min(0).
  max(10).
  name('Radius');
  folder.add(bloomPass, 'threshold').
  min(0).
  max(1).
  name('Threshold');
  folder.add(bloomPass, 'strength').
  min(0).
  max(10).
  name('Strength');
  folder.open();

  // Bad TV Controls
  folder = gui.addFolder('TV');
  folder.add(badTVPass.uniforms.distortion, 'value').
  min(0).
  max(10).
  name('Distortion 1');
  folder.add(badTVPass.uniforms.distortion2, 'value').
  min(0).
  max(10).
  name('Distortion 2');
  folder.add(badTVPass.uniforms.speed, 'value').
  min(0).
  max(1).
  name('Speed');
  folder.add(badTVPass.uniforms.rollSpeed, 'value').
  min(0).
  max(10).
  name('Roll Speed');
  folder.open();

  // Light Controls
  folder = gui.addFolder('Light Position');
  folder.add(lightSource.position, 'x').
  min(-50).
  max(50).
  onChange(updateShaderLight);
  folder.add(lightSource.position, 'y').
  min(-50).
  max(50).
  onChange(updateShaderLight);
  folder.add(lightSource.position, 'z').
  min(-50).
  max(50).
  onChange(updateShaderLight);
  folder.open();

  // Volumetric Light Controls
  folder = gui.addFolder('Volumeteric Light Shader');
  folder.add(vlShaderUniforms.exposure, 'value').
  min(0).
  max(1).
  name('Exposure');
  folder.add(vlShaderUniforms.decay, 'value').
  min(0).
  max(1).
  name('Decay');
  folder.add(vlShaderUniforms.density, 'value').
  min(0).
  max(10).
  name('Density');
  folder.add(vlShaderUniforms.weight, 'value').
  min(0).
  max(1).
  name('Weight');
  folder.add(vlShaderUniforms.samples, 'value').
  min(1).
  max(100).
  name('Samples');

  folder.open();
}

function addRenderTargetImage() {
  const material = new THREE.ShaderMaterial(THREE.PassThroughShader);
  material.uniforms.tDiffuse.value = occRenderTarget.texture;

  const mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), material);
  composer.passes[1].scene.add(mesh);
  mesh.visible = false;

  const folder = gui.addFolder('Light Pass Render Image');
  folder.add(mesh, 'visible');
  folder.open();
}

setupScene(); 
setupPostprocessing();
onFrame();
setupGUI();
addRenderTargetImage();

// renderer.setClearColor( 0xffffff, 0);

renderer.domElement.id = "projector"
renderer.domElement.style.height = "73%"
renderer.domElement.style.width = "183%"

//End of The hologram Functionality

const projectorFinder = setInterval(() => {
  
  let hologramEl = document.querySelector('#first-presentation-child').children[2];
  
  

  hologramEl.style.width = "43%"
  hologramEl.style.height = "20%"
  hologramEl.style.position = "relative"
  // hologramEl.style.z-index = "3"
  hologramEl.style.border = "3px solid blue"
  hologramEl.style.margin = "0 auto"

console.log('projectorFinder executed')
  if(hologramEl !== undefined){
    projectorFinderkill()
  }

}, 1000);

function projectorFinderkill () {
  clearInterval(projectorFinder)
}

  

childNo1.style.animation = 'flying 3s linear infinite'
const secondChild = document.querySelector('.parent').children[1];
secondChild.style.flexGrow = 2;

const projectorsLight = renderer.domElement
let clones = [];

let allChildren = document.querySelectorAll('#first-presentation-child')
    
    for (let index = 0; index < allChildren.length; index++) {
      clones.push()
      // allChildren[index].appendChild(projectorsLight)
      
    }