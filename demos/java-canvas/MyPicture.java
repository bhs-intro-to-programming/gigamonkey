import com.gigamonkeys.bhs.*;

/*
 * Draw a picture.
 */
public class MyPicture implements Picture {

  public void draw(Canvas c) {
    c.drawLine(0, 0, c.width(), c.height(), "blue", 1);
  }

  public static void main(String[] argv) {
    var c = new Canvas(200, 400);
    new MyPicture().draw(c);
    System.out.println(c.getCode());
  }

}