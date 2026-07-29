import { Component, inject} from '@angular/core';
import { ShotDataService } from '../services/shot-data.service';
import { effect } from '@angular/core';

@Component({
  selector: 'app-shot-scatter',
  standalone: true,
  imports: [],
  templateUrl: './shot-scatter.component.html',
  styleUrl: './shot-scatter.component.scss'
})
export class ShotScatterComponent {
    shotData = inject(ShotDataService);
    constructor() {
      effect(() => {
        const shots = this.shotData.shots();
        if (shots.length) {
          console.log('max x:', Math.max(...shots.map(s => s.x)));
        }
      });
    }
}

