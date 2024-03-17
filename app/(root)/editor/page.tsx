"use client"

import React from "react"
import { javascript } from "@codemirror/lang-javascript"
import { ReloadIcon } from "@radix-ui/react-icons"
import { githubDark } from "@uiw/codemirror-theme-github"
import CodeMirror from "@uiw/react-codemirror"

import { Button } from "@/components/ui/button"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

type Props = {}
const page = (props: Props) => {
  return (
    <section className="container w-full">
      <div className="selectors flex items-start justify-evenly pt-[.5rem]">
        <Select>
          <SelectTrigger className="w-[25%]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="mx-2">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          {" "}
          <ReloadIcon className="size-[1rem]" />
        </Button>
      </div>
      <ResizablePanelGroup direction="horizontal" className="rounded-lg pt-1">
        <ResizablePanel defaultSize={75}>
          <div className="editor h-[100%] pt-1">
            <CodeMirror
              className="border"
              value='console.log("Hello world")'
              theme={githubDark}
              minHeight="300px"
              height="660px"
              extensions={[javascript({ jsx: true })]}
            />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={25}>
          <div className="flex flex-col gap-y-2 pl-2 pr-[1px] pt-1">
            <Textarea placeholder="Input here" />
            <Textarea placeholder="Output here" />
            <Button className="cursor-pointer">Run</Button>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </section>
  )
}

export default page
