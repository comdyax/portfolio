import p5 from "p5";

export const gridParticles = (props) => {
  let particles = [];
  let gridSize = 50;
  let particleCount = 200;
  let fadingTrails = 10;
  let particleSpeed = 0.5;

  props.setup = () => {
    props.createCanvas(window.innerWidth, window.innerHeight);
    props.background(0);

    // Create all particles
    for (let i = 0; i < particleCount; i++) {
      particles[i] = new Particle();
    }
  };

  props.draw = () => {
    props.background(0, fadingTrails);

    particles.forEach((particle) => {
      particle.update();
      particle.edges();
      particle.show();
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
    }

    // Get all valid directions excluding the ones that lead to previously visited grid points
    getPossibleDirections(currentPos, prevGrids) {
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

      // Filter out any directions that would lead to a previously visited grid point
      return directions.filter((dir) => {
        let nextPos = props.createVector(
          currentPos.x + dir.x * gridSize,
          currentPos.y + dir.y * gridSize
        );
        return !prevGrids.some((prev) => prev.equals(nextPos)); // Avoid revisiting grid points
      });
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
      let possibleDirections = this.getPossibleDirections(
        this.pos,
        this.prevGrids
      );

      if (possibleDirections.length > 0) {
        // Choose a random valid direction (excluding visited ones)
        let direction = props.random(possibleDirections);

        // Calculate the next grid point based on the chosen direction
        let nextX = this.pos.x + direction.x * gridSize;
        let nextY = this.pos.y + direction.y * gridSize;

        // Wrap around the edges of the canvas
        if (nextX >= props.width) nextX = 0;
        if (nextX < 0) nextX = props.width - gridSize;
        if (nextY >= props.height) nextY = 0;
        if (nextY < 0) nextY = props.height - gridSize;

        // Set the new target grid point and update the previous grid point list
        if (props.dist(this.pos.x, nextX, this.pos.y, nextY) <= 5) {
          this.target = props.createVector(nextX, nextY);
          this.prevGrids.push(this.pos.copy()); // Store the current grid point in history
        } else this.resetPath();
      } else {
        // No valid directions found, reset to an adjacent grid point
        this.resetPath();
      }
    }

    resetPath() {
      let adjacentDirections = [
        props.createVector(1, 0), // Right
        props.createVector(-1, 0), // Left
        props.createVector(0, 1), // Down
        props.createVector(0, -1), // Up
      ];

      // Remove directions leading to previously visited grid points
      adjacentDirections = adjacentDirections.filter((dir) => {
        let nextPos = props.createVector(
          this.pos.x + dir.x * gridSize,
          this.pos.y + dir.y * gridSize
        );
        return !this.prevGrids.some((prev) => prev.equals(nextPos)); // Avoid revisiting grid points
      });

      if (adjacentDirections.length > 0) {
        // Choose a random adjacent direction
        let direction = props.random(adjacentDirections);

        // Calculate the new grid point based on the chosen direction
        let nextX = this.pos.x + direction.x * gridSize;
        let nextY = this.pos.y + direction.y * gridSize;

        // Wrap around the edges of the canvas
        if (nextX >= props.width) nextX = 0;
        if (nextX < 0) nextX = props.width - gridSize;
        if (nextY >= props.height) nextY = 0;
        if (nextY < 0) nextY = props.height - gridSize;

        // Reset path and target
        this.prevGrids = [this.pos.copy()]; // Clear previous visits
        this.target = props.createVector(nextX, nextY); // Set new target to adjacent point
      } else {
        // If no adjacent grid points are valid, restart at random position
        this.pos = props.createVector(
          props.round(props.random(props.width) / gridSize) * gridSize,
          props.round(props.random(props.height) / gridSize) * gridSize
        );
        this.target = this.pos.copy(); // Reset target to new random position
        this.prevGrids = [this.pos.copy()]; // Store new initial position
      }
    }

    show() {
      props.stroke(255, 100); // White with transparency
      props.strokeWeight(1); // Particle size
      props.line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
      this.updatePrev();
    }

    updatePrev() {
      this.prevPos.x = this.pos.x;
      this.prevPos.y = this.pos.y;
    }

    edges() {
      // Handle wrapping around edges of the canvas
      if (this.pos.x >= props.width) this.pos.x = 0;
      if (this.pos.x < 0) this.pos.x = props.width - gridSize;
      if (this.pos.y >= props.height) this.pos.y = 0;
      if (this.pos.y < 0) this.pos.y = props.height - gridSize;

      // Update previous position
      this.updatePrev();
    }
  }
};
