import { Shot } from '../models/shot.model';
import { FilterCriteria } from '../services/filter-state.service';

export function filterShots(shots: Shot[], criteria: FilterCriteria): Shot[] {
  return shots.filter((shot) => {
    if (criteria.playerId !== null && shot.shooterId !== criteria.playerId) {
      return false;
    }
    if (criteria.complexShotType !== null && shot.complexShotType !== criteria.complexShotType) {
      return false;
    }
    if (criteria.contestLevel !== null && shot.contestLevel !== criteria.contestLevel) {
      return false;
    }
    if (criteria.catchAndShootOnly && !shot.catchAndShoot) {
      return false;
    }
    return true;
  });
}