import * as React from 'react';
import { useTranslation } from 'react-i18next';
import deBanner from '../assets/img/ls_service_banner_de.svg';
import enBanner from '../assets/img/ls_service_banner_en.svg';
import frBanner from '../assets/img/ls_service_banner_fr.svg';
import itBanner from '../assets/img/ls_service_banner_it.svg';

type Footer = {
  locale: string;
};

function getBanner(locale: string) {
  switch (locale) {
    case 'de':
      return deBanner;
    case 'en':
      return enBanner;
    case 'it':
      return itBanner;
    case 'fr':
      return frBanner;
    default:
      return deBanner;
  }
}

const Footer = ({ locale }: Footer) => {
  const { t } = useTranslation();
  const footerImageUrl = getBanner(locale);
  return (
    <footer className="footer py-12 w-full">
      <div className="row">
        <div className="grid  grid-cols-1 md:grid-cols-6 gap-1">
          <div className="col-span-6 md:col-span-4 lg:col-span-5 w-full">
            <div className="w-full text-center">
              <img
                className="md:w-2/4 max-w-[300px] mx-auto"
                src={footerImageUrl}
                alt="Powered by localsearch MyWEBSITE"
              />
            </div>
          </div>
          <div className="col-span-6 md:col-span-2 lg:col-span-1 text-center align-middle h-8 mt-4 md:mt-0">
            <a
              className="w-full text-center h-8 leading-8"
              href="/privacy.html"
            >
              {t('privacy.title')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
