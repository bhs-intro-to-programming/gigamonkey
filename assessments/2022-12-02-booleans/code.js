const needHeavyCoat = (outside, cold) => {
  return outside && cold;
};

const needSunscreen = (beach, skiing) => {
  return beach || skiing;
};

const needMittens = (outside, warm) => {
  return outside && !warm;
};

const isisVenomous = (striped, blueHeaded) => {
  return striped || !blueHeaded;
};

const okaySpeed = (limit, speed) => {
  return Math.abs(speed - limit) < 10;
};