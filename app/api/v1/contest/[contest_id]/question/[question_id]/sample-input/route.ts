import { NextRequest, NextResponse } from "next/server"
import { HttpStatusCode } from "@/constants"
import prisma from "@/prisma"
import { connectDb } from "@/utils"

import { SampleInput } from "@/types/default"

export const PATCH = async (
  request: NextRequest,
  { params }: { params: { contest_id: string; question_id: string } }
) => {
  try {
    await connectDb()
    const { question_id } = params
    const body: SampleInput = await request.json()
    if (!body.text) {
      return NextResponse.json(
        {
          error: "Sample Input is required",
        },
        {
          status: HttpStatusCode.BAD_REQUEST,
          statusText: "Bad Request",
        }
      )
    }
    const sampleInput = await prisma.sampleInput.update({
      where: {
        questionId: question_id,
      },
      data: {
        text: body.text,
      },
    })
    return NextResponse.json(
      { sampleInput },
      { statusText: "UPDATED", status: HttpStatusCode.OK }
    )
  } catch (error: any) {
    if (error.code === "P2025") {
      return NextResponse.json(
        {
          error: "SampleInput not found",
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

export const GET = async (
  request: NextRequest,
  { params }: { params: { contest_id: string; question_id: string } }
) => {
  try {
    await connectDb()
    const { question_id } = params
    const sampleInput = await prisma.sampleInput
      .findUniqueOrThrow({
        where: {
          questionId: question_id,
        },
      })
      .catch((error) => {
        console.log(error)
      })
    return NextResponse.json({ sampleInput }, { statusText: "OK", status: 200 })
  } catch (error: any) {
    if (error.code === "P2025") {
      return NextResponse.json(
        {
          error: "SampleInput not found",
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
