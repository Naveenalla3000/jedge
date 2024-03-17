import React from "react"
import Link from "next/link"

import { Icontest } from "@/types/default"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import CountdownTimer from "../countdown-timer"

interface ContestItemProps {
  contest: Icontest
  key: number
}

const ContestItem: React.FC<ContestItemProps> = ({ contest }) => {
  const {
    id,
    name,
    noOfQuestions,
    startsAt,
    endsAt,
    description,
    contest_level,
  } = contest

  const calculateDuration = (startsAt: string, endsAt: string): string => {
    const startDate = new Date(startsAt)
    const endDate = new Date(endsAt)
    const durationMs = endDate.getTime() - startDate.getTime()
    const hours = Math.floor(durationMs / (1000 * 60 * 60))
    const minutes = Math.floor((durationMs / (1000 * 60)) % 60)
    const seconds = Math.floor((durationMs / 1000) % 60)
    return `${hours > 0 ? `${hours}h ` : ""}${minutes}m ${seconds}s`
  }
  const countdownStartTimeToDate = new Date(startsAt).getTime()
  const countdownEndTimeToDate = new Date(endsAt).getTime()
  return (
    <Card>
      <Link href={`/contest?contestId=${id}&contestName=${name}`}>
        <CardHeader>
          <div className="flex items-center justify-between pb-2">
            <Badge variant={"secondary"} className="text-sm">
              <CountdownTimer
                targetStartTime={countdownStartTimeToDate}
                targetEndTime={countdownEndTimeToDate}
              />
            </Badge>
            <Badge variant={"default"}>{contest_level}</Badge>
          </div>
          <CardTitle>{name.replace(/_/g, " ")}</CardTitle>
          <CardDescription className="!font-normal">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between !text-lg !font-normal">
            <p>{noOfQuestions - 1}+ problems</p>
            <p>{calculateDuration(startsAt, endsAt)}</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button>View Contest</Button>
        </CardFooter>
      </Link>
    </Card>
  )
}

export default ContestItem
