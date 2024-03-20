import { Divider, Menu } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

interface Props {
  logo: ReactNode
  items: { key: string; label: string; onClick: () => void }[]
  itemsUser: { key: string; label: string; onClick: () => void }[]
}

export const Leftbar: React.FC<Props> = ({ logo, items, itemsUser }) => {
  const pathname = usePathname()

  return (
    <>
      <Sider width={250} trigger={null} style={{ height: '100%' }}>
        {logo}

        <Menu
          mode="inline"
          items={items}
          selectedKeys={[pathname]}
          style={{ width: '100%' }}
        />
        {itemsUser?.length > 0 && (
          <>
            <Divider style={{ marginTop: 5, marginBottom: 5 }} />
            <Menu
              mode="inline"
              items={itemsUser}
              selectedKeys={[pathname]}
              style={{ width: '100%' }}
            />
          </>
        )}
      </Sider>
    </>
  )
}
