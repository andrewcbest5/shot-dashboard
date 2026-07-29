import { Component, inject} from '@angular/core';
import { ShotScatterComponent } from './shot-scatter/shot-scatter.component';
import {ShotDataService} from "./services/shot-data.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ShotScatterComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
}