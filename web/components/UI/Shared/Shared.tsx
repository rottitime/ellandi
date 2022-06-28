import { FC } from 'react'
import { TextProps, VariantMappingTypes } from './types'

// Defining the HTML tag that the component will support
const variantsMapping: VariantMappingTypes = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subheading1: 'h6',
  subheading2: 'h6',
  body1: 'p',
  body2: 'p'
}

export const Text: FC<TextProps> = ({ variant = 'body1', as, children, ...props }) => {
  const Component = as || variantsMapping[variant]

  return (
    <Component className={`typography-variant-${variant}`} {...props}>
      {children}
    </Component>
  )
}
