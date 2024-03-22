import prisma from "."

async function main() {
  const contest = await prisma.contest.create({
    data: {
      name: "Sample Contest",
      description: "This is a sample contest.",
      contest_level: "BEGINNER",
      startsAt: new Date(),
      endsAt: new Date(),
      noOfQuestions: 2,
      questions: {
        create: [
          {
            title: "Question 1",
            description: "This is a sample question.",
            difficulty_level: "EASY",
            score: 100,
            index: 0,
            examples: {
              create: [
                {
                  input: "Input 1",
                  output: "Output 1",
                  explanation: "Explanation 1",
                  index: 0,
                },
                {
                  input: "Input 2",
                  output: "Output 2",
                  explanation: "Explanation 2",
                  index: 1,
                },
                {
                  input: "Input 3",
                  output: "Output 3",
                  explanation: "Explanation 3",
                  index: 2,
                },
              ],
            },
            explanations: [
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
              "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s", 
              "when an unknown printer took a galley of type and scrambled it to make a type specimen book",
              "t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
            ],
          },
        ],
      },
    },
  })

  console.log({ contest })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
