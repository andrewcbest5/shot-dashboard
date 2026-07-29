import { distanceFromBasket, isThreePointAttempt } from './functions.util';

describe('court-geometry.util', () => {
  describe('distanceFromBasket', () => {
    it('returns 0 at the basket itself', () => {
      expect(distanceFromBasket(-41.75, 0)).toBeCloseTo(0, 5);
    });
  });

  describe('isThreePointAttempt', () => {
    it('identifies a shot at the top of the key (well inside the arc) as not a three', () => {
      expect(isThreePointAttempt(-35, 0)).toBe(false);
    });

    it('identifies a shot at the top of the arc as a three', () => {
      // basket x (-41.75) minus radius (23.75) = -65.5, at y = 0
      expect(isThreePointAttempt(-65.5, 0)).toBe(true);
    });

    it('identifies a straightaway mid-range jumper as not a three', () => {
      expect(isThreePointAttempt(-50, 5)).toBe(false);
    });

    it('identifies a corner three as a three', () => {
      // near the baseline, out near the sideline — classic corner three
      expect(isThreePointAttempt(-45, 23)).toBe(true);
    });

    it('identifies a shot in the restricted area as not a three', () => {
      expect(isThreePointAttempt(-41.75, 0)).toBe(false);
    });

    it('identifies a deep above-the-break three as a three', () => {
      expect(isThreePointAttempt(-70, 10)).toBe(true);
    });
  });
});