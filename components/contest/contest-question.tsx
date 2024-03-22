"use client"

import { ServerResponse } from "http"
import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
import {
  useGetQuestionQuery,
  useSubmitSolutionMutation,
} from "@/redux/features/contest/contestApi"
import { handleKeyDown } from "@/utils/copy-past"
import { generateDefaultCode } from "@/utils/generateDefaultCode"
import { showToast } from "@/utils/show-toast"
import { cpp } from "@codemirror/lang-cpp"
import { java } from "@codemirror/lang-java"
import { javascript } from "@codemirror/lang-javascript"
import { python } from "@codemirror/lang-python"
import { EditorState } from "@codemirror/state"
import {
  PlayIcon,
  ReloadIcon,
  ThickArrowLeftIcon,
  ThickArrowRightIcon,
} from "@radix-ui/react-icons"
import { copilot } from "@uiw/codemirror-theme-copilot"
import { dracula } from "@uiw/codemirror-theme-dracula"
import { githubDark, githubLight } from "@uiw/codemirror-theme-github"
import { monokai } from "@uiw/codemirror-theme-monokai"
import { xcodeDark, xcodeLight } from "@uiw/codemirror-theme-xcode"
import CodeMirror, { Extension } from "@uiw/react-codemirror"

import { IQuestion, JedgeServerResponse } from "@/types/default"
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
import InternalServerErrorPage from "@/app/500"
import { IContest } from "@/app/(root)/contest/page"
import Loading from "@/app/loading"

import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"

enum EditorTheme {
  Copilot = "copilot",
  Dracula = "dracula",
  GithubDark = "githubDark",
  GithubLight = "githubLight",
  Monokai = "monokai",
  XcodeDark = "xcodeDark",
  XcodeLight = "xcodeLight",
  System = "system",
}

enum EditorLanguage {
  cpp = "cpp",
  java = "java",
  javascript = "javascript",
  python = "python",
}
type LanguageIdMap = {
  [key in EditorLanguage]: number
}

const languageIdMap: LanguageIdMap = {
  [EditorLanguage.cpp]: 50,
  [EditorLanguage.java]: 62,
  [EditorLanguage.javascript]: 63,
  [EditorLanguage.python]: 70,
}

const editorThemes = Object.values(EditorTheme).map((theme) => ({
  themeValue: theme,
  themeDisplayName:
    theme.charAt(0).toUpperCase() +
    theme
      .slice(1)
      .replace(/([A-Z])/g, " $1")
      .trim(),
}))
const editorLanguages = Object.values(EditorLanguage).map((language) => ({
  languageValue: language,
  languageDisplayName:
    language.charAt(0).toUpperCase() +
    language
      .slice(1)
      .replace(/([A-Z])/g, " $1")
      .trim(),
}))
const languageExtensions: Record<EditorLanguage, Extension> = {
  [EditorLanguage.cpp]: cpp(),
  [EditorLanguage.java]: java(),
  [EditorLanguage.javascript]: javascript({ jsx: true }),
  [EditorLanguage.python]: python(),
}
const themeExtensions: Record<EditorTheme, Extension> = {
  [EditorTheme.Copilot]: copilot,
  [EditorTheme.Dracula]: dracula,
  [EditorTheme.GithubDark]: githubDark,
  [EditorTheme.GithubLight]: githubLight,
  [EditorTheme.Monokai]: monokai,
  [EditorTheme.System]: githubDark,
  [EditorTheme.XcodeDark]: xcodeDark,
  [EditorTheme.XcodeLight]: xcodeLight,
}

type Props = {
  questionId: string
  contestId: string
  contestData: IContest | undefined
}

interface ApiResponse {
  response: JedgeServerResponse
}

const ContestQuestion: React.FC<Props> = ({
  contestId,
  questionId,
  contestData,
}) => {
  const [questionData, setQuestionData] = useState<IQuestion>()
  const { data, error, isLoading } = useGetQuestionQuery({
    questionId,
    contestId,
  })
  const [value, setValue] = useState<string>("")
  const [editorTheme, setEditorTheme] = useState<Extension>(githubDark)
  const [editorLanguage, setEditorLanguage] = useState<Extension>(python())
  const [submitSolution, { isLoading: isSubmiting }] =
    useSubmitSolutionMutation()
  const [response, setResponse] = useState<JedgeServerResponse | null>(null)
  const codeMirrorRef = useRef(null)

  useEffect(() => {
    getPeriousCode()
  }, [questionId, editorLanguage])

  //get perious-code from localstorage
  const getPeriousCode = () => {
    const selectedEditorLanguage: keyof typeof EditorLanguage =
      (localStorage.getItem("editorLanguage") as keyof typeof EditorLanguage) ||
      "python"
    const defaultCode = generateDefaultCode(selectedEditorLanguage)
    const storedValue =
      localStorage.getItem(`code-${questionId}-${selectedEditorLanguage}`) ||
      defaultCode
    setValue(storedValue)
  }
  // getting question
  useEffect(() => {
    if (data) {
      setQuestionData(data.questionData)
      console.log(data)
    }
    if (error) {
      console.log(error)
    }
  }, [data])

  useEffect(() => {
    let storedEditorThemeKey = localStorage.getItem("editorTheme")
    if (
      storedEditorThemeKey &&
      Object.values(EditorTheme).includes(storedEditorThemeKey as EditorTheme)
    ) {
      const storedEditorTheme =
        themeExtensions[storedEditorThemeKey as EditorTheme]
      setEditorTheme(storedEditorTheme)
    } else {
      const siteTheme = localStorage.getItem("theme")
      const defaultThemeKey: EditorTheme =
        siteTheme === "dark" ? EditorTheme.GithubDark : EditorTheme.GithubLight
      setEditorTheme(themeExtensions[defaultThemeKey])
      localStorage.setItem("editorTheme", defaultThemeKey)
    }
  }, [])

  const handleEditorThemeChange = (
    selectedValue: keyof typeof EditorTheme | "system"
  ) => {
    let editorThemeKey: EditorTheme
    if (selectedValue === "system") {
      const siteTheme = localStorage.getItem("theme")
      editorThemeKey =
        siteTheme === "dark" ? EditorTheme.GithubDark : EditorTheme.GithubLight
    } else {
      editorThemeKey = selectedValue as EditorTheme
    }
    const editorTheme = themeExtensions[editorThemeKey]
    setEditorTheme(editorTheme)
    localStorage.setItem("editorTheme", editorThemeKey)
  }

  useEffect(() => {
    let storedEditorLanguageKey = localStorage.getItem("editorLanguage")
    if (
      storedEditorLanguageKey &&
      Object.values(EditorLanguage).includes(
        storedEditorLanguageKey as EditorLanguage
      )
    ) {
      const storeEditorLanguage =
        languageExtensions[storedEditorLanguageKey as EditorLanguage]
      setEditorLanguage(storeEditorLanguage)
    } else {
      const defaultEditorLanguage = EditorLanguage.python
      setEditorLanguage(languageExtensions[defaultEditorLanguage])
      localStorage.setItem("editorLanguage", defaultEditorLanguage)
    }
  }, [editorLanguage])

  const handleEditorLanguageChange = (
    selectedLanguage: keyof typeof EditorLanguage
  ) => {
    setEditorLanguage(languageExtensions[selectedLanguage])
    localStorage.setItem("editorLanguage", selectedLanguage)
    const defaultCode = generateDefaultCode(selectedLanguage)
    const storedValue =
      localStorage.getItem(`code-${questionId}-${selectedLanguage}`) ||
      defaultCode
    setValue(storedValue)
    console.log(selectedLanguage)
  }

  const handleOnChange = (
    value: string,
    viewUpdate: { state: EditorState }
  ) => {
    const selectedEditorLanguage =
      localStorage.getItem("editorLanguage") || "python"
    localStorage.setItem(`code-${questionId}-${selectedEditorLanguage}`, value)
    setValue(value)
    const state = viewUpdate.state.toJSON()
    localStorage.setItem("myEditorState", JSON.stringify(state))
  }

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault()
    return showToast({
      title: `\u26A0 Right click disabled`,
      description: "You should not copy or past the code",
    })
  }

  const resetCode = () => {
    const selectedEditorLanguage =
      localStorage.getItem("editorLanguage") || "python"
    const defaultCode = generateDefaultCode(selectedEditorLanguage)
    localStorage.setItem(
      `code-${questionId}-${selectedEditorLanguage}`,
      defaultCode
    )
    setValue("")
  }

  const navigatePreviousQuestion = (questionIndex: number): string => {
    return contestData && contestData.questions && questionIndex > 0
      ? `/contest?contestId=${contestId}&questionId=${
          contestData.questions[questionIndex - 1].id
        }`
      : ""
  }

  const navigateNextQuestion = (questionIndex: number): string => {
    return contestData &&
      contestData.questions &&
      questionIndex < contestData.questions.length - 1
      ? `/contest?contestId=${contestId}&questionId=${
          contestData.questions[questionIndex + 1].id
        }`
      : ""
  }

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    if (isSubmiting) return
    const selectedEditorLanguage: keyof typeof EditorLanguage =
      (localStorage.getItem("editorLanguage") as keyof typeof EditorLanguage) ||
      "python"
    console.log(value)
    try {
      const res:ApiResponse = await submitSolution({
        sourceCode: value,
        languageId: languageIdMap[selectedEditorLanguage],
      }).unwrap()
      setResponse(res.response)

      console.log(response)
      const { status, stdout, stderr } = res.response
      const { id, description } = status
      if (id === 3) {
        showToast({
          title: "Success",
          description: description,
        })
      } else {
        showToast({
          title: "Error",
          description: description,
        })
        console.log(stderr)
        console.log(stdout)
      }
    } catch (error) {
      console.log(error)
      showToast({
        title: "Error",
        description: "Something went wrong",
      })
    }
  }
  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return <InternalServerErrorPage />
  }

  return (
    <section>
      {questionData && (
        <div className="">
          <div className="flex items-center justify-around my-[2rem]">
            <div className="flex-1 flex">
              <Link
                href={`/contest?contestId=${questionData.contestId}`}
                className="max-w-fit flex items-center gap-x-2 text-muted-foreground"
              >
                <Button variant={"ghost"}>
                  <ThickArrowLeftIcon />
                </Button>
                <h3>Back to contest</h3>
              </Link>
            </div>
            <div className="flex-1 mr-[11.5rem] flex w-fit items-center gap-x-2">
              {navigatePreviousQuestion(questionData.index) ? (
                <div onClick={getPeriousCode}>
                  <Link href={navigatePreviousQuestion(questionData.index)}>
                    <Button variant="ghost">
                      <ThickArrowLeftIcon className="text-muted-foreground" />
                    </Button>
                  </Link>
                </div>
              ) : (
                <>
                  {" "}
                  <Button
                    variant="ghost"
                    onClick={() => {
                      showToast({
                        title: "This is first question ",
                        description: "This is no perious question in contest",
                      })
                    }}
                  >
                    <ThickArrowLeftIcon className="text-muted-foreground" />
                  </Button>
                </>
              )}
              <h3>{questionData.title}</h3>
              {navigateNextQuestion(questionData.index) ? (
                <div onClick={getPeriousCode}>
                  <Link href={navigateNextQuestion(questionData.index)}>
                    <Button variant="ghost">
                      <ThickArrowRightIcon className="text-muted-foreground" />
                    </Button>
                  </Link>
                </div>
              ) : (
                <>
                  {" "}
                  <Button
                    variant="ghost"
                    onClick={() =>
                      showToast({
                        title: "There is no next quesion",
                        description: "This is final question in this contest",
                      })
                    }
                  >
                    <ThickArrowRightIcon className="text-muted-foreground" />
                  </Button>
                </>
              )}
            </div>
          </div>
          <ResizablePanelGroup
            direction="horizontal"
            className="rounded-lg border w-full min-h-[120vh] max-h-full"
          >
            <ResizablePanel defaultSize={50}>
              <div className="px-[1rem] h-[120vh] overflow-auto pb-[1rem]">
                <h1 className="text-xl pt-[.5rem] font-semibold">
                  {questionData.title}
                </h1>
                <Badge className="mt-[.5rem]" variant={"secondary"}>
                  {questionData.difficulty_level}
                </Badge>
                <p className="text-sm mt-[.5rem] tracking-wider whitespace-break-spaces leading-5 ">
                  {questionData.description}
                </p>
                <h2 className="text-lg font-semibold mt-[1rem]">Constraints</h2>
                <ul className="list-disc px-[1rem] text-sm">
                  {questionData.constraints &&
                    Array.isArray(questionData.constraints) &&
                    questionData.constraints.map((constraint, index) => (
                      <li key={index}>{constraint}</li>
                    ))}
                </ul>
                <div className="solved-examples">
                  {questionData.examples &&
                    Array.isArray(questionData.examples) &&
                    questionData.examples.map((example, index) => (
                      <div className="example-item" key={index}>
                        <h2 className="text-lg font-semibold mt-[1rem]">
                          Example-{index + 1}
                        </h2>
                        <p id="example-wrapper">
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
                    {questionData.explanations &&
                      Array.isArray(questionData.explanations) &&
                      questionData.explanations.map((explanation, index) => (
                        <li
                          className="text-sm mt-[.5rem] whitespace-break-spaces"
                          key={index}
                        >
                          {explanation}
                        </li>
                      ))}
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
                      <Select
                        onValueChange={(value: keyof typeof EditorTheme) =>
                          handleEditorThemeChange(value)
                        }
                      >
                        <SelectTrigger className="w-[50%]">
                          <SelectValue
                            placeholder={
                              localStorage.getItem("editorTheme") ||
                              "choose Theme"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {editorThemes.map(
                            ({ themeValue, themeDisplayName }) => (
                              <SelectItem key={themeValue} value={themeValue}>
                                {themeDisplayName}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                      <Select
                        onValueChange={(value: keyof typeof EditorLanguage) =>
                          handleEditorLanguageChange(value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue
                            placeholder={
                              localStorage.getItem("editorLanguage") ||
                              "choose Language"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {editorLanguages.map(
                            ({ languageValue, languageDisplayName }) => (
                              <SelectItem
                                key={languageValue}
                                value={languageValue}
                              >
                                {languageDisplayName}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                      <Button variant="outline" onClick={resetCode}>
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
                        theme={editorTheme}
                        minHeight="300px"
                        height="1000px"
                        onKeyDown={handleKeyDown}
                        onContextMenu={handleContextMenu}
                        extensions={[editorLanguage]}
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
                      <Button
                        variant="default"
                        className="w-[80px]"
                        onClick={handleSubmit}
                      >
                        Submit
                      </Button>
                    </div>
                    <div className="flex flex-col gap-y-[1rem]">
                      <div className="flex flex-col gap-y-2">
                        <Label className="text-muted-foreground">
                          Sample input
                        </Label>
                        <Textarea
                          value={questionData.sampleInput.text}
                          onChange={(e: React.ChangeEvent) =>
                            showToast({
                              title: "You are not suppose to modify",
                              description:
                                "Changing the given date is prohibited",
                            })
                          }
                          className="!min-h-[8.5rem]"
                        />
                      </div>
                      <div className="flex flex-col gap-y-2">
                        <Label className="text-muted-foreground">
                          Sample output
                        </Label>
                        <Textarea
                          value={response?.stdout || response?.stderr || ""}
                          onChange={(e: React.ChangeEvent) =>
                            showToast({
                              title: "You are not suppose to modify",
                              description:
                                "Changing the given date is prohibited",
                            })
                          }
                          className="!min-h-[8.7rem]"
                        />
                      </div>
                    </div>
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      )}
    </section>
  )
}

export default ContestQuestion
