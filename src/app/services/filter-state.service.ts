import { Injectable, signal } from '@angular/core';
import { ComplexShotType, ContestLevel } from '../models/shot.model';

export interface FilterCriteria {
  playerId: string | null;
  complexShotType: ComplexShotType | null;
  contestLevel: ContestLevel | null;
  catchAndShootOnly: boolean;
}

const DEFAULT_CRITERIA: FilterCriteria = {
  playerId: null,
  complexShotType: null,
  contestLevel: null,
  catchAndShootOnly: false,
};

@Injectable({ providedIn: 'root' })
export class FilterStateService {
  private readonly _criteria = signal<FilterCriteria>(DEFAULT_CRITERIA);
  readonly criteria = this._criteria.asReadonly();

  setPlayer(playerId: string | null): void {
    this._criteria.update((c) => ({ ...c, playerId }));
  }

  setComplexShotType(complexShotType: ComplexShotType | null): void {
    this._criteria.update((c) => ({ ...c, complexShotType }));
  }

  setContestLevel(contestLevel: ContestLevel | null): void {
    this._criteria.update((c) => ({ ...c, contestLevel }));
  }

  setCatchAndShootOnly(catchAndShootOnly: boolean): void {
    this._criteria.update((c) => ({ ...c, catchAndShootOnly }));
  }

  reset(): void {
    this._criteria.set(DEFAULT_CRITERIA);
  }
}