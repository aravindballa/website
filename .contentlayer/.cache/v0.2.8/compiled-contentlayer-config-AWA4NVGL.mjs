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
var Talk = defineDocumentType(() => ({
  name: "Talk",
  filePathPattern: `talks/**/*.(mdx|md)`,
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
    description: {
      type: "string",
      description: "The description of the post",
      required: true
    }
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => `/talks/${doc._raw.flattenedPath}`
    }
  }
}));
var Letter = defineDocumentType(() => ({
  name: "Letter",
  filePathPattern: `hackletter/**/*.(mdx|md)`,
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
    type: {
      type: "string",
      description: "The type of the post"
    }
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => `/hackletter/${doc._raw.flattenedPath}`
    }
  }
}));
var BookNote = defineDocumentType(() => ({
  name: "BookNote",
  filePathPattern: `bookshelf/**/*.(mdx|md)`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "The title of the post",
      required: true
    }
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => `/bookshelf/${doc._raw.flattenedPath}`
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "content",
  documentTypes: [Post, Letter, BookNote, Talk]
});
export {
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-AWA4NVGL.mjs.map
