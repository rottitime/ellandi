import { useMemo } from 'react'
import { useRouter } from 'next/router'
import Tabs, { TabItem } from '@/components/UI/Tabs/Tabs'

export type RoutedTabItem = Omit<TabItem, 'href'> & {
  id: string
}

const RoutedTabs = ({
  routedTabItems,
  tabsPath
}: {
  routedTabItems: RoutedTabItem[]
  tabsPath: string
}) => {
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

  return <Tabs tabItems={tabItems} activeIndex={activeIndex} />
}

export default RoutedTabs
