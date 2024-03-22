export interface IJedgeRequest {
  sourceCode: string
  languageId: string
  number_of_runs: number | null
  stdin: string | null
  expectedOutput: string | null
  cpu_time_limit: string | null
  cpu_extra_time: string | null
  wall_time_limit: string | null
  memory_limit: string | null
  stack_limit: string | null
  max_processes_and_or_threads: string | null
  enable_per_process_and_thread_time_limit: string | null
  enable_per_process_and_thread_memory_limit: string | null
  max_file_size: string | null
  enable_network: string | null
}
