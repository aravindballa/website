import Highlight, { defaultProps } from 'prism-react-renderer';
import oceanicNext from 'prism-react-renderer/themes/oceanicNext';

export default ({ className = '', children }) => {
  const language = className.replace(/language-/, '');
  return (
    <Highlight {...defaultProps} code={children} language={language} theme={oceanicNext}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className + ' relative'} style={{ ...style, padding: 0, margin: 0 }}>
          {language && (
            <div className="absolute right-0 top-0 text-gray-400 bg-gray-900 p-1 rounded text-sm select-none uppercase">
              {language}
            </div>
          )}
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              <span className="inline-block select-none opacity-30 text-sm w-4 text-right mr-4">
                {i + 1}
              </span>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};
