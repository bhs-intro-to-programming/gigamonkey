// Set up some helper functions to make things less verbose.

const body = document.querySelector('body');

const add = (e) => body.append(e);

const text = (s) => document.createTextNode(s);

const tagged = (tag, s) => {
  const e = document.createElement(tag);
  if (s) e.append(text(s));
  return e;
};

const withChildren = (tag, children) => {
  const element = document.createElement(tag);
  children.forEach(c => element.append(c));
  return element;
};

const withAttribute = (element, attribute, value) => {
  element.setAttribute(attribute, value);
  return element;
}

const h1 = (s) => tagged('h1', s);
const p = (s) => tagged('p', s);
const code = (s) => tagged('code', s);
const li = (children) => withChildren('li', children);
const a = (href, text) => withAttribute(tagged('a', text), 'href', href);
const img = (src, alt) => withAttribute(withAttribute(tagged('img'), 'src', src), 'alt', 'alt');

// Now build the page

add(h1('Can you tell me why HTML was developed?'));

add(p(`
  HTML (Hypertext Markup Language) was developed to create a standard way
  to create and structure documents on the World Wide Web. It allows
  developers to create structured documents, including headings,
  paragraphs, images and links, that can be displayed in a web browser.
  It was created to simplify the process of creating and sharing
  documents online, so that anyone can create and view web pages with a
  consistent look and feel.
`));

add(h1('What about using HTML for GUIs?'));

add(p(`
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
`));

add(h1('What are some of the main elements of HTML?'));

add(p('Some of the main elements of HTML include:'));

add(withChildren('ol', [
  li([
    code('<html>'),
    text(`: This is the root element of an HTML document, and it
      contains all of the other elements.`),
  ]),

  li([
    code('<head>'),
    text(`: This element contains information about the document,
      such as the title of the page, which is displayed in the
      browser's title bar or tab.`)
  ]),

  li([
    code('<body>'),
    text(`: This element contains the content of the document
      that is displayed in the browser window.`)
  ]),

  li([
    code('<h1>'),
    text(' to '),
    code('<h6>'),
    text(`: These elements are used for headings and subheadings.
      <h1> is the highest level heading, while <h6> is the lowest.`)
  ]),

  li([
    code('<p>'),
    text(': This element is used for paragraphs of text.')
  ]),

  li([
    code('<a>'),
    text(`: This element is used for hyperlinks, which allow
      users to navigate between pages on the web.`)
  ]),

  li([
    code('<img>'),
    text(': This element is used to embed images in a web page.')
  ]),

  li([
    code('<ul>'),
    text(' and '),
    code('<ol>'),
    text(`: These elements are used for unordered and ordered
      lists, respectively.`)
  ]),

  li([
    code('<li>'),
    text(': This element is used for list items.')
  ]),

  li([
    code('<div>'),
    text(' and '),
    code('<span>'),
    text(`: These elements are used for grouping and
      applying styles to elements on a web page.`)
  ]),
]));

add(withChildren('p', [
  text('These are some of the main elements, but there are many more available, like '),
  code('<header>'),
  text(', '),
  code('<nav>'),
  text(', '),
  code('<main>'),
  text(', '),
  code('<footer>'),
  text(', '),
  code('<form>'),
  text(', '),
  code('<input>'),
  text(', '),
  code('<select>'),
  text(', etc.'),
]));

add(tagged('h1', 'Can you find a picture of the inventor of the web?'));

add(img('/images/tim-berners-lee.jpg', 'A young Tim Berners-Lee'));

add(p(`
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
`));

add(withAttribute(withChildren('div', [
  withChildren('p', [
    text('Text from 2023-01-14 conversation with '),
    a('https://chat.openai.com/chat', 'ChatGPT')
  ]),
  withChildren('p', [
    text('Photo of a young Tim Berners-Lee from '),
    a('https://www.flickr.com/photos/itupictures/16662336315', 'Flickr'),
    text(' no thanks to ChatGPT. ('),
    a('https://creativecommons.org/licenses/by/2.0/', 'CC BY 2.0')
  ])
]), 'class', 'credits'));
