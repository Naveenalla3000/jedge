import { NextRequest, NextResponse } from "next/server"
import { HttpStatusCode, errorCodes } from "@/constants"
import prisma from "@/prisma"
import { connectDb } from "@/utils"

import { Question } from "@/types/default"

export const GET = async (
  request: NextRequest,
  { params }: { params: { contest_id: string; question_id: string } }
) => {
  try {
    await connectDb()
    // logic to get a particular question for a particular contest
    const { contest_id, question_id } = params
    const contest = await prisma.contest.findUnique({
      where: { id: contest_id },
    })
    if (!contest) {
      return NextResponse.json(
        { error: "Contest not found" },
        { status: HttpStatusCode.NOT_FOUND, statusText: "Not Found" }
      )
    }
    // present date
    const presentDate = new Date()
    if (presentDate < contest.startsAt) {
      return NextResponse.json(
        { error: "Bad Request contest not started" },
        { status: HttpStatusCode.BAD_REQUEST, statusText: "Bad Request" }
      )
    }
    const question = await prisma.question.findUnique({
      where: {
        id: question_id,
        contestId: contest_id,
      },
    })
    if (!question) {
      return NextResponse.json(
        {
          error: "Question not found in contest",
        },
        {
          status: HttpStatusCode.NOT_FOUND,
          statusText: "Not Found",
        }
      )
    }
    const examples = await prisma.example.findMany({
      where: {
        questionId: question_id,
      },
    })
    const sampleInput = await prisma.sampleInput.findUnique({
      where: {
        questionId: question_id,
      },
    })
    const sampleOutput = await prisma.sampleOutput.findUnique({
      where: {
        questionId: question_id,
      },
    })
    const questionData = {
      ...question,
      examples,
      sampleInput,
      sampleOutput,
    }
    return NextResponse.json(
      { questionData },
      { status: HttpStatusCode.OK, statusText: "OK" }
    )
  } catch (error: any) {
    if ((error.code as string) in errorCodes) {
      return NextResponse.json(
        {
          error: "Question not found",
        },
        {
          status: HttpStatusCode.NOT_FOUND,
          statusText: "Not Found",
        }
      )
    }
    console.log(error)
    return NextResponse.json(
      { error },
      {
        status: HttpStatusCode.INTERNAL_SERVER_ERROR,
        statusText: "Internal Server Error",
      }
    )
  } finally {
    await prisma.$disconnect()
  }
}

export const PUT = async (
  request: NextRequest,
  { params }: { params: { contest_id: string; question_id: string } }
) => {
  try {
    await connectDb()
    // logic to update a particular question for a particular contest
    const { contest_id, question_id } = params
    const body: Question = await request.json()
    const question = await prisma.question.update({
      where: {
        id: question_id,
        contestId: contest_id,
      },
      data: {
        title: body.title,
        description: body.description,
        difficulty_level:
          body.difficulty_level === "EASY"
            ? "EASY"
            : body.difficulty_level === "MEDIUM"
            ? "MEDIUM"
            : "HARD",
        score: body.score,
        constraints: body.constraints,
        explanations: body.explanations,
      },
    })
    return NextResponse.json(
      { question },
      { status: HttpStatusCode.OK, statusText: "UPDATED" }
    )
  } catch (error: any) {
    if ((error.code as string) in errorCodes) {
      return NextResponse.json(
        {
          error: "Question not found in contest",
        },
        {
          status: HttpStatusCode.NOT_FOUND,
          statusText: "Not Found",
        }
      )
    }
    console.log(error)
    return NextResponse.json(
      { error },
      {
        status: HttpStatusCode.INTERNAL_SERVER_ERROR,
        statusText: "Internal Server Error",
      }
    )
  } finally {
    await prisma.$disconnect()
  }
}

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { contest_id: string; question_id: string } }
) => {
  try {
    await connectDb()
    // logic to delete a particular question for a particular contest
    const { contest_id, question_id } = params
    const question = await prisma.question.delete({
      where: {
        id: question_id,
        contestId: contest_id,
      },
      select: {
        id: true,
      },
    })
    const updatedQuestionCount = await prisma.question.count({
      where: {
        contestId: contest_id,
      },
    })
    await prisma.contest.update({
      where: {
        id: contest_id,
      },
      data: {
        noOfQuestions: updatedQuestionCount,
      },
    })
    return NextResponse.json(
      { question },
      { status: HttpStatusCode.OK, statusText: "DELETED" }
    )
  } catch (error: any) {
    if ((error.code as string) in errorCodes) {
      return NextResponse.json(
        {
          error: "Question not found in contest",
        },
        {
          status: HttpStatusCode.NOT_FOUND,
          statusText: "Not Found",
        }
      )
    }
    console.log(error)
    return NextResponse.json(
      { error },
      {
        status: HttpStatusCode.INTERNAL_SERVER_ERROR,
        statusText: "Internal Server Error",
      }
    )
  } finally {
    await prisma.$disconnect()
  }
}
