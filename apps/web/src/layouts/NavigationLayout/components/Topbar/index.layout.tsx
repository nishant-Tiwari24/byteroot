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

  const isThin = items.length === 0

  return (
    <Header
      className="border-b-2 border-zinc-700"
      style={{
        height: '65px',
      }}
    >
      <Flex
        align="center"
        justify="center
      "
        style={{ height: '100%' }}
      >
        {logo && (
          <div style={{ marginRight: '20px', paddingTop: '12px' }}>{logo}</div>
        )}

        {!isMobile && (
          <Menu
            mode="horizontal"
            items={items}
            selectedKeys={[pathname]}
            overflowedIndicator={<MenuOutlined />}
            color="#000"
            style={{ fontSize: '16px', color: '#fff' }}
            className="font-sans font-extralight"
          />
        )}

        {isMobile && (
          <Menu
            mode="horizontal"
            items={itemsMobile}
            selectedKeys={[pathname]}
            overflowedIndicator={<MenuOutlined />}
            style={{ width: '46px', fontSize: '18px', color: '#fff' }}
            className="font-Roboto font-bold"
          />
        )}

        <Flex align="center" gap="middle" style={{ marginLeft: 'auto' }}>
          <TabNotification />
          <TabProfile />
          <TabAdmin />
        </Flex>
      </Flex>
    </Header>
  )
}
