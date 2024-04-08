import { Image } from '@yext/pages-components';
import { useState } from 'react';
import FsLightbox from 'fslightbox-react';
import { t } from 'i18next';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const FsLightboxGallery = FsLightbox.default ? FsLightbox.default : FsLightbox;

type Thumbnail = {
  height: number;
  width: number;
  url: string;
};

type Image = {
  image: {
    height?: number;
    width?: number;
    url: string;
    thumbnails?: Thumbnail[];
  };
};

type PhotoGallery = {
  photoGallery: any[];
};

const PhotoGallery = (props: PhotoGallery) => {
  const [lightboxController, setLightboxController] = useState({
    toggler: false,
    slide: 1
  });
  const { photoGallery } = props;

  function openLightboxOnSlide(number) {
    setLightboxController({
      toggler: !lightboxController.toggler,
      slide: number
    });
  }

  const photoGalleryImages = photoGallery.map((imageData) => 
     <div style={{ width: `${imageData.image.width}px`, height: `${imageData.image.height}px`, 'max-width': '100%', 'max-height': '100%' }}>
        <Image image={imageData.image} />
     </div>
  );


  return (
    <>
      <section id="gallery" className="flex">
        <div className="row w-5/6 mx-auto">
          <h1 className="text-3xl lg:text-4xl pb-[1.2em] text-center">
            {t('gallery')}
          </h1>
          <ul className="grid grid-cols-2 gap-8 md:gap-12 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 w-full pt-2 justify-center">
            {photoGallery.map((imageData: Image, index) => (
              <li className="aspect-insta" key={index}>
                <button
                  onClick={() => openLightboxOnSlide(index + 1)}
                  className="aspect-insta relative shadow-[0_0px_0px_rgba(0,0,0,0)] hover:shadow-[0_2px_32px_rgba(0,0,0,0.33)] hover:scale-105 transition-all bg-cover w-full h-full overflow-hidden block"
                  href={imageData.image.url}
                >

                  <Image image={imageData.image} layout="fixed" width="319" height="398" className="absolute h-full w-full max-w-none bottom-0 top-0" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <FsLightboxGallery
        toggler={lightboxController.toggler}
        sources={photoGalleryImages}
        slide={lightboxController.slide}
      />
    </>
  );
};

export default PhotoGallery;
