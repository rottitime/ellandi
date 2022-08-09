/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useState, SyntheticEvent, useEffect, useId } from 'react'
import { Box, styled, Tab, Tabs as MuiTabs } from '@mui/material'
import { Props } from './types'
import ConditionalWrapper from '@/components/ConditionalWrapper/ConditionalWrapper'
import NextLink from 'next/link'

const Wrapper = styled(Box)`
  .MuiTabs-flexContainer {
    gap: ${(p) => p.theme.spacing(1)};
  }
  .MuiTab-root {
    background-color: ${(p) => p.theme.colors.grey4};
    text-transform: initial;
    border-radius: 12px 12px 0 0;
    font-weight: bold;
    &.active {
      background-color: ${(p) => p.theme.colors.teal};
      color: ${(p) => p.theme.colors.white};
    }
  }

  [role='tabpanel'] {
    background-color: ${(p) => p.theme.colors.white};
    padding: ${(p) => p.theme.spacing(4)};
    border-radius: 0 0 12px 12px;
  }

  .MuiTabs-indicator {
    display: none;
  }
`

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
    <Wrapper>
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
                className={currentActiveTab === index ? 'active' : ''}
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
    </Wrapper>
  )
}

export default Tabs
export * from './types'
