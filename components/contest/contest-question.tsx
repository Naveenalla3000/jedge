"use client"

import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { defaultKeymap, historyField } from "@codemirror/commands"
import { javascript } from "@codemirror/lang-javascript"
import { EditorState } from "@codemirror/state"
import { EditorView } from "@codemirror/view"
import {
  PlayIcon,
  ReloadIcon,
  ThickArrowLeftIcon,
  ThickArrowRightIcon,
} from "@radix-ui/react-icons"
import { githubDark, githubLight } from "@uiw/codemirror-theme-github"
import CodeMirror, { ReactCodeMirrorRef } from "@uiw/react-codemirror"

import { defaultExamples } from "@/config/examples"
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

import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"

// type Props = {
//   question: String
// }
const stateFields = { history: historyField }

const ContestQuestion = () => {
  const codeMirrorRef = useRef<ReactCodeMirrorRef>(null)

  const [value, setValue] = useState("console.log('Hello world!')")

  useEffect(() => {
    const serializedState = localStorage.getItem("myEditorState")
    const storedValue =
      localStorage.getItem("myValue") || "console.log('Hello world!')"
    setValue(storedValue)
  }, [])

  const handleOnChange = (
    value: string,
    viewUpdate: { state: EditorState }
  ) => {
    localStorage.setItem("myValue", value)
    const state = viewUpdate.state.toJSON()
    localStorage.setItem("myEditorState", JSON.stringify(state))
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (
      (event.ctrlKey || event.metaKey) &&
      (event.key === "c" || event.key === "v")
    ) {
      event.preventDefault()
    }
  }

  const handleContextMenu = (event: React.MouseEvent) => event.preventDefault()

  return (
    <section className="container">
      <div className="flex items-center justify-around my-[2rem]">
        <div className="flex-1 flex">
          <Link
            href={"/contests"}
            className="max-w-fit flex items-center gap-x-2 text-muted-foreground"
          >
            <Button variant={"ghost"}>
              <ThickArrowLeftIcon />
            </Button>
            <h3>Back to contest</h3>
          </Link>
        </div>
        <div className="flex-1 mr-[11.5rem] flex w-fit items-center gap-x-2 text-muted-foreground">
          <Button variant={"secondary"}>
            <ThickArrowLeftIcon />
          </Button>
          <h3>Question - 1</h3>
          <Button variant={"secondary"}>
            <ThickArrowRightIcon />
          </Button>
        </div>
      </div>
      <ResizablePanelGroup
        direction="horizontal"
        className="rounded-lg border w-full min-h-[120vh] max-h-full"
      >
        <ResizablePanel defaultSize={50}>
          <div className="px-[1rem] h-[120vh] overflow-auto pb-[1rem]">
            <h1 className="text-xl pt-[.5rem] font-semibold">
              Merge Sorted Array
            </h1>
            <Badge className="mt-[.5rem]" variant={"secondary"}>
              Easy
            </Badge>
            <p className="text-sm mt-[.5rem] tracking-wider whitespace-break-spaces leading-5 ">
              Given two arrays, nums1 and nums2, both sorted in non-decreasing
              order, merge nums2 into nums1 in-place so that nums1 becomes a
              single sorted array. Initially, nums1 contains m elements,
              followed by n empty slots (marked with 0's) that are reserved for
              the elements of nums2. The array nums2 has n elements. Modify
              nums1 in-place without using extra space for another array.
            </p>
            <h2 className="text-lg font-semibold mt-[1rem]">Constraints</h2>
            <ul className="list-disc px-[1rem] text-sm">
              <li>{"1 <= m, n <= 200"}</li>
              <li>{"-10^9 <= nums1[i], nums2[i] <= 10^9"}</li>
              <li>{"nums1 is sorted in non-decreasing order."}</li>
              <li>{"nums2 is sorted in non-decreasing order."}</li>
            </ul>
            <div className="solved-examples">
              {Array.isArray(defaultExamples) &&
                defaultExamples.map((example, index) => (
                  <div className="example-item" key={index}>
                    <h2 className="text-lg font-semibold mt-[1rem]">
                      Example-{index + 1}
                    </h2>
                    <p className="text-sm mt-[.5rem] tracking-wider whitespace-break-spaces leading-5 ">
                      Input: {example.input}
                      <br />
                      Output: {example.output}
                      <br />
                      Explanation: {example.explanation}
                    </p>
                  </div>
                ))}
            </div>
            <div className="solution-explanation">
              <h2 className="text-lg font-semibold mt-[1rem]">
                Solution Explanation:
              </h2>
              <ul className="list-disc px-[1rem]">
                <li className="text-sm mt-[.5rem] whitespace-break-spaces">
                  {" "}
                  The idea is to use two pointers to traverse the two arrays
                  from the end.
                </li>
                <li className="text-sm mt-[.5rem] whitespace-break-spaces">
                  {" "}
                  Start from the end of both arrays, compare elements of nums2
                  and nums1.
                </li>
                <li className="text-sm mt-[.5rem] whitespace-break-spaces">
                  {" "}
                  Place the larger element at the end of nums1 and move the
                  pointer backwards in the array where the element was picked.
                </li>
                <li className="text-sm mt-[.5rem] whitespace-break-spaces">
                  {" "}
                  If nums2 has elements left (when nums1 is exhausted), copy the
                  remaining elements of nums2 to nums1.
                </li>
                <li className="text-sm mt-[.5rem] whitespace-break-spaces">
                  {" "}
                  Since nums1 is already sorted and has enough space for nums2,
                  no need for extra space.
                </li>
                <li className="text-sm mt-[.5rem] whitespace-break-spaces">
                  {" "}
                  We return the modified first array.
                </li>
              </ul>
            </div>
            <h2 className="mt-[.5rem] text-lg font-semibold">
              Happy Coding! &#129395;
            </h2>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={60}>
              <div className="editor-ui w-full px-1 py-1">
                <div className="option-select flex items-center justify-between gap-x-1">
                  <Select>
                    <SelectTrigger className="w-[50%]">
                      <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger>
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
                <div
                  className="editor py-1 border-0"
                  onKeyDown={handleKeyDown}
                  onContextMenu={handleContextMenu}
                  id="unselectable"
                >
                  <CodeMirror
                    ref={codeMirrorRef}
                    id="unselectable"
                    value={value}
                    onChange={handleOnChange}
                    className="border h-full"
                    theme={githubDark}
                    minHeight="300px"
                    height="1000px"
                    onKeyDown={handleKeyDown}
                    onContextMenu={handleContextMenu}
                    extensions={[javascript({ jsx: true })]}
                  />
                </div>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={40}>
              <div className="py-2 px-1">
                <div className="option-select flex items-center justify-end gap-x-2">
                  <Button variant="secondary" className="w-[80px]">
                    <PlayIcon />
                  </Button>
                  <Button variant="default" className="w-[80px]">
                    Submit
                  </Button>
                </div>
                <div className="flex flex-col gap-y-[1rem]">
                  <div className="flex flex-col gap-y-2">
                    <Label className="text-muted-foreground">
                      Sample input
                    </Label>
                    <Textarea
                      value={`2\n12 13\n24 23`}
                      onChange={() => {}}
                      className="!min-h-[8.5rem]"
                    />
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <Label className="text-muted-foreground">
                      Sample output
                    </Label>
                    <Textarea
                      value={`25\n47`}
                      onChange={() => {}}
                      className="!min-h-[8.7rem]"
                    />
                  </div>
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </section>
  )
}

export default ContestQuestion
