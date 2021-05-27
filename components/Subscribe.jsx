import { useState } from 'react';
import Link from 'next/link';

const Subscribe = ({ renderContent, className, tags }) => {
  const [status, setStatus] = useState(`READY`);

  return (
    <form
      className={className}
      name="mailing-list"
      onSubmit={async (e) => {
        e.preventDefault();
        setStatus('SUBMITTING');

        const name = e.currentTarget.elements['name'].value;
        const lastname = e.currentTarget.elements['last-name'].value;
        const email = e.currentTarget.elements['email'].value;

        if (!name || !email) return;

        try {
          const res = await fetch(`/api/hackletter-submission`, {
            method: `POST`,
            headers: { [`Content-Type`]: `application/json` },
            body: JSON.stringify({
              name,
              lastname,
              email,
              referrer: location.href,
              tags,
            }),
          });
          if (res.status === 200) setStatus(`DONE`);
          else {
            setStatus(`ERROR`);
          }
        } catch (err) {
          console.log(err);
          setStatus(`ERROR`);
        }
      }}
    >
      <div className="mb-8 px-6 py-8 dark:bg-purple-900 bg-opacity-100 dark:bg-opacity-50 bg-purple-100 rounded-md">
        {renderContent ? (
          renderContent()
        ) : (
          <>
            <h3 className="m-0 no-margin">Get letters from me 🙌</h3>
            <p className="text-base mt-4">
              I send letters weekly to your email about things I'm currently learning,{' '}
              <strong>articles</strong> I write, <strong>books</strong> I read, the{' '}
              <strong>podcasts</strong> I record and places I <strong>travel</strong> to. I call it
              -{' '}
              <Link href="/hackletter">
                <i>Hackletter</i>
              </Link>
              . I'd love to share and discuss them with you!
            </p>
            <p className="text-sm">
              <Link href="/hackletter">Read the archive 📬</Link>
            </p>
          </>
        )}
        {status === 'READY' && (
          <div className="flex mt-4 gap-y-2 md:gap-x-2 md:gap-y-0 flex-col md:flex-row">
            <input
              id="name"
              name="name"
              type="text"
              className="px-3 py-1 dark:bg-purple-800 dark:bg-opacity-50 bg-purple-200 placeholder-purple-400 text-base rounded"
              placeholder="Name"
            />
            <input
              id="last-name"
              name="last-name"
              type="text"
              hidden
              className="px-3 py-1 dark:bg-purple-800 dark:bg-opacity-50 bg-purple-200 placeholder-purple-400 text-base rounded"
              placeholder="Name"
            />
            <input
              id="email"
              name="email"
              type="email"
              className="px-3 py-1 dark:bg-purple-800 dark:bg-opacity-50 bg-purple-200 placeholder-purple-400 text-base rounded flex-1"
              placeholder="yourname@example.com"
            />
            <button
              type="submit"
              className="dark:bg-purple-50 bg-purple-900 dark:text-purple-900 text-purple-50 text-xs font-bold px-6 py-2 md:py-0 rounded"
            >
              JOIN
            </button>
          </div>
        )}
        {status === `SUBMITTING` ? <p className="m-0 text-center w-full">Submitting 🙇‍♂️</p> : null}
        {status === `DONE` ? <p className="m-0 text-center w-full">Thanks 🎉</p> : null}
        {status === `ERROR` ? (
          <p className="m-0 text-center w-full text-sm">
            Something went wrong. Could you refresh page and retry? 🙊
          </p>
        ) : null}
      </div>
    </form>
  );
};

export default Subscribe;
