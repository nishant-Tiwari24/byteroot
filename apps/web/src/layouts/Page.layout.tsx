import { Col, Flex } from 'antd'

type LayoutType = 'full-width' | 'narrow' | 'super-narrow'

interface Props {
  children: React.ReactNode
  layout?: LayoutType
  isCentered?: boolean
}

const getLayoutBreakpoints = (layout: LayoutType) => {
  const mapping: Record<LayoutType, Record<string, { span: number }>> = {
    'full-width': {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 24 },
      lg: { span: 24 },
      xl: { span: 24 },
      xxl: { span: 24 },
    },
    narrow: {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 24 },
      lg: { span: 16 },
      xl: { span: 14 },
      xxl: { span: 12 },
    },
    'super-narrow': {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 24 },
      lg: { span: 12 },
      xl: { span: 10 },
      xxl: { span: 8 },
    },
  }

  return mapping[layout] ?? mapping['full-width']
}

export const PageLayout: React.FC<Props> = ({
  children,
  layout = 'full-width',
  isCentered = false,
  ...props
}) => {
  const breakpoints = getLayoutBreakpoints(layout)

  return (
    <>
      <Flex style={{ width: '100%' }} justify="center">
        <Col
          {...props}
          {...breakpoints}
          className="p-2"
          style={{ paddingBottom: '100px' }}
        >
          {isCentered && (
            <Flex
              align="center"
              justify="center"
              vertical
              flex={1}
              style={{ minHeight: '100%' }}
            >
              {children}
            </Flex>
          )}
          {!isCentered && children}
        </Col>
      </Flex>
    </>
  )
}
