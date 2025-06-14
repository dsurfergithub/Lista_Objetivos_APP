// Interfaces are for type checking and not directly used at runtime by JavaScript.
// They can be kept as comments for reference or removed.
/*
export interface Goal {
  id: string;
  name: string;
  description?: string;
  startDate: string; // ISO string for dates
  endDate: string;   // ISO string for dates
  isCompleted: boolean;
  completedDate?: string; // ISO string for dates
}
*/

// Convert enum to a plain JavaScript object
export const Tab = {
  Countdown: 'Cuenta Regresiva',
  NewGoal: 'Nueva Meta',
  Completed: 'Metas Completadas',
};
Object.freeze(Tab); // Optional: make it immutable like an enum

/*
export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMilliseconds: number;
}
*/
