import { HttpMethods } from "@/constants"

import { Contest } from "@/types/default"

import { api } from "../api"

export const contestApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllContests: builder.query({
      query: () => ({
        url: "/contest/all",
        method: HttpMethods.GET,
        credentials: "include" as const,
      }),
    }),
    getContest: builder.query({
      query: (id: string) => ({
        url: `/contest/${id}`,
        method: HttpMethods.GET,
        credentials: "include" as const,
      }),
    }),
  }),
})

export const { useGetAllContestsQuery,useGetContestQuery } = contestApi
