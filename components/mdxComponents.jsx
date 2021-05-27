import GrayBlock from './GrayBlock';
import CodeBlock from './CodeBlock';

const components = (slug) => ({
  code: CodeBlock,
  img: ({ src, alt }) => {
    return <img alt={alt} src={src.startsWith('http') ? src : `/images/${slug}/${src}`} />;
  },
  GrayBlock,
});

export default components;
