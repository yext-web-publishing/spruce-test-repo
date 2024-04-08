import * as React from 'react';
import {
  HolidayHours,
  OpenClosedDay,
  OpenedIndicatorEnum,
  OpenInterval,
  orderedDays,
  WorkingHoursPerDay,
} from '../types/working-hours';
import { getDateInYextFormat } from '../utils/helper';
import OpenedIndicatorText from './opened-indicator-text';
import SocialMediaLinks from './social-media-links';

type OpenedIndicatorProps = {
  workingHours: WorkingHoursPerDay;
  socialMedia: {
    facebookPageUrl: string;
    instagramUsername: string;
    twitterUsername: string;
    linkedInUrl: string;
  };
};

function isCurrentlyOpened(workingHours: WorkingHoursPerDay): boolean {
  if (isHolidayToday(workingHours)) {
    return isOpenedOnHolidayToday(workingHours);
  }
  const todayDayName = getCurrentDayName();
  return isOpenedToday(workingHours[todayDayName]);
}

function getCurrentDayName(): string {
  const currentDate = new Date();
  const todayIndex = currentDate.getDay();
  // doing this calculation because `getDay()` starts from Sunday, and ordered list from Monday
  const todayDayName = orderedDays[(todayIndex + 6) % 7];
  return todayDayName;
}

function isOpenedOnHolidayToday(workingHours: WorkingHoursPerDay): boolean {
  if (!workingHours.holidayHours) {
    return false;
  }
  const holidayHoursForToday = getHolidayWorkingHoursForToday(
    workingHours.holidayHours
  );
  if (!holidayHoursForToday) {
    return false;
  }
  return isOpenedToday(holidayHoursForToday);
}

function getHolidayWorkingHoursForToday(
  holidayHours: HolidayHours[]
): HolidayHours | undefined {
  const todayDate = getDateInYextFormat(new Date());
  return holidayHours.find((holiday) => {
    return holiday.date === todayDate;
  });
}

function isHolidayToday(workingHours: WorkingHoursPerDay): boolean {
  if (!workingHours.holidayHours) {
    return false;
  }
  const todayDate = getDateInYextFormat(new Date());
  const indexOfTodayHoliday = workingHours.holidayHours.findIndex((holiday) => {
    return holiday.date === todayDate;
  });
  return indexOfTodayHoliday != undefined && indexOfTodayHoliday > -1;
}

function isOpenedToday(workingDay: OpenClosedDay): boolean {
  if (workingDay.isClosed) {
    return false;
  }
  const currentDate = new Date();
  const index = workingDay.openIntervals.findIndex((interval: OpenInterval) => {
    const startTime = getDateWithTime(interval.start);
    const endTime = getDateWithTime(interval.end);
    if (endTime.getTime() < startTime.getTime()) {
      endTime.setTime(endTime.getTime() + 24 * 60 * 60 * 1000);
    }
    return (
      currentDate.getTime() >= startTime.getTime() &&
      currentDate.getTime() < endTime.getTime()
    );
  });
  return index != undefined && index > -1;
}

function getOpenedIndicatorEnum(
  workingHours: WorkingHoursPerDay
): OpenedIndicatorEnum {
  if (isCurrentlyOpened(workingHours)) {
    return OpenedIndicatorEnum.Opened;
  } else if (isOpeningSoon(workingHours)) {
    return OpenedIndicatorEnum.OpeningSoon;
  } else {
    return OpenedIndicatorEnum.Closed;
  }
}

/**
 * Set specific time to current date
 * @param time Time is in format HH:mm
 */
function getDateWithTime(time: string): Date {
  const date = new Date();
  const [hours, minutes] = time.split(':');
  date.setHours(+hours);
  date.setMinutes(+minutes);
  date.setSeconds(0);
  return date;
}

function isOpeningSoonToday(workingDay: OpenClosedDay): boolean {
  if (workingDay.isClosed) {
    return false;
  }
  const currentDate = new Date();
  const index = workingDay.openIntervals.findIndex((interval: OpenInterval) => {
    const startTime = getDateWithTime(interval.start);
    // reducing time for 30 min, because we show opening soon indicator only if it less than 30 min until opening
    const openingSoon = new Date(startTime.getTime() - 30 * 60 * 1000);
    if (startTime.getTime() < openingSoon.getTime()) {
      startTime.setTime(startTime.getTime() + 24 * 60 * 60 * 1000);
    }
    return (
      currentDate.getTime() >= openingSoon.getTime() &&
      currentDate.getTime() < startTime.getTime()
    );
  });
  return index != undefined && index > -1;
}

function isOpeningSoon(workingHours: WorkingHoursPerDay): boolean {
  if (isHolidayToday(workingHours)) {
    const todayHours = getHolidayWorkingHoursForToday(
      workingHours.holidayHours as HolidayHours[]
    );
    return isOpeningSoonToday(todayHours as HolidayHours);
  }
  const todayDayName = getCurrentDayName();
  return isOpeningSoonToday(workingHours[todayDayName]);
}

const OpenedIndicator = ({
  workingHours,
  socialMedia,
}: OpenedIndicatorProps) => {
  const openedIndicator = getOpenedIndicatorEnum(workingHours);

  return (
    <div
      id="opennow"
      className="open-now top-0 w-full text-sm bg-marker hover:bg-markerHover p-3 transition-[background-color]"
    >
      <SocialMediaLinks
        facebookPageUrl={socialMedia.facebookPageUrl}
        twitterUsername={socialMedia.twitterUsername}
        instagramUsername={socialMedia.instagramUsername}
        linkedInUrl={socialMedia.linkedInUrl}
      />
      <div className="mx-auto w-full lg:text-center">
        <OpenedIndicatorText
          openedIndicator={openedIndicator}
        ></OpenedIndicatorText>
      </div>
    </div>
  );
};

export default OpenedIndicator;
