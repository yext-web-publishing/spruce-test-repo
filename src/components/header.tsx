import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Image } from '@yext/pages-components';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { WebsiteUrl } from '../types/entity';
import { formatPhoneNumber } from '../utils/helper';

type Link = {
  label: string;
  href: string;
};

const links: Link[] = [
  {
    label: 'aboutUs',
    href: '#about',
  },
  {
    label: 'gallery',
    href: '#gallery',
  },
  {
    label: 'contact',
    href: '#contact',
  },
];

type Image = {
  image: {
    url: string;
    height: number;
    width: number;
  };
};

type Header = {
  images: [];
  mainPhone: string;
  phones: string[];
  emails: string[];
  description?: string;
  logo: Image;
  websiteUrl: WebsiteUrl;
};

const Header = (props: Header) => {
  const { images, mainPhone, description, logo, phones, emails, websiteUrl } =
    props;
  const { t } = useTranslation();
  let filteredLinks = links;
  const phoneHref = `tel:${mainPhone}`;
  if (!images || images.length === 0) {
    filteredLinks = links.filter((link) => link.href !== '#gallery');
  }
  if (description == null || description.length === 0) {
    filteredLinks = filteredLinks.filter((link) => link.href !== '#about');
  }
  const linkDoms = filteredLinks.map((link) => (
    <li key={link.label} className="nav-item-li" aria-hidden="false">
      <a
        className="nav-item menuToggle jsToggle a-primary lg:mr-4"
        href={link.href}
        rel="noreferrer"
        title={t(`${link.label}`) as string}
        aria-label={t(`${link.label}`) as string}
      >
        {t(`${link.label}`)}
      </a>
    </li>
  ));

  useEffect(() => {
    const btn = document.querySelectorAll('.menuToggle');
    const body = document.querySelector('body') as HTMLBodyElement;
    const header = document.getElementById('header') as HTMLElement;
    let lastScrollTop = 0;
    const offset = header.offsetTop;

    const getTopY = function () {
      return window.pageYOffset || document.documentElement.scrollTop;
    };

    /*---
Since we don't know the responsive breakpoints, we check if '#opnBtn' is hidden to detect "destop mode"
---*/
    const responsiveMode = function () {
      return document.getElementById('openBtn') != null;
    };

    for (let i = 0; i < btn.length; i++) {
      btn[i].addEventListener('click', function () {
        if (responsiveMode() == false) {
          // Reset body styles
          document.documentElement.classList.remove('scroll-auto');
          body.classList.remove('menu-open');
          body.style.position = '';
          body.style.paddingTop = '';
          body.style.top = '';
          return false;
        } else {
          body.classList.toggle('menu-open');
          /*---
      UX Fix: Setting BODY to 'fixed' to prevent scrolling during open menu/modal causes former to unintentional scroll to top. 
      This will NOT be omitted here.
      Instead, add/remove class to switch between scrolling behaviour 'smooth':'auto' in CSS. This allows A) simple open-close of menu, while B) making use of browser's built-in smooth scrolling feature when clicking a menu item, depending on user's intent.
      ---*/
          if (body.classList.contains('uiBtn') == true) {
            document.documentElement.classList.add('scroll-auto');
          } else {
            document.documentElement.classList.remove('scroll-auto');
          }
          /*--- End: UX Fix ---*/
          const topY = getTopY();
          if (document.body.classList.contains('menu-open') == true) {
            body.style.position = 'fixed';
            body.style.top = topY * -1 + 'px';
          } else {
            const scrollY = document.body.style.top;
            body.style.position = '';
            body.style.top = '';
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
          }
        }
      });
    }

    function showHideNav() {
      const st = window.pageYOffset || document.documentElement.scrollTop;
      const totalHeight = header.offsetHeight + offset;

      if (st < totalHeight) {
        body.classList.remove('scrolled', 'scrolled-up', 'scrolled-down');
      } else if (st > lastScrollTop) {
        body.classList.add('scrolled', 'scrolled-down');
        body.classList.remove('scrolled-up');
      } else {
        body.classList.add('scrolled', 'scrolled-up');
        body.classList.remove('scrolled-down');
      }
      lastScrollTop = st <= 0 ? 0 : st;
    }

    function debounce(func: () => void, timeout = 200) {
      let timer: number;

      return (...args: any[]) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(showHideNav, args as []);
        }, timeout);
      };
    }

    const scrollChange = debounce(() => showHideNav());
    window.addEventListener('scroll', scrollChange);
  });

  let urlForLogo = '';
  if (websiteUrl) {
    urlForLogo = websiteUrl.preferDisplayUrl
      ? websiteUrl.displayUrl
      : websiteUrl.url;
  }
  return (
    <>
      <header id="header">
        <div className="row">
          <div className="w-5/6 2xl:w-full mx-auto flex items-center justify-between min-h-[8rem]">
            <div className="w-2/5 lg:w-1/5 md:w-2/5">
              {logo && (
                <a
                  href={urlForLogo}
                  title={t('home') as string}
                  aria-label={t('home') as string}
                  className="logo-container"
                  style={{ display: 'none' }}
                >
                  <Image
                    className="logo"
                    image={logo.image}
                    aria-label="Logo"
                  />
                </a>
              )}
            </div>
            <div className="w-3/5 md:w-3/5 lg:w-4/5 text-end flex-col">
              <button
                id="openBtn"
                className="fixed top-[4.5rem] sm:top-[8rem] right-6 z-1 btn-icon uiBtn menuToggle jsToggle btn-white lg:hidden"
                title={t('openMenu') as string}
                aria-label={t('openMenu') as string}
              >
                <FontAwesomeIcon icon={faBars} />
              </button>
              <nav
                id="nav"
                className="fixed css-transition-nav text-2xl sm:text-base z-[2000] right-0 top-0 bottom-0 pt-20 pl-5 pr-5 md:p-10 md:pt-20 md:left-auto lg:p-0 lg:pl-16 w-full sm:left-auto sm:w-1/2 lg:w-full lg:pt-0 lg:static"
              >
                <button
                  id="closeBtn"
                  className="fixed top-6 right-6 z-10 btn-icon uiBtn menuToggle jsToggle lg:hidden"
                  title={t('closeMenu') as string}
                  aria-label={t('closeMenu') as string}
                  aria-hidden="true"
                >
                  <i className="fa fa-xmark"></i>
                </button>

                <ul
                  id="menu"
                  className="flex flex-col lg:flex-row top-0 right-0 pt-4 lg:pt-0 w-full lg:w-full lg:flex"
                >
                  {linkDoms}
                </ul>
                <ul className="cta-list pt-[8rem] lg:hidden">
                  <li>
                    <a
                      href={`https://www.local.ch/d/${
                        import.meta.env.YEXT_PUBLIC_ENTITY_ID
                      }#open-booking`}
                      title={t('makeAnAppointment') as string}
                      aria-label={t('makeAnAppointment') as string}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center cta-primary btn btn-primary transition-all hover:scale-105 mt-5 mx-auto"
                    >
                      <span className="pl-2">{t('makeAnAppointment')}</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={phoneHref}
                      title={mainPhone}
                      aria-label={mainPhone}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center cta-primary btn btn-primary transition-all hover:scale-105 mt-5 mx-auto"
                    >
                      <i className="flex align-center fa fa-phone text-2xl"></i>
                      <span className="pl-2">{mainPhone}</span>
                    </a>
                  </li>
                </ul>
              </nav>
              <div
                id="overlay"
                className="jsToggle menuToggle hidden menu-cancel fixed top-0 bottom-0 left-0 right-[0] md:right-[50vw] z-[1999]"
              ></div>
            </div>
            <div className="top-0 bottom-0 flex flex-col justify-center justify-items-center items-end text-sm invisible xl:visible">
              {phones &&
                phones.reduce(
                  (result: JSX.Element[], phone, index): JSX.Element[] => {
                    const formattedPhoneNumber = formatPhoneNumber(phone);

                    return [
                      ...result,
                      <a
                        key={`${phone}-${index}`}
                        href={`tel:${phone}`}
                        title={formattedPhoneNumber}
                        aria-label={formattedPhoneNumber}
                        target="_blank"
                        className="flex items-center whitespace-nowrap fa-size-reset"
                        rel="noreferrer"
                      >
                        <span className="pl-2">{formattedPhoneNumber}</span>
                      </a>,
                    ];
                  },
                  [] as JSX.Element[]
                )}
              {emails &&
                emails.reduce(
                  (result: JSX.Element[], email, index): JSX.Element[] => [
                    ...result,
                    <a
                      key={`${email}-${index}`}
                      href={`mailto:${email}`}
                      title={email}
                      aria-label={email}
                      target="_blank"
                      className="flex items-center whitespace-nowrap fa-size-reset"
                      rel="noreferrer"
                    >
                      <span className="pl-2">{email}</span>
                    </a>,
                  ],
                  [] as JSX.Element[]
                )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
