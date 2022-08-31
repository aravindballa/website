import GrayBlock from './GrayBlock';
import CodeBlock from './CodeBlock';

const components = (slug) => ({
  code: CodeBlock,
  img: ({ src, alt }) => {
    return <img alt={alt} src={src.startsWith('http') ? src : `/images/${slug}/${src}`} />;
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
