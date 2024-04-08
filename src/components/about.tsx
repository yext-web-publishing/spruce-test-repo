import { t } from 'i18next';
import * as React from 'react';

type About = {
  description: string;
};

const About = (props: About) => {
  const { description } = props;
  return (
    <>
      <section id="about" className="flex">
        <div className="w-5/6 max-w-2xl mx-auto">
          <h1 className="text-3xl lg:text-4xl pb-[1.2em] text-center">
            {t('aboutUs')}
          </h1>
          <p className="description">{description}</p>
        </div>
      </section>
    </>
  );
};

export default About;
