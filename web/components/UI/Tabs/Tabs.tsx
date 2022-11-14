/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useState, SyntheticEvent, useEffect, useId, ReactNode } from 'react'
import { Box, styled, Tab, Tabs as MuiTabs, useTheme } from '@mui/material'
import { Props, StyleProps } from './types'
import { useRouter } from 'next/router'
import RoutedTabs from './RoutedTabs'
import AccountCard from '../Cards/AccountCard/AccountCard'
import ConditionalWrapper from '@/components/ConditionalWrapper/ConditionalWrapper'

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
      color: ${(p) => p.theme.colors.white};
      &.default-color {
        background-color: ${({ theme, brandColor }) =>
          brandColor ? theme.colors[brandColor] : theme.colors.black};
      }
    }
  }

  [role='tabpanel'] {
    background-color: ${(p) => p.theme.colors.grey4};
    padding: ${(p) => p.theme.spacing(3)};
    border-radius: 0 12px 12px 12px;
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
  disableCard,
  ...props
}) => {
  const [currentActiveTab, setCurrentActiveTab] = useState<number>(activeIndex)
  const router = useRouter()
  const { colors } = useTheme()
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
        {isActive && (
          <ConditionalWrapper
            condition={!disableCard}
            wrapper={(children) => <AccountCard>{children}</AccountCard>}
          >
            <>{content}</>
          </ConditionalWrapper>
        )}
      </Box>
    )
  }

  return (
    <Wrapper brandColor={brandColor}>
      <MuiTabs {...props} value={currentActiveTab} onChange={handleChange}>
        {tabItems.map((item, index) => (
          <Tab
            key={index}
            className={`${currentActiveTab === index ? 'active' : ''} ${
              !!item.brandColor ? 'has-color' : 'default-color'
            }`}
            label={item.title}
            disabled={item.disabled}
            data-testid={`tab-${index}`}
            id={`${id}-tab-${index}`}
            aria-controls={`${id}-tabpanel-${index}`}
            onClick={() => {
              item.href && router.push(item.href)
            }}
            sx={{ '&.active': { backgroundColor: colors[item.brandColor] } }}
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
export { RoutedTabs }
