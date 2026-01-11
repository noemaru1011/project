import { describe, it, expect } from 'vitest';
import { departmentsToOptions } from './mapper';
import type { Department } from '@shared/types/department';

describe('department mapper', () => {
  it('Departmentの配列をOptionの配列に正しく変換すること', () => {
    const departments: Department[] = [
      { departmentId: '1', departmentName: '経済学部' },
      { departmentId: '2', departmentName: '法学部' },
    ];

    const expected = [
      { value: '1', label: '経済学部' },
      { value: '2', label: '法学部' },
    ];

    expect(departmentsToOptions(departments)).toEqual(expected);
  });

  it('空の配列を渡した場合、空の配列を返すこと', () => {
    expect(departmentsToOptions([])).toEqual([]);
  });
});
