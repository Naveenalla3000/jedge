import React from "react"
import Link from "next/link"
import { Github, Instagram, Linkedin, Twitter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SiteFooter() {
  return (
    <footer>
      <div
        className="
        container
        mx-auto flex flex-col
        flex-wrap
        px-4
        py-16
        md:flex-row
        md:flex-nowrap
        md:items-center lg:items-start
      "
      >
        <div className="mx-auto w-[24rem] shrink-0 text-center md:mx-0 md:text-left">
          <Link href={"/"} className="text-2xl">
            My Vision
          </Link>
          <p className="mt-2 text-justify text-sm text-muted-foreground">
            Our vision is to forge a coding platform that stands as a beacon for
            inclusivity, innovation, and collaboration. We are dedicated to
            empowering our community by providing resources that foster
            learning, development, and efficient problem-solving in a supportive
            and dynamic environment.
          </p>
          <div className="mt-4 flex gap-x-1">
            <Input type="email" placeholder="Email" />
            <Button variant="default">Subscribe</Button>
          </div>
          <div className="mt-4 flex justify-start space-x-4 lg:mt-2">
            <Link href={""}>
              <Github className="text-slate-400" />
            </Link>
            <Link href={""}>
              <Twitter className="text-sky-300" />
            </Link>
            <Link href={""}>
              <Instagram className="text-pink-500" />
            </Link>
            <Link href={""}>
              <Linkedin className="text-blue-400" />
            </Link>
          </div>
        </div>
        <div className="mt-4 w-full justify-between text-center lg:flex">
          <div className="w-full px-4 md:w-1/2 lg:w-1/3">
            <h2 className="mb-2 font-bold tracking-widest">Quick Links</h2>
            <ul className="mb-8 list-none space-y-2 text-sm">
              <li>
                <Link href={"/"}>Link 1</Link>
              </li>
              <li>
                <Link href={"/"}>Link 2</Link>
              </li>
              <li>
                <Link href={"/"}>Link 3</Link>
              </li>
              <li>
                <Link href={"/"}>Link 4</Link>
              </li>
            </ul>
          </div>
          <div className="w-full px-4 md:w-1/2 lg:w-1/3">
            <h2 className="mb-2 font-bold tracking-widest">Quick Links</h2>
            <ul className="mb-8 list-none space-y-2 text-sm">
              <li>
                <Link href={"/"}>Link 1</Link>
              </li>
              <li>
                <Link href={"/"}>Link 2</Link>
              </li>
              <li>
                <Link href={"/"}>Link 3</Link>
              </li>
              <li>
                <Link href={"/"}>Link 4</Link>
              </li>
            </ul>
          </div>
          <div className="w-full px-4 md:w-1/2 lg:w-1/3">
            <h2 className="mb-2 font-bold tracking-widest">Quick Links</h2>
            <ul className="mb-8 list-none space-y-2 text-sm">
              <li>
                <Link href={"/"}>Link 1</Link>
              </li>
              <li>
                <Link href={"/"}>Link 2</Link>
              </li>
              <li>
                <Link href={"/"}>Link 3</Link>
              </li>
              <li>
                <Link href={"/"}>Link 4</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="-mt-12 flex justify-center">
        <p className="pb-2 text-center">
          @2024 All rights reserved by{" "}
          <a href="https://www.linkedin.com/in/naveen-alla/">Naveen Alla</a>
        </p>
      </div>
    </footer>
  )
}
