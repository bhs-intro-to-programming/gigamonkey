// Warning! Do not call this function with numbers much bigger than 40 unless
// you want to kill this tab.
const fib = (n) => (n < 2 ? n : fib(n - 2) + fib(n - 1));

// This one you can safely call with as big numbers as you want though after
// MAX_FIB_N it will return Infinity.
const fib2 = (n) => {
  let [a, b] = [0, 1];
  for (let i = 0; i < n; i++) {
    [a, b] = [b, a + b];
    if (!isFinite(a)) break;
  }
  return a;
};

const MAX_FIB_N = 1476;

const MAX_FIB = fib2(MAX_FIB_N);


let alpha = 'abcdefghijklmnopqrstuvwxyz'

//NOTE TO SELF str = string | cNum = caesar cipher number | sNum is the number point into 
//the string | str2 = new string

const makeCaesar = (str, key) => {
  let str2 = ''
  for (let sNum = 0; sNum < str.length; sNum++)
    if (alpha.indexOf(str[sNum - 1]) + key > 26) {
      str2 = str2 + alpha[((alpha.indexOf(str[sNum - 1]) + key) - 26) - 1]
    } else {
      str2 = str2 + alpha[(alpha.indexOf(str[sNum - 1]) + key) - 1]
    }
  return str2
}

//I DID IT YEEEEAHHHH

//Intrstructions: this function takes two arguments, a string and the key you want to use
//for your caesar cipher and then returns the first sring as a caesar cipher!

const alphabet = 'abcdefghijklmnopqrstuvwxyz';

const caesar = (s, key) => {
  let encoded = '';
  for (let i = 0; i < s.length; i++) {
    const n = alphabet.indexOf(s[i]);
    if (n === -1) {
      encoded += s[i];
    } else {
      encoded += alphabet[(n + key) % 26];
    }
  }
  return encoded;
};

const valueOfImprovement = (currentGrade, weight, final) => {
  const average = (final * 0.75 + currentGrade * 0.25);
  const afterFinal = Math.max(currentGrade, average)
  const increase =  afterFinal - currentGrade;
  return (increase * weight) / (17 * 4);
}