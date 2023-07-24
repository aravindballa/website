import { DocumentTypes, allDocuments } from 'contentlayer/generated';

export function getBacklinks(name: string, filename: string) {
  const backlinkingDocs = allDocuments.filter(
    (doc) =>
      doc.body.raw.includes('[[' + name + ']]') || doc.body.raw.includes('[[' + filename + ']]')
  ) as DocumentTypes[];

  return backlinkingDocs.map((doc) => ({
    title: doc.title,
    slug: doc.slug,
    type: doc.type,
    // line that has the backlink
    excerpt: doc.body.raw
      .split('\n')
      .find((line) => line.includes('[[' + name) || line.includes('[[' + filename))
      ?.replace(/\[\[(.+?)\]\]/g, '<span class="highlight">$1</span>'),
  }));
}
