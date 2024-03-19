"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { StarIcon, ThickArrowLeftIcon } from "@radix-ui/react-icons"

import { contestInstructions } from "@/config/site"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { IContest } from "@/app/(root)/contest/page"

import { Button } from "../ui/button"

const scores = [
  {
    position: "1st",
    points: 2000,
  },
  {
    position: "2st",
    points: 1000,
  },
  {
    position: "3st",
    points: 500,
  },
  {
    position: "Bonus",
    points: 100,
  },
]

type Props = {
  contestData: IContest
}

const ContestRegistation = (props: Props) => {
  const { contestData } = props
  const imagePath: string = "/images/trophy-icon.png"
  const [isAccknowledged, setIsAccknowledged] = useState<boolean>(false)
  const handleAcknowledged = () => setIsAccknowledged(!isAccknowledged)

  return (
    <div className="flex items-center justify-between mt-[1rem] gap-x-8">
      <div className="rules-aggrement mt-[2rem]">
        <h2 className="font-semibold text-xl">
          Welcome to the {contestData.name.replace(/_/g, " ")}{" "}
        </h2>
        <h3 className="text-muted-foreground text-sm">Important Notice</h3>
        <ul className="my-3 text-sm ml-6 list-disc [&>li]:mt-2">
          {Array.isArray(contestInstructions) &&
            contestInstructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
        </ul>
        <form className="flex items-center space-x-2">
          <Checkbox id="terms" onClick={handleAcknowledged} />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Accept terms and conditions
          </label>
        </form>
        <Button
          className={`mt-[1rem] ${
            !isAccknowledged ? "cursor-not-allowed" : "cursor-pointer"
          }`}
          variant={!isAccknowledged ? "secondary" : "default"}
          disabled={!isAccknowledged}
        >
          Register
        </Button>
      </div>
      <Card className="hover:!scale-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-x-[1rem]">
            <Image src={imagePath} width={28} height={28} alt="prices"></Image>
            <span>Prices</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="w-[250px]">
            <TableCaption>Participate weekly + Bonuse 100</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Position</TableHead>
                <TableHead className="text-right">Points</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scores.map((score, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {score.position}
                  </TableCell>
                  <TableCell className="text-right flex items-center justify-end gap-x-2">
                    {score.points}
                    <span>
                      <StarIcon style={{ color: "gold" }} />
                    </span>{" "}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default ContestRegistation
