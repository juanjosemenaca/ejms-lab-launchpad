import { useQuery } from "@tanstack/react-query";
import { fetchContactSubmissions } from "@/api/contactSubmissionsApi";
import { queryKeys } from "@/lib/queryKeys";

export function useContactSubmissions(enabled: boolean) {
  return useQuery({
    queryKey: queryKeys.contactSubmissions,
    queryFn: fetchContactSubmissions,
    enabled,
  });
}
