import * as THREE from 'three';
import { scene } from './scene';

const params = {
  count: 1000,
  size: 0.05,
  radius: 5,
  branches: 3,
  branchesCurveFactor: 1.5,
  randomnessFactor: 0.5,
};

let geometry = null;
let positions = null;
let material = null;
let stars = null;

function createGalaxy() {
  if (stars) {
    geometry.dispose();
    material.dispose();
    scene.remove(stars);
  }
  // GEOMETRY
  geometry = new THREE.BufferGeometry();
  positions = new Float32Array(params.count * 3);
  for (let i = 0; i < params.count; i++) {
    const i3 = i * 3;

    const angle = ((i % params.branches) / params.branches) * Math.PI * 2;
    const branchesRadius = Math.random() * params.radius;
    const curveFactor = branchesRadius * params.branchesCurveFactor;

    const randmonessX = Math.random() * params.randomnessFactor;
    const randmonessY = Math.random() * params.randomnessFactor;
    const randmonessZ = Math.random() * params.randomnessFactor;

    // Position X
    positions[i3] =
      Math.cos(angle + curveFactor) * branchesRadius + randmonessX;

    // Position Z
    positions[i3 + 2] =
      Math.sin(angle + curveFactor) * branchesRadius + randmonessZ;

    // Position Y (For Spread)
    positions[i3 + 1] = randmonessY;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  // MATERIAL
  material = new THREE.PointsMaterial({
    size: params.size,
    sizeAttenuation: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  stars = new THREE.Points(geometry, material);
  scene.add(stars);
}

export { createGalaxy, params as galaxyParams };
