import { Hooks } from "@/hooks/Hooks";
import { StatusAPi } from "@/api/statusApi";
import type { Status } from "@shared/schemas/Status";

export function useStatus(autoFetch: boolean) {
  return Hooks<Status>(StatusAPi, autoFetch);
}
