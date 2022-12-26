/*
 * Get or create a single element.
 */
const $ = (q) => {
  let m;
  if (m = q.match(/^<(\w+)>$/)) {
    return document.createElement(m[1]);
  } else {
    return document.querySelector(q);
  }
}

/*
 * Get all elements matching the selector.
 */
const $$ = (q) => document.querySelectorAll(q);

/*
 * Create a text node.
 */
const text = (t) => document.createTextNode(t);

/*
 * Create a node from literal HTML.
 */
const html = (html) => {
  const t = document.createElement('template');
  t.innerHTML = html;
  return t.content;
};
