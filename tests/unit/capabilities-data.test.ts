import { describe, it, expect } from 'vitest';
import { CAPABILITIES } from '@/src/data/capabilities';
import { CATEGORIES } from '@/src/data/categories';

describe('CAPABILITIES Data Integrity', () => {
  it('should have capabilities defined as a non-empty array', () => {
    expect(Array.isArray(CAPABILITIES)).toBe(true);
    expect(CAPABILITIES.length).toBeGreaterThan(0);
  });

  it('should ensure all capability IDs are unique', () => {
    const ids = CAPABILITIES.map((c) => c.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('should have required fields populated for each capability', () => {
    CAPABILITIES.forEach((c) => {
      expect(c.id).toBeTruthy();
      expect(c.name.ar).toBeTruthy();
      expect(c.name.en).toBeTruthy();
      expect(c.category).toBeTruthy();
      expect(c.difficulty).toBeTruthy();
      expect(c.summary.ar).toBeTruthy();
      expect(c.summary.en).toBeTruthy();
      expect(c.status).toBeTruthy();
      expect(Array.isArray(c.relatedNodeIds)).toBe(true);
    });
  });

  it('should ensure all relatedNodeIds reference existing capabilities', () => {
    const validIds = new Set(CAPABILITIES.map((c) => c.id));
    CAPABILITIES.forEach((c) => {
      c.relatedNodeIds.forEach((relId) => {
        expect(validIds.has(relId)).toBe(true);
      });
    });
  });

  it('should ensure all capabilities belong to a valid category', () => {
    const validCategories = new Set(Object.keys(CATEGORIES));
    CAPABILITIES.forEach((c) => {
      expect(validCategories.has(c.category)).toBe(true);
    });
  });
});
