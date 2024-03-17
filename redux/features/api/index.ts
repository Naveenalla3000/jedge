import { ApiVersion } from "@/constants"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_URI + ApiVersion,
  }),
  endpoints: (builder) => ({}),
})

export const {} = api
