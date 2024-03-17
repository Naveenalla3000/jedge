import { NextRequest, NextResponse } from "next/server"
import { HttpStatusCode } from "@/constants"
import prisma from "@/prisma"
import { connectDb } from "@/utils"

import { Contest } from "@/types/default"

export const POST = async (request: NextRequest) => {
  try {
    await connectDb()
    const data: Contest = await request.json()
    const contest = await prisma.contest.create({
      data: {
        name: data.name,
        description: data.description,
        contest_level:
          data.contest_level === "ADVANCED"
            ? "ADVANCED"
            : data.contest_level === "INTERMEDIATE"
            ? "INTERMEDIATE"
            : "BEGINNER",
        startsAt: new Date(data.startsAt),
        endsAt: new Date(data.endsAt),
        questions: {
          create: data.questions.map(
            (question: any, questionIndex: number) => ({
              title: question.title,
              difficulty_level: question.difficulty_level,
              score: question.score,
              description: question.description,
              examples: {
                create: question.examples.map(
                  (example: any, exampleIndex: number) => ({
                    ...example,
                    index: exampleIndex,
                  })
                ),
              },
              constraints: question.constraints,
              // constraints: {
              //   create: question.constraints.map(
              //     (constraint: any, constraintIndex: number) => ({
              //       ...constraint,
              //       index: constraintIndex,
              //     })
              //   ),
              // },
              // explanations: {
              //   create: question.explanations.map(
              //     (explanation: any, explanationIndex: number) => ({
              //       ...explanation,
              //       index: explanationIndex,
              //     })
              //   ),
              // },
              explanations: question.explanations,
              sampleInputs: {
                create: question.sampleInputs.map(
                  (sampleInput: any, sampleInputIndex: number) => ({
                    ...sampleInput,
                    index: sampleInputIndex,
                  })
                ),
              },
              sampleOutputs: {
                create: question.sampleOutputs.map(
                  (sampleOutput: any, sampleOutputIndex: number) => ({
                    ...sampleOutput,
                    index: sampleOutputIndex,
                  })
                ),
              },
              index: questionIndex,
            })
          ),
        },
        noOfQuestions: data.noOfQuestions,
      },
      include: {
        questions: {
          include: {
            // constraints: true,
            examples: true,
            // explanations: true,
            sampleInputs: true,
            sampleOutputs: true,
          },
        },
      },
    })

    return NextResponse.json(
      { contest },
      {
        status: HttpStatusCode.CREATED,
        statusText: "CREATED",
      }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: error },
      {
        status: HttpStatusCode.INTERNAL_SERVER_ERROR,
        statusText: "Internal Server Error",
      }
    )
  } finally {
    await prisma.$disconnect()
  }
}
