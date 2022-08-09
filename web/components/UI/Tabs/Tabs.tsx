/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useState, SyntheticEvent, useEffect, useId } from 'react'
import { Box, Tab, Tabs as MuiTabs } from '@mui/material'
import { Props } from './types'
import ConditionalWrapper from '@/components/ConditionalWrapper/ConditionalWrapper'
import NextLink from 'next/link'

const Tabs: FC<Props> = ({
  activeOnUrl = false,
  activeIndex = 0,
  tabItems,
  ...props
}) => {
  const [currentActiveTab, setCurrentActiveTab] = useState<number>(activeIndex)
  const id = useId()

  useEffect(() => {
    const active: number = tabItems.findIndex((item) =>
      activeOnUrl
        ? item.href?.toLowerCase() === window.location.pathname.toLowerCase()
        : item.active
    )
    setCurrentActiveTab(active > 0 ? active : activeIndex)
  }, [tabItems, activeOnUrl, window.location.pathname])

  const handleChange = (_event: SyntheticEvent, index: number) =>
    setCurrentActiveTab(index)

  return (
    <Box sx={{ width: '100%' }}>
      <MuiTabs {...props} value={currentActiveTab} onChange={handleChange}>
        {tabItems.map((item, index) => {
          return (
            <ConditionalWrapper
              condition={!!item.href}
              wrapper={(children) => (
                <NextLink href={item.href} passHref>
                  {children}
                </NextLink>
              )}
              key={index}
            >
              <Tab
                label={item.title}
                disabled={item.disabled}
                id={`${id}-tab-${index}`}
                aria-controls={`${id}-tabpanel-${index}`}
              />
            </ConditionalWrapper>
          )
        })}
      </MuiTabs>

      {tabItems.map(({ content }, index) => {
        const hidden = currentActiveTab !== index
        return (
          <Box
            role="tabpanel"
            key={index}
            hidden={hidden}
            id={`${id}-tabpanel-${index}`}
            aria-controls={`${id}-tab-${index}`}
          >
            {content}
          </Box>
        )
      })}
    </Box>
  )
}

export default Tabs
export * from './types'
