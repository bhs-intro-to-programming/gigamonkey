import { $, $$, text, html } from './dom.js';

const p = $('<p>');

p.append(text('This paragraph is created dynamically.'));

$('body').append(p);

for (let i = 0; i < 10; i++) {
  const p = $('<p>');
  p.append(text(`counting ${i}`));
  $('body').append(p);
}

$$('p').forEach(p => {
  p.append(html('<b><i>Boo!</i></b>'));
});

html('<p>One</p><p>Two <b>pow</b></p>').forEach(p => {
  p.onclick = (e) => console.log(`Clicked me: ${e.target.innerText}`);
  $('body').append(p);
});

$('body').append(html('<p>Three</p>'));
