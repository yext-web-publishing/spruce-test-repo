/**
 * This is an example of how to create an entity redirect set that makes use of streams data.
 * The stream data originates from Yext's Knowledge Graph. When a redirect set in
 * concert with a stream is built by the Yext Sites system, a set of redirects
 * are generated for every corresponding stream document stream document (based on the filter).
 */

import {
  GetDestination,
  GetSources,
  TemplateConfig,
  TemplateProps,
} from "@yext/pages";
import * as React from "react";
import "../index.css";

/**
 * Required when Knowledge Graph Stream is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "my-redirect-stream-id",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: ["id", "name", "slug"],
    // Defines the scope of entities that qualify for this stream.
    filter: {
      entityTypes: ["location"],
    },
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

/**
 * Defines the URL to redirect the source paths to.
 */
export const getDestination: GetDestination<TemplateProps> = ({ document }) => {
  return `${document.slug}`;
};


/**
 * Defines a list of redirect source objects, which will redirect to the URL created by getDestination.
 */
export const getSources: GetSources<TemplateProps> = ({ document }) => {
  return [
     {
        "source": `alternate-source-${document.id}`,
        "status": 301
     },
 ];
};
