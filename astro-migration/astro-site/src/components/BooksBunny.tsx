import { useState } from 'react';

const BooksBunny = () => {
  const [status, setStatus] = useState<'idle' | 'fetching' | 'done' | 'error'>('idle');
  const [answer, setAnswer] = useState<string | null>(null);
  const [embeddings, setEmbeddings] = useState<string[] | null>(null);

  const getAnswer = async (question) => {
    const searchParams = new URLSearchParams();
    searchParams.append('query', question);

    const reposnse = await fetch('/api/booksbunny', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: question,
      }),
    });

    return reposnse.json();
  };
  return (
    <div className="my-8 mx-auto border border-foreground/30 rounded p-4 bg-foreground/5 max-w-[70ch] w-full">
      <div className="text-xl font-head font-bold">Meet "🐰 Books Bunny"</div>
      <p className="mt-2">
        Books Bunny knows about all the highlights Aravind took while reading these books. You can
        ask a question and 🐰 Bunny will try to answer them based on these books.
      </p>
      <form
        className="mt-8 max-w-xl"
        onSubmit={async (e) => {
          e.preventDefault();

          setStatus('fetching');
          try {
            // @ts-ignore
            const result = await getAnswer(e.target.query.value);
            if (result.answer) {
              setAnswer(result.answer);
              if (
                result.answer.toLowerCase() !== `I',m afraid I don't know.`.toLowerCase() &&
                result.embeddings
              ) {
                setEmbeddings(result.embeddings);
              }
              setStatus('done');
            }
          } catch (err) {
            setStatus('error');
          }
        }}
      >
        <div>
          <label htmlFor="query" className="block text-sm font-medium text-foreground">
            Hey Books Bunny, ...
          </label>
          <div className="relative mt-1 rounded-md shadow-sm">
            <input
              type="text"
              name="query"
              id="query"
              className="block w-full p-2 bg-transparent rounded-md border border-slate-300 focus:border-slate-500 focus:ring-slate-500 outline-none"
              placeholder="When should I sell my startup?"
            />
          </div>
        </div>
      </form>
      {status === 'fetching' && (
        <div className="mt-4">
          <p>🐇 🤔 🐇</p>
        </div>
      )}
      {status === 'done' && answer && (
        <div className="mt-8 w-full max-w-[65ch] text-justify">
          <p className="-indent-20 pl-20">🐰 Bunny: {answer}</p>
          {embeddings?.length && (
            <>
              <p className="mt-8 -indent-20 pl-20">
                🐰 Bunny: Here are some quotes from books that might help you.
              </p>
              <ul className="list-disc pl-24">
                {embeddings.map((embedding) => {
                  embedding = embedding.replace(
                    /^(.*?):/,
                    '<strong class="font-bold text-headings">$1</strong>:'
                  );
                  return (
                    <li
                      key={embedding}
                      className="mt-2"
                      dangerouslySetInnerHTML={{ __html: embedding }}
                    />
                  );
                })}
              </ul>
            </>
          )}
        </div>
      )}
      {status === 'error' && (
        <div className="mt-4 w-full max-w-[65ch]">
          <p className="-indent-20 pl-20">
            🐰 Bunny: We ran out of the limits buddy. Each question you ask costs Aravind some 🥕🥕
            moneys. He can only let me answer few questions for you each hour.
          </p>
        </div>
      )}
    </div>
  );
};

export default BooksBunny;
