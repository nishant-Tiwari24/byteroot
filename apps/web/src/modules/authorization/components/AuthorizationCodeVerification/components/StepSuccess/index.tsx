import { Button, Flex, Result } from 'antd'
import React from 'react'

interface Props {
  onContinue: () => void
}

export const StepSuccess: React.FC<Props> = ({ onContinue }) => {
  return (
    <>
      <Result
        status="success"
        title="Verification completed"
        style={{ padding: 0 }}
      ></Result>

      <Flex justify="center">
        <Button type="primary" onClick={onContinue}>
          Continue
        </Button>
      </Flex>
    </>
  )
}
