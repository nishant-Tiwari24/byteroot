import { Button } from 'antd'
import React, { MouseEvent } from 'react'

type Props = {
  canClearAll: boolean
  isLoadingClearAll: boolean
  onClearAll: (event: MouseEvent<HTMLButtonElement>) => void
}

export const Actions: React.FC<Props> = ({
  canClearAll,
  onClearAll,
  isLoadingClearAll,
}) => {
  return (
    <>
      {canClearAll && (
        <Button onClick={onClearAll} loading={isLoadingClearAll}>
          Clear All
        </Button>
      )}
    </>
  )
}
