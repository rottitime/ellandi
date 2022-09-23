/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useState, SyntheticEvent, useEffect, useId, ReactNode } from 'react'
import { Box, styled, Tab, Tabs as MuiTabs } from '@mui/material'
import { Props, StyleProps } from './types'
import { useRouter } from 'next/router'

const Wrapper = styled(Box, {
  shouldForwardProp: (p) => p !== 'brandColor'
})<StyleProps>`
  .MuiTabs-flexContainer {
    gap: ${(p) => p.theme.spacing(1)};
  }
  .MuiTab-root {
    transition: background-color 0.3s ease-in-out, color 0.3s 0.2s ease-out;
    color: ${(p) => p.theme.colors.grey3};
    background-color: ${(p) => p.theme.colors.grey4};
    text-transform: initial;
    border-radius: 12px 12px 0 0;
    font-weight: bold;

    &:hover {
      background-color: ${(p) => p.theme.colors.grey2};
    }

    &.active {
      background-color: ${({ theme, brandColor }) =>
        brandColor ? theme.colors[brandColor] : theme.colors.teal};
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
  brandColor,
  ...props
}) => {
  const [currentActiveTab, setCurrentActiveTab] = useState<number>(activeIndex)
  const router = useRouter()
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

  const renderPanel = (index: number, content: ReactNode) => {
    const isActive = currentActiveTab === index
    return (
      <Box
        role="tabpanel"
        key={index}
        hidden={!isActive}
        id={`${id}-tabpanel-${index}`}
        aria-controls={`${id}-tab-${index}`}
      >
        {isActive && content}
      </Box>
    )
  }

  return (
    <Wrapper brandColor={brandColor}>
      <MuiTabs {...props} value={currentActiveTab} onChange={handleChange}>
        {tabItems.map((item, index) => (
          <Tab
            key={index}
            className={currentActiveTab === index ? 'active' : ''}
            label={item.title}
            disabled={item.disabled}
            id={`${id}-tab-${index}`}
            aria-controls={`${id}-tabpanel-${index}`}
            onClick={() => {
              item.href && router.push(item.href)
            }}
          />
        ))}
      </MuiTabs>

      {tabPanel
        ? renderPanel(currentActiveTab, tabPanel)
        : tabItems.map(({ content }, index) => renderPanel(index, content))}
    </Wrapper>
  )
}

export default Tabs
export * from './types'
