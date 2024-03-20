import { useCoreStore } from '@web/core/store'
import { useRouter } from 'next/navigation'
import React, { ReactNode, useEffect, useState } from 'react'

type Props = {
  children: ReactNode
  roles?: string[]
}

export const AuthorizationGuard: React.FC<Props> = ({
  children,
  roles = [],
}) => {
  const store = useCoreStore()
  const router = useRouter()

  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    const isAuthorised = store.roles.some(role => roles.includes(role.name))

    if (!isAuthorised) {
      router.push('/')

      return
    }

    setLoading(false)
  }, [roles])

  return <>{!isLoading ? <>Loading</> : children}</>
}
