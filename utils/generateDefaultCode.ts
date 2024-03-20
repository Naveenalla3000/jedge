export const generateDefaultCode = (selectedEditorLanguage: string): string => {
  switch (selectedEditorLanguage) {
    case "python":
      return "print('Hello world!')"
    case "java":
      return `public class HelloWorld {
      public static void main(String[] args) {
        System.out.println("Hello world!");
      }
    }`
    case "cpp":
      return `#include <iostream>
    using namespace std;
    
    int main()
    {
        cout << "Hello World";
     
        return 0;
    }`
    case "javascript":
      return "console.log('Hello world!');"
    default:
      return "Please select a programming language."
  }
}
