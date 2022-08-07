import './style.css';
import * as THREE from 'three';
import { renderer, updateRenderer } from './renderer';
import { scene } from './scene';
import { camera, updateCamera } from './camera';
import { configs } from './configurations';

const { sizes, renderer: rendererConfigs } = configs;

const geometry = new THREE.SphereBufferGeometry(1, 16, 16);
const material = new THREE.MeshBasicMaterial();
const sphere = new THREE.Mesh(geometry, material);

scene.add(sphere);

renderer.render(scene, camera);

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
