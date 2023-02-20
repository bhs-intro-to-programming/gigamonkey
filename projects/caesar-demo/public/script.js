const plaintext = document.querySelector('#plaintext');
const key = document.querySelector('#key');
const ciphertext = document.querySelector('#ciphertext');

const recordCiphertext = (e) => {
  ciphertext.innerText = encrypt(plaintext.value, key.value);
};

const encrypt = (text, key) => {
  return `key: ${key}; plaintext: ${text}`;
};

plaintext.onchange = recordCiphertext;
key.onchange = recordCiphertext;
