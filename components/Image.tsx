import NextImage from 'next/image';

function Image({ className = '', imgBase64, imgSrc, width, height, ...rest }) {
  return (
    <div className={`relative overflow-hidden flex ${className}`} style={{ maxWidth: width }}>
      <img
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 bottom-0 w-full h-full object-cover object-center filter blur transform scale-110"
        alt="placeholder"
        src={imgBase64}
      />
      <NextImage className={className} src={imgSrc} width={width} height={height} {...rest} />
    </div>
  );
}

export default Image;
