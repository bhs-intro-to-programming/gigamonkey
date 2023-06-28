public class Foo {
  public static void main(String[] argv) {
    var text = new String(inputStream.readAllBytes(), StandardCharsets.UTF_8);
    System.out.println("hello, world! " + System.currentTimeMillis());
    System.out.println(text.length() + " characters in input.");
  }
}