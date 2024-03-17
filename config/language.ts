import { Language } from "@/types/default"

export const languageConfig: Language[] = [
  {
    languageName: "python",
    languageId:70,
    sampleCode: "print('Hello world')",
  },
  {
    languageName: "javascript",
    languageId:69,
    sampleCode: "console.log('Hello world')",
  },
  {
    languageName: "java",
    languageId:68,
    sampleCode:
      "public class Main {\n    public static void main(String[] args) {\n        System.out.println('Hello world');\n    }\n}",
  },
  {
    languageName: "c++",
    languageId:67,
    sampleCode:
      '#include <iostream>\n\nint main() {\n    std::cout << "Hello world" << std::endl;\n    return 0;\n}',
  },
  {
    languageName: "c",
    languageId:66,
    sampleCode:
      '#include <stdio.h>\n\nint main() {\n    printf("Hello world\\n");\n    return 0;\n}',
  },
  {
    languageName: "ruby",
    languageId:65,
    sampleCode: "puts 'Hello world'",
  },
  {
    languageName: "go",
    languageId:64,
    sampleCode: "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(\"Hello world\")\n}",
  },
]
