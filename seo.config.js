import { getOGImageWithDimensions } from './lib/getOGImageUrl';

export const baseUrl = 'https://aravindballa.com/';

export default {
  defaultTitle: 'Aravind Balla',
  titleTemplate: '%s | Aravind Balla',
  description: 'Discoveries and rants of a developer while developing stuff',
  openGraph: {
    title: 'Aravind Balla',
    description: 'Discoveries and rants of a developer while developing stuff',
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    site_name: 'Aravind Balla',
    images: [getOGImageWithDimensions({ title: 'Aravind Balla' })],
  },
  twitter: {
    handle: '@aravindballa',
    site: '@aravindballa',
    cardType: 'summary_large_image',
  },
};
