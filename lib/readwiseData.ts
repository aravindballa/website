export default async function getReadwiseBooks() {
  const booksResponse = await fetch(`https://readwise-kv.aravindballa.workers.dev/`);
  const data = await booksResponse.json();
  return data;
}
