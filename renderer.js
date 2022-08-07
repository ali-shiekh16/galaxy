import { WebGLRenderer } from 'three';
import { configs } from './configurations';

const { sizes } = configs;

const renderer = new WebGLRenderer({
  antialias: true,
});

document.body.appendChild(renderer.domElement);

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(configs.renderer.pixelRatio);

function updateRenderer(width, height, pixelRatio) {
  renderer.setSize(width, height);
  renderer.setPixelRatio(pixelRatio);
}

export { renderer, updateRenderer };
