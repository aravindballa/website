import { getImage } from '@plaiceholder/next';
import { getBase64 } from '@plaiceholder/base64';

const getImageProps = async (imgSrc) => {
  const img = await getImage(imgSrc);
  const imgBase64 = await getBase64(img);
  return {
    imgBase64,
    imgSrc,
  };
};

export default getImageProps;
