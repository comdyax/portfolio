export const audioVisualizer = (p) => {
  let size = 14;
  let num = 10;
  let grid = [];
  let min = 156;
  let audioContext;
  let audioElement;
  let analyser;
  let dataArray = new Uint8Array(128);
  let distFromCenter = [];
  let audioUrl = "/platte.wav";

  // let rotationSpeedX = 0.01;
  // let rotationSpeedY = 0.01;
  // let rotationSpeedZ = 0.01;

  // let targetSpeedX = 0.01;
  // let targetSpeedY = 0.01;
  // let targetSpeedZ = 0.01;

  // let iterationCount = 0;
  const lerpFactor = 0.4;

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
    p.background(0, 0, 0, 0);

    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    audioElement = new Audio(audioUrl);

    const source = audioContext.createMediaElementSource(audioElement);
    analyser = audioContext.createAnalyser();

    source.connect(analyser);
    analyser.connect(audioContext.destination);

    audioElement.play();

    for (let i = 0; i < num; i++) {
      grid[i] = [];
      for (let j = 0; j < num; j++) {
        grid[i][j] = [];
        for (let k = 0; k < num; k++) {
          grid[i][j][k] = p.floor(p.random(2));

          let offset = size / 2 - (num / 2) * size;
          let x = i * size + offset;
          let y = j * size + offset;
          let z = k * size + offset;
          let distance = p.dist(x, y, z, 0, 0, 0);

          distFromCenter.push({ i, j, k, x, y, z, distance });
        }
      }
    }

    distFromCenter.sort((a, b) => a.distance - b.distance);
  };

  p.draw = () => {
    p.background(0, 0, 0, 0);
    p.orbitControl();
    p.camera(600, -400, -400);

    p.rotateX(p.frameCount * 0.001);
    p.rotateY(p.frameCount * 0.001);
    p.rotateZ(p.frameCount * 0.001);

    analyser.getByteFrequencyData(dataArray);
    // // Smoothly update the rotation speeds every frame using lerp
    // rotationSpeedX = p.lerp(rotationSpeedX, targetSpeedX, lerpFactor);
    // rotationSpeedY = p.lerp(rotationSpeedY, targetSpeedY, lerpFactor);
    // rotationSpeedZ = p.lerp(rotationSpeedZ, targetSpeedZ, lerpFactor);

    // // Apply rotation based on the current speed
    // p.rotateX(p.frameCount * rotationSpeedX);
    // p.rotateY(p.frameCount * rotationSpeedY);
    // p.rotateZ(p.frameCount * rotationSpeedZ);

    // // Update target speeds every 100 iterations to avoid abrupt changes
    // if (iterationCount % 100 === 0) {
    //   // Map the frequency data to rotation speeds
    //   let spectrumValue = dataArray[iterationCount % dataArray.length];
    //   targetSpeedX = p.map(spectrumValue, 0, 255, 0.0001, 0.001); // Map to a reasonable speed range
    //   targetSpeedY = p.map(spectrumValue, 0, 255, 0.0001, 0.001);
    //   targetSpeedZ = p.map(spectrumValue, 0, 255, 0.0001, 0.001);
    // }

    // // Increment iteration count for controlling the speed update frequency
    // iterationCount++;

    for (let i = 0; i < distFromCenter.length; i++) {
      let pos = distFromCenter[i];

      let spectrumValue = dataArray[i % dataArray.length];
      let expansion = p.map(spectrumValue, 0, 255, 2, 6);

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

      let c = p.map(spectrumValue, 0, 255, min, 255);
      grid[pos.i][pos.j][pos.k] = c;

      if (grid[pos.i][pos.j][pos.k] > min) {
        p.fill(grid[pos.i][pos.j][pos.k], 95, 37, 100);
      } else {
        p.fill(100, 86, 74, 50);
      }
      p.push();
      p.translate(pos.currentX, pos.currentY, pos.currentZ);
      // p.stroke(28,28,28,255);
      p.strokeWeight(0.5);
      let rotationAmount = p.map(spectrumValue, 0, 255, 0, p.PI);
      p.rotateX(rotationAmount / 2);
      p.rotateY(rotationAmount / 5);
      p.rotateZ(rotationAmount / 3);
      // p.box(size - size / 4);
      p.sphere(size / 2, 4, 4);
      p.pop();
    }
  };
};
