---
title: 'Build pages in Gatsby from Rest API'
date: '2021-02-25'
type: 'article'
published: true
description: 'Its not that hard. We just have to hook into gatsby-node.'
tags: 'gatsby, gatsbyjs, advanced gatsby, rest api, graphql, gatsby-source-api'
banner: 'banner.jpg'
bannercaption: 'Photo by Tamara Bitter on Unsplash'
bannerFullWidth: true
---

Creating pages in Gatsby is easy. But when we want the pages to be also part of the GraphQL layer so that we can query them in index pages, we need to hook into `sourceNode()` in the `gatsby-node.js`.

```js
// gatsby-node.js

const fetch = require(‘node-fetch’;)

// part one
const createPages = async ({ actions }) => {
  const { createPage } = actions;

  const allPosts = await (await fetch(‘http://some-api.com/all’)).json();
  for (const post of allPosts) {
    const blocks = await (await fetch(‘http://some-api.com/post/’ + post.id)).json();
    createPage({
      path: `writings/${post.Slug}`,
      component: path.resolve(`./src/templates/post.js`),
      context: {
        slug: `writings/${post.Slug}`,
        blocks,
      },
    });
  }
};

// part two
const sourceNodes = async ({ actions }) => {
  const { createNode } = actions;

  const allPosts = await (await fetch(‘http://some-api.com/all’)).json();
  for (const post of allPosts) {
    // create node for graphql
    const node = {
      id: `${post.Slug}`,
      parent: `__SOURCE__`,
      internal: {
        // lets you query nodes using allAPIPost and APIPost
        type: `APIPost`,
      },
      children: [],

      // Other fields that you want to query with graphQl
      slug: post.Slug,
      title: post.Name,
      date: post.Date,
      draft: post.Draft,
    };
    const contentDigest = crypto.createHash(`md5`).update(JSON.stringify(node)).digest(`hex`);
    node.internal.contentDigest = contentDigest;
    createNode(node);
  }
};

// module.exports = { createPages, sourceNodes };
```

Let me explain this. There are 2 parts to it.

- One - creating the pages after fetching from the rest API using `createPage()`
- Two - creating the node in the GraphQL layer to be able to query in other pages (for example in `index.js` where you list all the pages)

After adding that piece of code to `gatsby-node.js` and running `gatsby develop` you will have pages created at the `path` you’ve given to `createPage()`.

To list them in any other page, we can use a query that looks like this

```graphql
query {
  allPost(sort: { order: DESC, fields: date }) {
    nodes {
      slug
      title
      date
    }
  }
}
```

You can experiment with the query in GraphiQL dashboard that runs when you `gatsby develop`.

Hope this helps.
