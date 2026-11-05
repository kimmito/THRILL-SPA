export const MINUTES_PER_DAY = 1440;

export function isValidMinute(value: number): boolean {
  return Number.isInteger(value) && value >= 0 && value <= MINUTES_PER_DAY;
}

export function isValidTimeRange(start: number, end: number): boolean {
  return isValidMinute(start) && isValidMinute(end) && start < end;
}

export function rangeOverlap(start1: number, end1: number, start2: number, end2: number): boolean {
  return start1 < end2 && start2 < end1;
}
