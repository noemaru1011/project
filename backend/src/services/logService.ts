import { getLogFiles } from '@/repositories/logRepository';

export const getDownloadableLogs = () => {
  return getLogFiles();
};
