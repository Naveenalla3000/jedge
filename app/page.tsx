"use client"

import Image from "next/image"
import Link from "next/link"
import { StarIcon } from "@radix-ui/react-icons"

import { siteConfig } from "@/config/site"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export default function IndexPage() {
  return (
    <section className="">
      <div className="relative">
        <div className="relative flex h-[95vh] flex-col items-center justify-center gap-y-3 text-center">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-5xl">
            Beautifully designed <span id="color-gradent">coding platform</span>{" "}
            <br className="hidden sm:inline" />
            built with Radix UI and Tailwind CSS.
          </h1>
          <p className="max-w-[700px] text-xl text-muted-foreground">
            Participate in contests and get a accoknowlagement for your efforts.
            <br />
            Start your coding journey today
            <br />
          </p>
          <div></div>
          <div className="flex gap-x-4">
            <Link
              href={siteConfig.links.docs}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants()}
            >
              Get start
            </Link>
            <Link
              target="_blank"
              rel="noreferrer"
              href={siteConfig.links.github}
              className={buttonVariants({ variant: "outline" })}
            >
              GitHub
            </Link>
          </div>
          <Image
            width={200}
            height={350}
            id="robo-gif"
            className="hidden md:flex lg:flex"
            loading="lazy"
            decoding="async"
            style={{ width: "200px", height: "350px" }}
            alt="robo-gif"
            src="/images/robo.webp"
          />
          <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] dark:from-pink-950 from-pink-400/85 to-transparent rounded-full h-80 w-80 z-10 blur-lg absolute top-3/4 -left-4 transform -translate-x-1/2 -translate-1/2"></div>
        </div>
        <div id="mouse-scroll">
          <div className="mouse">
            <div className="mouse-in"></div>
          </div>
          <div>
            <span className="down-arrow-1"></span>
            <span className="down-arrow-2"></span>
            <span className="down-arrow-3"></span>
          </div>
        </div>
      </div>

      <div id="courses-wrapper" className="container">
        <div id="items-wrapper">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between pb-2">
                <Avatar>
                  <AvatarImage
                    src="https://banner2.cleanpng.com/20180412/kye/kisspng-python-programming-language-computer-programming-language-5acfdc3636bac7.8891188615235717662242.jpg"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Badge variant={"default"}>Beginner</Badge>
              </div>
              <CardTitle>Learn Python</CardTitle>
              <CardDescription>
                Get hands-on experience and master the basic syntax of Python to
                jumpstart your coding journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p>56.6k+ learners</p>
                <p>2.5k+ hours</p>
                <p className="flex items-center gap-x-1">
                  4 <StarIcon style={{ color: "gold" }} />{" "}
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button>View Course</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between pb-2">
                <Avatar>
                  <AvatarImage
                    src="https://banner2.cleanpng.com/20180412/kye/kisspng-python-programming-language-computer-programming-language-5acfdc3636bac7.8891188615235717662242.jpg"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Badge variant={"default"}>Beginner</Badge>
              </div>
              <CardTitle>Learn Python</CardTitle>
              <CardDescription>
                Get hands-on experience and master the basic syntax of Python to
                jumpstart your coding journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p>56.6k+ learners</p>
                <p>2.5k+ hours</p>
                <p className="flex items-center gap-x-1">
                  4 <StarIcon style={{ color: "gold" }} />{" "}
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button>View Course</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between pb-2">
                <Avatar>
                  <AvatarImage
                    src="https://banner2.cleanpng.com/20180412/kye/kisspng-python-programming-language-computer-programming-language-5acfdc3636bac7.8891188615235717662242.jpg"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Badge variant={"default"}>Beginner</Badge>
              </div>
              <CardTitle>Learn Python</CardTitle>
              <CardDescription>
                Get hands-on experience and master the basic syntax of Python to
                jumpstart your coding journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p>56.6k+ learners</p>
                <p>2.5k+ hours</p>
                <p className="flex items-center gap-x-1">
                  4 <StarIcon style={{ color: "gold" }} />{" "}
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button>View Course</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between pb-2">
                <Avatar>
                  <AvatarImage
                    src="https://banner2.cleanpng.com/20180412/kye/kisspng-python-programming-language-computer-programming-language-5acfdc3636bac7.8891188615235717662242.jpg"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Badge variant={"default"}>Beginner</Badge>
              </div>
              <CardTitle>Learn Python</CardTitle>
              <CardDescription>
                Get hands-on experience and master the basic syntax of Python to
                jumpstart your coding journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p>56.6k+ learners</p>
                <p>2.5k+ hours</p>
                <p className="flex items-center gap-x-1">
                  4 <StarIcon style={{ color: "gold" }} />{" "}
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button>View Course</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between pb-2">
                <Avatar>
                  <AvatarImage
                    src="https://banner2.cleanpng.com/20180412/kye/kisspng-python-programming-language-computer-programming-language-5acfdc3636bac7.8891188615235717662242.jpg"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Badge variant={"default"}>Beginner</Badge>
              </div>
              <CardTitle>Learn Python</CardTitle>
              <CardDescription>
                Get hands-on experience and master the basic syntax of Python to
                jumpstart your coding journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p>56.6k+ learners</p>
                <p>2.5k+ hours</p>
                <p className="flex items-center gap-x-1">
                  4 <StarIcon style={{ color: "gold" }} />{" "}
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button>View Course</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between pb-2">
                <Avatar>
                  <AvatarImage
                    src="https://banner2.cleanpng.com/20180412/kye/kisspng-python-programming-language-computer-programming-language-5acfdc3636bac7.8891188615235717662242.jpg"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Badge variant={"default"}>Beginner</Badge>
              </div>
              <CardTitle>Learn Python</CardTitle>
              <CardDescription>
                Get hands-on experience and master the basic syntax of Python to
                jumpstart your coding journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p>56.6k+ learners</p>
                <p>2.5k+ hours</p>
                <p className="flex items-center gap-x-1">
                  4 <StarIcon style={{ color: "gold" }} />{" "}
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button>View Course</Button>
            </CardFooter>
          </Card>
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
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
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
      <div className="expand-menu container">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              How frequently are new coding challenges added to the platform?
            </AccordionTrigger>
            <AccordionContent>
              New coding challenges are added to the platform weekly. <br />
              This ensures that learners always have fresh problems to solve and
              can continuously improve their coding skills by tackling the
              latest challenges.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              What topics are included in the coding platform&apos;s syllabus,
              and how are they structured for learners?
            </AccordionTrigger>
            <AccordionContent>
              Our coding platform covers a wide range of topics, including data
              structures, algorithms, databases, and language-specific
              challenges.
              <br /> The syllabus is structured to guide learners from basic to
              advanced levels, with practice problems and contests designed to
              reinforce concepts and improve problem-solving skills.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              Can users contribute to the platform by creating their own coding
              challenges?
            </AccordionTrigger>
            <AccordionContent>
              Yes, users can contribute to the platform by creating their own
              coding challenges. <br />
              This feature allows for a diverse range of problems and
              perspectives, enriching the learning experience for everyone.
              Submitted challenges are reviewed by our team to ensure they meet
              our quality standards before being made available to all users.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              How does the platform facilitate peer learning and community
              interaction?
            </AccordionTrigger>
            <AccordionContent>
              The platform facilitates peer learning and community interaction
              through discussion forums, solution sharing, and collaborative
              coding sessions.
              <br /> Users can ask questions, share insights, and learn from
              each other&apos;s approaches to problem-solving.
              <br />
              Additionally, we host live coding events and contests that foster
              a sense of community and friendly competition among users.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  )
}
