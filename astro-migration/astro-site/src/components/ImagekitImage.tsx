export const IMAGEKIT_ENDPOINT = 'https://ik.imagekit.io/aravindballa/website';

export const imageKitLoader = ({ src, width, quality }) => {
  if (src[0] === '/') src = src.slice(1);
  const params = [];
  // Ensure width is treated as a string for the 'w-' param, or not added if undefined/0.
  if (width && width !== '0') {
    // If width is a number, format it. If it's a string, use as is (assuming it's pre-formatted like '100px').
    // However, ImageKit expects 'w-' with a number, so we should ensure it's a number.
    // For simplicity, we'll assume `width` prop will be a number if provided for dimension,
 убий or a string like 'auto' which might need specific handling if ImageKit supports it.
    // The original code passed `width` (which could be a string like '1460px') to `w-${width}`.
    // This might be incorrect for ImageKit. Let's assume width is a number or a string that's purely numerical.
    const numericWidth = typeof width === 'string' ? parseInt(width, 10) : width;
    if (numericWidth) {
        params.push(`w-${numericWidth}`);
    }
  }
  if (quality) {
    params.push(`q-${quality}`);
  }
  const paramsString = params.join(',');

  if (src.startsWith('https://')) return `${src}${paramsString ? '?tr=' + paramsString : ''}`;

  var urlEndpoint = IMAGEKIT_ENDPOINT;
  if (urlEndpoint[urlEndpoint.length - 1] === '/')
    urlEndpoint = urlEndpoint.substring(0, urlEndpoint.length - 1);
  return `${urlEndpoint}/${src}${paramsString ? '?tr=' + paramsString : ''}`;
};

interface ImagekitImageProps {
  src: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  quality?: number;
  className?: string;
  // Consider other relevant img attributes if needed
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'sync' | 'auto';
}

function ImagekitImage({ src, alt, width, quality, height, className, ...props }: ImagekitImageProps) {
  let sourceUrl = src;
  let calculatedWidth: number | string | undefined = width;
  let calculatedHeight: number | string | undefined = height;

  // If src contains query parameters for h and w, extract them
  if (typeof src === 'string' && src.includes('?') && src.includes('h=') && src.includes('w=')) {
    sourceUrl = src.split('?')[0];
    const urlParams = new URLSearchParams(src.split('?')[1]);
    calculatedWidth = Number(urlParams.get('w'));
    calculatedHeight = Number(urlParams.get('h'));
  }

  // The loader needs a numeric width for the w- parameter if possible
  const loaderWidthArgument = typeof calculatedWidth === 'string' ? parseInt(calculatedWidth, 10) : calculatedWidth;

  const imgSrc = imageKitLoader({ src: sourceUrl, width: loaderWidthArgument, quality });

  // Ensure width and height on <img> are strings if they are numbers
  const imgWidth = typeof calculatedWidth === 'number' ? String(calculatedWidth) : calculatedWidth;
  const imgHeight = typeof calculatedHeight === 'number' ? String(calculatedHeight) : calculatedHeight;

  return <img src={imgSrc} alt={alt || ''} width={imgWidth} height={imgHeight} className={className} {...props} />;
}

export default ImagekitImage;
