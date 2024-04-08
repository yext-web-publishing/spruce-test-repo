import { t } from 'i18next';
import * as React from 'react';
import { Image } from '../types/Image';
import { ReservationUrl } from '../types/reservation-url';

export type Banner = {
  siteName: string;
  reservationUrl?: ReservationUrl;
  heroImage?: Image;
};

function getReservationUrl(
  reservationUrl: ReservationUrl | undefined
): string | null {
  let urlForReservation = null;
  if (reservationUrl) {
    if (reservationUrl.preferDisplayUrl) {
      urlForReservation = reservationUrl.displayUrl;
    } else {
      urlForReservation = reservationUrl.url;
    }
  }
  if (urlForReservation && urlForReservation.startsWith('https://yellow')) {
    urlForReservation = urlForReservation?.replace('yellow', 'www');
  }
  return urlForReservation;
}

const Banner = ({ siteName, reservationUrl, heroImage }: Banner) => {
  const urlForReservation = getReservationUrl(reservationUrl);

  return (
    <>
      <section className="p-0 no-zebra overflow-hidden">
        <div className="relative w-full">
          <div className="w-full">
            <div
              id="hero"
              className="hero-box bgfilter vignette dark:text-white grid grid-cols-1 content-center justify-items-center justify-center aspect-square sm:aspect-[2/1] max-h-[30rem] lg:max-h-[40rem]"
            >
              <div className="relative text-center mx-auto w-5/6">
                <h1 className="text-4xl lg:text-6xl text-shadow-[0_4px_12px_rgba(0,0,0,0.42)] p-2">
                  {siteName}
                </h1>
                <div>
                  {urlForReservation && (
                    <a
                      href={urlForReservation}
                      title={t('makeAnAppointment') as string}
                      aria-label={t('makeAnAppointment') as string}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center cta-primary btn btn-primary transition-all hover:scale-105 mt-5 sm:max-w-sm mx-auto"
                    >
                      <span className="pl-2">{t('makeAnAppointment')}</span>
                    </a>
                  )}
                </div>
              </div>
              <div className="hero-img-box absolute right-[-50%] left-[-50%] sm:right-0 sm:left-0 top-0 bottom-0 margin-auto overflow-hidden pointer-events-none z-[-1]">
                <img
                  data-src={heroImage?.image.url}
                  className="hero-img align-middle w-auto min-w-full min-h-full max-w-none h-full sm:w-full sm:h-auto"
                  src={heroImage?.image.url}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;
