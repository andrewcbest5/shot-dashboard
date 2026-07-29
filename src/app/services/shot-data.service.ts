import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Papa from 'papaparse';
import { Shot } from '../models/shot.model';
import { isThreePointAttempt } from '../util/functions.util';

interface ShotCsvRow {
  shooter_id: string;
  shooter_name: string;
  year: string; month: string; day: string;
  period: string;
  start_game_clock: string; end_game_clock: string;
  shot_clock: string;
  x: string; y: string;
  passer_x: string; passer_y: string;
  outcome: string;
  assisted: string; ast_opp: string; blocked: string; fouled: string;
  shot_type: string; complex_shot_type: string;
  contested: string; contest_level: string;
  catch_and_shoot: string; dribbles_before: string;
}

@Injectable({ providedIn: 'root' })
export class ShotDataService {
  private readonly _shots = signal<Shot[]>([]);
  private readonly _loading = signal(true);
  private readonly _error = signal<string | null>(null);

  readonly shots = this._shots.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  constructor(private http: HttpClient) {
    this.load();
  }

  private load(): void {
    this.http.get('/shots.csv', { responseType: 'text' }).subscribe({
      next: (csvText) => {
        try {
              const shots = this.parse(csvText);
              console.log('Parsed shots:', shots);
              console.log('First shot:', shots[0]);
              console.log('Total count:', shots.length);
              this._shots.set(shots);
        } catch (err) {
          this._error.set('Failed to parse shot data.');
          console.error(err);
        } finally {
          this._loading.set(false);
        }
      },
      error: (err) => {
        this._error.set('Failed to load shot data.');
        this._loading.set(false);
        console.error(err);
      },
    });
  }

  private parse(csvText: string): Shot[] {
    const result = Papa.parse<ShotCsvRow>(csvText, {
      header: true,
      skipEmptyLines: true,
    });

    if (result.errors.length) {
      console.warn('CSV parse warnings:', result.errors);
    }

    return result.data
      .map((row) => this.toShot(row));
  }


  private toShot(row: ShotCsvRow): Shot {
    const x = Number(row.x);
    const y = Number(row.y);

    return {
      shooterId: row.shooter_id,
      shooterName: row.shooter_name,
      date: new Date(Number(row.year), Number(row.month) - 1, Number(row.day)),

      period: Number(row.period),
      startGameClock: Number(row.start_game_clock),
      endGameClock: Number(row.end_game_clock),
      shotClock: Number(row.shot_clock),

      x, y,
      passerX: row.passer_x ? Number(row.passer_x) : null,
      passerY: row.passer_y ? Number(row.passer_y) : null,

      outcome: row.outcome === 'true',
      assisted: row.assisted === 'true',
      astOpp: row.ast_opp === 'true',
      blocked: row.blocked === 'true',
      fouled: row.fouled === 'true',

      shotType: row.shot_type as Shot['shotType'],
      complexShotType: row.complex_shot_type as Shot['complexShotType'],

      contested: row.contested === 'true',
      contestLevel: row.contest_level as Shot['contestLevel'],

      catchAndShoot: row.catch_and_shoot === 'true',
      dribblesBefore: Number(row.dribbles_before),

      // derived once, here — never recomputed downstream
      derivedIsThree: isThreePointAttempt(x, y),
    };
  }

  
}