import { CheckCircleOutlined } from '@ant-design/icons'
import { Col, Flex, Row, Typography } from 'antd'
import React, { HTMLAttributes, ReactNode } from 'react'
import { usePassword } from './usePasword'
export interface PropsHTML extends HTMLAttributes<HTMLDivElement> {}

interface Props extends PropsHTML {
  value: string
}

export const MrbPasswordStrength: React.FC<Props> = ({ value, ...props }) => {
  const getIconName = (isOk: boolean): ReactNode => {
    if (isOk) {
      return <CheckCircleOutlined />
    } else {
      return (
        <div
          style={{
            height: '14px',
            width: '14px',
            marginTop: '4px',
            borderRadius: '50%',
            border: '1px solid lightgrey',
          }}
        ></div>
      )
    }
  }

  const { hasNumber, hasSpecialCharacter, hasUppercaseLetter, isLengthOk } =
    usePassword(value)

  return (
    <>
      <Flex {...props} vertical>
        <Row>
          <Col xs={2}>
            <Typography.Text type="secondary">
              {getIconName(isLengthOk)}
            </Typography.Text>
          </Col>
          <Col xs="fill">
            <Typography.Text type="secondary">
              minimum 8 characters
            </Typography.Text>
          </Col>
        </Row>

        <Row>
          <Col xs={2}>
            <Typography.Text type="secondary">
              {getIconName(hasNumber)}
            </Typography.Text>
          </Col>
          <Col xs="fill">
            <Typography.Text type="secondary">
              {' '}
              contains a number
            </Typography.Text>
          </Col>
        </Row>
        <Row>
          <Col xs={2}>
            <Typography.Text type="secondary">
              {getIconName(hasUppercaseLetter)}
            </Typography.Text>
          </Col>
          <Col xs="fill">
            <Typography.Text type="secondary">
              {' '}
              contains uppercase letter
            </Typography.Text>
          </Col>
        </Row>
        <Row>
          <Col xs={2}>
            <Typography.Text type="secondary">
              {getIconName(hasSpecialCharacter)}
            </Typography.Text>
          </Col>
          <Col xs="fill">
            <Typography.Text type="secondary">
              {' '}
              contains special character
            </Typography.Text>
          </Col>
        </Row>
      </Flex>
    </>
  )
}
