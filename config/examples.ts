import { Example } from "@/types/default"

export const defaultExamples: Example[] = [
  {
    input: "nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3",
    output: "[1,2,2,3,5,6]",
    explanation: "The arrays we are merging are [1,2,3] and [2,5,6].",
  },
  {
    input: "nums1 = [1], m = 1, nums2 = [], n = 0",
    output: "[1]",
    explanation: "The arrays we are merging are [1] and [].",
  },
  {
    input: "nums1 = [0], m = 0, nums2 = [1], n = 1",
    output: "[1]",
    explanation: "The arrays we are merging are [] and [1].",
  },
  {
    input: "nums1 = [2,0], m = 1, nums2 = [1], n = 1",
    output: "[1,2]",
    explanation: "The arrays we are merging are [2] and [1].",
  }
]

export const scores: { position: string; points: number }[] = [
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