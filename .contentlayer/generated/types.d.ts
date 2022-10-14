// NOTE This file is auto-generated by Contentlayer

import type { Markdown, MDX, ImageFieldData, IsoDateTimeString } from 'contentlayer/core'
import * as Local from 'contentlayer/source-files'

export { isType } from 'contentlayer/client'

export type { Markdown, MDX, ImageFieldData, IsoDateTimeString }

/** Document types */
export type BookNote = {
  /** File path relative to `contentDirPath` */
  _id: string
  _raw: Local.RawDocumentData
  type: 'BookNote'
  /** The title of the post */
  title: string
  /** MDX file body */
  body: MDX
  slug: string
}

export type Letter = {
  /** File path relative to `contentDirPath` */
  _id: string
  _raw: Local.RawDocumentData
  type: 'Letter'
  /** The title of the post */
  title: string
  /** The date of the post */
  date: IsoDateTimeString
  /** MDX file body */
  body: MDX
  slug: string
}

export type Post = {
  /** File path relative to `contentDirPath` */
  _id: string
  _raw: Local.RawDocumentData
  type: 'Post'
  /** The title of the post */
  title: string
  /** The date of the post */
  date: IsoDateTimeString
  /** Whether the post is published */
  published?: boolean | undefined
  /** The description of the post */
  description: string
  /** The tags of the post */
  tags?: string | undefined
  /** The banner of the post */
  banner?: string | undefined
  /** The caption of the post banner */
  bannercaption?: string | undefined
  /** Whether the banner should be full width */
  bannerFullWidth?: boolean | undefined
  /** Whether the post is featured */
  featured?: boolean | undefined
  /** MDX file body */
  body: MDX
  slug: string
}

export type Talk = {
  /** File path relative to `contentDirPath` */
  _id: string
  _raw: Local.RawDocumentData
  type: 'Talk'
  /** The title of the post */
  title: string
  /** The date of the post */
  date: IsoDateTimeString
  /** The description of the post */
  description: string
  /** MDX file body */
  body: MDX
  slug: string
}  

/** Nested types */
  

/** Helper types */

export type AllTypes = DocumentTypes | NestedTypes
export type AllTypeNames = DocumentTypeNames | NestedTypeNames

export type DocumentTypes = BookNote | Letter | Post | Talk
export type DocumentTypeNames = 'BookNote' | 'Letter' | 'Post' | 'Talk'

export type NestedTypes = never
export type NestedTypeNames = never


export interface ContentlayerGenTypes {
  documentTypes: DocumentTypes
  documentTypeMap: DocumentTypeMap
  documentTypeNames: DocumentTypeNames
  nestedTypes: NestedTypes
  nestedTypeMap: NestedTypeMap
  nestedTypeNames: NestedTypeNames
  allTypeNames: AllTypeNames
}

declare global {
  interface ContentlayerGen extends ContentlayerGenTypes {}
}

export type DocumentTypeMap = {
  BookNote: BookNote
  Letter: Letter
  Post: Post
  Talk: Talk
}

export type NestedTypeMap = {

}

 