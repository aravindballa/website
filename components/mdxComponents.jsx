import GrayBlock from './GrayBlock';
import CodeBlock from './CodeBlock';
import ImagekitImage from './ImagekitImage';

const components = (slug) => ({
  code: CodeBlock,
  img: ({ src, alt }) => {
    // return <img alt={alt} src={src.startsWith('http') ? src : `/images/${slug}/${src}`} />;
    // TODO doesn't work well
    return (
      <div className="relative max-w-full h-auto" style={{ aspectRatio: '16/9' }}>
        <ImagekitImage src={`${slug}-${src}`} alt={alt} layout="fill" objectFit="cover" />
      </div>
    );
  },
  GrayBlock,
  Toggle: ({ title, children }) => {
    return (
      <details className="">
        <summary className="font-bold">{title}</summary>
        <div className="text-base p-4">{children}</div>
      </details>
    );
  },
});

export default components;
