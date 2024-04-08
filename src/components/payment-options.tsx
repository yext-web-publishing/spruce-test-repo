import { t } from 'i18next';
import * as React from 'react';

const PUBLIC_BUCKET_URL =
  'https://bin.staticlocal.ch/publishers-logo-provider/';

type PaymentOptionsProps = {
  paymentOptions: string[];
};

const PaymentOptions = (props: PaymentOptionsProps) => {
  /**
   * Render list of image components based on the provided provider names.
   */
  return (
    <>
      <section className="flex pb-0 pt-12">
        <div className="w-5/6 max-w-2xl mx-auto text-center">
          <h3 className="pb-[1.2em]">{t('paymentOptions')}</h3>
          <ul className="paymenticons w-full mx-auto">
            {props.paymentOptions.map((paymentOption, index) => (
              <li key={`${paymentOption}-${index}`}>
                <img
                  src={`${PUBLIC_BUCKET_URL}${paymentOption}.svg`}
                  className="icon"
                  width={40}
                  title={paymentOption}
                  alt={paymentOption}
                ></img>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default PaymentOptions;
