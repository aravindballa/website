const components = (path) => ({
  img: ({ src, alt }) => {
    return <img alt={alt} src={require(path + '/' + src).default} />;
  },
});

export default components;
