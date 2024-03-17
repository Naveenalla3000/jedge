import { NextRequest, NextResponse } from "next/server"
import prisma from "@/prisma"
import { connectDb } from "@/utils"
import { HttpStatusCode } from "@/constants";

export const GET = async (
  request: NextRequest,
  { params }: { params: { contest_id: string; question_id: string } }
) => {
  try {
    await connectDb()
    const { question_id } = params
    const examples = await prisma.example.findMany({
      where: {
        questionId: question_id,
      },
      orderBy: {
        index: "asc",
      },
    })
    return NextResponse.json({ examples }, { status: HttpStatusCode.OK, statusText: "OK" })
  } catch (error: any) {
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
