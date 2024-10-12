import p5 from "p5";

export const audioVisualizer_v5 = (p, analyser) => {
  let cols, rows, layers;
  const scale = 40;
  const audioFreqs = new Uint8Array(1024);

  // Get color by frequency
  function getColorByFrequency(freq) {
    if (freq === 0) return [0, 0, 0, 255];
    else
      return [
        156,
        p.map(freq, 0, 255, 40, 120),
        37,
        p.map(freq, 0, 255, 1, 200),
      ];
  }

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
    p.background(0, 0, 0, 0);

    cols = p.floor(p.width / scale);
    rows = p.floor(p.height / scale);
    layers = p.floor(p.width / scale);

  };

  p.draw = () => {
    p.background(0, 50);

    let centerX = 0;
    let centerY = 0;
    let centerZ = 0;

    analyser.getByteFrequencyData(audioFreqs);

    p.rotateY(p.frameCount * 0.01);
    p.rotateX(p.frameCount * 0.005);

    for (let z = 0; z < layers; z++) {
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const posX = x * scale - p.width / 2;
          const posY = y * scale - p.height / 2;
          const posZ = z * scale - p.width / 2;

          const distFromCenter = p.dist(
            posX,
            posY,
            posZ,
            centerX,
            centerY,
            centerZ
          );

          const freqIndex = p.floor(
            p.map(
              distFromCenter,
              0,
              p.dist(0, 0, 0, centerX, centerY, centerZ),
              0,
              audioFreqs.length
            )
          );

          const freq = audioFreqs[freqIndex];
          const color = getColorByFrequency(freq);

          const angle = p.noise(x, y, z) * p.TWO_PI * 2;
          const vector = p5.Vector.fromAngle(angle);
          vector.setMag(1);
          p.push();
          p.translate(
            posX + vector.x * scale,
            posY + vector.y * scale,
            posZ + vector.z * scale
          );
          p.stroke(color)
          p.pop();
        }
      }
    }
  };
};
