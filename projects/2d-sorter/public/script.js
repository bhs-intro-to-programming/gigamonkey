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
  constructor(x, y, label) {
    this.x = x;
    this.y = y;
    this.label = label;
  }
}

const logEvent = (e) => { console.log(e); };

const svg = new Svg(document.getElementById("plot"));
svg.selected = null;

const middleX = svg.width / 2;
const middleY = svg.height / 2;

const axesOpts = { stroke: "#aaa", 'stroke-width': 2 };
svg.line(middleX, 50, middleX, svg.height - 50, axesOpts);
svg.line(100, middleY, svg.width - 100, middleY, axesOpts);

svg.text(middleX, 45, "Good Tool", { 'text-anchor': 'middle', 'dominant-baseline': 'text-after-edge' } );
svg.text(middleX, svg.height - 45, "Bad Tool", { 'text-anchor': 'middle', 'dominant-baseline': 'text-before-edge' });

svg.text(0, middleY, "Hurts learning", { 'text-anchor': 'start', 'dominant-baseline': 'middle' });
svg.text(svg.width, middleY, "Helps learning", { 'text-anchor': 'end', 'dominant-baseline': 'middle' });

svg.e.onmousedown = (evt) => {
  if (evt.target !== svg.e) {
    svg.selected = evt.target.parentNode;
    console.log(`selecting ${svg.selected}`);
    evt.stopPropagation();
  } else {
    if (uses.length > 0) {
      const { offsetX: x, offsetY: y } = evt;
      const label = uses.pop();
      const g = svg.g({'class': 'item', 'draggable': true});
      svg.circle(x, y, 4, { 'fill': '#f003', 'stroke': 'blue', 'stroke-width': 1 }, g);
      svg.text(x + 8, y + 2, label, { 'text-anchor': 'start', 'dominant-baseline': 'middle' }, g);
      itemsToSvg.set(label, g);
      svgToItems.set(g, lable);
    }
  }
};

svg.e.onmouseup = () => {
  console.log(`deselecting ${svg.selected}`);
  svg.selected = null;
};

svg.e.onmousemove = (evt) => {
  if (svg.selected !== null) {
    const { offsetX: x, offsetY: y } = evt;
    console.log(`dragging to ${x},${y}`);
  }

};
