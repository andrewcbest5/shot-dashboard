// filter-panel.component.ts
import { Component, inject, computed } from '@angular/core';
import { ShotDataService } from '../services/shot-data.service';
import { FilterStateService } from '../services/filter-state.service';
import { ComplexShotType, ContestLevel } from '../models/shot.model';

interface PlayerOption {
  id: string;
  name: string;
}

@Component({
  selector: 'app-scatter-filters',
  standalone: true,
  imports: [],
  templateUrl: './scatter-filters.component.html',
  styleUrl: './scatter-filters.component.scss'
})
export class ScatterFiltersComponent {
  protected readonly shotData = inject(ShotDataService);
  protected readonly filterState = inject(FilterStateService);

  // Unique players, derived once from the full dataset — not affected by filters
  protected readonly players = computed<PlayerOption[]>(() => {
    const seen = new Map<string, string>();
    for (const shot of this.shotData.shots()) {
      if (!seen.has(shot.shooterId)) {
        seen.set(shot.shooterId, shot.shooterName);
      }
    }
    return Array.from(seen.entries())
      .map(([id, name]) => ({ id, name }))
      .sort((a, b) => a.name.localeCompare(b.name));
  });

  protected readonly complexShotTypes: ComplexShotType[] = [
    'catchAndShoot', 'catchAndShootRelocating', 'catchAndShootOnMoveLeft',
    'catchAndShootOnMoveRight', 'pullupJumper', 'stepback', 'shakeAndRaise',
    'overScreen', 'drivingFloater', 'cutFloater', 'postLeft', 'postRight',
    'drivingLayup', 'cutLayup', 'standstillLayup', 'lob', 'tip', 'heave',
  ];

  protected readonly contestLevels: ContestLevel[] = [
    'uncontested', 'lightly_contested', 'heavily_contested',
  ];

  onPlayerChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.filterState.setPlayer(value || null);
  }

  onComplexShotTypeChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.filterState.setComplexShotType((value || null) as ComplexShotType | null);
  }

  onContestLevelChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.filterState.setContestLevel((value || null) as ContestLevel | null);
  }

  onCatchAndShootChange(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.filterState.setCatchAndShootOnly(checked);
  }

  onReset(): void {
    this.filterState.reset();
  }
}