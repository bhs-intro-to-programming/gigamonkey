import com.gigamonkeys.bhs.Canvas;

/*
 * Draw a picture.
 */
public class MyPicture {

  public void draw(Canvas c) {
    c.drawLine(0, 0, 200, 400, "black", 1);
  }

  public static void main(String[] argv) {
    var c = new Canvas(200, 400);
    new MyPicture().draw(c);
    System.out.println(c.getCode());
  }

}