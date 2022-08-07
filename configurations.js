export const configs = {
  sizes: {
    rendererWidth: window.innerWidth,
    rendererHeight: window.innerHeight,

    get width() {
      return this.rendererWidth;
    },
    set width(value) {
      this.rendererWidth = value;
    },
    get height() {
      return this.rendererHeight;
    },
    set height(value) {
      this.rendererHeight = value;
    },
  },

  cameraConfigs: {
    fov: 45,
    near: 0.01,
    far: 1000,
  },

  renderer: {
    rendererPixelRatio: Math.min(window.devicePixelRatio, 2),
    get pixelRatio() {
      return this.rendererPixelRatio;
    },
    set pixelRatio(value) {
      this.rendererPixelRatio = Math.min(value, 2);
    },
  },
};
