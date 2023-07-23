import Image, { ImageProps } from 'next/image';

export const IMAGEKIT_ENDPOINT = 'https://ik.imagekit.io/aravindballa/website';

export const imageKitLoader = ({ src, width, quality }) => {
  if (src[0] === '/') src = src.slice(1);
  const params = [`w-${width}`];
  if (quality) {
    params.push(`q-${quality}`);
  }
  const paramsString = params.join(',');
  var urlEndpoint = IMAGEKIT_ENDPOINT;
  if (urlEndpoint[urlEndpoint.length - 1] === '/')
    urlEndpoint = urlEndpoint.substring(0, urlEndpoint.length - 1);
  return `${urlEndpoint}/${src}?tr=${paramsString}`;
};

function ImagekitImage(props: ImageProps) {
  return <Image loader={imageKitLoader} {...props} />;
}

export default ImagekitImage;
