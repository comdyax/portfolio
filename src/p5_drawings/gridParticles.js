import p5 from "p5";

export const gridParticles = (props) => {
  let particles = [];
  let gridSize = 8;
  let particleCount = 15000;
  let fadingTrails = 20
  let particleSpeed = 1;
  let transparency = 10;
  let particleColor = (240, 223, 199);
  let backgroundColor = (5, 0, 5)
  let particleSize = 1;

  props.setup = () => {
    props.createCanvas(window.innerWidth +gridSize, window.innerHeight + gridSize);
    props.background(backgroundColor);

    // Create all particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  };

  props.draw = () => {
    props.background(backgroundColor, fadingTrails);

    particles.forEach((particle) => {
      particle.update();
      particle.show(transparency, particleSize, particleColor);
    });
  };

  props.windowResized = () => {
    location.reload();
  };

  // Particle class
  class Particle {
    constructor() {
      // Snap initial position to the grid
      this.pos = props.createVector(
        props.round(props.random(props.width) / gridSize) * gridSize,
        props.round(props.random(props.height) / gridSize) * gridSize
      );
      this.vel = props.createVector(0, 0);
      this.target = this.pos.copy(); // Target grid point the particle is moving toward
      this.maxSpeed = particleSpeed;
      this.prevPos = this.pos.copy();
      this.prevGrids = []; // List of all previously visited grid points
      this.prevGrids.push(this.pos.copy()); // Store initial position
      this.lastDirection = null; // Track the last movement direction
    }

    // Get all valid directions excluding the ones that would go off the screen or lead backward
    getPossibleDirections(currentPos) {
      let directions = [
        props.createVector(1, 0), // Right
        props.createVector(-1, 0), // Left
        props.createVector(0, 1), // Down
        props.createVector(0, -1), // Up
        props.createVector(1, 1), // Diagonal down-right
        props.createVector(-1, 1), // Diagonal down-left
        props.createVector(1, -1), // Diagonal up-right
        props.createVector(-1, -1), // Diagonal up-left
      ];

      // Filter out directions that would move the particle off-screen
      let validDirections = directions.filter((dir) => {
        let nextPos = props.createVector(
          currentPos.x + dir.x * gridSize,
          currentPos.y + dir.y * gridSize
        );
        return (
          nextPos.x >= 0 &&
          nextPos.x < props.width &&
          nextPos.y >= 0 &&
          nextPos.y < props.height
        );
      });

      // Filter out the reverse of the last direction to prevent 180-degree turn
      if (this.lastDirection) {
        validDirections = validDirections.filter((dir) => {
          return !dir.equals(this.lastDirection.copy().mult(-1));
        });
      }

      return validDirections;
    }

    update() {
      // Move towards the target grid point
      let direction = p5.Vector.sub(this.target, this.pos);
      this.vel = direction.setMag(this.maxSpeed); // Set velocity toward the next grid point
      this.pos.add(this.vel);

      // Check if the particle has reached the target grid point
      if (p5.Vector.dist(this.pos, this.target) < 1) {
        this.pos = this.target.copy(); // Snap to the target point
        this.chooseNextGridPoint(); // Choose the next grid point to move to
      }
    }

    chooseNextGridPoint() {
      let possibleDirections = this.getPossibleDirections(this.pos);

      if (possibleDirections.length > 0) {
        // Choose a random valid direction (excluding directions leading off-screen and reverse direction)
        let direction = props.random(possibleDirections);

        // Calculate the next grid point based on the chosen direction
        let nextX = this.pos.x + direction.x * gridSize;
        let nextY = this.pos.y + direction.y * gridSize;

        // Set the new target grid point
        this.target = props.createVector(nextX, nextY);
        this.lastDirection = direction.copy(); // Store the last movement direction
        this.prevGrids.push(this.pos.copy()); // Store the current grid point in history
      } else {
        // No valid directions found, bounce back by reversing the velocity
        this.vel.mult(-1);
        this.target = this.pos.copy(); // Stop the particle from moving
      }
    }

    show() {
      props.stroke(particleColor, transparency);
      props.strokeWeight(particleSize);
      props.line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
      this.updatePrev();
    }

    updatePrev() {
      this.prevPos.x = this.pos.x;
      this.prevPos.y = this.pos.y;
    }
  }
};
