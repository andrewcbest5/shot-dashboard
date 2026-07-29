import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { ShotDataService } from './services/shot-data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'shot-dashboard';
  shotData = inject(ShotDataService);
}
