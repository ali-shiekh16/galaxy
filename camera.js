import { PerspectiveCamera } from 'three';
import { configs } from './configurations';

const { sizes, cameraConfigs } = configs;

const camera = new PerspectiveCamera(
  cameraConfigs.fov,
  sizes.width / sizes.height,
  cameraConfigs.near,
  cameraConfigs.far
);

camera.position.set(0, 0, 5);

function updateCamera(width, height) {
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

export { camera, updateCamera };
