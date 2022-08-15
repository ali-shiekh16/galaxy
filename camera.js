import { PerspectiveCamera, Vector3 } from 'three';
import { configs } from './configurations';

const { sizes, cameraConfigs } = configs;

const camera = new PerspectiveCamera(
  cameraConfigs.fov,
  sizes.width / sizes.height,
  cameraConfigs.near,
  cameraConfigs.far
);

camera.position.set(0, 10, 10);
camera.lookAt(new Vector3(0, 0, 0));

function updateCamera(width, height) {
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

export { camera, updateCamera };
