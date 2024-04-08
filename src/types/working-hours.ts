export interface WorkingHoursPerDay {
  monday?: OpenClosedDay;
  tuesday?: OpenClosedDay;
  wednesday?: OpenClosedDay;
  thursday?: OpenClosedDay;
  friday?: OpenClosedDay;
  saturday?: OpenClosedDay;
  sunday?: OpenClosedDay;
  holidayHours?: HolidayHours[];
}

export type HolidayHours = OpenClosedDay & {
  /**
   * Date in format YYYY-MM-DD
   */
  date: string;
};

export interface Day {
  isClosed: boolean;
}

export interface OpenedDay extends Day {
  isClosed: false;
  openIntervals: OpenInterval[];
}

export interface ClosedDay extends Day {
  isClosed: true;
}

export type OpenClosedDay = OpenedDay | ClosedDay;

export interface OpenInterval {
  start: string;
  end: string;
}

export const orderedDays: string[] = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

export enum OpenedIndicatorEnum {
  Opened = 'Opened',
  OpeningSoon = 'OpeningSoon',
  Closed = 'Closed',
}
