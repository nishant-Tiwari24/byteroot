import { MenuOutlined } from '@ant-design/icons'
import { Flex, Layout, Menu } from 'antd'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import { TabAdmin } from '../TabAdmin'
import { TabNotification } from '../TabNotifications'
import { TabProfile } from '../TabProfile'

const { Header } = Layout

interface Props {
  isMobile?: boolean
  logo?: ReactNode
  items: { key: string; label: string; onClick: () => void }[]
  itemsMobile: { key: string; label: string; onClick: () => void }[]
}

export const Topbar: React.FC<Props> = ({
  isMobile,
  logo,
  items,
  itemsMobile,
}) => {
  const pathname = usePathname()

  const style: any = {}

  const isThin = items.length === 0

  if (isThin) {
    style.height = '60px'
  }

  if (isMobile) {
    return (
      <>
        <Header style={{ marginLeft: '10px' }}>
          <Flex align="center" justify="">
            {logo}
            <Menu
              mode="horizontal"
              items={itemsMobile}
              selectedKeys={[pathname]}
              style={{ width: 46 }}
              overflowedIndicator={<MenuOutlined />}
            />
          </Flex>
        </Header>
      </>
    )
  }

  return (
    <>
      <Header style={{ marginLeft: '-20px' }}>
        {' '}
        <Flex
          align="center"
          className="text-green-400"
          style={{ flex: 3, fontSize: '18px', color: '#fff' }}
        >
          {logo}

          <Flex vertical flex={1}>
            <Menu
              mode="horizontal"
              items={items}
              selectedKeys={[pathname]}
              overflowedIndicator={<MenuOutlined />}
              style={{ flex: 3, fontSize: '18px', color: '#fff' }}
              className="font-Roboto font-bold "
            />
          </Flex>

          <Flex align="center" gap="middle">
            <TabNotification />
            <TabProfile />
          </Flex>
        </Flex>
      </Header>
    </>
  )
}
