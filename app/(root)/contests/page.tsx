"use client"

import React, { useEffect } from "react"
import Image from "next/image"
import { useGetAllContestsQuery } from "@/redux/features/contest/contestApi"

import { Icontest } from "@/types/default"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import ContestItem from "@/components/contest/contest-Item"
import Loading from "@/app/loading"

interface Props {}

const Page: React.FC<Props> = () => {
  const { data, isLoading, error } = useGetAllContestsQuery({})
  const imagePath: string = "/images/trophy-icon.png"
  if (isLoading) {
    return <Loading />
  }
  return (
    <section className="container">
      {error ? (
        <h2>contests not found</h2>
      ) : (
        <div>
          <div className="trophy-wrapper">
            <div id="trophy-image">
              <Image src={imagePath} alt="trophy" width={200} height={200} />
            </div>
            <div className="text-center">
              <h2 className="text-xl font-semibold leading-tight tracking-tighter">
                Naveen Contest
              </h2>
              <p className="text-muted-foreground">
                Contest every week. Complete and see your score
              </p>
            </div>
          </div>
          <div className="my-[2rem] text-2xl font-bold leading-tight tracking-tighter">
            <h1 className="">Upcoming contests</h1>
            <div id="items-wrapper" className="mt-[2rem]">
              {data &&
                Array.isArray(data.contests) &&
                data.contests.map((contest: Icontest, contestIndex: number) => (
                  <ContestItem key={contestIndex} contest={contest} />
                ))}
            </div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      )}
    </section>
  )
}

export default Page
