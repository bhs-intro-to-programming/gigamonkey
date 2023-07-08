import com.gigamonkeys.bhs.Canvas;

/*
 * Draw a picture.
 */
public class MyPicture {

  public static void main(String[] argv) {
    var c = new Canvas(200, 400);
    c.drawLine(0, 0, 200, 400, "blue", 1);
    System.out.println("""
      (() => {
    const canvas = document.querySelector('canvas');
    const r = canvas.parentElement.getBoundingClientRect();
    canvas.setAttribute('width', r.width - 2);
    canvas.setAttribute('height', r.height - 2);
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);
    """);
    System.out.println(c.getCode());
  }

}