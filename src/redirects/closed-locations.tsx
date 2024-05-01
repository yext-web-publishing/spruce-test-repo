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
      entityIds: ["location5"],
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
  return `location5`;
};


/**
 * Defines a list of redirect source objects, which will redirect to the URL created by getDestination.
 */

export const getSources: GetSources<TemplateProps> = ({ document }) => {
  return [
    {
      "source": `${document.address.city}`,
      "status": 302
    },
    {
      "source": `${document.name}`,
      "status": 302
    },
  ];
};
