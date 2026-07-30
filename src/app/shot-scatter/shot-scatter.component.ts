import { Component, inject, computed} from '@angular/core';
import { ShotDataService } from '../services/shot-data.service';
import { effect } from '@angular/core';
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
    shotData = inject(ShotDataService);
    filterState = inject(FilterStateService);
    filteredShots = computed(() =>
      filterShots(this.shotData.shots(), this.filterState.criteria())
    );
    constructor() {
    this.shotData.shots(); 
  }

}

