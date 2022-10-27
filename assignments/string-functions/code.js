const findFnord = (s) => s.indexOf('fnord');

const stringContains = (s, ss) => s.indexOf(ss) > -1;

const firstAndLast = (s) => {
  return s[0] + s[s.length - 1];
};

const swapFrontAndBack = (s) => {
  return s.substring(s.length / 2) + s.substring(0, s.length / 2);
};

const simplePigLatin = (s, firstVowel) => {
  return s.substring(firstVowel) + s.substring(0, firstVowel) + 'ay';
};

const randomCharacter = (s) => {
  return s[rand(s.length)];
};

const randomCharacterUpDown = (s) => {
  const i = rand(s.length);
  return s[i].toUpperCase() + s[i].toLowerCase();
};

const isAllUpperCase = (s) => {
  return s === s.toUpperCase();
};

const sameIgnoringCase = (s1, s2) => {
  return s1.toLowerCase() === s2.toLowerCase();
};


const firstHalf = (s) => {
  return s.substring(0, s.length / 2);
};

const secondHalf = (s) => {
  return s.substring(s.length / 2);
};

const upDown = (s) => {
  return s.toUpperCase() + s.toLowerCase();
};

const everyOther = (s) => {
  return s[0] + s[2] + s[4];
};

const upDownLastCharacter = (s) => {
  return upDown(s[s.length - 1]);
};

const firstName = (name) => name.substring(0, name.indexOf(' '));

const lastName = (name) => name.substring(name.indexOf(' ') + 1);