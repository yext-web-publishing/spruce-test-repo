import * as React from 'react';
import { Address } from '../types/entity';

type LSMap = {
  address: Address;
  name: string;
};

export const LSMap = (props: LSMap) => {
  const { address, name } = props;

  const mapCenter = `${name}, ${address.line1}, ${address.postalCode} ${address.city}`;
  React.useEffect(() => {
    const gH = document.documentElement.classList.contains('touchevents')
      ? 'cooperative'
      : 'greedy';
    const chMap = new SearchChMap({
      container: 'mapcontainer',
      center: mapCenter,
      gestureHandling: gH,
      controls: 'zoom',
    }).ready(function () {
      chMap.map.scrollWheelZoom.disable();
    });
  });
  return (
    <>
      <section id="map" className="flex p-0">
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css"
          integrity="sha512-hoalWLoI8r4UszCkZ5kL8vayOGVae1oxXe/2A4AO6J9+580uKHDO3JdHb7NzwwzK5xr/Fs0W40kiNHxM9vyTtQ=="
          crossOrigin=""
        />
        <script
          src="https://unpkg.com/leaflet@1.8.0/dist/leaflet.js"
          integrity="sha512-BB3hKbKWOc9Ez/TAwyWxNXeoV9c1v6FIeYiBieIWkpLjauysF18NzgR1MBNBXf8/KABdlkX68nAhlwcDFLGPCQ=="
          crossOrigin=""
        ></script>
        <script
          type="text/javascript"
          src="https://map.search.ch/api/map.js"
        ></script>
        <div className="w-full mx-auto">
          <div id="mapcontainer" className="w-full h-[500px]"></div>
        </div>
      </section>
    </>
  );
};
