export interface Goal {
  id: string;
  name: string;
  description?: string;
  startDate: string; // ISO string for dates
  endDate: string;   // ISO string for dates
  isCompleted: boolean;
  completedDate?: string; // ISO string for dates
}

export enum Tab {
  Countdown = 'Cuenta Regresiva',
  NewGoal = 'Nueva Meta',
  Completed = 'Metas Completadas',
}

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMilliseconds: number;
}