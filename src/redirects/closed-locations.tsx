import {
  RedirectConfig,
  TemplateProps,
  GetDestination,
  GetSources,
} from "@yext/pages";

export const config: RedirectConfig = {
  stream: {
    $id: "closed-location-redirects",
    fields: ["id", "address", "name"],
    filter: {
      entityTypes: ["location"],
    },
    localization: {
      locales: ["en"]
    }
  },
};

/**
 * Defines the URL to redirect the source paths to.
 */
export const getDestination: GetDestination<TemplateProps> = ({ document }) => {
  return `destination/${document.locale}/${document.id.toString()}`;
};


/**
 * Defines a list of redirect source objects, which will redirect to the URL created by getDestination.
 */
export const getSources: GetSources<TemplateProps> = ({ document }) => {
  return [
    {
      "source": `closed/${document.locale}/${document.id.toString()}`,
      "status": 301
    },
    {
      "source": `extraClosed/${document.locale}/${document.id.toString()}`,
      "status": 308
    },
  ];
};
