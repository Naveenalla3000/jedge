// here we are defining our dao
export interface Language {
  languageName: string
  languageId: number
  sampleCode: string
}

export enum Difficulty {
  EASY = "EASY",
  MEDIUM = "MEDIUM",
  HARD = "HARD",
}

export enum ContestLevel {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
}

export interface Example {
  input: string
  output: string
  explanation: string
}

// export interface Explanation {
//   text: string
// }

export interface SampleInput {
  text: string
}

export interface SampleOutput {
  text: string
}

// export interface Constraint {
//   text: string;
// }

export interface Question {
  title: string;
  difficulty_level: string;
  score: number;
  description: string;
  constraints: string[];
  examples: Example[];
  explanations: string[];
  sampleInputs: SampleInput[];
  sampleOutputs: SampleOutput[];
}

export interface Contest {
  name: string;
  description: string;
  contest_level: string;
  startsAt: string;
  endsAt: string;
  questions: Question[];
  noOfQuestions: number;
}

export interface Icontest {
  id: number
  name: string
  description: string
  noOfQuestions: number
  startsAt: string
  endsAt: string
  status: string
  created_at: string
  contest_level: ContestLevel
  updated_at: string
}

export interface IExample {
  input: string
  output: string
  explanation: string
}

export interface SampleIO {
  id: string
  text: string
  questionId: string
  createdAt: string
  updatedAt: string
}
export interface IQuestion {
  id: string
  title: string
  difficulty_level: string
  score: number
  description: string
  constraints: string[]
  explanations: string[]
  contestId: string
  examples: IExample[]
  index: number
  sampleInput: SampleIO
  sampleOutput: SampleIO
}

export interface JedgeServerResponse {
  stdout: string | null | undefined;
  time: string |null | undefined;
  memory: number | null | undefined ;
  stderr: null | string;
  token: string;
  compile_output: null | string;
  message: null | string;
  status: {
    id: number;
    description: string;
  };
}
