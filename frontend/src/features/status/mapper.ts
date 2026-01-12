import type { Status } from '@shared/models/master';
import type { Option } from '@/components/ui/option';

const statusOption = (status: Status): Option => ({
  value: String(status.statusId),
  label: status.statusName,
});

export const statusesToOptions = (statuses: Status[]): Option[] => statuses.map(statusOption);
