import { NextRequest, NextResponse } from "next/server"
import { HttpStatusCode } from "@/constants"
import prisma from "@/prisma"
import { connectDb } from "@/utils"

export const GET = async (request: NextRequest) => {
  try {
    await connectDb()
    const contests = await prisma.contest.findMany()
    return NextResponse.json(
      { contests:contests },
      { status: HttpStatusCode.OK, statusText: "OK" }
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
