import { NextRequest, NextResponse } from "next/server"
import prisma from "@/prisma"
import { connectDb } from "@/utils"
import { HttpStatusCode } from "@/constants"

// you need to more customise it a lot more
// to get the all questions from one perticular contest
export const GET = async (
  request: NextRequest,
  { params }: { params: { contest_id: string } }
) => {
  try {
    await connectDb()
    const questions = await prisma.question.findMany({
      where: {
        contestId: params.contest_id,
      },
    })
    return NextResponse.json({ questions }, { status: HttpStatusCode.OK, statusText: "OK" })
  } catch (error: any) {
    if (error.code === "P2025") {
      return NextResponse.json(
        {
          error: "Contest not found",
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
