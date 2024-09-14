import p5 from "p5";

export const flowField = (props) => {
  let cols, rows, centerX, centerY;
  let scale = 20;
  let particles = [];
  let particleCount = 40000;
  let particleSize = 1;
  let fadingTrails = 20;
  let particleSpeed = 1; // this can change interactive maybe on movement (1-10)
  let flowField;
  let inc = 0.1; // Perlin noise increment
  let transparency = 0; // this can change interactive maybe on movement 0-40
  let transparencyThreshold = 40;
  let dissipationFactor = 0.03;
  let dissipationThreshold = 0.5; // this can change interactive maybe on movement 0-1
  let dissipate = true;

  props.setup = () => {
    props.createCanvas(window.innerWidth + scale, window.innerHeight + scale);
    props.background(0)

    cols = props.floor(props.width / scale);
    rows = props.floor(props.height / scale);
    centerX = props.floor(props.width / 2)
    centerY = props.floor(props.height / 2)

    flowField = new Array(cols * rows);

    // Create all particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  };

  props.draw = () => {
    props.background(0, fadingTrails);

    let yoff = 0;
    let t = props.sin(transparency) * 0.5 + 0.5; // Oscillates between 0 and 1

     //Calculate distance from mouse to the center
     let distanceFromCenter = props.dist(props.mouseX, props.mouseY, centerX, centerY);
    
     // Calculate the maximum distance from the center to any corner
     let maxDistance = props.dist(0, 0, centerX, centerY);
     
     let normalizedDistance = props.map(distanceFromCenter, 0, maxDistance, 1, 0);     
     // Map normalized distance to transparency and dissipationFactor
     //particleSpeed = normalizedDistance + 1
    //transparency = normalizedDistance * transparencyThreshold;
    //dissipationFactor = normalizedDistance * dissipationThreshold;

    if (dissipate == true) {
      dissipationFactor += 0.001;
      transparency += 0.01;
      if (dissipationFactor >= dissipationThreshold) {
        dissipate = false;
      }
    } else if (dissipate == false) {
      dissipationFactor -= 0.001;
      transparency -= 0.01;
      if (dissipationFactor <= 0.0) {
        dissipate = true;
      }
    }

    // Create the Perlin noise flow field
    for (let y = 0; y < rows; y++) {
      let xoff = 0;
      for (let x = 0; x < cols; x++) {
        let index = x + y * cols;

        // Generate noise-based direction
        let angle = props.noise(xoff, yoff, t) * props.TWO_PI * 2;
        let v = p5.Vector.fromAngle(angle).setMag(1);

        if (flowField[index]) {
          flowField[index].lerp(v, dissipationFactor);
        } else {
          flowField[index] = v;
        }
        xoff += inc;
      }
      yoff += inc;
    }

    particles.forEach((particle) => {
      particle.follow(flowField);
      particle.update();
      particle.edges();
      particle.show(transparency);
    });
  };

  props.windowResized = () => {
    location.reload();
  };

  class Particle {
    constructor() {
      this.pos = props.createVector(
        props.random(props.width),
        props.random(props.height)
      );
      this.vel = props.createVector(0, 0);
      this.acc = props.createVector(0, 0);
      this.maxSpeed = particleSpeed;
      this.prevPos = this.pos.copy();
    }

    applyForce(force) {
      this.acc.add(force);
    }

    follow(vectors) {
      let x = props.floor(this.pos.x / scale);
      let y = props.floor(this.pos.y / scale);
      let index = x + y * cols;
      let force = vectors[index];
      this.applyForce(force);
    }

    update() {
      this.maxSpeed = particleSpeed
      this.vel.add(this.acc);
      this.vel.limit(this.maxSpeed);
      this.pos.add(this.vel);
      this.acc.mult(0);
    }

    show(transparency) {
      if (transparency < transparencyThreshold) props.stroke(255, transparency);
      else props.stroke(255, transparencyThreshold);
      props.strokeWeight(particleSize);
      props.line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
      this.updatePrev();
    }

    updatePrev() {
      this.prevPos.set(this.pos);
    }

    edges() {
      // Handle wrapping around edges of the canvas
      if (this.pos.x > props.width) this.pos.x = 0;
      if (this.pos.x < 0) this.pos.x = props.width;
      if (this.pos.y > props.height) this.pos.y = 0;
      if (this.pos.y < 0) this.pos.y = props.height;
      this.updatePrev();
    }
  }
};
