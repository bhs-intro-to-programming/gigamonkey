const plaintext = document.getElementById('plaintext');
const key = document.getElementById('key');
const ciphertext = document.getElementById('ciphertext');

const recordCiphertext = () => {
  ciphertext.innerText = encrypt(plaintext.value, key.value);
};

const encrypt = (text, key) => {
  // TODO: implement Caeser cipher here.
  return `key: ${key}; text: ${text}`;
}

plaintext.onchange = recordCiphertext;
key.onchange = recordCiphertext;

