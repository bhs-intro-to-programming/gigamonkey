const plaintext = document.querySelector('#plaintext');
const key = document.querySelector('#key');
const ciphertext = document.querySelector('#ciphertext');

const recordCiphertext = (e) => {
  ciphertext.innerText = `key: ${key.value}; plaintext: ${plaintext.value}`;
};

plaintext.onchange = recordCiphertext;
key.onchange = recordCiphertext;
