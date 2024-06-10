import { Template, TemplateRenderProps } from "@yext/pages";
import Banner from "../components/Banner";
import PageLayout from "../components/PageLayout";
import "../index.css";

const FourOhFour: Template<TemplateRenderProps> = () => {
  return (
    <>
      <PageLayout>
        <Banner name={"404 - Page not found"} />
        <div className="centered-container">
          <div className="flex justify-center items-center text-2xl bg-gray-200 h-60 rounded-md shadow-md">
            <p>This page does not exist.</p>
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default FourOhFour;
