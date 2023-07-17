import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class Foo {

  public static void main(String[] argv) throws Exception {
    var text = new String(System.in.readAllBytes(), StandardCharsets.UTF_8);
    for (String filename : argv) {
      System.out.println(filename + ": " + digest(filename));
    }
  }

  public static String digest(String filename)
    throws NoSuchAlgorithmException, IOException {
    String content = Files.readString(Paths.get(filename));
    MessageDigest md = MessageDigest.getInstance("SHA-1");
    byte[] bytes = content.getBytes(StandardCharsets.UTF_8);
    return byteArrayToHexString(md.digest(bytes));
  }

  private static String byteArrayToHexString(byte[] bytes) {
    Formatter formatter = new Formatter();
    for (byte b : bytes) {
      formatter.format("%02x", b);
    }
    return formatter.toString();
  }
}
