import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { OpenedIndicatorEnum } from '../types/working-hours';

type OpenedIndicatorTextProps = {
  openedIndicator: OpenedIndicatorEnum;
};

function getTranslationKey(openedIndicator: OpenedIndicatorEnum): string {
  switch (openedIndicator) {
    case OpenedIndicatorEnum.Opened:
      return 'openedIndicator.weAreOpened';
    case OpenedIndicatorEnum.OpeningSoon:
      return 'openedIndicator.openingSoon';
    case OpenedIndicatorEnum.Closed:
      return 'openedIndicator.closed';
    default:
      return '';
  }
}

const OpenedIndicatorText = ({ openedIndicator }: OpenedIndicatorTextProps) => {
  const { t } = useTranslation();
  return (
    <div>
      <span className="pl-1">{t(getTranslationKey(openedIndicator))}</span>
    </div>
  );
};

export default OpenedIndicatorText;
