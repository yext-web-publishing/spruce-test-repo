// src/template/404.tsx
import {
    TemplateProps,
    TemplateRenderProps,
    GetHeadConfig,
    GetPath,
    Template,
  } from "@yext/pages";
  import * as React from "react";
  import '../assets/css/404.css';
  
  // The path must be exactly 404.html
  export const getPath: GetPath<TemplateProps> = () => {
    return "404.html";
  };

  
  // Add a title to the page
  export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = () => {
    return {
      title: "Page Not Found",
    };
  };
  
  // Template that will show as the page
  const FourOhFour: Template<TemplateRenderProps> = () => {
    return (
        <div className="wrapper-fof">
            <div className="fof">
                <h1>404</h1>
                <h1 className="page-not-found">Page not found</h1>
            </div>
        </div>
    );
  };
  
  export default FourOhFour;