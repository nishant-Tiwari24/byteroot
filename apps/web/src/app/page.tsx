'use client'

import { RouterObject } from '@web/core/router'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function App() {
  const router = useRouter()

  useEffect(() => {
    router.push(RouterObject.route.HOME)
  }, [router])

  return <div className="index-page"></div>
}
