import { NextRequest, NextResponse } from "next/server"
import { HttpStatusCode } from "@/constants"
import  { AxiosResponse } from "axios"

import { IJedgeRequest } from "@/types/jedge/request-dao"

import { axiosInstance } from "./axios"
import { pollForResult } from "./pool"

export const POST = async (request: NextRequest) => {
  try {
    const body: IJedgeRequest = await request.json()
    const { sourceCode, languageId, stdin, expectedOutput } = body
    const submitResponse: AxiosResponse = await axiosInstance.post(
      `submissions`,
      {
        source_code: sourceCode,
        language_id: languageId,
        stdin,
        expected_output: expectedOutput,
      }
    )
    if (submitResponse.status !== HttpStatusCode.CREATED) {
      return NextResponse.json(
        { error: submitResponse.data },
        {
          status: submitResponse.status,
          statusText: submitResponse.statusText,
        }
      )
    }
    const token: string | undefined = submitResponse.data.token
    // console.log(token)
    if (!token) {
      return NextResponse.json(
        { error: "Token not provided" },
        { status: 500, statusText: "Internal Server Error" }
      )
    }
    const response = await pollForResult(token)
    return NextResponse.json({response},{status:200,statusText:"OK"})
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error },
      {
        status: HttpStatusCode.INTERNAL_SERVER_ERROR,
        statusText: "Internal Server Error",
      }
    )
  }
}

