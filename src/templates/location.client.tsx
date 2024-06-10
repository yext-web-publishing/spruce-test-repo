import { Template, TemplateRenderProps } from "@yext/pages";
import About from "../components/About";
import Banner from "../components/Banner";
import BreadCrumbs from "../components/Breadcrumbs";
import Details from "../components/Details";
import Hours from "../components/Hours";
import PageLayout from "../components/PageLayout";
import "../index.css";

const Location: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  document,
}) => {
  const {
    name,
    address,
    hours,
    mainPhone,
    services,
    description,
  } = document;

  return (
    <>
      <PageLayout>
        <Banner name={name} address={address} />
        <div className="centered-container">
          <BreadCrumbs
            baseUrl={relativePrefixToRoot}
          />
          <div className="grid gap-x-10 gap-y-10 md:grid-cols-2">
            <Details address={address} phone={mainPhone} services={services} />
            {hours && <Hours title={"Restaurant Hours"} hours={hours} />}
            {description && <About name={name} description={description} />}
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default Location;
