import { NextRequest, NextResponse } from "next/server"
import { HttpStatusCode } from "@/constants"

//api health-check
export const GET = async (request: NextRequest) => {
  try {
    return NextResponse.json(
      { status: "status ok" },
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
  }
}
