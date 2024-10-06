import p5 from "p5";

export const logo = (p) => {
  let size = 3;
  let grid = 5;
  let distance = 5;
  let number = 2;
  let lineSize = 0.5;
  let color = [156, 95, 37];

  p.setup = () => {
    p.createCanvas(size*grid*2, size*grid *2, p.WEBGL);
  };

  p.draw = () => {
    p.background(0, 0, 0, 0);
    p.camera(600, -200, 0);
    p.rotateY(p.frameCount * 0.01);
    p.noFill();
    p.stroke(color);
    p.strokeWeight(lineSize);
    for (let i = 0; i < number; i++) {
      p.push();
      let pos = 0;
      if (number === 2) {
        pos = i === 0 ? -distance / 2 : distance / 2;
      } else
        pos = i < number / 2 ? -distance * i : distance * (i - number / 2 + 1);
      p.translate(0, 0, pos);
      for (let x = 0; x < grid; x++) {
        for (let y = 0; y < grid; y++) {
          let r = p.random(0, 100);
          p.square(
            x * size - (size * grid) / 2,
            y * size - (size * grid) / 2,
            size
          );
          if (r > 80) {
            p.fill(color);
          } else {
            p.noFill();
          }
        }
      }
      p.pop();
    }
  };
};
