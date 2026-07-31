import { Shot } from '../models/shot.model';

export interface SummaryStats {
  attempts: number;
  makes: number;
  fgPct: number | null;       // null when attempts = 0, avoids divide-by-zero display issues

  threeAttempts: number;
  threeMakes: number;
  threePct: number | null;

  efgPct: number | null;
}

export function computeSummaryStats(shots: Shot[]): SummaryStats {
  const attempts = shots.length;
  const makes = shots.filter((s) => s.outcome).length;

  const threeShots = shots.filter((s) => s.derivedIsThree);
  const threeAttempts = threeShots.length;
  const threeMakes = threeShots.filter((s) => s.outcome).length;

  return {
    attempts,
    makes,
    fgPct: attempts > 0 ? makes / attempts : null,

    threeAttempts,
    threeMakes,
    threePct: threeAttempts > 0 ? threeMakes / threeAttempts : null,

    efgPct: attempts > 0 ? (makes + 0.5 * threeMakes) / attempts : null,
  };
}