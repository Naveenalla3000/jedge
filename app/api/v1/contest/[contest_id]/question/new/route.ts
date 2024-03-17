import { NextRequest, NextResponse } from "next/server"
import prisma from "@/prisma"
import { connectDb } from "@/utils"

import { Question } from "@/types/default"
import { HttpStatusCode } from "@/constants"


// to create a new question in one perticular contest
export const POST = async (
  request: NextRequest,
  { params }: { params: { contest_id: string } }
) => {
  try {
    await connectDb()
    const { contest_id } = params
    const body:Question = await request.json()
    const contest = await prisma.contest.findUnique({
      where: {
        id: contest_id,
      },
      select: {
        noOfQuestions: true,
      },
    })
    if (!contest) {
      return NextResponse.json(
        { message: "Contest not found" },
        { status: HttpStatusCode.NOT_FOUND, statusText: "Not Found" }
      )
    }
    const existingNoOfQuestions = contest.noOfQuestions || 0
    await prisma.contest.update({
      where: {
        id: contest_id,
      },
      data: {
        noOfQuestions: existingNoOfQuestions + 1,
      },
    })
    const question = await prisma.question.create({
      data: {
        title: body.title,
        difficulty_level:
          body.difficulty_level === "EASY"
            ? "EASY"
            : body.difficulty_level === "HARD"
            ? "HARD"
            : "MEDIUM",
        score: body.score,
        description: body.description,
        // constraints: {
        //   create: body.constraints.map(
        //     (constraint: any, constraintIndex: number) => ({
        //       ...constraint,
        //       index: constraintIndex,
        //     })
        //   ),
        // },
        constraints: body.constraints,
        examples: {
          create: body.examples.map((example: any, exampleIndex: number) => ({
            ...example,
            index: exampleIndex,
          })),
        },
        // explanations: {
        //   create: body.explanations.map(
        //     (explanation: any, explanationIndex: number) => ({
        //       ...explanation,
        //       index: explanationIndex,
        //     })
        //   ),
        // },
       explanations: body.explanations,
        sampleInputs: {
          create: body.sampleInputs.map(
            (sampleInput: any, sampleInputIndex: number) => ({
              ...sampleInput,
              index: sampleInputIndex,
            })
          ),
        },
        sampleOutputs: {
          create: body.sampleOutputs.map(
            (sampleOutput: any, sampleOutputIndex: number) => ({
              ...sampleOutput,
              index: sampleOutputIndex,
            })
          ),
        },
        contestId: contest_id,
        index: existingNoOfQuestions,
      },
    })
    return NextResponse.json(
      { question },
      { status: HttpStatusCode.CREATED, statusText: "CREATED" }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json({error}, {
      status: HttpStatusCode.INTERNAL_SERVER_ERROR,
      statusText: "Internal Server Error",
    })
  } finally {
    await prisma.$disconnect()
  }
}
