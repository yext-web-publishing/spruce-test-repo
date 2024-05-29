/**
 * This is an example of how to create a static template that uses getStaticProps to retrieve data.
 */
import {
  GetHeadConfig,
  GetPath,
  HeadConfig,
  Template,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
} from '@yext/pages';
import { AnalyticsProvider } from '@yext/pages-components';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import '../assets/css/index.css';
import About from '../components/about';
import Banner from '../components/banner';
import Contact from '../components/contact';
import { LSMap } from '../components/map';
import PageLayout from '../components/page-layout';
import PhotoGallery from '../components/photo-gallery';
import { WorkingHours } from '../components/working-hours';
import '../translation/i18n';
import { ExternalImage } from '../types/ExternalImage';
import { EntityData } from '../types/entity';

/**
 * This allows the user to define a function which will take in their template
 * data and procude a HeadConfig object. When the site is generated, the HeadConfig
 * will be used to generate the inner contents of the HTML document's <head> tag.
 * This can include the title, meta tags, script tags, etc.
 */
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
}): HeadConfig => {
  return {
    title: document.name,
    charset: 'UTF-8',
    viewport: 'width=device-width, initial-scale=1',
    tags: [
      {
        type: 'meta',
        attributes: {
          description: 'This site was generated by the Yext SSG',
        },
      },
      {
        type: 'link',
        attributes: {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
      },
      {
        type: 'link',
        attributes: {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
        },
      },
      {
        type: 'link',
        attributes: {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;700&family=Montserrat:wght@500;700&display=swap',
        },
      },
      {
        type: 'script',
        attributes: {
          src: 'https://cdn.jsdelivr.net/npm/vanilla-lazyload@17.8.2/dist/lazyload.min.js',
        },
      },
      {
        type: 'script',
        attributes: {
          src: 'https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js',
        },
      },
    ],
  };
};

/**
 * Not required depending on your use case.
 */
export const config: TemplateConfig = {
  // The name of the feature. If not set the name of this file will be used (without extension).
  // Use this when you need to override the feature name.
  name: 'index',
  stream: {
    $id: 'index',
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      'id',
      'uid',
      'meta',
      'name',
      'address',
      'description',
      'hours',
      'slug',
      'geocodedCoordinate',
      'services',
      'additionalHoursText',
      'emails',
      'mainPhone',
      'tollFreePhone',
      'ttyPhone',
      'alternatePhone',
      'localPhone',
      'mobilePhone',
      'photoGallery',
      'logo',
      'paymentOptions',
      'twitterHandle',
      'instagramHandle',
      'facebookPageUrl',
      'linkedInUrl',
      'languages',
      'reservationUrl',
      'websiteUrl',
    ],
    // Defines the scope of entities that qualify for this stream.
    filter: {
      entityIds: ["YEXT_PUBLIC_ENTITY_ID"],
      // entityTypes: ['location'],
    },
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ['en', 'de', 'it', 'fr', 'rm'],
      primary: false,
    },
  },
};

/**
 * A local type for transformProps. This could live in src/types but it's generally
 * best practice to keep unshared types local to their usage.
 */
type ExternalImageData = TemplateProps & { externalImage: ExternalImage };

/**
 * Used to either alter or augment the props passed into the template at render time.
 * This function will be run during generation and pass in directly as props to the default
 * exported function.
 *
 * This can be used when data needs to be retrieved from an external (non-Knowledge Graph)
 * source. This example calls a public API and returns the data.
 *
 * If the page is truly static this function is not necessary.
 */

/**
 * Defines the path that the generated file will live at for production.
 *
 * NOTE: This currently has no impact on the local dev path. Local dev urls currently
 * take on the form: featureName/entityId
 */
export const getPath: GetPath<ExternalImageData> = () => {
  return 'index.html';
};

/**
 * This is the main template. It can have any name as long as it's the default export.
 * The props passed in here are the direct result from `getStaticProps`.
 */
const Static: Template<TemplateRenderProps> = ({
  document,
  __meta,
}: any & { document: EntityData }) => {
  const {
    name,
    address,
    hours,
    photoGallery,
    description,
    reservationUrl,
    logo,
    meta,
    emails = [],
    mainPhone,
    tollFreePhone,
    ttyPhone,
    alternatePhone,
    localPhone,
    mobilePhone,
    paymentOptions,
    twitterHandle: twitterUsername,
    instagramHandle: instagramUsername,
    facebookPageUrl,
    linkedInUrl: linkedInUrl,
    additionalHoursText,
    languages,
    websiteUrl,
  } = document as EntityData;

  const { i18n } = useTranslation();
  i18n.changeLanguage(meta.locale);

  const heroImage =
    Array.isArray(photoGallery) && photoGallery ? photoGallery[0] : undefined;

  // filtering phones because some of them could be undefined
  const phones = [
    mainPhone,
    localPhone,
    mobilePhone,
    alternatePhone,
    tollFreePhone,
    ttyPhone,
  ].filter((phone) => phone != undefined && phone.length > 0);

  const analyticsTemplateData: TemplateProps = { document, __meta };

  const extraText = "Dang";
  if (YEXT_PUBLIC_ENTITY_ID) {
    extraText = YEXT_PUBLIC_ENTITY_ID;
  }
  return (
    <>
      <AnalyticsProvider templateData={analyticsTemplateData}>
        <div className="zebra">
          {extraText}
          <PageLayout
            images={photoGallery as []}
            mainPhone={mainPhone}
            contact={{
              phones,
              emails,
            }}
            logo={logo}
            workingHours={hours}
            locale={meta.locale}
            socialMedia={{
              facebookPageUrl,
              instagramUsername,
              twitterUsername,
              linkedInUrl,
            }}
            websiteUrl={websiteUrl}
          >
            <Banner
              siteName={name}
              reservationUrl={reservationUrl}
              heroImage={heroImage}
            ></Banner>
            {description && <About description={description}></About>}
            {photoGallery && photoGallery.length > 0 && (
              <PhotoGallery photoGallery={photoGallery}></PhotoGallery>
            )}
            <Contact
              contactDetails={{ address, phones, emails, companyName: name }}
              paymentOptions={paymentOptions}
              languages={languages}
            ></Contact>
            {hours && (
              <WorkingHours
                additionalHoursText={additionalHoursText}
                workingHours={hours}
              ></WorkingHours>
            )}
            <LSMap address={address} name={name}></LSMap>
          </PageLayout>
        </div>
      </AnalyticsProvider>
    </>
  );
};

export default Static;
