import type { OrgNode } from './types';

export const mockOrgData: OrgNode[] = [
  {
    id: '1',
    name: '1大隊',
    level: 'battalion',
    counts: { rest: 12, trip: 5, annual: 3, other: 1 },
    children: [
      {
        id: '1-11',
        name: '11中隊',
        level: 'company',
        counts: { rest: 4, trip: 2, annual: 1, other: 0 },
        children: [
          {
            id: '1-11-111',
            name: '111小隊',
            level: 'platoon',
            counts: { rest: 2, trip: 1, annual: 1, other: 0 },
          },
          {
            id: '1-11-112',
            name: '112小隊',
            level: 'platoon',
            counts: { rest: 2, trip: 1, annual: 1, other: 0 },
          },
          {
            id: '1-11-113',
            name: '113小隊',
            level: 'platoon',
            counts: { rest: 2, trip: 1, annual: 1, other: 0 },
          },
        ],
      },
      {
        id: '1-12',
        name: '12中隊',
        level: 'company',
        counts: { rest: 8, trip: 3, annual: 2, other: 1 },
      },
    ],
  },
  {
    id: '2',
    name: '2大隊',
    level: 'battalion',
    counts: { rest: 15, trip: 9, annual: 4, other: 2 },
  },
];
