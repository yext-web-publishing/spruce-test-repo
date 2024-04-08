import * as React from 'react';
import { t } from 'i18next';

type SocialMediaLinksProps = {
  facebookPageUrl: string;
  instagramUsername: string;
  twitterUsername: string;
  linkedInUrl: string;
};

const TwitterElement = (twitterUsername: string) => {
  return (
    (twitterUsername && (
      <a
        href={`https://www.twiter.com/${twitterUsername}`}
        title={`${t('socialMedia.twitter.followUs')}`}
        aria-label=""
        target="_blank"
        className="flex items-center fa-size-reset ml-4"
        rel="noreferrer"
      >
        <i className="flex align-center fa-brands fa-twitter text-2xl"></i>
      </a>
    )) ||
    null
  );
};

const FacebookElement = (facebookPageUrl: string) => {
  return (
    (facebookPageUrl && (
      <a
        href={facebookPageUrl}
        title={`${t('socialMedia.facebook.visitUs')}`}
        aria-label=""
        target="_blank"
        className="flex items-center fa-size-reset"
        rel="noreferrer"
      >
        <i className="flex align-center fa-brands fa-facebook text-2xl"></i>
      </a>
    )) ||
    null
  );
};

const InstagramElement = (instagramUsernae: string) => {
  return (
    (instagramUsernae && (
      <a
        href={`https://www.instagram.com/${instagramUsernae}`}
        title={`${t('socialMedia.instagram.followUs')}`}
        aria-label=""
        target="_blank"
        className="flex items-center fa-size-reset ml-4"
        rel="noreferrer"
      >
        <i className="flex align-center fa-brands fa-instagram text-2xl"></i>
      </a>
    )) ||
    null
  );
};

const LinkedInElement = (linkedInUrl: string) => {
    return (
        (linkedInUrl && (
            <a
                href={linkedInUrl}
                title={`${t('socialMedia.linkedin.connectWithUs')}`}
                aria-label=""
                target="_blank"
                className="flex items-center fa-size-reset ml-4"
                rel="noreferrer"
            >
                <i className="flex align-center fa-brands fa-linkedin text-2xl"></i>
            </a>
        )) ||
        null
    );
};

const SocialMediaLinks = ({
  facebookPageUrl,
  instagramUsername,
  twitterUsername,
  linkedInUrl,
}: SocialMediaLinksProps) => {
  return (
    <div
      id="socialmedia"
      className="absolute z-10 right-5 top-[0.35rem] font-bold flex flex-row justify-end"
    >
      {FacebookElement(facebookPageUrl)}
      {TwitterElement(twitterUsername)}
      {InstagramElement(instagramUsername)}
      {LinkedInElement(linkedInUrl)}
    </div>
  );
};

export default SocialMediaLinks;
