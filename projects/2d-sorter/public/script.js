import { Svg } from './svg.js';

const logEvent = (e) => { console.log(e); };

const svgToItems = new Map();

const uses = [
  "Write an essay",
  "Summarize text to help understand it",
  "Lookup the name of something from a description.",
  "Find grammatical errors in writing",
  "Get style suggestions on code",
  "Get style suggestions on writing",
  "Get quotations from a book",
];

class Item {
  // x, and y are values in the range [-1, 1] indicating how far they are from
  // the origin on each scale.
  constructor(label, bounds, g) {
    this.label = label;
    this.position = { x: 0, y: 0 };
    this.g = g;
    this.xScale = bounds.width / 2;
    this.yScale = bounds.height / 2;
  }

  moveTo(x, y, origin, bounds) {
    // Translate raw x,y SVG coordinate to -1,1 coordinates based on the
    // position within the bounds
    this.position = {
      x: clamp((x - origin.x) / (bounds.width / 2), -1, 1),
      y: clamp((origin.y - y) / (bounds.height / 2), -1, 1),
    };
    const nx = this.position.x * this.xScale;
    const ny = - (this.position.y * this.yScale);
    this.g.setAttribute('transform', `translate(${nx} ${ny})`);
  }

  physicalPosition (origin, bounds) {
    return {
      x: origin.x + this.position.x * (bounds.width / 2),
      y: origin.y - this.position.y * (bounds.height / 2),
    };
  };
}

const svg = new Svg(document.getElementById("plot"));

const origin = { x: svg.width / 2, y: svg.height / 2 };

const axesOpts = { 'class': 'axis' };
const labelPadding = 5;

const labels = {
  north: svg.text(origin.x, 0, "Good Tool", { 'text-anchor': 'middle', 'dominant-baseline': 'text-after-edge' } ),
  south: svg.text(origin.x, svg.height - 10, "Bad Tool", { 'text-anchor': 'middle', 'dominant-baseline': 'text-before-edge' }),
  west: svg.text(0, origin.y, "Hurts learning", { 'text-anchor': 'end', 'dominant-baseline': 'middle' }),
  east: svg.text(svg.width, origin.y, "Helps learning", { 'text-anchor': 'start', 'dominant-baseline': 'middle' }),
};

const hBorder = Math.max(labels.west.getBBox().width, labels.east.getBBox().width) * 3;
const vBorder = Math.max(labels.north.getBBox().height, labels.south.getBBox().height) * 2;

labels.south.setAttribute('y', svg.height - (vBorder - labelPadding));
labels.north.setAttribute('y', vBorder - labelPadding);
labels.west.setAttribute('x', hBorder - labelPadding);
labels.east.setAttribute('x', svg.width - hBorder + labelPadding);

const dragBounds = {
  x: hBorder,
  y: vBorder,
  width: svg.width - hBorder * 2,
  height: svg.height - vBorder * 2
};

const drawAxes = (svg) => {
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
};

const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

const setupDrag = (e) => {

  let selected = null;
  let clickOffset = null;

  e.onmousedown = (evt) => {
    const { offsetX: x, offsetY: y } = evt;

    if (evt.target !== e) {
      selected = evt.target.parentNode;

      // Get offset from where we actually clicked to where the item should be positioned.
      const p = svgToItems.get(selected)?.physicalPosition(origin, dragBounds);
      clickOffset = { x: x - p.x, y: y - p.y };

      evt.stopPropagation();
    } else {
      if (uses.length > 0) {
        clickOffset = { x: 0, y: 0 };
        selected = addItem(uses.pop(), x, y, e);
      }
    }
  };

  e.onmouseup = () => {
    selected = null;
    clickOffset = null;
  };

  e.onmousemove = (evt) => {
    if (selected !== null) {
      const { offsetX: x, offsetY: y } = evt;
      const item = svgToItems.get(selected);
      const newPos = { x: x - clickOffset.x, y: y - clickOffset.y };
      item.moveTo(newPos.x, newPos.y, origin, dragBounds);
    }
  };
}

const addItem = (label, x, y, e) => {
  const g = svg.g({ 'class': 'item' }, e);
  svg.circle(origin.x, origin.y, 4, { 'fill': '#f003', 'stroke': 'blue', 'stroke-width': 1 }, g);
  svg.text(origin.x + 8, origin.y + 2, label, { 'text-anchor': 'start', 'dominant-baseline': 'middle' }, g);

  const item = new Item(label, dragBounds, g);
  svgToItems.set(g, item);

  item.moveTo(x, y, origin, dragBounds);
  return g;
}

const randomSign = () => Math.sign(Math.random() - 0.5);
const randomNum = (n) => Math.floor(Math.random() * n);

const randomPositions = (bounds, e) => {
  const a = (Math.PI * 2) / uses.length - 2;
  const lim = Math.min(bounds.width / 4, bounds.height / 4);
  for (let i = 0; i < uses.length; i++) {
    const h = lim + randomNum(lim);
    const x = origin.x + Math.cos(a * i + 1) * h;
    const y = origin.y + Math.sin(a * i + 1) * h;
    addItem(uses[i], x, y, e);
  }
  uses.splice(0, uses.length);
};

drawAxes(svg);
randomPositions(dragBounds, svg.e);
setupDrag(svg.e);


document.querySelector('input').onchange = (e) => {
  addItem(e.currentTarget.value, origin.x, origin.y, svg.e);
  e.currentTarget.value = '';
}


// Create WebSocket connection.
const socket = new WebSocket(`ws://${window.location.host}`);

// Connection opened
socket.onopen = (event) => {
  console.log(`web socket opened`);
  console.log(event);
  socket.send("Hello Server!");
};

// Listen for messages
socket.onmessage = (event) => {
  console.log("Message from server ", event.data);
};
