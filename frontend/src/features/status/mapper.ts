import type { Status } from '@shared/types/status';
import type { Option } from '@/components/ui/option';

const statusOption = (status: Status): Option => ({
  value: String(status.statusId),
  label: status.statusName,
});

export const statusesToOptions = (statuses: Status[]): Option[] => statuses.map(statusOption);
