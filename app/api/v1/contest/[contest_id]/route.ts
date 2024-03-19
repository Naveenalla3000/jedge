import { NextRequest, NextResponse } from "next/server"
import { HttpStatusCode } from "@/constants"
import prisma from "@/prisma"
import { connectDb } from "@/utils"

import { Contest } from "@/types/default"

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { contest_id: string } }
) => {
  try {
    await connectDb()
    const contestId = params.contest_id
    const contest = await prisma.contest.delete({
      where: { id: contestId },
    })

    return NextResponse.json(
      { contestId: contest.id },
      { status: HttpStatusCode.OK, statusText: "DELETED" }
    )
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

export const GET = async (
  request: NextRequest,
  { params }: { params: { contest_id: string } }
) => {
  try {
    await connectDb()
    const contestId = params.contest_id
    const contest = await prisma.contest.findUnique({
      where: { id: contestId },
    })
    if (!contest) {
      return NextResponse.json(
        { error: "Contest not found" },
        { status: HttpStatusCode.NOT_FOUND, statusText: "Not Found" }
      )
    }
    // present date
    const presentDate = new Date()
    let contestData = null
    if (presentDate < contest.startsAt) {
      contestData = {
        ...contest,
        isStarted: false,
      }
      return NextResponse.json(
        { contestData },
        { status: HttpStatusCode.OK, statusText: "OK" }
      )
    }
    const questions = await prisma.question.findMany({
      where: { contestId: contestId },
      select: {
        id: true,
        title: true,
        difficulty_level: true,
        score: true,
      },
    })
    contestData = {
      ...contest,
      questions,
      isStarted: presentDate > contest.startsAt,
    }
    return NextResponse.json(
      { contestData },
      { status: HttpStatusCode.OK, statusText: "OK" }
    )
  } catch (error: any) {
    if (
      error.code === "P2025" ||
      error.code === "P2023" ||
      error.code === "P2010"
    ) {
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

export const PATCH = async (
  request: NextRequest,
  { params }: { params: { contest_id: string } }
) => {
  // Here we are updating the attributes of contest
  // Attributes :: name, description, contest_level, startsAt, endsAt, noOfQuestions
  try {
    await connectDb()
    const contestId = params.contest_id
    const data: Contest = await request.json()
    const contest = await prisma.contest.update({
      where: { id: contestId },
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
        noOfQuestions: data.noOfQuestions,
      },
    })
    return NextResponse.json(
      { contest },
      { status: HttpStatusCode.OK, statusText: "UPDATED" }
    )
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
