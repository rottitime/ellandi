/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useState, SyntheticEvent, useEffect, useId, ReactNode } from 'react'
import { Box, styled, Tab, Tabs as MuiTabs } from '@mui/material'
import { Props } from './types'
import ConditionalWrapper from '@/components/ConditionalWrapper/ConditionalWrapper'
import NextLink from 'next/link'

const Wrapper = styled(Box)`
  .MuiTabs-flexContainer {
    gap: ${(p) => p.theme.spacing(1)};
  }
  .MuiTab-root {
    transition: background-color 0.3s ease-in-out, color 0.3s 0.2s ease-out;

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
  tabPanel,
  ...props
}) => {
  const [currentActiveTab, setCurrentActiveTab] = useState<number>(activeIndex)
  const id = useId()

  useEffect(() => {
    // console.log({
    //   pathname: window.location.pathname
    // })
    const active: number = tabItems.findIndex((item) =>
      activeOnUrl
        ? item.href?.toLowerCase() === window.location.pathname.toLowerCase()
        : item.active
    )
    setCurrentActiveTab(active > 0 ? active : activeIndex)
  }, [tabItems, activeOnUrl, window.location.pathname])

  const handleChange = (_event: SyntheticEvent, index: number) =>
    setCurrentActiveTab(index)

  const renderPanel = (index: number, content: ReactNode) => (
    <Box
      role="tabpanel"
      key={index}
      hidden={currentActiveTab !== index}
      id={`${id}-tabpanel-${index}`}
      aria-controls={`${id}-tab-${index}`}
    >
      {content}
    </Box>
  )

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

      {tabPanel
        ? renderPanel(currentActiveTab, tabPanel)
        : tabItems.map(({ content }, index) => renderPanel(index, content))}
    </Wrapper>
  )
}

export default Tabs
export * from './types'
