import { Component, inject, computed } from '@angular/core';
import { ShotDataService } from '../services/shot-data.service';
import { FilterStateService } from '../services/filter-state.service';
import { filterShots } from '../util/shot.filter.util';
import { computeSummaryStats } from '../util/shot-stats.util';

@Component({
  selector: 'app-summary-table',
  standalone: true,
  imports: [],
  templateUrl: './summary-table.component.html',
  styleUrl: './summary-table.component.scss'
})
export class SummaryTableComponent {
  private readonly shotData = inject(ShotDataService);
  private readonly filterState = inject(FilterStateService);

  private readonly filteredShots = computed(() =>
    filterShots(this.shotData.shots(), this.filterState.criteria())
  );

  protected readonly stats = computed(() =>
    computeSummaryStats(this.filteredShots())
  );
}