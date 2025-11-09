import { Hooks } from "@/hooks/Hooks";
import { StatusAPi } from "@/api/statusApi";
import type { Status } from "@shared/schemas/status";

export function useStatus() {
  return Hooks<Status>(StatusAPi);
}
