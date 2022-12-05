const totalEggs = (hard, soft) => {
  return hard + soft;
};

const chocolatesPerPerson = (chocolates, people) => {
  return Math.floor(chocolates / people);
};

const extraChocolates = (chocolates, people) => {
  return chocolates % people;
};

const leftOut = (chocolates, people) => {
  return Math.max(people - chocolates, 0);
};

const probabilityAllHeads = (flips) => {
  return 0.5 ** flips;
};