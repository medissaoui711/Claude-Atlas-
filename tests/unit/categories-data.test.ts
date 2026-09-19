import { describe, it, expect } from 'vitest';
import { CATEGORIES, CATEGORY_LIST } from '@/src/data/categories';

describe('CATEGORIES Data Integrity', () => {
  it('should have CATEGORY_LIST defined with the 6 primary architectural domains', () => {
    expect(Array.isArray(CATEGORY_LIST)).toBe(true);
    expect(CATEGORY_LIST.length).toBe(6);
  });

  it('should have unique IDs for all primary categories', () => {
    const ids = CATEGORY_LIST.map((c) => c.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('should have all bilingual and visual properties defined across all categories in the dictionary', () => {
    Object.values(CATEGORIES).forEach((cat) => {
      expect(cat.id).toBeTruthy();
      expect(cat.name.ar).toBeTruthy();
      expect(cat.name.en).toBeTruthy();
      expect(cat.description.ar).toBeTruthy();
      expect(cat.description.en).toBeTruthy();
      expect(cat.color).toBeTruthy();
      expect(cat.iconName).toBeTruthy();
    });
  });
});
