import { ComponentType, ReactHTML, ReactNode } from 'react'

type HtmlTag = ComponentType<{ className?: string }> | keyof ReactHTML

export type VariantMappingTypes = Record<VariantTypes, HtmlTag>

export type VariantTypes =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subheading1'
  | 'subheading2'
  | 'body1'
  | 'body2'

export type TextProps = {
  variant?: VariantTypes
  as?: HtmlTag
  children: ReactNode
}
