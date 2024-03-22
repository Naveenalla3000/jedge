import { AxiosResponse } from "axios"
import { axiosInstance } from "./axios"

export // response polling
async function pollForResult(token: string): Promise<any> {
  let result: any
  try {
    do {
      const response: AxiosResponse = await axiosInstance.get(
        `submissions/${token}`
      )
      result = response.data
      if (result.status.id !== 1) {
        break
      }
      await new Promise((resolve) =>
        setTimeout(resolve, parseInt(process.env.NEXT_PRIVATE_JEDGE_DURIATION!)|| 10000)
      )
    } while (result.status.id === 1)

    return result
  } catch (error) {
    console.error("Error polling for result:", error)
    throw error
  }
}
