// Define explicit types for supported time units
export type Unit =
  | 'ms'
  | 'millisecond'
  | 'milliseconds'
  | 's'
  | 'sec'
  | 'second'
  | 'seconds'
  | 'm'
  | 'min'
  | 'minute'
  | 'minutes'
  | 'h'
  | 'hr'
  | 'hour'
  | 'hours'
  | 'd'
  | 'day'
  | 'days'
  | 'w'
  | 'week'
  | 'weeks'
  | 'y'
  | 'yr'
  | 'year'
  | 'years';

// Template literal type to allow only valid combinations like "2 days" or "1.5h"
export type StringValue = `${number}${Unit}` | `${number} ${Unit}`;

export interface Options {
  /** Enables long-form string formatting (e.g., "days" instead of "d"). */
  long?: boolean;
}

// Unit conversion constants in milliseconds
const s = 1000;
const m = s * 60;
const h = m * 60;
const d = h * 24;
const w = d * 7;
const y = d * 365.25;

/**
 * Main entry function mimicking the vercel/ms utility.
 */
export function ms(value: StringValue, options?: Options): number;
export function ms(value: number, options?: Options): string;
export function ms(value: StringValue | number, options?: Options): string | number {
  try {
    if (typeof value === 'string' && value.length > 0) {
      return parse(value);
    } else if (typeof value === 'number' && isFinite(value)) {
      return options?.long ? formatLong(value) : formatShort(value);
    }
    throw new Error('Value is not a string or a number.');
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`[ms] failed to parse/format: "${value}". Details: ${message}`);
  }
}

/**
 * Parses a string value into milliseconds.
 */
function parse(str: string): number {
  if (str.length > 100) throw new Error('String exceeds maximum length limit.');

  // Regular expression to match standard numbers, fractions, and units
  const match = /^(?<value>(-|\+)?\d+(?:\.\d+)?)\s*(?<unit>[a-z]+)$/i.exec(str);
  if (!match || !match.groups) {
    throw new Error('Invalid format sequence.');
  }

  const num = parseFloat(match.groups.value);
  const unit = match.groups.unit.toLowerCase() as Unit;

  switch (unit) {
    case 'years':
    case 'year':
    case 'yr':
    case 'y':
      return num * y;
    case 'weeks':
    case 'week':
    case 'w':
      return num * w;
    case 'days':
    case 'day':
    case 'd':
      return num * d;
    case 'hours':
    case 'hour':
    case 'hr':
    case 'h':
      return num * h;
    case 'minutes':
    case 'minute':
    case 'min':
    case 'm':
      return num * m;
    case 'seconds':
    case 'second':
    case 'sec':
    case 's':
      return num * s;
    case 'milliseconds':
    case 'millisecond':
    case 'ms':
      return num;
    default:
      throw new Error(`Unsupported time unit: "${unit ? unit : 'undefined'}"`);
  }
}

/**
 * Formats milliseconds into a short string representation.
 */
function formatShort(msVal: number): string {
  const absMs = Math.abs(msVal);
  if (absMs >= d) return `${Math.round(msVal / d)}d`;
  if (absMs >= h) return `${Math.round(msVal / h)}h`;
  if (absMs >= m) return `${Math.round(msVal / m)}m`;
  if (absMs >= s) return `${Math.round(msVal / s)}s`;
  return `${msVal}ms`;
}

/**
 * Formats milliseconds into a long-form string representation.
 */
function formatLong(msVal: number): string {
  const absMs = Math.abs(msVal);
  if (absMs >= d) return plural(msVal, d, 'day');
  if (absMs >= h) return plural(msVal, h, 'hour');
  if (absMs >= m) return plural(msVal, m, 'minute');
  if (absMs >= s) return plural(msVal, s, 'second');
  return `${msVal} ms`;
}

/**
 * Helper to determine pluralization for long forms.
 */
function plural(msVal: number, unitMs: number, name: string): string {
  const value = Math.round(msVal / unitMs);
  return `${value} ${name}${Math.abs(value) === 1 ? '' : 's'}`;
}
