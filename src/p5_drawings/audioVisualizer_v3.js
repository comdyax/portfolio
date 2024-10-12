export const audioVisualizer_v3 = (p, analyser) => {
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
      for (let i = 0; i < audioFreqs.length + 128; i++) {
        let x = p.map(
          i,
          0,
          audioFreqs.length + 128,
          frameSize,
          window.innerWidth - frameSize
        );
        let y1 = frameSize;
        let y2 = p.ceil(window.innerHeight - frameSize);
        objectData.push({ x, y1, y2 });
      }
    };
  
    p.draw = () => {
      p.clear()
      analyser.getByteFrequencyData(audioFreqs);
      let x = 0
      for (let i = p.floor(objectData.length / 2); i < objectData.length; i++) {
        let pos = objectData[i];
        let freq = audioFreqs[x];
        let color = getColorByFrequency(freq);
        p.stroke(color);
        p.strokeWeight(strokeWeight);
        let ampY1 = p.map(freq, 0, 255, p.floor(window.innerHeight / 2), pos.y1)
        let ampY2 = p.map(freq, 0, 255, p.floor(window.innerHeight / 2), pos.y2)
        p.line(pos.x, ampY1, pos.x, ampY2);
        x++
      }
      x = 0
      for (let j = p.floor(objectData.length / 2) - 1; j >= 0; j--) {
        let pos = objectData[j];
        let freq = audioFreqs[x];
        let color = getColorByFrequency(freq);
        p.stroke(color);
        p.strokeWeight(strokeWeight);
        let ampY1 = p.map(freq, 0, 255, p.floor(window.innerHeight / 2), pos.y1)
        let ampY2 = p.map(freq, 0, 255, p.floor(window.innerHeight / 2), pos.y2)
        p.line(pos.x, ampY1, pos.x, ampY2);
        x++
      }
      x = 0
    };
  };
  