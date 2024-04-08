import * as React from 'react';
import { WebsiteUrl } from '../types/entity';
import { WorkingHoursPerDay } from '../types/working-hours';
import Footer from './footer';
import Header from './header';
import OpenedIndicator from './opened-indicator';

type PageLayoutProps = {
  children?: React.ReactNode;
  images: [];
  mainPhone: string;
  logo: any;
  workingHours: WorkingHoursPerDay;
  locale: string;
  socialMedia: {
    facebookPageUrl: string;
    instagramUsername: string;
    twitterUsername: string;
    linkedInUrl: string;
  };
  contact: {
    phones: string[];
    emails: string[];
  };
  websiteUrl: WebsiteUrl;
};

const PageLayout = ({
  children,
  images,
  mainPhone,
  contact,
  logo,
  workingHours,
  locale,
  socialMedia,
  websiteUrl,
}: PageLayoutProps) => {
  return (
    <div className="min-h-screen">
      {workingHours && (
        <OpenedIndicator
          workingHours={workingHours}
          socialMedia={socialMedia}
        ></OpenedIndicator>
      )}
      <Header
        images={images}
        phones={contact.phones}
        emails={contact.emails}
        mainPhone={mainPhone}
        logo={logo}
        websiteUrl={websiteUrl}
      />
      {children}
      <Footer locale={locale}></Footer>
      <a
        id="scrolltopBtn"
        href="#top"
        title="Nach oben"
        aria-label="Nach oben"
        className="fixed btn btn-primary btn-icon elevated flex justify-center items-center bottom-8 right-6 z-[1001]"
      >
        <i className="fa fa-chevron-up"></i>
      </a>
    </div>
  );
};

export default PageLayout;
