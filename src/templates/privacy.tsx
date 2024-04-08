/**
 * This is an example of how to create a static template that uses getStaticProps to retrieve data.
 */
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
import '../assets/css/privacy.css';
import '../translation/i18n';
import { ExternalImage } from '../types/ExternalImage';
import { EntityData } from '../types/entity';
import {
  ParagraphType,
  PrivacySection,
  SectionParagraph,
} from '../types/privacy-translation';

/**
 * This allows the user to define a function which will take in their template
 * data and procude a HeadConfig object. When the site is generated, the HeadConfig
 * will be used to generate the inner contents of the HTML document's <head> tag.
 * This can include the title, meta tags, script tags, etc.
 */
export const getHeadConfig: GetHeadConfig<
  TemplateRenderProps
> = (): HeadConfig => {
  return {
    title: 'Privacy statement',
    charset: 'UTF-8',
    viewport: 'width=device-width, initial-scale=1',
    tags: [
      {
        type: 'meta',
        attributes: {
          description: 'Privacy statement',
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
  name: 'privacy',
  stream: {
    $id: 'privacy',
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      'name',
      'address',
      'slug',
      'emails',
      'mainPhone',
      'tollFreePhone',
      'ttyPhone',
      'alternatePhone',
      'localPhone',
      'mobilePhone',
      'logo',
      'languages',
    ],
    // Defines the scope of entities that qualify for this stream.
    filter: {
      entityIds: [import.meta.env.YEXT_PUBLIC_ENTITY_ID],
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
  return 'privacy.html';
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
    meta,
    mainPhone,
    tollFreePhone,
    ttyPhone,
    alternatePhone,
    localPhone,
    mobilePhone,
    name,
    address,
    emails = [],
  } = document as EntityData;

  const { i18n, t } = useTranslation();
  i18n.changeLanguage(meta.locale);

  // filtering phones because some of them could be undefined
  const phones = [
    mainPhone,
    localPhone,
    mobilePhone,
    alternatePhone,
    tollFreePhone,
    ttyPhone,
  ].filter((phone) => phone != undefined && phone.length > 0);
  const phoneNumber = phones[0];
  const formattedAddress = address
    ? `${address.line1}, ${address.postalCode} ${address.city}`
    : undefined;
  const analyticsTemplateData: TemplateProps = { document, __meta };
  const mainEmail = emails[0];
  const contactData = (
    <>
      <div className="section-content">
        <i>
          {name && (
            <p>
              {t('privacy.companyName')}: {name}
            </p>
          )}
          {formattedAddress && (
            <p>
              {t('privacy.address')}: {formattedAddress}
            </p>
          )}
          {phoneNumber && (
            <p>
              {t('privacy.phone')}: {phoneNumber}
            </p>
          )}
          {mainEmail && (
            <p>
              {t('privacy.email')}: {mainEmail}
            </p>
          )}
        </i>
      </div>
    </>
  );

  // TODO: define type
  const sectionsTranslations: PrivacySection[] = t('privacy.sections', {
    returnObjects: true,
  });

  // sorting just in case that object is not returned with proper order of objects
  sectionsTranslations.sort(
    (section1, section2) => section1.order - section2.order
  );

  function parseSectionAsHtmlBlock(section: PrivacySection) {
    return (
      <>
        <h2>{section.title}</h2>
        <div className="section-content">
          {...parseSectionParagraphsAsHtml(section.paragraphs)}
        </div>
      </>
    );
  }

  function parseSectionParagraphsAsHtml(paragraphs: SectionParagraph[]): any[] {
    return paragraphs
      .sort((p1, p2) => p1.order - p2.order)
      .map((paragraph) => {
        switch (paragraph.type) {
          case ParagraphType.Subtitle:
            return (
              <>
                <h3>{paragraph.content}</h3>
              </>
            );
          case ParagraphType.SubmenuItem:
            return (
              <>
                <li>{paragraph.content}</li>
              </>
            );
          case ParagraphType.Text:
            return (
              <>
                <p>{paragraph.content}</p>
              </>
            );
          case ParagraphType.Submenu: {
            const submenuItemsAsHtml = parseSectionParagraphsAsHtml(
              paragraph.content
            );
            return (
              <>
                <ul>
                  {submenuItemsAsHtml.map((submenu) => {
                    return <>{submenu}</>;
                  })}
                </ul>
              </>
            );
          }
          default:
            console.error(`Unsupported translation's paragraph block`);
            break;
        }
      });
  }

  function sectionWithContactData(section: PrivacySection) {
    return (
      <>
        {parseSectionAsHtmlBlock(section)}
        {contactData}
      </>
    );
  }

  const sectionsAsHtml = sectionsTranslations.map((section, i) => {
    if (i === 1) {
      return sectionWithContactData(section);
    }
    return parseSectionAsHtmlBlock(section);
  });

  return (
    <>
      <AnalyticsProvider templateData={analyticsTemplateData}>
        <div className="back-button-wrapper">
          <a className="back-button" href="/">
            <FontAwesomeIcon icon={faAngleLeft} />
            <span>{t('privacy.back')}</span>
          </a>
        </div>
        <h1>
          <span>{t('privacy.title')}</span>
        </h1>
        {...sectionsAsHtml}
        <div className="empty-footer"></div>
      </AnalyticsProvider>
    </>
  );
};

export default Static;
