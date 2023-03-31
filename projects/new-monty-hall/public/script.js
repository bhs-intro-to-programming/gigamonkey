// Write your code here.

const prizeBehind = Math.floor(Math.random() * 3);

console.log(prizeBehind);

const container = document.querySelector('#doors');

const doors = container.querySelectorAll('div');

const showDoor = (i, text) => {
  doors[i].innerText = text;
};



for (let i = 0; i < doors.length; i++) {
  doors[i].onclick = (e) => {
    console.log(`Clicked door ${i}`);
    let possibleDoors = [];
    for (let j = 0; j < 3; j++) {
      if (j !== i && j !== prizeBehind) {
        possibleDoors.push(j);
      }
    }
    showDoor(possibleDoors[Math.floor(Math.random() * possibleDoors.length)], '$0');
  };
}