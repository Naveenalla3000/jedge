import { HttpMethods } from "@/constants"

import { api } from "../api"

interface IGetQuestion {
  contestId: string
  questionId: string
}
export interface ISubmitSolution {
  sourceCode: string
  languageId: number
  stdin?: string
  expectedOutput?: string
}
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
    getQuestion: builder.query<any, IGetQuestion>({
      query: ({ contestId, questionId }) => ({
        url: `/contest/${contestId}/question/${questionId}`,
        method: HttpMethods.GET,
        credentials: "include" as const,
      }),
    }),
    submitSolution: builder.mutation<any, ISubmitSolution>({
      query: ({ sourceCode, languageId, stdin, expectedOutput }) => ({
        url: "/jedge/submissions",
        method: HttpMethods.POST,
        credentials: "include" as const,
        body: {
          sourceCode,
          languageId,
          stdin,
          expectedOutput,
        },
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }),
    }),
  }),
})

export const {
  useGetAllContestsQuery,
  useGetContestQuery,
  useGetQuestionQuery,
  useSubmitSolutionMutation,
} = contestApi
