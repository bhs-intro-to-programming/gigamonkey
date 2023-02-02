const plaintext = document.getElementById('plaintext');
const ciphertext = document.getElementById('ciphertext');
const key = document.getElementById('key');
const keyDisplay = document.getElementById('show-key');


const alphabet = 'abcdefghijklmnopqrstuvwxyz';

const encodeChar = (char, k) => {
  const n = alphabet.indexOf(char.toLowerCase());
  if (n !== -1) {
    const encoded = alphabet[(n + k) % 26];
    return char.toUpperCase() === char ? encoded.toUpperCase() : encoded;
  } else {
    return char;
  }
}

const cc = (s, k) => [...s].map(c => encodeChar(c, k)).join('');

const encrypt = () => {
  ciphertext.innerText = cc(plaintext.value, Number(key.value));
}

plaintext.oninput = encrypt;
key.oninput = (e) => {
  encrypt();
  keyDisplay.innerText = e.target.value;
}

keyDisplay.innerText = key.value;