import com.gigamonkeys.bhs.*;

public class MyPicture implements Picture {

  public void draw(Canvas c) {
    for (var x = 0; x < width; x += 20) {
      c.drawLine(x, 0, x, height, "black", 2);
    }

    c.drawLine(0, 0, c.width(), c.height(), "blue", 10);
    c.drawLine(0, c.height(), c.width(), 0, "red", 10);
  }
}
