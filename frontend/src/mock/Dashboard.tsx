import { mockOrgData } from './mockOrgData';
import { HierarchyCountTable } from './HierarchyCountTable';

export const Dashboard = () => {
  return (
    <div className="p-6">
      <HierarchyCountTable data={mockOrgData} />
    </div>
  );
};
