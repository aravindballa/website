import GrayBlock from './GrayBlock';
import CodeBlock from './CodeBlock';
import ImagekitImage from './ImagekitImage'; // Updated import

const components = (slug) => ({
  pre: CodeBlock,
  img: ({ src, alt, width, height }) => {
    // Assuming src might be a relative path for local markdown images,
    // or an absolute path for images already on ImageKit.
    // The ImagekitImage component is designed to handle both.
    // We might need to pass slug or other context if relative paths need prefixing.
    // For now, directly pass src.
    // Default width, can be overridden by props if provided in MDX
    const defaultWidth = width || 730; // 1460px / 2 for better default display
    return (
      <ImagekitImage
        className="rounded"
        src={src}
        alt={alt}
        width={defaultWidth} // Pass width, could be from MDX or default
        height={height}     // Pass height if available from MDX
        // quality can be set globally or passed if needed
      />
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
