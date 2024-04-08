import { WorkingHoursPerDay } from './working-hours';

export type ReservationUrl = {
  displayUrl: string;
  preferDisplayUrl: boolean;
  url: string;
};

export type Image = {
  image: {
    url: string;
    height: number;
    width: number;
  };
};

export enum EntityType {
  Location = 'location',
}

export type Address = {
  city: string;
  countryCode: string;
  line1: string;
  postalCode: string;
  region: string;
  localizedCountryName?: string;
  localizedRegionName?: string;
  line2?: string;
};

export type WebsiteUrl = {
  url: string;
  displayUrl: string;
  preferDisplayUrl: boolean;
};

export type EntityData = {
  name: string;
  address: Address;
  hours: WorkingHoursPerDay;
  additionalHoursText: string;
  mainPhone: string;
  tollFreePhone: string;
  ttyPhone: string;
  alternatePhone: string;
  localPhone: string;
  mobilePhone: string;
  photoGallery: Image[];
  description: string;
  reservationUrl: ReservationUrl;
  logo: Image;
  emails?: string[];
  meta: {
    entityType: {
      id: EntityType;
      uid: number;
    };
    locale: string;
  };
  paymentOptions: string[];
  twitterHandle: string;
  instagramHandle: string;
  facebookPageUrl: string;
  linkedInUrl: string;
  languages?: string[];
  websiteUrl: WebsiteUrl;
};
