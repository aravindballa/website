import GrayBlock from './GrayBlock';
import CodeBlock from './CodeBlock';
import { imageKitLoader } from './ImagekitImage';

const components = (slug) => ({
  pre: CodeBlock,
  img: ({ src, alt }) => {
    return (
      <img
        className="rounded"
        alt={alt}
        src={imageKitLoader({ src: `${slug.replace('/writings/', '')}-${src}`, width: '1460px' })}
      />
    );
    // TODO doesn't work well
    // return (
    //   <div className="relative max-w-full h-auto" style={{ aspectRatio: '16/9' }}>
    //     <ImagekitImage
    //       className="rounded"
    //       src={`${slug.replace('/writings/', '')}-${src}`}
    //       alt={alt}
    //       layout="fill"
    //       objectFit="contain"
    //     />
    //   </div>
    // );
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
