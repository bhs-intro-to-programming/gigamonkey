import vector from './vector.js';

class Line {
  constructor(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
  }

  draw(g) {
    g.drawLine(this.p1.x, this.p1.y, this.p2.x, this.p2.y, 'black', 1);
  }

  closestPoint(p) {
    // Adapted from https://stackoverflow.com/a/3122532/19588965
    const toP = p.minus(this.p1);
    const segment = this.p2.minus(this.p1);
    const dot = segment.dot(toP);
    const t = dot / segment.magnitudeSquared(); // I don't really grok this line

    // Apparently t is scaled by the magnitude of the segment so that t=0 when
    // the point is at p1 and t=1 when point is at p2. Otherwise the closest
    // point is off the segment. Still not sure how that works out.
    if (0 <= t && t <= 1) {
      return this.p1.plus(segment.times(t));
    } else {
      if (this.p1.minus(p).length() < this.p2.minus(p).length()) {
        return this.p1;
      } else {
        return this.p2;
      }
    }
  }
}

export default (p1, p2) => new Line(p1, p2);
