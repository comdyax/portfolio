export const background = (p, backgroundColor, color) => {
  const count = p.floor(p.sqrt(window.innerHeight * window.innerWidth));
  const dots = [];
 
  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
    if (p.width <= p.height) {
      p.camera(0, 0, -p.height * 2);
    } else {
      p.camera(0, 0, -p.width);
    }

    for (let i = 0; i < count; i++) {
      let x = p.random(-p.width, p.width);
      let y = p.random(-p.height, p.height);
      let z = p.random(-p.width, p.width);
      dots.push({ x, y, z, originalZ: z });
    }
  };

  p.draw = () => {    
    p.background(backgroundColor);
    p.rotateX(p.frameCount * 0.0001);
    p.rotateY(p.frameCount * -0.0001);
    p.rotateZ(p.frameCount * 0.0001);
    p.fill(color);
    p.ambientLight(100, 100, 100);
    p.directionalLight(255, 255, 255, 0.25, 0.25, -1);
    p.specularMaterial(255, 150, 150);
    p.emissiveMaterial(10, 20, 55);
    p.pointLight(
      255,
      200,
      150,
      p.mouseX - p.width / 2,
      p.mouseY - p.height / 2,
      200
    );
    p.shininess(255);
    p.noStroke();
    let twinkleFactor = p.sin(p.frameCount * 0.01) * 0.2 + 2;
    for (let i = 0; i < dots.length; i++) {
      p.push();
      let pos = dots[i];
      p.translate(pos.x, pos.y, pos.z);
      p.sphere(twinkleFactor, 4, 4);
      p.pop();
    }
  };

  p.windowResized = () => {
    p.resizeCanvas(window.innerWidth, window.innerHeight);
  };
};
