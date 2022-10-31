import { useMemo } from 'react'
import { useRouter } from 'next/router'
import Tabs, { RoutedTabItem, RoutedTabsProps, TabItem } from '@/components/UI/Tabs/Tabs'

const RoutedTabs = ({ routedTabItems, tabsPath, ...props }: RoutedTabsProps) => {
  const router = useRouter()

  const activeIndex = useMemo(() => {
    if (router.query.tab?.[0]) {
      return routedTabItems.findIndex((item) => item.id === router.query.tab[0])
    }
    return 0
  }, [routedTabItems, router.query])

  const tabItems: TabItem[] = useMemo(() => {
    return routedTabItems.map((item: RoutedTabItem) => {
      return {
        ...item,
        href: `${tabsPath}/${item.id}`
      }
    })
  }, [routedTabItems, tabsPath])

  return <Tabs tabItems={tabItems} activeIndex={activeIndex} {...props} />
}

export default RoutedTabs
