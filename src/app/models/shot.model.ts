export type ShotType = 'heave' | 'jumper' | 'post' | 'floater' | 'layup';

export type ComplexShotType =
  | 'heave'
  | 'catchAndShoot'
  | 'catchAndShootRelocating'
  | 'catchAndShootOnMoveLeft'
  | 'catchAndShootOnMoveRight'
  | 'pullupJumper'
  | 'stepback'
  | 'shakeAndRaise'
  | 'overScreen'
  | 'drivingFloater'
  | 'cutFloater'
  | 'postLeft'
  | 'postRight'
  | 'drivingLayup'
  | 'cutLayup'
  | 'standstillLayup'
  | 'lob'
  | 'tip';

export type ContestLevel = 'uncontested' | 'lightly_contested' | 'heavily_contested';

export interface Shot {
  shooterId: string;
  shooterName: string;
  date: Date;

  period: number;
  startGameClock: number;
  endGameClock: number;
  shotClock: number;

  x: number;
  y: number;
  passerX: number | null;
  passerY: number | null;

  outcome: boolean;
  assisted: boolean;
  astOpp: boolean;
  blocked: boolean;
  fouled: boolean;

  shotType: ShotType;
  complexShotType: ComplexShotType;

  contested: boolean;
  contestLevel: ContestLevel;

  catchAndShoot: boolean;
  dribblesBefore: number;

  // --- derived at load time ---
  derivedIsThree: boolean;
}

export interface Player {
  id: string;
  name: string;
}