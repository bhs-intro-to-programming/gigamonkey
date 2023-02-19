const plaintext = document.querySelector('#plaintext');
const key = document.querySelector('#key');
const ciphertext = document.querySelector('#ciphertext');

plaintext.onchange = (e) => {
  recordCiphertext();
};

key.onchange = (e) => {
  recordCiphertext();
};

const recordCiphertext = () => {
  ciphertext.innerText = `key: ${key.value}; plaintext: ${plaintext.value}`;
};

