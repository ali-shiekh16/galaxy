import './style.css';
import * as THREE from 'three';
import { renderer, updateRenderer } from './renderer';
import { scene } from './scene';
import { camera, updateCamera } from './camera';
import { configs } from './configurations';
import { createGalaxy, galaxyParams } from './galaxy';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import dat from 'dat.gui';

const { sizes, renderer: rendererConfigs } = configs;

createGalaxy();

renderer.render(scene, camera);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
function animate() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  rendererConfigs.pixelRatio = window.devicePixelRatio;
  updateCamera(sizes.width, sizes.height);
  updateRenderer(sizes.width, sizes.height, rendererConfigs.pixelRatio);
  renderer.render(scene, camera);
});

window.addEventListener('dblclick', () => {
  if (!document.fullscreenElement) renderer.domElement.requestFullscreen();
  else document.exitFullscreen();
});

// TWEAKS

const gui = new dat.GUI({ width: 400 });

gui
  .add(galaxyParams, 'count')
  .min(1000)
  .max(10000)
  .step(100)
  .onFinishChange(createGalaxy);

gui
  .add(galaxyParams, 'size')
  .min(0.01)
  .max(0.5)
  .step(0.001)
  .onFinishChange(createGalaxy);

gui
  .add(galaxyParams, 'radius')
  .min(1)
  .max(8)
  .step(0.1)
  .onFinishChange(createGalaxy);

gui
  .add(galaxyParams, 'branches')
  .min(2)
  .max(10)
  .step(1)
  .onFinishChange(createGalaxy);
