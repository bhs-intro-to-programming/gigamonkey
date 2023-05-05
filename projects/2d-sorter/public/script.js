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

const gt = svg.text(origin.x, 0, "Good Tool", { 'text-anchor': 'middle', 'dominant-baseline': 'text-after-edge' } );
const bt = svg.text(origin.x, svg.height - 10, "Bad Tool", { 'text-anchor': 'middle', 'dominant-baseline': 'text-before-edge' });

const hurts = svg.text(0, origin.y, "Hurts learning", { 'text-anchor': 'start', 'dominant-baseline': 'middle' });
const helps = svg.text(svg.width, origin.y, "Helps learning", { 'text-anchor': 'end', 'dominant-baseline': 'middle' });

const hBorder = Math.max(hurts.getBBox().width, helps.getBBox().width) + 5;
const vBorder = Math.max(gt.getBBox().height, bt.getBBox().height) * 2;

bt.setAttribute('y', svg.height - (vBorder - 5));
gt.setAttribute('y', (vBorder - 5));

// Draw box for debugging
//svg.rect(hBorder, vBorder, svg.width - hBorder * 2, svg.height - vBorder * 2, {});

// Draw axes
svg.line(origin.x, vBorder, origin.x, svg.height - vBorder, axesOpts);
svg.line(hBorder, origin.y, svg.width - hBorder, origin.y, axesOpts);
svg.polygon(
  [
    {x: origin.x - 10, y: vBorder + 10},
    {x: origin.x + 10, y: vBorder + 10},
    {x: origin.x, y: vBorder},
  ], axesOpts);
svg.polygon(
  [
    {x: origin.x - 10, y: svg.height - vBorder - 10},
    {x: origin.x + 10, y: svg.height - vBorder - 10},
    {x: origin.x, y: svg.height - vBorder},
  ], axesOpts);
svg.polygon(
  [
    {x: svg.width - hBorder - 10, y: origin.y - 10 },
    {x: svg.width - hBorder - 10, y: origin.y + 10 },
    {x: svg.width - hBorder, y: origin.y },
  ], axesOpts);

svg.polygon(
  [
    {x: hBorder + 10, y: origin.y - 10 },
    {x: hBorder + 10, y: origin.y + 10 },
    {x: hBorder, y: origin.y },
  ], axesOpts);


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
