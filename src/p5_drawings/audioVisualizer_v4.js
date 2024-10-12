export const audioVisualizer_v4 = (p, analyser) => {
  let audioFreqs = new Uint8Array(1024);
  let strokeWeight = p.ceil(window.innerWidth / 1024);
  let frameSize = 30;
  let objectData = [];
  let lowerColorBound = 40;
  let upperColorBound = 120;

  function getColorByFrequency(freq) {
    if (freq === 0) return [28, 28, 28, 100];
    else
      return [
        156,
        p.map(freq, 0, 255, lowerColorBound, upperColorBound),
        37,
        p.map(freq, 0, 255, 100, 255),
      ];
  }

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight);
    p.background(0, 0, 0, 0);
    for (let i = 0; i < audioFreqs.length; i++) {
      let x = p.map(
        i,
        0,
        audioFreqs.length,
        frameSize,
        window.innerWidth - frameSize
      );
      let y1 = frameSize;
      let y2 = p.ceil(window.innerHeight - frameSize);
      objectData.push({ x, y1, y2 });
    }
  };

  p.draw = () => {
    p.clear();
    analyser.getByteFrequencyData(audioFreqs);
    let x = 0;
    for (let i = p.floor(objectData.length / 2); i < objectData.length; i++) {
      let pos = objectData[i];
      let freq = audioFreqs[x];
      let color = getColorByFrequency(freq);
      p.stroke(color);
      p.strokeWeight(strokeWeight);
      p.line(pos.x, pos.y1, pos.x, pos.y2);
      x++;
    }
    x = 0;
    for (let j = p.floor(objectData.length / 2) - 1; j >= 0; j--) {
      let pos = objectData[j];
      let freq = audioFreqs[x];
      let color = getColorByFrequency(freq);
      p.stroke(color);
      p.strokeWeight(strokeWeight);
      p.line(pos.x, pos.y1, pos.x, pos.y2);
      x++;
    }
    x = 0;
  };
};
