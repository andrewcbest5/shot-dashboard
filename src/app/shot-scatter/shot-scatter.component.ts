// shot-scatter.component.ts
import { Component, inject, computed } from '@angular/core';
import { ShotDataService } from '../services/shot-data.service';
import { FilterStateService } from '../services/filter-state.service';
import { filterShots } from '../util/shot.filter.util';

@Component({
  selector: 'app-shot-scatter',
  standalone: true,
  imports: [],
  templateUrl: './shot-scatter.component.html',
  styleUrl: './shot-scatter.component.scss'
})
export class ShotScatterComponent {
  private readonly shotData = inject(ShotDataService);
  private readonly filterState = inject(FilterStateService);

  protected readonly filteredShots = computed(() =>
    filterShots(this.shotData.shots(), this.filterState.criteria())
  );

  protected readonly chartTitle = computed(() => {
    const playerId = this.filterState.criteria().playerId;
    if (!playerId) return 'All Players';

    const match = this.shotData.shots().find((s) => s.shooterId === playerId);
    return match ? match.shooterName : 'All Players';
  });
}