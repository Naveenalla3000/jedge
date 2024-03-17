// /*

//     * THIS IS THE CODE EDITOR COMPONENT THAT YOU SEE IN THE CONTEST CODE PAGE
//     * IT CONTAINS THE ACE EDITOR AND THE INPUT AND OUTPUT INPUTS
//     * IT ALSO HAS THE SELECT BOX FOR LANGUAGE AND THEME

// */
// import {
//     ActionIcon,
//     Button,
//     LoadingOverlay,
//     Paper,
//     Select,
//     Textarea,
//     useMantineColorScheme,
//     Modal,
//     Text,
//     Tooltip,
//     Box,
//     Title,
//     Group,
// } from "@mantine/core"
// import { IconMoon, IconPlayerPlay, IconRefreshDot, IconSun } from "@tabler/icons"
// import { useSelector } from "react-redux"
// import { selectIsToken, selectUsername } from "../../Redux/UserContext/UserSlice"
// import { getUserInfo } from "../../Utils/TokenUtil"
// import { IconThumbUp, IconThumbDown } from "@tabler/icons"
// import { runCodeToGetSubmissionId, themeOptions, pollToGetRunSubmissionStatus, handleErrorRedirectContest, languageMapForSupportedLanguages, languageToTemplateCode, runCodeToGetExpectedOutputId } from "../../Utils/ContestUtil"

// import React, { Dispatch, memo, useEffect, useState } from "react"
// import { useQuery } from "@tanstack/react-query"
// import { Link, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom"
// import Service from "../Service/http"
// import { useDebouncedValue, useDisclosure, useLocalStorage, useScrollIntoView } from "@mantine/hooks"
// import { showNotification } from "@mantine/notifications"
// import { languageMapAceEditorToService } from "../../Utils/ContestUtil"
// import { COURSE_V2_GET_CONTEST_META_STATS, GET_CONTEST_META_STATS } from "../../Utils/Urls"
// import FallBackLoader from "../../Utils/FallBackLoader"
// import ErrorPage from "../../Pages/ErrorPage"
// import { CONTEST_COPY_PASTE_STATUS_STALE_TIME } from "../../Utils/CacheTime"
// import {
//     decodeString,
//     encodeString,
//     intersectionOfLanguages,
//     isValidCustomInputSize,
//     removeTrailingEmptyLines,
// } from "../../Utils/ProblemUtil"
// import { CodeModal } from "./CodeModal"
// import { POLLING_INTERVAL, WAIT_BEFORE_POLLING } from "../../Utils/TimeUtil"
// import { ALLOWED_ROLES_FOR_COPY_PASTE, isNull, minutesToMilliseconds } from "../../Utils/util"
// import CustomCodeEditor, { EditorLanguages, EditorThemes } from "./CustomCodeEditor"
// import ContestTimer from "../Contest/ContestTimer"
// import { currentActiveTabAtom, currentSelectedLangaugeAtom, sampleInputAtom, sampleOutputAtom } from "../../Pages/ContestCodePage/globalStates"
// import { useAtom, useAtomValue, useSetAtom } from "jotai"
// import ContestSubmitModel from "../Contest/ContestSubmitModal"

// const service = new Service()

// const getData = async (contestId: string, contestSlug: string, courseId: string, type: string, sectionId: string) => {
//     let URL = type === "courseV2" ? COURSE_V2_GET_CONTEST_META_STATS : GET_CONTEST_META_STATS
//     URL = URL.replace(":contestId", contestId)
//     return await service.get(
//         URL + `?contestSlug=${contestSlug}&contestId=${contestId}&courseId=${courseId}&sectionId=${sectionId}`
//     )
// }

// export interface ContestMetaData {
//     startTime: string
//     endTime: string
//     copyPasteEnabled: number
//     contestEditorialVisibility: number
//     enableHints?: boolean
//     mcqExplanationVisibility: number
//     allowedPostContest: number
//     hasDuration: boolean
//     duration: number
//     supportedLanguages: string[]
//     sectionLock: number
//     hasSections: boolean
//     practiceMode: number
//     sectionStartTime: string
//     sectionEndTime: string
//     displayEditorialAfterSolve: boolean
//     userStartTime?: string
//     disableContestAfterEndTime: boolean
// }

// const isCurrentLanguageFromLocalStorageAllowed = (languagesAllowed: any[]) => {
//     const currentLanguageFromLocalStorage = localStorage.getItem("current_language")
//     const allowedLanguages = languagesAllowed.map((obj: any)=>{
//         return obj.value
//     })
//     if(allowedLanguages.includes(currentLanguageFromLocalStorage)) return true
//     else return false
// }


// function CodeEditor({
//     contestEndTime,
//     copyPasteEnabled,
//     setContestEndTime,
//     setContestEditorialVisibility,
//     setContestEnableHints,
//     currentLanguage,
//     currentTheme,
//     setCurrentTheme,
//     problemMetaQueryLoading,
//     contestId,
//     courseId: courseIdProp,
//     sectionId,
//     problemId,
//     courseVersion,
//     setCopyPasteEnabled,
//     setDuration,
//     setHasDuration,
//     setSectionStartTime,
//     setSectionEndTime,
//     sectionEndTime,
//     sectionStartTime,
//     setDisplayEditorialAfterSolve,
//     setDisableContestAfterEndTime,
//     setUserEndTime,
//     problemMetaQueryData
// }: {
//     contestEndTime: Date
//     copyPasteEnabled: boolean
//     setContestEndTime: Date | any
//     setContestEditorialVisibility: Dispatch<boolean>
//     setContestEnableHints: Dispatch<boolean>
//     currentLanguage: EditorLanguages
//     currentTheme: EditorThemes
//     setCurrentTheme: Dispatch<any>
//     problemMetaQueryLoading: boolean
//     contestId: string
//     courseId: string | null
//     sectionId: string | null
//     problemId: string
//     courseVersion: number
//     setCopyPasteEnabled: Dispatch<any>
//     setDuration: Dispatch<any>
//     setHasDuration: Dispatch<any>
//     setSectionEndTime: Dispatch<any>
//     setSectionStartTime: Dispatch<any>
//     sectionStartTime: Date
//     sectionEndTime: Date
//     setDisplayEditorialAfterSolve: Dispatch<any>
//     setDisableContestAfterEndTime: Dispatch<any>
//     setUserEndTime: Dispatch<any>,
//     problemMetaQueryData: any
// }) {
//     const [customInput, setCustomInput] = useState("")
//     const [outputValue, setOutputValue] = useState("")
//     const setCurrentLanguage = useSetAtom(currentSelectedLangaugeAtom)
//     const [currentTab, setCurrentTab] = useAtom(currentActiveTabAtom)
//     const location = useLocation()
//     const [sampleVerdict, setSampleVerdict] = useState(false)
//     const [sampleInputNumber, setSampleInputNumber] = useState(1)
//     const [displayVerdict, setDisplayVerdict] = useState(false)
//     const [count, SetCount] = useState(0)
//     const [submissionId, setSubmissionId] = useState("")
//     const [searchParams] = useSearchParams()
//     const [verdictCode, setVerdictCode] = useState(-1)
//     const [verdictString, setVerdictString] = useState("")
//     const [hasProhibitedKeys, setHasProhibitedKeys] = useState(false)
//     const [screenOpened, setscreenOpened] = useState(false)
//     const [allowPostContestSubmission, setAllowPostContestSubmission] = useState(true)
//     const [sectionLock, setSectionLock] = useState<boolean>()
//     const token = useSelector(selectIsToken)
//     const { id, role } = getUserInfo(token!)
//     const type = courseVersion == 2 ? "courseV2" : searchParams.get("type")
//     const byPassRoles = ['admin', 'bzmentor', 'mentor', 'bzinstructor']
//     const [opened, { close, open }] = useDisclosure(false)
//     let { courseId, chapterId } = useParams()

//     if (courseIdProp) {
//         courseId = courseIdProp
//     }

//     const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
//         offset: 60,
//     })
//     const { colorScheme, toggleColorScheme } = useMantineColorScheme()
//     const dark = colorScheme === "dark"
//     const [receivedStatus, setRecievedStatus] = useState(false)
//     const contestSlug = searchParams.get("cslug")!
//     const [defaultSampleValue, setDefaultSampleValue] = useState("custom")
//     const [prohibitedKeyword, setHasProhibitedKeyword] = useState("")
//     const [prohibitedKeywords, setProhibitedKeywords] = useState<any>()
//     const [languagesAllowed, setLanguageAllowed] = useState<any>([])
//     const [contestSupportedLanguages, setContestSupportedLanguages] = useState<string[]>([])
//     const [problemSupportedLanguages, setProblemSupportedLanguages] = useState([])
//     const userName = useSelector(selectUsername)
//     const [code, setCode] = useState<string | null>(null)
//     const SampleInputs = useAtomValue(sampleInputAtom)
//     const SamepleOutputs = useAtomValue(sampleOutputAtom)
//     const [cppTemplateCodeLocalStorage, setCppTemplateCodeLocalStorage] = useLocalStorage({ key: `${problemId}-c_cpp-template` })
//     const [javaTemplateCodeLocalStorage, setJavaTemplateCodeLocalStorage] = useLocalStorage({ key: `${problemId}-java-template` })
//     const [csharpTemplateCodeLocalStorage, setCSharpTemplateCodeLocalStorage] = useLocalStorage({ key: `${problemId}-csharp-template` })
//     const [javascriptTemplateCodeLocalStorage, setJavascriptTemplateCodeLocalStorage] = useLocalStorage({ key: `${problemId}-javascript-template` })
//     const [pythonTemplateCodeLocalStorage, setPythonTemplateCodeLocalStorage] = useLocalStorage({ key: `${problemId}-python-template` })
//     const [debouncedCode] = useDebouncedValue(code, 500);

//     let problems
//     let currentIndex
//     if (location.state){
//         let { problems: p, currentIndex: c } = location?.state
//         problems = p
//         currentIndex = c
//     }


//     const secretKey = process.env.REACT_APP_CODE_STORAGE_KEY + problemId + id + contestId + "code"
//     const navigate = useNavigate()

//     let enabled = false

//     // Checks for PROHIBITED keywords in the code.
//     const prohibitedKeywordsCheck = (code: string, allKeywords: string, lang: string) => {
//         let keywords = JSON.parse(allKeywords)
//         for (let key of keywords[lang]) {
//             if (key?.length === 0 || key === "" || key === "") {
//                 continue
//             }
//             if (code.includes(key)) {
//                 setHasProhibitedKeyword(key)
//                 return true
//             }
//         }
//         return false
//     }

//     //handleKeyDown to run or submit code or reset code
//     const onKeyDownRunOrSubmitorReset = (event: any) => {
//         //Crtl + ` for run
//         if (event.ctrlKey && event.key === '`') {
//             runCode()
//         }
//         //Crtl + Enter for submit
//         else if (event.ctrlKey && event.key === 'Enter') {
//             runProbCheck("Submit Code")
//         }
//         //Crtl + Shift + 1 for reset code
//         else if(event.ctrlKey && event.shiftKey && (event.key === '1' || event.key === '!')){
//             localStorage.removeItem(id+contestId+problemId+currentLanguage)
//             const template = localStorage.getItem(`${problemId}-${currentLanguage}-template`)
//             setCode(JSON.parse(template!))
//         }
//     }

//     //function to run code
//     const runCode = () => {
//         if (runProbCheck("Run Code")) {
//             return
//         }
//         if (!isValidCustomInputSize(customInput)) {
//             showNotification({
//                 title: "RUN FAILED",
//                 message: "Custom Input Payload is Empty/Too Large",
//                 color: "red",
//             })
//             return
//         }
//         setOutputValue("")
//         setVerdictString("")
//         remove()
//         enabled = false
//         setRecievedStatus(true)
//         refetch()
//         scrollIntoView({ alignment: "center" })
//     }

//     useEffect(() => {
//         if (problemMetaQueryData) {
//             SetStatesFromProblemMetaData()
//         }
//     },[problemId, problemMetaQueryData]);

//     const SetStatesFromProblemMetaData = async () => {
//         setProblemSupportedLanguages(problemMetaQueryData?.data?.supportedLanguages);
//             setProhibitedKeywords(problemMetaQueryData?.data?.prohibitedKeywords)
//             let codeObj = JSON.parse(problemMetaQueryData?.data?.userCode)
//             const problemType = problemMetaQueryData?.data?.problemType
//             if (problemType === "normal") {
//                 for await (let i of codeObj) {
//                     if (i.lang === "cpp") {
//                         setCppTemplateCodeLocalStorage(languageToTemplateCode.get(i.lang))
//                     } else if (i.lang === "java") {
//                         setJavaTemplateCodeLocalStorage(languageToTemplateCode.get(i.lang))
//                     } else if (i.lang === "javascript") {
//                         setJavascriptTemplateCodeLocalStorage(languageToTemplateCode.get(i.lang))
//                     } else if (i.lang === "csharp") {
//                         setCSharpTemplateCodeLocalStorage(languageToTemplateCode.get(i.lang))
//                     } else if (i.lang === "python") {
//                         setPythonTemplateCodeLocalStorage(languageToTemplateCode.get(i.lang))
//                     }
//                 }
//             } else {
//                 for await (let i of codeObj) {
//                     if (i.lang === "cpp") {
//                         setCppTemplateCodeLocalStorage(i.code)
//                     } else if (i.lang === "java") {
//                         setJavaTemplateCodeLocalStorage(i.code)
//                     } else if (i.lang === "javascript") {
//                         setJavascriptTemplateCodeLocalStorage(i.code)
//                     } else if (i.lang === "csharp") {
//                         setCSharpTemplateCodeLocalStorage(i.code)
//                     } else if (i.lang === "python") {
//                         setPythonTemplateCodeLocalStorage(i.code)
//                     }
//                 }
//             }

//             let tempCode = ""

//             if (currentLanguage === "c_cpp") {
//                 tempCode = decodeString(localStorage.getItem(id + contestId + problemId + "c_cpp"), process.env.REACT_APP_CODE_STORAGE_KEY + problemId + id + contestId + "code") || cppTemplateCodeLocalStorage || ""
//             } else if (currentLanguage === "java") {
//                 tempCode = decodeString(localStorage.getItem(id + contestId + problemId + "java"), process.env.REACT_APP_CODE_STORAGE_KEY + problemId + id + contestId + "code") || javaTemplateCodeLocalStorage || ""
//             } else if (currentLanguage === "javascript") {
//                 tempCode = decodeString(localStorage.getItem(id + contestId + problemId + "javascript"), process.env.REACT_APP_CODE_STORAGE_KEY + problemId + id + contestId + "code") || javascriptTemplateCodeLocalStorage || ""
//             } else if (currentLanguage === "python") {
//                 tempCode = decodeString(localStorage.getItem(id + contestId + problemId + "python"), process.env.REACT_APP_CODE_STORAGE_KEY + problemId + id + contestId + "code") || pythonTemplateCodeLocalStorage || ""
//             } else if (currentLanguage === "csharp") {
//                 tempCode = decodeString(localStorage.getItem(id + contestId + problemId + "csharp"), process.env.REACT_APP_CODE_STORAGE_KEY + problemId + id + contestId + "code") || csharpTemplateCodeLocalStorage || ""
//             }
//             try {
//                 setCode(JSON.parse(tempCode))
//             } catch (err) {
//                 setCode(tempCode)
//             }
//     }


//     useEffect(() => {
//         const languages = languageMapForSupportedLanguages(
//             intersectionOfLanguages(problemMetaQueryData?.data?.supportedLanguages, contestSupportedLanguages)
//         )
//         const curLang = isCurrentLanguageFromLocalStorageAllowed(languages)
//             ? localStorage.getItem("current_language")
//             : languages[0]?.value ?? ""

//         const encodedCode = localStorage.getItem(id + contestId + problemId + curLang)
//         if (encodedCode) {
//             const decodedCode = decodeString(encodedCode, process.env.REACT_APP_CODE_STORAGE_KEY + problemId + id + contestId + "code")
//             setCode(decodedCode || "")
//         } else {
//             const templateCode = localStorage.getItem(`${problemId}-${curLang}-template`)
//             if(templateCode) setCode(JSON.parse(localStorage.getItem(`${problemId}-${curLang}-template`) || "no code"))
//             else setCode("")
//         }
//         setLanguageAllowed(languages)
//         setCurrentLanguage(curLang || "" as any)
//     }, [problemId, contestSupportedLanguages, problemSupportedLanguages, problemMetaQueryData?.data?.supportedLanguages, currentTab])


//     const {
//         data: contestMetaStats,
//         isLoading: loadingContestMeta,
//         error: errorContestMetaStats,
//     } = useQuery(["contest-meta-stats", contestId], () => getData(contestId, contestSlug, courseId??"", type??"", sectionId??""), {
//         onSuccess(data: {status: string, data: ContestMetaData}) {
//             setContestSupportedLanguages(data?.data?.supportedLanguages);
//             setCopyPasteEnabled(data.data.copyPasteEnabled)
//             setContestEndTime(new Date(data.data.endTime))
//             setSectionStartTime(new Date(data.data.sectionStartTime))
//             setSectionEndTime(new Date(data.data.sectionEndTime))
//             setSectionLock(!!data.data.sectionLock)
//             setContestEditorialVisibility(!!data?.data?.contestEditorialVisibility)
//             setContestEnableHints(!!data?.data?.enableHints)
//             setAllowPostContestSubmission(data?.data?.allowedPostContest === 0 ? false : true)
//             setHasDuration(data?.data?.hasDuration ?? false)
//             setDuration(data?.data?.duration ?? 0)
//             setDisplayEditorialAfterSolve(data?.data?.displayEditorialAfterSolve)
//             setDisableContestAfterEndTime(data?.data?.disableContestAfterEndTime)
//             setUserEndTime(getUserEndTime(data?.data))
//         },
//         onError(err: any) {
//             handleErrorRedirectContest(contestId as string, err, navigate, searchParams)
//             setCopyPasteEnabled(false);
//         },
//         refetchOnWindowFocus: false,
//         cacheTime: CONTEST_COPY_PASTE_STATUS_STALE_TIME
//     })

//     const { error, isFetching, refetch } = useQuery(["run-code"], () => runCodeToGetSubmissionId(code ?? "", currentLanguage, customInput, problemId, contestId), {
//         onSuccess: (data: any) => {

//             setTimeout(() => {
//                 SetCount(0)
//                 setSubmissionId(data.data)
//             }, WAIT_BEFORE_POLLING)
//         },
//         onError: (error: any) => {
//             if (error?.response?.data?.status === "JUDGE0_TOKEN_FAILURE") {
//                 showNotification({
//                     title: "RUN FAILED",
//                     message: "Failed to Run/Submit.\nRetry",
//                     color: "red",
//                 })
//             }
//             else if(error?.response?.status===413){
//                 showNotification({
//                     title: "RUN FAILED",
//                     message: error.response.data.msg,
//                     color: "red",
//                 })
//             }
//             else if(error?.response?.data?.status === "RUN_CODE_REJECTED") {
//                 showNotification({
//                     title: "RUN FAILED",
//                     message: error.response.data.msg,
//                     color: "red",
//                 })
//             }
//             else {
//                 showNotification({
//                     title: "Error",
//                     message: "Unable to create run request, please try later",
//                     color: "red",
//                 })
//             }
//             setRecievedStatus(false)
//             setSubmissionId("")
//         },
//         enabled: enabled,
//         refetchOnMount: false,
//         retry: 0,
//         refetchOnWindowFocus: false,
//         keepPreviousData: false,
//     })  
    
//     const { isFetching: isExpectedOutputFetching, refetch: refetchExpectedOutput} = useQuery(["run-code"], () => runCodeToGetExpectedOutputId(customInput, problemId, contestId, sectionId as string, courseId as string, chapterId as string, type as string), {
//         onSuccess: (data: any) => {

//             setTimeout(() => {
//                 SetCount(0)
//                 setSubmissionId(data.data)
//             }, WAIT_BEFORE_POLLING)
//         },
//         onError: (error: any) => {
//             if (error?.response?.data?.status === "JUDGE0_TOKEN_FAILURE") {
//                 showNotification({
//                     title: "RUN FAILED",
//                     message: "Failed to Run/Submit.\nRetry",
//                     color: "red",
//                 })
//             }
//             else if(error?.response?.status===413){
//                 showNotification({
//                     title: "RUN FAILED",
//                     message: error.response.data.msg,
//                     color: "red",
//                 })
//             }
//             else if(error?.response?.data?.status === "RUN_CODE_REJECTED") {
//                 showNotification({
//                     title: "RUN FAILED",
//                     message: error.response.data.msg,
//                     color: "red",
//                 })
//             }
//             else {
//                 showNotification({
//                     title: "Unable to create run request, please try later",
//                     message: error?.response?.data?.msg || "",
//                     color: "red",
//                 })
//             }
//             setRecievedStatus(false)
//             setSubmissionId("")
//         },
//         enabled: enabled,
//         refetchOnMount: false,
//         retry: 0,
//         refetchOnWindowFocus: false,
//         keepPreviousData: false,
//     })  

//     // Funtion that validates the sample test cases
//     const sampleCasesValidator = (receivedOutput: string, expectedOutput: string) => {
//         let receivedOutputLines = receivedOutput.split('\n');
//         let expectedOutputLines = expectedOutput.split('\n');

//         receivedOutputLines = removeTrailingEmptyLines(receivedOutputLines);
//         expectedOutputLines = removeTrailingEmptyLines(expectedOutputLines);

//         if(expectedOutputLines.length !== receivedOutputLines.length){
//             return false;
//         }

//         for(let i=0;i<expectedOutputLines.length;i++){
//             if(expectedOutputLines[i].trimEnd() !== receivedOutputLines[i].trimEnd()){
//                 return false;
//             }
//         }
//         return true;
//     }

//     const {
//         isFetching: fetching,
//         remove,
//     } = useQuery(["poll-run-code-submission"], () => pollToGetRunSubmissionStatus(submissionId), {
//         onSuccess: (data: any) => {
//             SetCount(count + 1)
//             setDisplayVerdict(true)
//             if (data.msg === "true") {
//                 setSubmissionId("")
//                 setOutputValue(data?.data?.output)
//                 if(sampleCasesValidator(data?.data?.output, SamepleOutputs[sampleInputNumber].value)) {
//                     setSampleVerdict(true);
//                 }
//                 else{
//                     setSampleVerdict(false);
//                 }
//                 setVerdictCode(data?.data?.verdict_code)
//                 setVerdictString(data?.data?.verdict_string)
//                 setRecievedStatus(false)
//                 if (data?.data?.verdict_code == 6) {
//                     showNotification({
//                         title: "Try After Sometime",
//                         message: "Execution server down",
//                         color: "orange",
//                     })
//                 }
//             } else if (count == 9) {
//                 showNotification({
//                     title: "Try After Sometime",
//                     message: "Something went wrong please try after sometime",
//                     color: "lime",
//                 })
//                 setSubmissionId("")
//                 setRecievedStatus(false)
//             }
//         },
//         onError: (error: any) => {
//             showNotification({
//                 title: "Error",
//                 message: "Unable to check status, please try later",
//                 color: "red",
//             })
//             setSubmissionId("")
//             setRecievedStatus(false)
//         },
//         retry: 0,
//         enabled: !!submissionId,
//         refetchInterval: (submission) => (submission?.msg === "true" ? false : POLLING_INTERVAL),
//         refetchOnWindowFocus: false,
//         keepPreviousData: false,
//     })

//     useEffect(() => {
//         onChangeLanguage(currentLanguage, false)
//         setOutputValue("")
//         setCustomInput("")
//         setVerdictCode(-1)
//         setVerdictString("")
//     }, [problemId])

//     // helps in setting the value of hasProhibitedKeys
//     const handleHasProhibitedKeys = () => {
//         setHasProhibitedKeys(!hasProhibitedKeys)
//     }

//     //returns userEndTime
//     const getUserEndTime = (data : ContestMetaData) => {
//         return (new Date(new Date(data?.userStartTime as string).getTime() + minutesToMilliseconds((data?.duration ?? 0))))
//     }

//     // Function that returns a boolean for weather or not the verdict should be displayed.
//     function showVerdict(){
//         if(displayVerdict && !(isFetching || fetching || receivedStatus) && defaultSampleValue !== "custom"){
//             return true;
//         }
//         return false;
//     }

//     function isSubmissionAllowed(){
//         const currentTime = new Date().getTime()
//         const localContestEndTime = new Date(contestEndTime).getTime()
//         if( !allowPostContestSubmission && localContestEndTime <= currentTime ) return false
//         if(sectionId && sectionLock){
//             const localSectionStartTime = new Date(sectionStartTime).getTime()
//             const localSectionEndTime = new Date(sectionEndTime).getTime()
//             if( currentTime < localSectionStartTime ) return false
//             if( currentTime > localSectionEndTime) return false
//         }
//         return true
//     }

//     useEffect(() => {
//         if (code != null) {
//             localStorage.setItem(id + contestId + problemId + currentLanguage, encodeString(code, secretKey))
//         }
//     }, [debouncedCode])

//     function onChange(newValue: string) {
//         setCode(newValue)
//     }

//     function onChangeLanguage(newValue: string, isSelect: boolean) {
//         let tempCode = ""
//         let code = localStorage.getItem(id + contestId + problemId + newValue);
//         let decodedCode = decodeString(code, secretKey);
//         if (newValue === "c_cpp") {
//             tempCode = decodedCode ?? JSON.parse(localStorage.getItem(`${problemId}-c_cpp-template`)!) ?? ""
//         } else if (newValue === "java") {
//             tempCode = decodedCode ?? JSON.parse(localStorage.getItem(`${problemId}-java-template`)!) ?? ""
//         } else if (newValue === "javascript") {
//             tempCode = decodedCode ?? JSON.parse(localStorage.getItem(`${problemId}-javascript-template`)!) ?? ""
//         } else if (newValue === "python") {
//             tempCode = decodedCode ?? JSON.parse(localStorage.getItem(`${problemId}-python-template`)!) ?? ""
//         } else if (newValue === "csharp") {
//             tempCode = decodedCode ?? JSON.parse(localStorage.getItem(`${problemId}-csharp-template`)!) ?? ""
//         }
//         setCode(tempCode)
//         setCurrentLanguage(newValue as EditorLanguages)
//         if(isSelect) localStorage.setItem("current_language", newValue)
//     }
//     useEffect(() => {
//         if (SampleInputs?.length > 1) {
//             setCustomInput(SampleInputs[1].value)
//             setDefaultSampleValue(SampleInputs[1].value)
//             setSampleInputNumber(1)
//         } else {
//             setCustomInput("")
//             setDefaultSampleValue(SampleInputs[0].value)
//             setSampleInputNumber(0)
//         }
//     }, [SampleInputs, problemId])

//     const runProbCheck = (buttonName : string) => {
//         if(!byPassRoles.includes(role) && !isSubmissionAllowed()){
//             showNotification(
//                 {
//                     title:"Submit Rejected",
//                     message: "Post-Contest Submissions are not allowed for this contest",
//                     color: "red"
//                 }
//             )
//             return 
//         }
//         if (prohibitedKeywords) {
//             if (prohibitedKeywordsCheck(code ?? "", prohibitedKeywords, languageMapAceEditorToService.get(currentLanguage))) {
//                 handleHasProhibitedKeys();
//                 if(buttonName === "Run Code"){
//                     return true;
//                 }
//             } else {
//                 if(buttonName === "Run Code"){
//                     return false;
//                 }
//                 else{
//                     open();
//                 }
//             }
//         } else {
//             if(buttonName === "Run Code"){
//                 return false;
//             }
//             else{
//                 open();
//             }
//         }
//     }

//     if (loadingContestMeta || problemMetaQueryLoading || isNull(copyPasteEnabled)) {
//         return <FallBackLoader />
//     }

//     if (errorContestMetaStats || (error && error?.response?.status!==413 && error?.response?.data?.status!=="RUN_CODE_REJECTED")) {
//         return <ErrorPage error="Something is wrong!" title={(errorContestMetaStats as any)?.message ?? (error as any)?.message ?? "Uff sorry about that"} showImg={true} />
//     }

//     return (
//         <>
//             <Paper
//                 shadow="lg"
//                 ml={"xs"}
//                 style={{
//                     display: "flex",
//                     flexDirection: "column",
//                     overflow: "auto",
//                     height: "100%",
//                 }}
//             >
//                 {/* Modal To Reset Code */}
//                 <CodeModal
//                     problemId={problemId}
//                     sectionId={sectionId as any}
//                     contestId={contestId}
//                     courseId={courseId as any}
//                     currentLanguage={currentLanguage}
//                     setCode={setCode}
//                     screenOpened={screenOpened}
//                     setscreenOpened={setscreenOpened}
//                     courseVersion={courseVersion}
//                 />
//                 {/* For Prohibited Keywords Warning */}
//                 <Modal
//                     onReset={(e) => {}}
//                     trapFocus
//                     overflow="inside"
//                     zIndex={3000}
//                     opened={hasProhibitedKeys}
//                     onClose={handleHasProhibitedKeys}
//                     title={
//                         <Text weight={"bold"} color={"red"}>
//                             WARNING
//                         </Text>
//                     }
//                     closeOnClickOutside={false}
//                     size="xl"
//                 >
//                     <Text>
//                         Due to use of a restricted word - "
//                         <span style={{ color: "red", fontWeight: "bold" }}>{prohibitedKeyword}</span>", this submission
//                         is not allowed. Please read the instructions in problem's Description, Note carefully before
//                         submission.
//                     </Text>
//                 </Modal>
//                 <div
//                     style={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                         alignItems: "center",
//                         gap: ".4rem",
//                         flex: "1",
//                     }}
//                 >
//                     <div
//                         style={{
//                             display: "flex",
//                             justifyContent: "start",
//                             alignItems: "center",
//                             gap: ".4rem",
//                             flex: "0.9",
//                         }}
//                     >
//                         <Select
//                             radius={"lg"}
//                             ml={"xs"}
//                             maxDropdownHeight={500}
//                             onChange={(e) => setCurrentTheme(e ?? "monokai")}
//                             defaultValue={"monokai"}
//                             data={themeOptions}
//                         />
//                         <Select
//                             error={!(languagesAllowed && languagesAllowed.length > 0)}
//                             radius={"lg"}
//                             maxDropdownHeight={500}
//                             onChange={(e) => onChangeLanguage(e ?? "c_cpp", true)}
//                             placeholder="Contact admin, no supported languages"
//                             value={languagesAllowed && languagesAllowed.length > 0 ? currentLanguage : ""}
//                             data={languagesAllowed}
//                         />
//                         <ActionIcon
//                             onClick={() => toggleColorScheme()}
//                             color={colorScheme === "light" ? "lime" : "dark"}
//                             radius={"xl"}
//                             size={"md"}
//                         >
//                             {colorScheme === "light" ? <IconMoon size={35} /> : <IconSun size={35} />}
//                         </ActionIcon>
//                         <Tooltip label="Reset Code (Ctrl + Shift + 1)">
//                             <ActionIcon>
//                                 <IconRefreshDot
//                                     size={25}
//                                     style={{ cursor: "pointer" }}
//                                     onClick={() => setscreenOpened(true)}
//                                 ></IconRefreshDot>
//                             </ActionIcon>
//                         </Tooltip>
//                     </div>
//                     <div style={{ flex: "0.3" }}>
//                         <Timer
//                             contestEndTime={contestMetaStats ? new Date(contestMetaStats?.data?.endTime) : undefined}
//                             contestStartTime={
//                                 contestMetaStats ? new Date(contestMetaStats?.data?.startTime) : undefined
//                             }
//                             hasDuration={contestMetaStats?.data?.hasDuration ?? false}
//                             hasSections={contestMetaStats?.data?.hasSections ?? false}
//                             sectionEndTime={
//                                 contestMetaStats ? new Date(contestMetaStats.data.sectionEndTime) : undefined
//                             }
//                             sectionStartTime={
//                                 contestMetaStats ? new Date(contestMetaStats.data.sectionStartTime) : undefined
//                             }
//                             userEndTime={
//                                 contestMetaStats?.data?.userStartTime && (contestMetaStats?.data?.duration ?? 0)
//                                     ? getUserEndTime(contestMetaStats?.data)
//                                     : null
//                             }
//                             userStartTime={contestMetaStats?.data?.userStartTime}
//                         />
//                     </div>
//                 </div>
//                 <Box p={"xs"} onKeyDown={onKeyDownRunOrSubmitorReset}>
//                     <CustomCodeEditor
//                         enableCopyPaste={ALLOWED_ROLES_FOR_COPY_PASTE.includes(role) || copyPasteEnabled ? true : false}
//                         id={"codeEdit"}
//                         language={currentLanguage}
//                         onChange={onChange}
//                         theme={currentTheme}
//                         value={code ?? ""}
//                         readOnly={false}
//                         fontSize="14px"
//                     />
//                 </Box>
//                 <div
//                     style={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                         alignItems: "center",
//                     }}
//                 >
//                     <Group>
//                         <Select
//                             pl={"sm"}
//                             value={defaultSampleValue}
//                             onChange={(e: any) => {
//                                 if (e !== "custom") {
//                                     setCustomInput(e)
//                                     setDefaultSampleValue(e)
//                                     if (customInput !== e) {
//                                         for (let idx in SampleInputs) {
//                                             if (SampleInputs[idx].value == e) {
//                                                 setSampleInputNumber(parseInt(idx))
//                                                 setDisplayVerdict(false)
//                                                 break
//                                             }
//                                         }
//                                     }
//                                 } else {
//                                     setCustomInput("")
//                                     setDefaultSampleValue("custom")
//                                     setSampleInputNumber(0)
//                                     setDisplayVerdict(false)
//                                 }
//                             }}
//                             radius={"lg"}
//                             data={SampleInputs ?? []}
//                         />
//                         {defaultSampleValue === "custom" && problemMetaQueryData?.data?.isSolutionAvailable &&
//                             <Tooltip 
//                                 label="Get expected output" 
//                                 position="bottom"
//                                 disabled={
//                                     isFetching ||
//                                     fetching ||
//                                     receivedStatus ||
//                                     (code && code?.trim()?.length <= 10) ||
//                                     customInput?.length === 0 ||
//                                     languagesAllowed?.length === 0 ||
//                                     isExpectedOutputFetching
//                                 }
//                             >
//                                 <ActionIcon 
//                                     ml="sm"
//                                     color="green"
//                                     disabled={
//                                         isFetching ||
//                                         fetching ||
//                                         receivedStatus ||
//                                         (code && code?.trim()?.length <= 10) ||
//                                         customInput?.length === 0 ||
//                                         languagesAllowed?.length === 0 ||
//                                         isExpectedOutputFetching 
//                                     }
//                                     onClick={() => {
//                                         if (runProbCheck("Run Code")) {
//                                             return
//                                         }
//                                         if (!isValidCustomInputSize(customInput)) {
//                                             showNotification({
//                                                 title: "RUN FAILED",
//                                                 message: "Custom Input Payload is Empty/Too Large",
//                                                 color: "red",
//                                             })
//                                             return
//                                         }
//                                         setOutputValue("")
//                                         setVerdictString("")
//                                         remove()
//                                         enabled = false
//                                         setRecievedStatus(true)
//                                         refetchExpectedOutput()
//                                         scrollIntoView({ alignment: "center" })
//                                     }}
//                                 >
//                                     <IconPlayerPlay />
//                                 </ActionIcon>
//                             </Tooltip>
//                         }
//                     </Group>
//                     <Box
//                         p={"xs"}
//                         style={{
//                             display: "flex",
//                             justifyContent: "end",
//                             alignItems: "center",
//                             flexWrap: "wrap",
//                             gap: "0.7rem",
//                         }}
//                     >
//                         {!byPassRoles.includes(role) && !isSubmissionAllowed() ? (
//                             <Text m={"xs"} size={"sm"} color="red">
//                                 Contest {sectionId ? "or Section" : ""} ended. Submissions not allowed
//                             </Text>
//                         ) : (
//                             <>
//                             <Tooltip label="Ctrl + `">
//                                 <Button
//                                     variant="filled"
//                                     radius={"lg"}
//                                     disabled={
//                                         isFetching ||
//                                         fetching ||
//                                         receivedStatus ||
//                                         (code && code?.trim()?.length <= 10) ||
//                                         customInput?.length === 0 ||
//                                         languagesAllowed?.length === 0||
//                                         isExpectedOutputFetching
//                                     }
//                                     onClick={() => {
//                                         runCode()
//                                     }}
//                                 >
//                                     Run Code
//                                 </Button>
//                             </Tooltip>
//                             <Tooltip label="Ctrl + Enter">
//                                 <Button
//                                     color={"green"}
//                                     radius="lg"
//                                     disabled={
//                                         isFetching ||
//                                         fetching ||
//                                         receivedStatus ||
//                                         (code && code?.trim()?.length <= 10) ||
//                                         languagesAllowed.length === 0||
//                                         isExpectedOutputFetching
//                                     }
//                                     onClick={() => runProbCheck("Submit Code")}
//                                 >
//                                     Submit Code
//                                 </Button>
//                             </Tooltip>
//                             </>
//                         )}
//                     </Box>
//                 </div>
//                 <div ref={targetRef} style={{ position: "relative", marginBottom: "1rem" }}>
//                     <LoadingOverlay visible={isFetching || fetching || receivedStatus} overlayBlur={0.01} />
//                     <Textarea
//                         styles={{ input: { fontFamily: "monospace", fontSize: ".9rem" } }}
//                         readOnly={defaultSampleValue !== "custom"}
//                         onChange={(e) => {
//                             setCustomInput(e.target.value)
//                         }}
//                         value={customInput}
//                         error={false}
//                         mx={"xs"}
//                         autosize
//                         minRows={3}
//                         maxRows={5}
//                         placeholder="provide input"
//                         size="md"
//                     />
//                     <div style={{ justifyContent: "flex-left", display: "flex", paddingTop: "10px" }}>
//                         <Text weight={"bold"} pl={15} pb={5}>
//                             Output
//                         </Text>
//                         <div style={{ paddingLeft: "15px" }} hidden={!showVerdict()}>
//                             {sampleVerdict ? (
//                                 <IconThumbUp size={24} color="green" />
//                             ) : (
//                                 <IconThumbDown style={{ marginTop: "2px" }} size={24} color="red" />
//                             )}
//                         </div>
//                     </div>
//                     {showVerdict() ? (
//                         <Textarea
//                             styles={{
//                                 input: {
//                                     fontFamily: "monospace",
//                                     fontSize: ".9rem",
//                                     backgroundColor: sampleVerdict
//                                         ? dark
//                                             ? "#2A3D31"
//                                             : "#EBFBEE"
//                                         : dark
//                                         ? "#48272A"
//                                         : "#FEF4F5",
//                                 },
//                             }}
//                             mx={"xs"}
//                             error={verdictCode !== -1 && verdictCode !== 1 ? verdictString : false}
//                             value={outputValue}
//                             readOnly
//                             autosize
//                             minRows={3}
//                             maxRows={5}
//                             size="md"
//                         />
//                     ) : (
//                         <Textarea
//                             styles={{ input: { fontFamily: "monospace", fontSize: ".9rem" } }}
//                             mx={"xs"}
//                             error={verdictCode !== -1 && verdictCode !== 1 ? verdictString : false}
//                             value={outputValue}
//                             readOnly
//                             autosize
//                             minRows={3}
//                             maxRows={5}
//                             size="md"
//                         />
//                     )}
//                 </div>
//             </Paper>
//             <Modal
//                 onReset={(e) => {}}
//                 trapFocus
//                 overflow="inside"
//                 opened={opened}
//                 onClose={close}
//                 size="70%"
//                 title={
//                     location.state ? 
//                     <Text size={"lg"}>
//                         {" "}
//                         <Link to={"/profile/" + userName} target="_blank">
//                             {" "}
//                             {userName + "'s"}{" "}
//                         </Link>{" "}
//                         solution for [
//                         <span style={{ color: "#3090C7", cursor: "pointer" }} onClick={close}>
//                             {" "}
//                             {problems[currentIndex]?.problem?.title}{" "}
//                         </span>
//                         ] [{" "}
//                         <span style={{ color: "#3090C7", cursor: "pointer" }} onClick={close}>
//                             Problem - {currentIndex + 1}
//                         </span>{" "}
//                         ]
//                     </Text>
//                     :  <Title order={2}>
//                         Submission
//                 </Title>
//                 }
//                 zIndex={1000}
//                 closeOnClickOutside={false}
//             >
//                 <ContestSubmitModel
//                     copyPasteEnabled={copyPasteEnabled}
//                     sectionId={sectionId}
//                     contestId={contestId}
//                     courseId={courseId}
//                     problemId={problemId}
//                     code={code ?? ""}
//                     currentLanguage={currentLanguage}
//                     currentTheme={currentTheme}
//                     type={type ?? ""}
//                     chapter_id={chapterId!}
//                 />
//             </Modal>
//         </>
//     )
// }


// const Timer = memo(
//     ({
//         hasDuration,
//         userStartTime,
//         userEndTime,
//         hasSections,
//         sectionStartTime,
//         sectionEndTime,
//         contestStartTime,
//         contestEndTime
//     }: {
//         hasDuration: any
//         userStartTime: any
//         userEndTime: any
//         hasSections: any
//         sectionStartTime: any
//         sectionEndTime: any
//         contestStartTime: any
//         contestEndTime: any
//     }) => {
//         let start, end
//         if (hasDuration) {
//             start = userStartTime
//             end = userEndTime
//         } else if (hasSections) {
//             start = sectionStartTime
//             end = sectionEndTime
//         } else {
//             start = contestStartTime
//             end = contestEndTime
//         }
//         return <ContestTimer start={start} end={end} page={"code"} forSection={hasSections} />
//     }
// )

// export default React.memo(CodeEditor)replace(/_/g, " ")


import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page