import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Call } from "@/api/types/call.types";
import { callsService } from "@/api/services/calls.service";
import { systemService } from "@/api/services/system.service";

export function useCalls() {
	const queryClient = useQueryClient();

	const { data, isLoading, error } = useQuery({
		queryKey: ["calls"],
		queryFn: async function fetchCalls() {
			const response = await callsService.getAllCalls();
			return response.data;
		},
	});

	const archiveMutation = useMutation({
		mutationFn: async function archiveCall({
			callId,
			isArchived,
		}: { callId: string; isArchived: boolean }) {
			return callsService.updateCallArchiveStatus({ callId, isArchived });
		},
		onSuccess: function handleArchiveSuccess() {
			queryClient.invalidateQueries({ queryKey: ["calls"] });
		},
	});

	const archiveAllMutation = useMutation({
		mutationFn: async function archiveAllCalls(calls: Call[]) {
			const promises = [];
			for (const call of calls) {
				promises.push(
					callsService.updateCallArchiveStatus({
						callId: call.id,
						isArchived: !call.is_archived,
					}),
				);
			}
			return Promise.all(promises);
		},
		onSuccess: function handleArchiveAllSuccess() {
			queryClient.invalidateQueries({ queryKey: ["calls"] });
		},
	});

	const resetMutation = useMutation({
		mutationFn: async function resetCalls() {
			return systemService.resetAllCalls();
		},
		onSuccess: function handleResetSuccess() {
			queryClient.invalidateQueries({ queryKey: ["calls"] });
		},
	});

	return {
		calls: data ?? [],
		isLoading,
		error,
		archiveCall: archiveMutation.mutate,
		isArchiving: archiveMutation.isPending,
		archiveAll: archiveAllMutation.mutate,
		isArchivingAll: archiveAllMutation.isPending,
		reset: resetMutation.mutate,
		isResetting: resetMutation.isPending,
	};
}

export function useCall(callId: string) {
	const queryClient = useQueryClient();

	const {
		data: call,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["call", callId],
		queryFn: async function fetchCall() {
			const response = await callsService.getCallById(callId);
			return response.data;
		},
		enabled: Boolean(callId),
	});

	const archiveMutation = useMutation({
		mutationFn: async function archiveCall({
			callId,
			isArchived,
		}: { callId: string; isArchived: boolean }) {
			return callsService.updateCallArchiveStatus({ callId, isArchived });
		},
		onSuccess: function handleArchiveSuccess() {
			queryClient.invalidateQueries({ queryKey: ["calls"] });
			queryClient.invalidateQueries({ queryKey: ["call", callId] });
		},
	});

	return {
		call,
		isLoading,
		error,
		archiveCall: archiveMutation.mutate,
		isArchiving: archiveMutation.isPending,
	};
}
