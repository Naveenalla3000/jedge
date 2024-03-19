"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useGetContestQuery } from "@/redux/features/contest/contestApi"
import { ThickArrowLeftIcon } from "@radix-ui/react-icons"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import ContestQuestion from "@/components/contest/contest-question"
import ContestRegistation from "@/components/contest/contest-registation"
import CountdownTimer from "@/components/countdown-timer"
import EventCountDown from "@/components/event-count-down"
import InternalServerErrorPage from "@/app/500"
import Loading from "@/app/loading"

type Props = {}
interface ProblemInterface {
  questionId: string
  title: string
  difficulty: string
  status: string
  score: number
}

interface IQuestion {
  id: string
  title: string
  difficulty_level: string
  score: number
}

export interface IContest {
  name: string
  id: string
  description: string
  questions?: IQuestion[]
  startsAt: string
  endsAt: string
  isStarted: boolean
}

const Page = (props: Props) => {
  const searchParams = useSearchParams()
  const contestId = searchParams.get("contestId") || ""
  const contestName = searchParams.get("contestName") || ""
  const questionId = searchParams.get("questionId") || ""
  const questionTitle = searchParams.get("questionTitle") || ""
  const [contestData, setContestData] = useState<IContest>()
  const [isAccknowledged, setIsAccknowledged] = useState<boolean>(false)

  const { data, isLoading, error } = useGetContestQuery(contestId)

  useEffect(() => {
    if (data) 
      setContestData(data.contestData)
  }, [data])

  if (isLoading) {
    return <Loading />
  }
  if (error) {
    return <InternalServerErrorPage />
  }
  let countdownStartTimeToDate: number = 0
  let countdownEndTimeToDate: number = 0
  if (contestData) {
    countdownStartTimeToDate = new Date(contestData.startsAt).getTime()
    countdownEndTimeToDate = new Date(contestData.endsAt).getTime()
  }
  return (
    <section className="container">
      {contestId && !questionId && (
        <>
          {contestData && (
            <>
              <div className="">
                <div className="relative items-center">
                  <Link
                    href={"/contests"}
                    className="flex w-fit my-[2rem] items-center gap-x-2 text-muted-foreground"
                  >
                    <Button variant={"ghost"}>
                      <ThickArrowLeftIcon />
                    </Button>
                    <h3>Back to contests</h3>
                  </Link>
                  {!!contestData.isStarted && (
                    <div className="absolute bottom-[-1.4rem] right-7">
                      <div className="flex items-center justify-between gap-x-4">
                        <h1 className="text-2xl mb-4">Ends in</h1>
                        <EventCountDown endsAt={contestData.endsAt} />
                      </div>
                    </div>
                  )}
                </div>
                <Card className="hover:!scale-100 !cursor-auto">
                  <CardHeader>
                    <CardTitle>{contestData.name.replace(/_/g, " ")}</CardTitle>
                    <CardDescription className="w-[50%] font-[2rem] line-clamp-3">
                      {contestData.description}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-between">
                    <Badge variant={"secondary"} className="text-sm">
                      <CountdownTimer
                        targetStartTime={countdownStartTimeToDate}
                        targetEndTime={countdownEndTimeToDate}
                      />
                    </Badge>
                  </CardFooter>
                </Card>
                {!!contestData.isStarted ? (
                  <Table className="mt-[2rem]">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[200px]">Question-Id</TableHead>
                        <TableHead className="flex-auto">Title</TableHead>
                        <TableHead className="text-right w-[200px]">
                          Difficulty
                        </TableHead>
                        <TableHead className="text-right w-[200px]">
                          Status
                        </TableHead>
                        <TableHead className="text-right w-[200px]">
                          Score
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Array.isArray(contestData.questions) &&
                        contestData.questions.map((question) => (
                          <TableRow key={question.id}>
                            <TableCell className="font-medium w-[200px]">
                              {question.id.substring(question.id.length - 8)}
                            </TableCell>
                            <TableCell className="flex-auto">
                              <Link
                                href={`/contest?contestId=${contestId}&contestName=${contestName}&questionId=${question.id}&questionName=${question.title}`}
                              >
                                {question.title}
                              </Link>
                            </TableCell>
                            <TableCell className="text-right w-[200px]">
                              {question.difficulty_level}
                            </TableCell>
                            <TableCell className="text-right w-[200px]">
                              {"Completed"}
                            </TableCell>
                            <TableCell className="text-right w-[200px]">
                              {question.score}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell colSpan={4}></TableCell>
                        <TableCell className="text-right">
                          {Array.isArray(contestData.questions)
                            ? contestData.questions.reduce(
                                (acc, question) => acc + question.score,
                                0
                              )
                            : 0}
                        </TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                ) : (
                  <ContestRegistation contestData={contestData} />
                )}
              </div>
            </>
          )}
        </>
      )}
      {contestId && questionId && (
        <>
          <ContestQuestion contestData={contestData} contestId={contestId} questionId={questionId} />
        </>
      )}
    </section>
  )
}

export default Page
