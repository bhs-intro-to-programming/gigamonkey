import { Svg } from './svg.js';

const itemsToSvg = new Map();
const svgToItems = new Map();

const uses = [
  "Write an essay",
  "Summarize some text",
  "Ask the name of a rhetorical device",
  "Find grammatical errors in writing",
  "Get style suggestions on code",
  "Get quotations from a book",
];

class Item {
  // x, and y are values in the range [-1, 1] indicating how far they are from
  // the origin on each scale.
  constructor(label, svg, g) {
    this.label = label;
    this.position = { x: 0, y: 0 };
    this.g = g;
    this.xScale = svg.width / 2;
    this.yScale = svg.height / 2;
  }

  moveTo(pos) {
    this.position = pos;
    const x = this.position.x * this.xScale;
    const y = - (this.position.y * this.yScale);
    this.g.setAttribute('transform', `translate(${x} ${y})`);
  }
}

const logEvent = (e) => { console.log(e); };

const svg = new Svg(document.getElementById("plot"));
const origin = { x: svg.width / 2, y: svg.height / 2 };

svg.selected = null;

const axesOpts = { 'class': 'axis' };

svg.line(origin.x, 50, origin.x, svg.height - 50, axesOpts);
svg.line(100, origin.y, svg.width - 100, origin.y, axesOpts);

svg.text(origin.x, 45, "Good Tool", { 'text-anchor': 'middle', 'dominant-baseline': 'text-after-edge' } );
svg.text(origin.x, svg.height - 45, "Bad Tool", { 'text-anchor': 'middle', 'dominant-baseline': 'text-before-edge' });

svg.text(0, origin.y, "Hurts learning", { 'text-anchor': 'start', 'dominant-baseline': 'middle' });
svg.text(svg.width, origin.y, "Helps learning", { 'text-anchor': 'end', 'dominant-baseline': 'middle' });

svg.e.onmousedown = (evt) => {
  if (evt.target !== svg.e) {
    svg.selected = evt.target.parentNode;
    evt.stopPropagation();
  } else {
    if (uses.length > 0) {
      const { offsetX: x, offsetY: y } = evt;
      const label = uses.pop();

      const pos = logicalPosition(x, y, origin, svg);

      const g = svg.g({'class': 'item', 'draggable': true});
      svg.circle(origin.x, origin.y, 4, { 'fill': '#f003', 'stroke': 'blue', 'stroke-width': 1 }, g);
      svg.text(origin.x + 8, origin.y + 2, label, { 'text-anchor': 'start', 'dominant-baseline': 'middle' }, g);

      const item = new Item(label, svg, g);
      svgToItems.set(g, item);
      item.moveTo(pos);
    }
  }
};

const logicalPosition = (x, y, origin, svg) => {
  return { x: (x - origin.x) / (svg.width / 2), y: (origin.y - y) / (svg.height / 2) };
};

svg.e.onmouseup = () => {
  svg.selected = null;
};

svg.e.onmousemove = (evt) => {
  if (svg.selected !== null) {
    svgToItems.get(svg.selected).moveTo(logicalPosition(evt.offsetX, evt.offsetY, origin, svg));
  }
};
