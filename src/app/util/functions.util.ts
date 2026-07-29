
const BASKET_X = -41.75;
const BASKET_Y = 0;
const ABOVE_BREAK_RADIUS = 23.75;   // feet, arc distance from basket
const CORNER_THREE_Y = 22;          // feet, corner line distance from center
const CORNER_THREE_X_LIMIT = -32.8; // feet, where corner straight line meets the arc

export function distanceFromBasket(x: number, y: number): number {
  return Math.sqrt((x - BASKET_X) ** 2 + (y - BASKET_Y) ** 2);
}

export function isThreePointAttempt(x: number, y: number): boolean {
  const isCornerThree = Math.abs(y) >= CORNER_THREE_Y && x <= CORNER_THREE_X_LIMIT;
  const isAboveBreakThree = distanceFromBasket(x, y) >= ABOVE_BREAK_RADIUS;
  return isCornerThree || isAboveBreakThree;
}