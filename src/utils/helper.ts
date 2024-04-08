export function formatPhoneNumber(phoneNumber: string): string {
  const groupSize = [3, 2, 3, 2, 2];
  groupSize.reduce((sum: number, groupNumber: number, index: number) => {
    sum += groupNumber;
    // adding index because length is increased by 1 with adding every new space
    const addAtIndex = sum + index;
    phoneNumber =
      phoneNumber.substring(0, addAtIndex) +
      ' ' +
      phoneNumber.substring(addAtIndex);
    return sum;
  }, 0);
  return phoneNumber;
}

/**
 * Get date in format that yext use for holidays
 * @param date
 * @returns Date in YYYY-MM-DD format
 */
export function getDateInYextFormat(date: Date): string {
  const day: number = date.getDate();
  const month: number = date.getMonth() + 1;
  const year: number = date.getFullYear();
  const dayFormatted: string = day >= 10 ? `${day}` : `0${day}`;
  const monthFormatted: string = month >= 10 ? `${month}` : `0${month}`;
  return `${year}-${monthFormatted}-${dayFormatted}`;
}
