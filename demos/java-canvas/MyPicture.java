/*
 * Draw a picture.
 */

public class MyPicture {

  public static void main(String[] argv) {
    System.out.println("""
    (() => {
    const canvas = document.querySelector('canvas');
    const r = canvas.parentElement.getBoundingClientRect();
    canvas.setAttribute('width', r.width - 2);
    canvas.setAttribute('height', r.height - 2);

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(width, height);
    ctx.stroke();
    })();
    """);
  }

}
