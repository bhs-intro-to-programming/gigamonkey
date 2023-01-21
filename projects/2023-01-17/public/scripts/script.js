// Set up some helper functions to make things less verbose.

const body = document.querySelector('body');

const text = (s) => document.createTextNode(s);

const taggedText = (tag, s) => {
  const e = document.createElement(tag);
  // A note on the next line: I fibbed a bit when I told you that the condition
  // in an if had to be a boolean value. In fact you can use any value in a
  // context where you need a boolean and Javascript will convert it to a
  // boolean using a set of rules that govern what values are "truthy" and which
  // are "falsey". Basically, the boolean value false, the number 0, the numeric
  // value NaN ("not a number"), the empty string, the special values null and
  // undefined, and a handful of others you won't run into for a while are all
  // falsey and all other values are truthy. If we call a function with fewer
  // arguments than are listed in the function's argument list, then the
  // left-over arguments take the value undefined which is falsey. So this next
  // expression means we only try to add a text element if s was actually passed
  // (and was a truthy value such as a non-empty string). We could make this
  // more explicit by writing, say s !== undefined but this style is a pretty
  // common Javascript idiom.
  if (s) e.append(text(s));
  return e;
};

const taggedChildren = (tag, children) => {
  const element = document.createElement(tag);
  children.forEach(c => element.append(c));
  return element;
};

const addAttribute = (element, attribute, value) => {
  element.setAttribute(attribute, value);
  return element;
};

const h1 = (s) => taggedText('h1', s);
const p = (s) => taggedText('p', s);
const code = (s) => taggedText('code', s);
const ol = (children) => taggedChildren('ol', children);
const li = (children) => taggedChildren('li', alternating(code, text, children));
const a = (href, text) => addAttribute(taggedText('a', text), 'href', href);
const img = (src, alt) => addAttribute(addAttribute(taggedText('img'), 'src', src), 'alt', alt);
const div = (children) => taggedChildren('div', children);

// This is a bit fancy. Most of you haven't learned all the pieces needed to
// understand this function. Basically the first two arguments are functions
// that take a string and produce and node, e.g. code and text. The third
// argument is an array of strings and this maps over that array return a new
// array consisting of the elements by calling the two function arguments in
// alternating order.
const alternating = (a, b, items) => items.map((item, i) => (i % 2 === 0 ? a : b)(item));

// Now build the page

body.append(
  h1('Can you tell me why HTML was developed?'),

  p(`
    HTML (Hypertext Markup Language) was developed to create a standard way
    to create and structure documents on the World Wide Web. It allows
    developers to create structured documents, including headings,
    paragraphs, images and links, that can be displayed in a web browser.
    It was created to simplify the process of creating and sharing
    documents online, so that anyone can create and view web pages with a
    consistent look and feel.
`),

  h1('What about using HTML for GUIs?'),

  p(`
    HTML can be used to create user interfaces for web applications, but it
    is primarily designed as a markup language for creating structured
    documents to be displayed in web browsers. While it can be used to
    create basic user interfaces, it is not typically considered a good
    choice for creating complex, interactive user interfaces. Other
    technologies such as JavaScript and CSS are typically used in
    conjunction with HTML to create more advanced user interfaces for web
    applications. Additionally, there are other technologies such as
    Electron, React Native and NativeScript that allow to create
    cross-platform desktop and mobile apps using web technologies such as
    HTML, CSS, and JavaScript.
`),

  h1('What are some of the main elements of HTML?'),

  p('Some of the main elements of HTML include:'),

  ol([
    li([
      '<html>',
      `: This is the root element of an HTML document, and it contains
      all of the other elements.`
    ]),

    li([
      '<head>',
      `: This element contains information about the document,
      such as the title of the page, which is displayed in the
      browser's title bar or tab.`
    ]),

    li([
      '<body>',
      `: This element contains the content of the document
      that is displayed in the browser window.`
    ]),

    li([
      '<h1>', ' to ', '<h6>',
      `: These elements are used for headings and subheadings.
      <h1> is the highest level heading, while <h6> is the lowest.`
    ]),

    li(['<p>', ': This element is used for paragraphs of text.']),

    li([
      '<a>',
      `: This element is used for hyperlinks, which allow users to navigate between pages on the web.`
    ]),

    li(['<img>', ': This element is used to embed images in a web page.']),

    li([
      '<ul>', ' and ', '<ol>',
      `: These elements are used for unordered and ordered lists, respectively.`
    ]),

    li(['<li>', ': This element is used for list items.']),

    li([
      '<div>', ' and ', '<span>',
      `: These elements are used for grouping and applying styles to elements on a web page.`
    ]),
  ]),

  taggedChildren('p', alternating(text, code, [
    'These are some of the main elements, but there are many more available, like ',
    '<header>', ', ', '<nav>', ', ', '<main>', ', ', '<footer>', ', ', '<form>',
    ', ', '<input>', ', ', '<select>', ', etc.',
  ])),

  h1('Can you find a picture of the inventor of the web?'),

  img('/images/tim-berners-lee.jpg', 'A young Tim Berners-Lee'),

  p(`
  I'm sorry, I am a text based model and I am not able to find or show
  images. However, I can tell you that the inventor of the World Wide Web
  (WWW) is Sir Tim Berners-Lee. He is a British computer scientist and is
  considered to be the inventor of the World Wide Web. He proposed and
  developed the first successful communication between a Hypertext
  Transfer Protocol (HTTP) client and server via the Internet in 1989. He
  also created the first web browser, called WorldWideWeb, and the first
  web server, called httpd. He also wrote the first version of the HTML
  language, which provided the structure for web pages. He is currently
  working on a decentralized web project called Solid.
`),

  addAttribute(div([
    taggedChildren('p', [
      text('Text from 2023-01-14 conversation with '),
      a('https://chat.openai.com/chat', 'ChatGPT')
    ]),
    taggedChildren('p', [
      text('Photo of a young Tim Berners-Lee from '),
      a('https://www.flickr.com/photos/itupictures/16662336315', 'Flickr'),
      text(' no thanks to ChatGPT. ('),
      a('https://creativecommons.org/licenses/by/2.0/', 'CC BY 2.0')
    ])
  ]), 'class', 'credits'));