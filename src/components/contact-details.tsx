import { t } from 'i18next';
import * as React from 'react';
import { Address } from '../types/address';
import { formatPhoneNumber } from '../utils/helper';

type Contact = {
  address: Address;
  companyName: string;
  /**
   * Can contain undefined values
   */
  phones: string[];
  emails: string[];
};

type ContactDetailsProps = {
  contact: Contact;
};

const ContactDetails = (props: ContactDetailsProps) => {
  const {
    contact: { address, phones, emails, companyName },
  } = props;

  const navigationUrl = encodeURI(
    `https://map.search.ch/${companyName}, ${address.line1}, ${address.postalCode} ${address.city}`
  );

  return (
    <>
      <div className="w-5/6 max-w-2xl mx-auto row text-center">
        <h1 className="text-3xl lg:text-4xl pb-[1.2em] text-center">
          {t('contact')}
        </h1>
        <ul className="text-center w-full mx-auto">
          <li className="w-full">{companyName}</li>

          <li className="w-full">{address.line1}</li>

          <li className="w-full">
            {address.postalCode} {address.city}
          </li>
        </ul>
        {(phones.length > 0 || emails.length > 0) && (
          <ul className="text-center w-full mx-auto mt-2">
            {phones.map((phone, index) => (
              <li className="w-full" key={`${phone}-${index}`}>
                <a className="text-primary" href={`tel:${phone}`}>
                  {phone ? formatPhoneNumber(phone) : ''}
                </a>
              </li>
            ))}
            {emails.map((email, index) => (
              <li className="w-full" key={`${email}-${index}`}>
                <a className="text-primary" href={`mailto:${email}`}>
                  {email}
                </a>
              </li>
            ))}
          </ul>
        )}
        <a
          className="btn btn-primary inline-block mt-4"
          href={navigationUrl}
          target="_blank"
          rel="noreferrer"
          title={t('howToFindUs') as string}
        >
          {t('howToFindUs')}
        </a>
      </div>
    </>
  );
};

export default ContactDetails;
