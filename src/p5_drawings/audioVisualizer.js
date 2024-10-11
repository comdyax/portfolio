export const audioVisualizer = (p, analyser) => {
  let size = window.innerHeight / 60;
  let length = 11;
  let audioFreqs = new Uint8Array(128);
  let objectData = [];
  const lerpFactor = 0.85;
  let lowerColorBound = 40;
  let upperColorBound = 120;

  function getColorByFrequency(freq) {
    return [
      156,
      p.map(freq, 0, 255, lowerColorBound, upperColorBound),
      37,
      p.map(freq, 0, 255, 50, 140),
    ];
  }

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
    p.camera(400, -400, -400);
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length; j++) {
        for (let k = 0; k < length; k++) {
          let offset = size / 2 - (length / 2) * size;
          let x = i * size + offset;
          let y = j * size + offset;
          let z = k * size + offset;
          const insphere = Math.sqrt(x * x + y * y + z * z);
          if (insphere <= (length * size) / 2) {
            objectData.push({ x, y, z });
          }
        }
      }
    }
  };

  p.draw = () => {
    p.background(0, 0, 0, 0);
    p.rotateX(p.frameCount * 0.001);
    p.rotateY(p.frameCount * 0.001);
    p.rotateZ(p.frameCount * 0.001);

    p.ambientLight(500);
    p.directionalLight(255, 255, 255, 1, 0.5, 0.5);
    p.specularMaterial(5);

    if (analyser) {
      analyser.getByteFrequencyData(audioFreqs);
    }

    for (let i = 0; i < objectData.length; i++) {
      let pos = objectData[i];

      let freq = audioFreqs[i % audioFreqs.length];

      let expansion = p.map(freq, 0, 255, 2, 5);

      // Target positions for breathing effect based on audio spectrum data
      let targetX = pos.x * expansion;
      let targetY = pos.y * expansion;
      let targetZ = pos.z * expansion;

      // Initialize current positions if not already set
      if (!pos.currentX) {
        pos.currentX = pos.x;
        pos.currentY = pos.y;
        pos.currentZ = pos.z;
      }

      // Smoothly interpolate (lerp) the current position towards the target position
      pos.currentX = p.lerp(pos.currentX, targetX, lerpFactor);
      pos.currentY = p.lerp(pos.currentY, targetY, lerpFactor);
      pos.currentZ = p.lerp(pos.currentZ, targetZ, lerpFactor);

      let color = getColorByFrequency(freq);
      if (expansion > 2) p.fill(color);
      else p.fill(100, 86, 74, 20);

      p.push();
      p.translate(pos.currentX, pos.currentY, pos.currentZ);

      let rotationAmount = p.map(freq, 0, 255, 0, p.PI);
      p.rotateX(rotationAmount / 2);
      p.rotateY(rotationAmount / 5);
      p.rotateZ(rotationAmount / 3);
      // p.stroke(28, 28, 28, 255);
      // p.strokeWeight(0.1);
      // p.box(size * 0.8);

      p.noStroke();
      p.sphere(size * 0.5);
      p.pop();
    }
  };
};
