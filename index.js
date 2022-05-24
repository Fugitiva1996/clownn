// Naoto Hieda
let hydra, hydraCanvas;
hydraCanvas = document.createElement("canvas");
hydraCanvas.width = 512;
hydraCanvas.height = 512;
hydraCanvas.id = "hydraCanvas";
document.querySelector("a-assets").appendChild(hydraCanvas);

hydra = new Hydra({
  canvas: hydraCanvas,
  enableStreamCapture: false,
  detectAudio: false,
  width: 512,
  height: 512,
});

osc(100, 0.02, 1.1)
.mult(osc(10,0.1,()=>Math.sin(time)*3).saturate(3).kaleid(200))
	.kaleid(1)
	.color(14, 3, 27 )
	.rotate(0, 1)
	.scale(1.01)
  	.out()

let delta = 0;

// https://github.com/aframevr/aframe/issues/3936
AFRAME.registerComponent("canvas-updater", {
  dependencies: ["geometry", "material"],

  tick: function() {
    var el = this.el;
    var material;

    material = el.getObject3D("mesh").material;
    if (!material.map) {
      return;
    }
    material.map.needsUpdate = true;
  }
});

AFRAME.registerComponent("aframe-init", {
  init: function() {
    document.querySelector("a-box").setAttribute("canvas-updater", "");
    document.querySelector(" a-box ").setAttribute("material", "src:#hydraCanvas");
  },
  tick: function(time, deltaTime) {
    delta += deltaTime;
  }
});


