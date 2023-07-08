import com.gigamonkeys.bhs.*;

/*
 * Draw a picture.
 */
public class MyPicture implements Picture {

  public void draw(Canvas c) {
    c.drawLine(0, 0, c.width(), c.height(), "blue", 10);
    c.drawLine(0, c.height(), c.width(), 0, "red", 10);
  }

}