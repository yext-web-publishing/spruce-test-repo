import { t } from 'i18next';
import * as React from 'react';

type LanguagesProps = {
  languages: string[];
};

const Languages = (props: LanguagesProps) => {
  const { languages } = props;
  return (
    <>
      <section className="flex pb-0 pt-12">
        <div className="w-5/6 max-w-2xl mx-auto">
          <h3 className="pb-[1.2em] text-center">{t('languages')}</h3>
          <ul className="w-full mx-auto languages-holder">
            {languages.map((language) => {
              return (
                <>
                  <li className="sm:w-6/6 md:w-3/6 lg:w-2/6">
                    <i className="fa fa-check-circle"></i>
                    <span className="opennow pl-1">{language}</span>
                  </li>
                </>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
};

export default Languages;
