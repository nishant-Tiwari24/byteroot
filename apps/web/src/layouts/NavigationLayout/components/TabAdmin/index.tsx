import { useCoreStore } from '@web/core/store'
import { Tag } from 'antd'
import React from 'react'

export const TabAdmin: React.FC = () => {
  const store = useCoreStore()

  return (
    <>
      {store.isAdmin && (
        <div>
          <Tag color="yellow" className="w-14 h-6 text-center font-lg">
            Admin
          </Tag>
        </div>
      )}
    </>
  )
}
