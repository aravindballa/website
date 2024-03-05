import Image, { ImageProps } from 'next/image';

export const IMAGEKIT_ENDPOINT = 'https://ik.imagekit.io/aravindballa/website';

export const imageKitLoader = ({ src, width, quality }) => {
  if (src[0] === '/') src = src.slice(1);
  const params = [`w-${width}`];
  if (quality) {
    params.push(`q-${quality}`);
  }
  const paramsString = params.join(',');

  if (src.startsWith('https://')) return `${src}?tr=${paramsString}`;

  var urlEndpoint = IMAGEKIT_ENDPOINT;
  if (urlEndpoint[urlEndpoint.length - 1] === '/')
    urlEndpoint = urlEndpoint.substring(0, urlEndpoint.length - 1);
  return `${urlEndpoint}/${src}?tr=${paramsString}`;
};

function ImagekitImage({ src, ...props }: ImageProps) {
  let sourceUrl = src;
  // src can have ?h=100&w=100
  if (typeof src === 'string' && src.includes('?') && src.includes('h=') && src.includes('w=')) {
    sourceUrl = src.split('?')[0];
    const urlParams = new URLSearchParams(src.split('?')[1]);
    const width = Number(urlParams.get('w'));
    const height = Number(urlParams.get('h'));
    return (
      <Image loader={imageKitLoader} {...props} src={sourceUrl} width={width} height={height} />
    );
  }
  return <Image loader={imageKitLoader} {...props} src={sourceUrl} />;
}

export default ImagekitImage;
