const plaintext = document.getElementById('plaintext');
const key = document.getElementById('key');

// Add a div to every fieldset for logging input events.
document.querySelectorAll('fieldset').forEach(fs => fs.append(document.createElement('div')));

const record = (element, text) => {
  const p = document.createElement('p');
  p.innerText = text;
  element.closest('fieldset').querySelector('div').append(p);
}

plaintext.onchange = (e) => {
  record(e.target, e.target.value);
};

key.onchange = (e) => {
  record(e.target, e.target.value);
};
