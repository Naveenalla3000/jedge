import { NextRequest, NextResponse } from "next/server"
import { HttpStatusCode } from "@/constants"
import prisma from "@/prisma"
import { connectDb } from "@/utils"

import { Example } from "@/types/default"

export const GET = async (
  request: NextRequest,
  {
    params,
  }: { params: { contest_id: string; question_id: string; example_id: string } }
) => {
  try {
    await connectDb()
    const { question_id } = params
    const example = await prisma.example.findUnique({
      where: {
        id: params.example_id,
        questionId: question_id,
      },
    })
    if (!example) {
      return NextResponse.json(
        { error: "Example not found" },
        { status: HttpStatusCode.NOT_FOUND, statusText: "Not Found" }
      )
    }
    return NextResponse.json(
      { example },
      { status: HttpStatusCode.OK, statusText: "OK" }
    )
  } catch (error: any) {
    if (error.code === "P2025") {
      return NextResponse.json(
        {
          error: "Example not found",
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
  {
    params,
  }: { params: { contest_id: string; question_id: string; example_id: string } }
) => {
  try {
    await connectDb()
    const { question_id } = params
    const example = await prisma.example.delete({
      where: {
        id: params.example_id,
        questionId: question_id,
      },
      select: {
        id: true,
      },
    })
    return NextResponse.json(
      { example },
      { status: HttpStatusCode.OK, statusText: "DELETED" }
    )
  } catch (error: any) {
    if (error.code === "P2025" || error.code === "P2023") {
      return NextResponse.json(
        {
          error: "Example not found",
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

export const PATCH = async (
  request: NextRequest,
  {
    params,
  }: { params: { contest_id: string; question_id: string; example_id: string } }
) => {
  try {
    await connectDb()
    const { question_id } = params
    const body: Example = await request.json()
    if (!body.input || !body.output || !body.explanation) {
      return NextResponse.json(
        { error: "Input, output and explanation are required" },
        { status: HttpStatusCode.BAD_REQUEST, statusText: "Bad Request" }
      )
    }
    const example = await prisma.example.update({
      where: {
        id: params.example_id,
        questionId: question_id,
      },
      data: {
        input: body.input,
        output: body.output,
        explanation: body.explanation,
      },
    })
    return NextResponse.json(
      { example },
      { status: HttpStatusCode.OK, statusText: "UPDATED" }
    )
  } catch (error: any) {
    if (error.code === "P2025" || error.code === "P2023") {
      return NextResponse.json(
        {
          error: "Example not found",
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
