import * as _ from 'lodash';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {
  HolidayHours,
  OpenClosedDay,
  OpenedDay,
  OpenInterval,
  orderedDays,
  WorkingHoursPerDay,
} from '../types/working-hours';
import { getDateInYextFormat } from '../utils/helper';

function formatOpenIntervals(openIntervals: OpenInterval[]): string {
  if (
    openIntervals.length === 1 &&
    openIntervals[0].end === '23:59' &&
    openIntervals[0].start === '00:00'
  ) {
    const { t } = useTranslation();
    return t('allDay');
  }
  return openIntervals.reduce(
    (result: string, interval, index, intervals): string => {
      result += `${interval.start} - ${interval.end}`;
      if (index < intervals.length - 1) {
        result += '\n';
      }
      return result;
    },
    ''
  );
}

function formatWorkingHours(
  workingHours: WorkingHoursPerDay
): [dayName: string, hours: string][] {
  return orderedDays.map((dayName) => {
    return [dayName, getWorkingHoursForDay(dayName, workingHours)];
  });
}

function getWorkingHoursForDay(
  dayName: string,
  workingHours: WorkingHoursPerDay
): string {
  const workingHoursForDay: OpenClosedDay = workingHours[dayName];
  if (workingHoursForDay && !workingHoursForDay.isClosed) {
    return formatOpenIntervals(workingHoursForDay.openIntervals);
  }
  const { t } = useTranslation();
  return t('closed');
}

/**
 * Compare is place open/closed on both dates and do they have same opening hours intervals
 * @param first First holiday hours for comparison
 * @param second Second holiday hours for comparison
 * @returns are opening intervals same if both opened
 */
function haveSameWorkingTime(
  first: HolidayHours,
  second: HolidayHours
): boolean {
  if (first.isClosed !== second.isClosed) {
    return false;
  }
  if (first.isClosed) {
    return true;
  } else {
    return _.isEqual(first.openIntervals, (second as OpenedDay).openIntervals);
  }
}

function isNextDay(currentDate: string, nextDate: string): boolean {
  const currentDay = new Date(currentDate);
  currentDay.setDate(currentDay.getDate() + 1);
  return getDateInYextFormat(currentDay) === nextDate;
}

/**
 * Group holiday hours if they are day after day and have same working hours
 * @param holidayHours all holiday hours sorted
 * @returns Grouped holiday hours
 */
function groupHolidayHours(holidayHours: HolidayHours[]): HolidayHours[][] {
  const result: HolidayHours[][] = [];
  holidayHours.reduce(
    (currentGroup: HolidayHours[], currentHoliday: HolidayHours, index) => {
      if (!currentGroup.length) {
        currentGroup = [currentHoliday];
      } else {
        if (
          haveSameWorkingTime(currentHoliday, currentGroup[0]) &&
          isNextDay(
            currentGroup[currentGroup.length - 1].date,
            currentHoliday.date
          )
        ) {
          currentGroup.push(currentHoliday);
        } else {
          result.push(currentGroup);
          currentGroup = [currentHoliday];
        }
      }
      // always confirm to push array when it gets to last item in an array
      if (index === holidayHours.length - 1) {
        result.push(currentGroup);
      }
      return currentGroup;
    },
    []
  );
  return result;
}

function sortAndFilterHolidayHours(
  holidayHours: HolidayHours[]
): HolidayHours[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return (
    holidayHours
      // filtering only special working hours that are in future
      .filter((current) => {
        const currentDate: Date = new Date(current.date);
        currentDate.setHours(0, 0, 0, 0);
        return currentDate.getTime() >= today.getTime();
      })
      .sort((current, next) => {
        const currentDay = new Date(current.date);
        const nextDay = new Date(next.date);
        return currentDay.getTime() - nextDay.getTime();
      })
  );
}

function formatHolidayHours(
  workingHours: WorkingHoursPerDay
): [string, string][] {
  if (!workingHours.holidayHours) {
    return [];
  }
  const { t } = useTranslation();
  const holidayHours = sortAndFilterHolidayHours(workingHours.holidayHours);

  const groupedHolidayHours = groupHolidayHours(holidayHours);

  return groupedHolidayHours.map((group: HolidayHours[]): [string, string] => {
    const firstInGroup: HolidayHours = group[0];
    let dateRange: string;
    if (group.length === 1) {
      dateRange = firstInGroup.date;
    } else {
      const lastInGroup = group[group.length - 1];
      dateRange = `${firstInGroup.date} - ${lastInGroup.date}`;
    }
    return [
      dateRange,
      !firstInGroup.isClosed && firstInGroup.openIntervals
        ? formatOpenIntervals(firstInGroup.openIntervals)
        : t('closed'),
    ];
  });
}

function workingHoursPerDayTemplate(dayName: string, hours: string) {
  const { t } = useTranslation();
  return (
    <>
      <li className="grid grid-cols-2 w-full pt-2 justify-center">
        <span className="text-left">{t(dayName)}</span>
        <span className="text-right whitespace-pre-line">{hours}</span>
      </li>
    </>
  );
}

type WorkingHours = {
  workingHours: WorkingHoursPerDay;
  additionalHoursText: string;
};

export const WorkingHours = (props: WorkingHours) => {
  const { workingHours, additionalHoursText = null } = props;
  const formattedWorkingHours = formatWorkingHours(workingHours);
  const formattedHolidayHours = formatHolidayHours(workingHours);
  const { t } = useTranslation();
  const workingHoursHtml = formattedWorkingHours.map(
    (day: [dayName: string, hours: string]) => {
      return workingHoursPerDayTemplate(`days.${day[0]}`, day[1]);
    }
  );

  const holidayHoursHtml = formattedHolidayHours.map(
    (day: [dayName: string, hours: string]) => {
      return workingHoursPerDayTemplate(day[0], day[1]);
    }
  );

  return (
    <>
      <section id="businesshours" className="flex">
        <div className="w-5/6 max-w-2xl mx-auto text-center">
          <h1 className="text-3xl lg:text-4xl pb-[1.2em] text-center">
            {t('ourOpeningTimes')}
          </h1>
          <ul className="justify-center">
            {workingHoursHtml}
            {holidayHoursHtml}
            {additionalHoursText && (
              <li className="pt-8 text-left">
                <span className="text-left">{additionalHoursText}</span>
              </li>
            )}
          </ul>
        </div>
      </section>
    </>
  );
};
