// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
var Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `writings/**/*.(mdx|md)`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "The title of the post",
      required: true
    },
    date: {
      type: "date",
      description: "The date of the post",
      required: true
    },
    published: {
      type: "boolean",
      description: "Whether the post is published",
      required: true
    },
    description: {
      type: "string",
      description: "The description of the post",
      required: true
    },
    tags: {
      type: "string",
      description: "The tags of the post",
      required: true
    },
    banner: {
      type: "string",
      description: "The banner of the post"
    },
    bannercaption: {
      type: "string",
      description: "The caption of the post banner"
    },
    bannerFullWidth: {
      type: "boolean",
      description: "Whether the banner should be full width"
    }
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => `/writings/${doc._raw.flattenedPath}`
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "content",
  documentTypes: [Post]
});
export {
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-7ZKQUJWR.mjs.map
