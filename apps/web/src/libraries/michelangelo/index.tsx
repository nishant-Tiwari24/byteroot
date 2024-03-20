import { RouterService } from '@web/core/router'
import { useParams, usePathname } from 'next/navigation'
import { useEffect } from 'react'

export const useMichelangelo = () => {
  const pathname = usePathname()
  const params: any = useParams()

  useEffect(() => {
    const currentUrl = `${window.location.origin}${pathname}`

    const pathPure = RouterService.restoreUrl(pathname, params)

    window.parent.postMessage(
      { type: 'navigation', url: currentUrl, pathPure },
      '*',
    )
  }, [pathname, params])

  return <></>
}
