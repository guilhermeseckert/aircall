import type { Call, ArchiveCallRequest, ApiResponse } from "../types/call.types"
import axiosInstance from "../axios-instance"
import { AxiosError } from "axios"

const getAllCalls = async (): Promise<ApiResponse<Call[]>> => {
  try {
    const response = await axiosInstance.get<Call[]>("/activities")
    return {
      data: response.data,
      status: response.status,
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(`Failed to fetch calls: ${error.message}`)
    }
    throw error
  }
}

const getCallById = async (id: string): Promise<ApiResponse<Call>> => {
  try {
    const response = await axiosInstance.get<Call>(`/activities/${id}`)
    return {
      data: response.data,
      status: response.status,
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(`Failed to fetch call details: ${error.message}`)
    }
    throw error
  }
}

const updateCallArchiveStatus = async ({ callId, isArchived }: ArchiveCallRequest): Promise<ApiResponse<Call>> => {
  try {
    const response = await axiosInstance.patch<Call>(`/activities/${callId}`, {
      is_archived: isArchived,
    })
    return {
      data: response.data,
      status: response.status,
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(`Failed to update call archive status: ${error.message}`)
    }
    throw error
  }
}

export const callsService = {
  getAllCalls,
  getCallById,
  updateCallArchiveStatus,
}

