import type { Option } from "@/types/ui";

const squads: Option[] = [];

const hundreds = [1, 2, 3, 4];
const tens = [1, 2, 3, 4];
const ones = [1, 2, 3];

for (const h of hundreds) {
  for (const t of tens) {
    for (const o of ones) {
      const value = `${h}${t}${o}`;
      const label = `${value}小隊`;
      squads.push({ value, label });
      if (squads.length >= 443) break;
    }
    if (squads.length >= 443) break;
  }
  if (squads.length >= 443) break;
}

export const minorCategoryOptions: Option[] = squads;
