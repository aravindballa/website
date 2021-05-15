import type { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';
import { Page } from '@notionhq/client/build/src/api-types';
import { PagesCreateResponse } from '@notionhq/client/build/src/api-endpoints';

const notion = new Client({ auth: process.env.NOTION_TOKEN });

export default async function views(req: NextApiRequest, res: NextApiResponse) {
  if (!req.query.slug || Array.isArray(req.query.slug)) {
    res.status(204).json({});
    return;
  }

  const slug = req.query.slug === '/' ? req.query.slug : req.query.slug.replace(/\/$/, ''); // remove last slash

  const matchingPageRecords = await notion.databases.query({
    database_id: process.env.VIEWS_DB,
    filter: {
      property: 'Slug',
      text: {
        equals: slug,
      },
    },
  });

  let exisitingPageRecord: Page | PagesCreateResponse;

  if (matchingPageRecords.results.length === 0) {
    exisitingPageRecord = await notion.pages.create({
      parent: {
        database_id: process.env.VIEWS_DB,
      },
      properties: {
        Slug: {
          title: [
            //@ts-ignore
            {
              text: {
                content: slug,
              },
            },
          ],
        },
        //@ts-ignore
        Views: {
          number: 0,
        },
      },
    });
  } else {
    exisitingPageRecord = matchingPageRecords.results[0];
  }

  if (req.method === 'POST') {
    //@ts-ignore
    const existingCount = exisitingPageRecord.properties.Views.number;
    await notion.pages.update({
      page_id: exisitingPageRecord.id,
      properties: {
        //@ts-ignore
        Views: {
          number: existingCount + 1,
        },
      },
    });
    res.status(200).json({});
  }
}
