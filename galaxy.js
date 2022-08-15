import * as THREE from 'three';
import { camera } from './camera';
import { scene } from './scene';

const params = {
  count: 7000,
  size: 0.05,
  radius: 5,
  branches: 3,
  branchesCurveFactor: 1.5,
  randmonessPower: 3.6,
  innerColor: '#ff6030',
  outerColor: '#1b3984',
};

let geometry = null;
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
  const positions = new Float32Array(params.count * 3);
  const colors = new Float32Array(params.count * 3);
  for (let i = 0; i < params.count; i++) {
    const i3 = i * 3;

    const angle = ((i % params.branches) / params.branches) * Math.PI * 2;
    const branchesRadius = Math.random() * params.radius;
    const curveFactor = branchesRadius * params.branchesCurveFactor;

    const randmonessX =
      Math.pow(Math.random(), params.randmonessPower) *
      (Math.random() < 0.5 ? 1 : -1);
    const randmonessY =
      Math.pow(Math.random(), params.randmonessPower) *
      (Math.random() < 0.5 ? 1 : -1);
    const randmonessZ =
      Math.pow(Math.random(), params.randmonessPower) *
      (Math.random() < 0.5 ? 1 : -1);

    // Position X
    positions[i3] =
      Math.cos(angle + curveFactor) * branchesRadius + randmonessX;

    // Position Z
    positions[i3 + 2] =
      Math.sin(angle + curveFactor) * branchesRadius + randmonessZ;

    // Position Y (For Spread)
    positions[i3 + 1] = randmonessY;

    // COLORS
    const innerColor = new THREE.Color(params.innerColor);
    const outerColor = new THREE.Color(params.outerColor);

    const alpha = branchesRadius / params.radius;
    const mixedColor = innerColor.clone().lerp(outerColor, alpha);
    colors[i3] = mixedColor.r;
    colors[i3 + 1] = mixedColor.g;
    colors[i3 + 2] = mixedColor.b;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  // MATERIAL
  material = new THREE.PointsMaterial({
    size: params.size,
    sizeAttenuation: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    vertexColors: true,
  });

  stars = new THREE.Points(geometry, material);
  scene.add(stars);
}

export { createGalaxy, params as galaxyParams };
