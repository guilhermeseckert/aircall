export interface Call {
  id: string;
  created_at: string;
  direction: "inbound" | "outbound";
  from: string;
  to: string;
  via: string;
  duration: number;
  is_archived: boolean;
  call_type: "missed" | "answered" | "voicemail";
}

export interface ArchiveCallRequest {
  callId: string;
  isArchived: boolean;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

