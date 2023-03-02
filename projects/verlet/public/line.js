import vector from './vector.js';

class Line {
  constructor(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
  }

  get mass() {
    return Infinity;
  }

  linePoint(p) {

  }

  distanceTo(p0) {
    // From https://en.wikipedia.org/wiki/Distance_from_a_point_to_a_line#Line_defined_by_two_points
    const twiceArea = Math.abs((p2.x - p1.x) * (p1.y - p0.y) - (p1.x - p0.x) * (p2.y - p1.y));
    const base = Math.hypot(p2.x - p1.x, p2.y - p1.y);
    return twiceArea / base;
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

  // This almost works except it's a pain to figure out if the result is
  // actually on the segment.
  closestPointX(p) {
    // Project the vector from the start of the line segment to point p onto the
    // vector of the line segment.
    const toP = p.minus(this.p1);
    const segment = this.p2.minus(this.p1);
    const u = segment.normalized();
    const v = u.times(toP.dot(u)); // projection of toP onto segment
    return this.p1.plus(v);
  }
}

export default (p1, p2) => new Line(p1, p2);
