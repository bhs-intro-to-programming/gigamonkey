class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  plus(other) {
    return new Vector(this.x + other.x, this.y + other.y);
  }

  minus(other) {
    return new Vector(this.x - other.x, this.y - other.y);
  }

  times(n) {
    return new Vector(this.x * n, this.y * n);
  }

  divide(n) {
    return new Vector(this.x / n, this.y / n);
  }

  length() {
    return Math.hypot(this.x, this.y);
  }
  distance(other) {
    return Math.hypot(this.x - other.x, this.y - other.y);
  }
}

export default (x, y) => new Vector(x, y);