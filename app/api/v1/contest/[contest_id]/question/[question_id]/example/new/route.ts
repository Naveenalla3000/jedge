import { NextRequest, NextResponse } from "next/server"
import { HttpStatusCode } from "@/constants"
import prisma from "@/prisma"
import { connectDb } from "@/utils"

import { Example } from "@/types/default"

export const POST = async (
  request: NextRequest,
  { params }: { params: { contest_id: string; question_id: string } }
) => {
  try {
    await connectDb()
    const { question_id } = params
    const body: Example = await request.json()
    if (!body.input || !body.output || !body.explanation) {
      return NextResponse.json(
        { error: "input, output and explanation are required" },
        { status: HttpStatusCode.BAD_REQUEST, statusText: "Bad Request" }
      )
    }
    const alreadyNoOfExamples = await prisma.example.count({
      where: {
        questionId: question_id,
      },
    })
    const example = await prisma.example.create({
      data: {
        input: body.input,
        output: body.output,
        explanation: body.explanation,
        questionId: question_id,
        index: alreadyNoOfExamples,
      },
    })
    return NextResponse.json(
      { example },
      { status: HttpStatusCode.CREATED, statusText: "CREATED" }
    )
  } catch (error: any) {
    console.log(error)
    if (error.code === "P2025") {
      return NextResponse.json(
        {
          error: "examples not found to this question",
        },
        {
          status: HttpStatusCode.NOT_FOUND,
          statusText: "Not Found",
        }
      )
    }
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
