import './style.css';
import * as THREE from 'three';
import { renderer, updateRenderer } from './renderer';
import { scene } from './scene';
import { camera, updateCamera } from './camera';
import { configs } from './configurations';
import { createGalaxy } from './galaxy';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const { sizes, renderer: rendererConfigs } = configs;

createGalaxy();

renderer.render(scene, camera);

const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  controls.update();
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
