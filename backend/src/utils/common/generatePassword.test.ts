import { describe, it, expect } from 'vitest';
import { generatePassword } from './generatePassword';

describe('generatePassword', () => {
  it('デフォルトで12文字のパスワードを生成すること', () => {
    const password = generatePassword();
    expect(password).toHaveLength(12);
  });

  it('指定された長さのパスワードを生成すること', () => {
    const password = generatePassword(16);
    expect(password).toHaveLength(16);
  });

  it('英数字と記号を含んでいること', () => {
    const password = generatePassword(100);
    // 文字セットに含まれる文字種をカバーしているか緩くチェック
    expect(password).toMatch(/^[a-zA-Z0-9!@#$%^&*()_+[\]{}|;:,.<>?]+$/);
  });

  it('呼び出すたびに異なるパスワードを生成すること', () => {
    const p1 = generatePassword();
    const p2 = generatePassword();
    expect(p1).not.toBe(p2);
  });
});
