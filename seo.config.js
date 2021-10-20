import { getOGImageWithDimensions } from './lib/getOGImageUrl';

export const baseUrl = 'https://aravindballa.com/';

export default {
  defaultTitle: 'Aravind Balla - Full Stack Javascript Engineer',
  titleTemplate: '%s | Aravind Balla',
  description:
    'Discoveries and rants of a indie maker while building solutions that he and his friends face.',
  openGraph: {
    title: 'Aravind Balla',
    description:
      'Discoveries and rants of a indie maker while building solutions that he and his friends face.',
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
