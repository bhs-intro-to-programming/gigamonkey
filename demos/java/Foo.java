import com.gigamonkeys.bhs.Canvas;

/*
 * Draw a picture.
 */
public class Test {

  public static void main(String[] argv) {
    var c = new Canvas(200, 400);
    c.drawLine(0, 0, 200, 400, "blue", 1);
    System.out.println(c.getCode());
  }

}