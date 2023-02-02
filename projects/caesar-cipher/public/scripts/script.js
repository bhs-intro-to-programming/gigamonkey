// The cipher algorithm

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

const encrypt = (s, k) => [...s].map(c => encodeChar(c, k)).join('');

// The UI

const plaintext = document.getElementById('plaintext');
const ciphertext = document.getElementById('ciphertext');
const key = document.getElementById('key');
const keyDisplay = document.getElementById('key-display');

const showCiphertext = () => {
  ciphertext.innerText = encrypt(plaintext.value, Number(key.value));
};

plaintext.oninput = showCiphertext;

key.oninput = (e) => {
  showCiphertext();
  keyDisplay.innerText = e.target.value;
};

keyDisplay.innerText = key.value;