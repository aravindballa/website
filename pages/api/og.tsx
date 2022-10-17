import { ImageResponse } from '@vercel/og';
import { imageKitLoader } from 'components/ImagekitImage';
import { allPosts } from 'contentlayer/generated';
import { format } from 'date-fns';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'experimental-edge',
};

const font = fetch(new URL('../../public/fonts/Poppins-Bold.ttf', import.meta.url)).then((res) =>
  res.arrayBuffer()
);

export default async function (req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');
  const post = allPosts.find((post) => post.slug === slug);

  const fontData = await font;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          padding: '48px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          fontFamily: 'Poppins, sans-serif',
          backgroundColor: '#151515',
          color: 'white',
          position: 'relative',
          border: '16px solid #151515',
        }}
      >
        {post?.banner && (
          <img
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              inset: 0,
              objectFit: 'cover',
              opacity: 0.3,
              width: 1200,
              height: 630,
              borderRadius: '8px',
            }}
            src={imageKitLoader({
              src: `${post.slug.replace('/writings/', '')}-${post.banner}`,
              width: '1200px',
              quality: '100',
            })}
          />
        )}
        <div tw="font-bold text-6xl" style={{ textShadow: '1px 2px 2px #151515' }}>
          {post?.title || slug.charAt(0).toUpperCase() + slug.slice(1)}
        </div>
        <div tw="flex flex-col mt-8">
          <div
            tw="h-8 w-[800px] rounded-md mb-8"
            style={{
              backgroundImage: 'linear-gradient(to right, #fff, rgba(255,255,255,0))',
            }}
          />
          <div
            tw="h-8 w-[300px] rounded-md mb-8"
            style={{
              backgroundImage: 'linear-gradient(to right, #fff, rgba(255,255,255,0.4))',
            }}
          />
          <div
            tw="h-8 w-[500px] rounded-md mb-8"
            style={{
              backgroundImage: 'linear-gradient(to right, #fff, rgba(255,255,255,0.4))',
            }}
          />
        </div>

        <div tw="flex justify-between w-full">
          <span style={{ textShadow: '1px 2px 2px #151515' }}>
            {post ? format(new Date(post.date), 'dd MMM, yyyy') : ''}
          </span>
          <span tw="text-purple-400" style={{ textShadow: '1px 2px 2px #151515' }}>
            aravindballa.com
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Poppins',
          data: fontData,
          style: 'normal',
        },
      ],
    }
  );
}
