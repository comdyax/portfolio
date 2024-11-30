export const background = (p, backgroundColor, color) => {
  const count = p.floor(p.sqrt(window.innerHeight * window.innerWidth));
  const dots = [];
  // let maxDist = p.floor(p.sqrt((window.innerHeight * window.innerWidth) / 6));
  // let amplitude = 20;
  // let lerpFactor = 0.1;
  // let mouseEdge = 50;
  // let maxMovement = 70;

  // function updateZ(mouseX, mouseY, pos) {
  //   if (
  //     p.mouseX > mouseEdge &&
  //     p.mouseX < p.width - mouseEdge &&
  //     p.mouseY > mouseEdge &&
  //     p.mouseY < p.height - mouseEdge
  //   ) {
  //     let distance = p.dist(mouseX, mouseY, pos.x, pos.y);
  //     if (distance < maxDist) {
  //       let wave = p.sin((1 - distance / maxDist) * p.PI);
  //       let targetZ = pos.z + wave * amplitude;
  //       pos.z = p.lerp(
  //         pos.z,
  //         Math.min(targetZ, pos.originalZ + maxMovement),
  //         lerpFactor
  //       );
  //     } else {
  //       pos.z = p.lerp(pos.z, pos.originalZ, lerpFactor);
  //     }
  //   } else {
  //     pos.z = p.lerp(pos.z, pos.originalZ, lerpFactor);
  //   }
  //   return pos.z;
  // }

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
    let twinkleFactor = p.sin(p.frameCount * 0.01) * 0.2 + 1;
    for (let i = 0; i < dots.length; i++) {
      p.push();
      let pos = dots[i];
      // let z = updateZ(p.mouseX - p.width / 2, p.mouseY - p.height / 2, pos);
      // p.translate(pos.x, pos.y, z);
      p.translate(pos.x, pos.y, pos.z);
      p.sphere(twinkleFactor, 6, 5);
      p.pop();
    }
  };

  p.windowResized = () => {
    location.reload();
  };
};
