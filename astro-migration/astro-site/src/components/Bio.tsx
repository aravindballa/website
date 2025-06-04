export default function Bio() {
  return (
    <div className="flex py-6 mt-8 border-t-2 border-gray-500 items-center w-full max-w-[70ch]">
      <div className="rounded-full border-2 border-purple-500 h-16 w-16">
        <img
          className="rounded-full"
          src="/avatar.jpg"
          alt={`Aravind Balla`}
          height="64"
          width="64"
        />
      </div>
      <p className="ml-6 flex-1">
        By <strong className="text-purple-400 font-bold">Aravind Balla</strong>, a Javascript
        Developer building things to solve problems faced by him &amp; his friends.{' '}
        <a className="underline" href="https://twitter.com/aravindballa" target="_blank">
          You should hit him up on Twitter!
        </a>
      </p>
    </div>
  );
}
