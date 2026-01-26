import { describe, it, expect } from 'vitest';
import { getMenuPageSize } from './menu-utils';

describe('getMenuPageSize', () => {
  it('returns 2 for mobile width (< 768px)', () => {
    expect(getMenuPageSize(500)).toBe(2);
    expect(getMenuPageSize(767)).toBe(2);
  });

  it('returns 4 for medium width (>= 768px and < 1024px)', () => {
    expect(getMenuPageSize(768)).toBe(4);
    expect(getMenuPageSize(1023)).toBe(4);
  });

  it('returns 6 for large width (>= 1024px and < 1280px)', () => {
    expect(getMenuPageSize(1024)).toBe(6);
    expect(getMenuPageSize(1279)).toBe(6);
  });

  it('returns 8 for extra large width (>= 1280px)', () => {
    expect(getMenuPageSize(1280)).toBe(8);
    expect(getMenuPageSize(1920)).toBe(8);
  });
});
