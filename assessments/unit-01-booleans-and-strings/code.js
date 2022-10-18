/*
 * You will need this function for some of the problems. It returns a random
 * number between 0, inclusive, and n, exclusive. Thus rand(3) could possibly
 * return 0, 1, or 2 but will not return 3.
 */
const rand = (n) => Math.floor(Math.random() * n);

const fireAlarm = (pulled, smoke, drill) => {
  return pulled || smoke || drill;
};

const canBePresident = (age, naturalBorn, yearsInUS) => {
  return age >= 35 && naturalBorn && yearsInUS >= 14;
};

const willSeeTweet = (followsTweeter, followsRetweeter, tweeterBlocked) => {
  return (followsTweeter || followsRetweeter) && !tweeterBlocked;
};

const evenGreaterThanZero = (n) => {
  return n > 0 && n % 2 === 0;
};

const isLeapYear = (year) => {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
};