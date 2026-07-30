import { Component, inject} from '@angular/core';
import { ShotScatterComponent } from './shot-scatter/shot-scatter.component';
import {ShotDataService} from "./services/shot-data.service";
import { ScatterFiltersComponent } from './scatter-filters/scatter-filters.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ShotScatterComponent, ScatterFiltersComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
}