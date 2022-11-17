/*
const findFnord = (s) => s.indexOf('fnord');

const stringContains = (s, ss) => s.indexOf(ss) > -1;

const firstAndLast = (s) => s[0] + s[s.length - 1];

const swapFrontAndBack = (s) => s.substring(s.length / 2) + s.substring(0, s.length / 2);

const simplePigLatin = (s, firstVowel) => s.substring(firstVowel) + s.substring(0, firstVowel) + 'ay';

const randomCharacter = (s) => s[rand(s.length)];

const randomCharacterUpDown = (s) => upDown(randomCharacter(s));

const isAllUpperCase = (s) => s === s.toUpperCase();

const sameIgnoringCase = (s1, s2) => s1.toLowerCase() === s2.toLowerCase();

const firstHalf = (s) => s.substring(0, s.length / 2);

const secondHalf = (s) => s.substring(s.length / 2);

const upDown = (s) => s.toUpperCase() + s.toLowerCase();

const everyOther = (s) => s[0] + s[2] + s[4];

const upDownLastCharacter = (s) => upDown(s[s.length - 1]);

const firstName = (name) => name.substring(0, name.indexOf(' '));

const lastName = (name) => name.substring(name.indexOf(' ') + 1);

const concatenate = (s1, s2) => s1 + s2;

const firstCharacter = (s) => s[0];

const lastCharacter = (s) => s[s.length - 1];

const allButFirst = (s) => s.substring(1);

const firstThree = (s) => s.substring(0, 3);

const allButFirstAndList = (s) => s.substring(1, s.length - 1);

const lastThree = (s) => s.substring(s.length - 3);

const capitalize = (s) => s[0].toUpperCase() + s.substring(1).toLowerCase();

const capitalizeFirstThree = (s) => s.substring(0, 3).toUpperCase() + s.substring(3).toLowerCase();
*/

//const indexing = (string, string2) => {
// string.indexOf(string2);
//}
 
const findFnord = (string) => {
  return string.indexOf("fnord");
}

const stringContains = (string1, string2) => {
  return string2 === string1.substring(string1.indexOf(string2));
}

const firstAndLast = (string) => {
  return string[0] + string[string.length - 1];
}

const swapFrontAndBack = (string) => {
  return string.substring(string.length / 2) + string.substring(0, string.length/2)
}

const simplePigLatin = (string, number) => {
  return string.substring(number) + string.substring(0, number) + 'ay';
}

const isAllUpperCase = (string) => {
  return string.toUpperCase() === string;
}

const sameIgnoringCase = (string1, string2) => {
  return string1.toLowerCase() === string2.toLowerCase();
}

const firstHalf = (string) => {
  return string.substring(0, string.length / 2);
}

const secondHalf = (string) => {
  return string.substring(string.length / 2);
}

const upDown = (string) => {
  return string.toUpperCase() + string.toLowerCase();
}

const everyOther = (string) => {
  return string[0] + string [2] + string [4];
}

const upDownLastCharacter = (string) => {
  return string[string.length - 1].toUpperCase() + string[string.length - 1].toLowerCase();
}

const firstName = (string) => {
  return string.substring(0, string.indexOf(' '))
}

const lastName = (string) => {
  return string.substring(string.indexOf(' ') + 1)
}

const concatenate = (string, string2) => {
  return string + string2;
}

const firstCharacter = (string) => {
  return string[0];
}

const lastCharacter = (string) => {
  return string[string.length - 1];
}

const allButFirst = (string) => {
  return string.substring(1);
}

const firstThree = (string) => {
  return string.substring(0, 3);
}

const allButFirstAndList = (string) => {
  return string.substring(1, string.length - 1);
}

const lastThree = (string) => {
  return string.substring(string.length - 3);
}

const capitalize = (string) => {
  return string[0].toUpperCase() + string.substring(1).toLowerCase();
}

const capitalizeFirstThree = (string) => {
  return string.substring(0, 3).toUpperCase() + string.substring(3).toLowerCase();
}