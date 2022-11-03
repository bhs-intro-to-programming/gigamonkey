// This is a bit of a new thing. registerOnclick is a function provided by the
// framework. But the argument we're passing to it is *another* function. Notice
// how the argument here looks like what we normally put on the righthand side
// of the equals sign in our normal `const foo = ...` function definition. This
// is called an anonymous function. We'll discuss this in more detail in a few
// weeks but for now you can just adapt this code.

let move = 0;

registerOnclick((x, y) => {
  if (move % 2 === 0) {
    drawText('X', x, y, 'red', Math.min(width, height) * 0.3);
  } else {
    drawText('O', x, y, 'blue', Math.min(width, height) * 0.3);
  }
  move++;
});
const board = () => {
  for (let i = 0; i < 2; i++) {
    const x = (i + 1) * width / 3
    drawLine(x, 0, x, height, 'black', 5);
  }
  for (let i = 0; i < 2; i++) {
    const x = (i + 1) * height / 3
    drawLine(0, x, width, x, 'black', 5);
  }

}

board()



//if movenumber %2===0 make it x else make it o 

//how do i make the move number increase every click, let move = 0 then like each click ++ 

