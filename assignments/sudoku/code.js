/* Quick guide! Read to understand a bit better.
(Double click on any of the things in 'quotes' to hightlight their occurences in the code.)
  - Start by choosing the amount of attempts every time you click.
    * Feel free to set this to any (positive) number (integer), but be careful!
    * Setting it too high will make it crash, or it will slow down heavily (30s+ wait)!
    * Due to the rounding, a low number may give a lot of 0's.
    * A recommended amount is between 10 thousand and 10 million.
  - After choosing your attempt count, you may change the 'multiplier' of the returned number.
    * This should only be used in testing or to have fun, as it will overrepresent amounts of anomalies.
    * The default 'multiplier' is 1, anything less (above 0) will result in more 'lowAnomalies', and vice versa.
  - Now you choose the mode that you would like the text to be displayed in:
    * 'sci'; Scientific notation, relatively straightforward. (10,000 -> 1.0 * 10^4)
    * 'power'; Takes the power of 10 that would be applied in 'sci'.
    * 'trunc'; Truncation, the most complicated but best looking number representation.
      ~ Similar to 'sci', in that it takes the first few digits and shows a multiplication.
      ~ However, this uses letters to show the multiplication.
      ~ A "k" represents a multiplication of a thousand, "m" of one million, "b" of a billion, and so on.
      ~ If you need more precise results, however, this may not be for you.
      ~ This method cuts off all but the first 4 digits, causing some detail to be lost.
      ~ For example, if the number returned was 2.799 million, it would express it as "2.7m"
    * 'avg'; A straightforward representation of the average of all results.
    * 'commas'; interjects commas where there should be one to increase legibility.
    * Anything else will default to the raw number.
  - 'logs' can be useful if you are looking for some metric in particular.
    * 'logs' stores all clicks' results in an array that can be accessed with 'logs.array' in REPL.
    * You can also find the amount of each anomaly within 'logs', along with the total number of clicks and anomalies.
  - The console log will show you the latest number (first of your mode, then natural), attempt count, and current average.
  - You should be good to go! (: Have fun tweaking the variables to see what you like best. 
? (if you'd like to know how this works, I (will) have written it out at the bottom, but try to figure it out yourself!)
*/

const attempts = 1000000
const multiplier = 1 //this should not exceed a few million or things WILL break (also breaks with negatives)
const mode = 'trunc' //'sci', 'power', 'trunc', 'avg', 'commas', 'shithead', 'page.Crash()' (this will not do anything)
let logs = { total: 0, jackpots: 0, highAnomalies: 0, lowAnomalies: 0, anomalies: 0, array: [] }

const commify = (n) => {
  let s = '';
  let left = n;
  while (left >= 1000) {
    s = ',' + (left % 1000).toString().padStart(3, '0') + s;
    left = Math.floor(left / 1000);
  }
  return left > 0 ? left + s : s;
}

// Notation functions
const commas = (num) => {
  let returnString = num;
  for (let x = 4 - (4 - num.length % 3); x < num.length; x += 3) {
    returnString = returnString.substring(0, x * 4 / 3) + ',' + returnString.substring(x * 4 / 3)
  }
  if (returnString[0] == ',') returnString = returnString.substring(1)
  return returnString;
}
const sciNote = (acc) => {
  return (acc[0] + '.' + acc.substring(1, 6) + ' · ' + '10' + '^' + (acc.length - 1)).toString()
}
const truncate = (acc) => {
  if (acc.length < 4) return acc
  for (let i = 0; i < 100; i += 3) {
    if (acc.length < 4 + i) return acc.substring(0, acc.length - i) + '.' + acc[acc.length - i] + (i / 3 == 1 ? 'k' : i / 3 == 2 ? 'm' : i / 3 == 3 ? 'b' : i / 3 == 4 ? 't' : '😵')
  }
}
const averageResults = (array) => {
  let avg = 0;
  for (const element of array) {
    avg += element
  }
  return Math.round(avg / array.length)
}

//Check for anomaly
const checkIfAnomaly = (acc) => {
  if (acc.length - 1 >= (attempts.toString().length)) {
    logs.highAnomalies++
    logs.anomalies++
    if (acc.length - 2 >= (attempts.toString().length)) {
      drawText('Jackpot with ' + (mode == 'sci' ? sciNote(acc) : mode == 'power' ? acc.length - 1 : mode == 'commas' ? commas(acc) : truncate(acc)) + '!', Math.random() * width - height, Math.random() * height, 'blue', height / 8)
      logs.jackpots++
      return 'blue'
    }
    return 'green'
  } else if (acc.length < (attempts.toString().length - 1)) {
    logs.lowAnomalies++
    logs.anomalies++
    return 'red'
  } else {
    return 'black'
  }
}
if (mode == 'shithead') {
  for (let shithead = 1000; shithead > -190000; shithead += -4) {
    drawLine(0, shithead, width, height, 'maroon');
  }
}

registerOnclick((x, y) => {
  let acc = 0;
  for (let e = 0; e < attempts; e++) {
    const l = Math.round(Math.random() / Math.random())
    if (acc < l * multiplier) acc = l * multiplier;
  }
  logs.array.push(acc)
  acc = acc.toString()
  logs.total++
  console.log(mode == 'sci' ? sciNote(acc) : mode == 'power' ? acc.length - 1 : mode == 'trunc' ? truncate(acc) : mode == 'avg' ? averageResults(logs.array) : mode == 'commas' ? commas(acc) : acc, '/', acc, '/ from', commas(attempts.toString()), 'attempts')
  console.log('current avg:', averageResults(logs.array))
  drawText(mode == 'sci' ? sciNote(acc) : mode == 'power' ? acc.length - 1 : mode == 'trunc' ? truncate(acc) : mode == 'avg' ? averageResults(logs.array) : mode == 'commas' ? commas(acc) : acc, x, y, checkIfAnomaly(acc), 25)
});
