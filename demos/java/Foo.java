import java.nio.charset.StandardCharsets;
import java.nio.Files;
import java.nio.Paths;

public class Foo {

  public static void main(String[] argv) throws Exception {
    var text = new String(System.in.readAllBytes(), StandardCharsets.UTF_8);
    for (String filename: argv) {
          System.out.println(filename + ": " + digest(filename));
    }
  }

  public static String digest(String filename) throws NoSuchAlgorithmException, IOException {
    String content = Files.readString(Paths.get(filename));
    MessageDigest md = MessageDigest.getInstance("SHA-1");
    byte[] bytes = content.getBytes(StandardCharsets.UTF_8);
    return byteArrayToHexString(md.digest(bytes));
  }
}
