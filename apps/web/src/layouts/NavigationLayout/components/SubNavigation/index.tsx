import { Breadcrumb, Flex, Layout } from 'antd'
import { useBreadcrumb } from './useBreadcrumb'

const { Header } = Layout

interface Props {
  items: { key: string; label: string; onClick?: () => void }[]
}

export const SubNavigation: React.FC<Props> = ({ items }) => {
  const { items: itemsBreadcrumb } = useBreadcrumb({ items })

  return (
    <>
      <Header style={{ width: '100%', height: '26px' }}>
        <Flex align="center">
          <Breadcrumb items={itemsBreadcrumb} />
        </Flex>
      </Header>
    </>
  )
}
