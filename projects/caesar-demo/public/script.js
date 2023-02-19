const ciphertext = document.querySelector('#ciphertext');
const key = document.querySelector('#key');


ciphertext.onchange = (e) => {
  record(e.target, e.target.value);
};

key.onchange = (e) => {
  record(e.target, e.target.value);
};



// Add a div to every fieldset for logging input events.
document.querySelectorAll('fieldset').forEach(fs => fs.append(document.createElement('div')));

const record = (element, text) => {
  const p = document.createElement('p');
  p.innerText = text;
  element.closest('fieldset').querySelector('div').append(p);
}


