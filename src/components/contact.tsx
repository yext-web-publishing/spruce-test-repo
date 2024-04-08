import * as React from 'react';
import { Address } from '../types/address';
import ContactDetails from './contact-details';
import Languages from './languages';
import PaymentOptions from './payment-options';

type ContactProps = {
  contactDetails: {
    address: Address;
    phones: string[];
    companyName: string;
    emails: string[];
  };
  paymentOptions?: string[];
  languages?: string[];
};

const Contact = (props: ContactProps) => {
  const { contactDetails, paymentOptions, languages } = props;
  return (
    <>
      <section id="contact" className="flex flex-col">
        <ContactDetails contact={contactDetails} />
        {paymentOptions && <PaymentOptions paymentOptions={paymentOptions} />}
        {languages && <Languages languages={languages}></Languages>}
      </section>
    </>
  );
};

export default Contact;
