export type StatusCounts = {
  rest: number; // 休務
  trip: number; // 出張
  annual: number; // 年休
  other: number; // その他
  //ほんとはもっと続く
};

export type OrgNode = {
  id: string;
  name: string;
  level: 'battalion' | 'company' | 'platoon';
  counts: StatusCounts;
  children?: OrgNode[];
};
