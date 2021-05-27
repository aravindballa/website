import type { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';
import { Page } from '@notionhq/client/build/src/api-types';
import { PagesCreateResponse } from '@notionhq/client/build/src/api-endpoints';

import countriesData from '../../lib/countries.json';

const notion = new Client({ auth: process.env.NOTION_TOKEN });

export default async function views(req: NextApiRequest, res: NextApiResponse) {
  const { slug, width, timestamp, tz } = JSON.parse(req.body);

  if (!slug || !width || !timestamp || !tz) {
    res.status(204).json({});
    return;
  }

  const formattedSlug = slug === '/' ? slug : slug.replace(/\/$/, ''); // remove last slash
  let deviceType = 'Mobile';
  if (width > 768) deviceType = 'Tablet';
  if (width > 1024) deviceType = 'Desktop';

  let timezone = countriesData.timezones[tz];
  while (!('c' in timezone)) {
    timezone = countriesData.timezones[timezone.a];
  }
  const country = countriesData.countries[timezone.c];

  if (req.method === 'POST') {
    // 1. Check if record exists in PAGES table
    const matchingPageRecords = await notion.databases.query({
      database_id: process.env.PAGES_DB,
      filter: {
        property: 'Name',
        text: {
          equals: formattedSlug,
        },
      },
    });

    let exisitingPageRecord: Page | PagesCreateResponse;

    // 2. (Optional) If record doesn't exist, create it
    if (matchingPageRecords.results.length === 0) {
      exisitingPageRecord = await notion.pages.create({
        parent: {
          database_id: process.env.PAGES_DB,
        },
        properties: {
          Name: {
            title: [
              //@ts-ignore
              {
                text: {
                  content: formattedSlug,
                },
              },
            ],
          },
        },
      });
    } else {
      exisitingPageRecord = matchingPageRecords.results[0];
    }

    // 3. Add a record to the VISITS table
    await notion.pages.create({
      parent: {
        database_id: process.env.VIEWS_DB,
      },
      properties: {
        Slug: {
          title: [
            //@ts-ignore
            {
              text: {
                content: formattedSlug,
              },
            },
          ],
        },

        //@ts-ignore
        Timestamp: {
          date: {
            start: timestamp,
          },
        },

        Device: {
          //@ts-ignore
          select: {
            name: deviceType,
          },
        },

        Location: {
          rich_text: [
            //@ts-ignore
            {
              type: 'text',
              text: {
                content: country,
              },
            },
          ],
        },

        'Actual Slug': {
          //@ts-ignore
          relation: [
            {
              id: exisitingPageRecord.id,
            },
          ],
        },
      },
    });

    res.status(200).json({});
  }
}
