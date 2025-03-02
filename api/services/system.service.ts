import type { ApiResponse } from "../types/call.types"
import axiosInstance from "../axios-instance"
import { AxiosError } from "axios"

const resetAllCalls = async (): Promise<ApiResponse<void>> => {
  try {
    const response = await axiosInstance.patch("/reset")
    return {
      data: undefined,
      status: response.status,
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(`Failed to reset calls: ${error.message}`)
    }
    throw error
  }
}

export const systemService = {
  resetAllCalls,
}

