import { ApiHelper } from '@web/domain/helpers/api.helper'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'

type Options = {
  defaultLoading?: boolean
  defaultData?: any
}

type QueryOptions = {
  queryOptions?: ApiHelper.QueryOptions
}

interface ReturnType {
  data: any
  isLoading: boolean
  error: string
  run: () => Promise<any>
  setData: <Type>(data: Type) => void
  pagination: {
    index: number
    next: () => void
    previous: () => void
    set: (index: number) => void
  }
}

export const useHttpQuery = (
  query: (options: QueryOptions) => Promise<any>,
  options: Options = {},
): ReturnType => {
  const { enqueueSnackbar } = useSnackbar()

  const [data, setData] = useState(options.defaultData)
  const [isLoading, setLoading] = useState(options.defaultLoading ?? true)
  const [error, setError] = useState<string>()
  const [pageIndex, setPageIndex] = useState(1)

  const nextPage = () => {
    setPageIndex(pageIndex + 1)
  }

  const previousPage = () => {
    if (pageIndex > 1) {
      setPageIndex(pageIndex - 1)
    }
  }

  const run = async () => {
    setLoading(true)

    try {
      const queryOptions: ApiHelper.QueryOptions = {
        pagination: { page: pageIndex, countItems: 50 },
      }

      const data = await query({ queryOptions })

      setData(data)
    } catch (error) {
      setError(error.message)

      enqueueSnackbar(error.message)
    }

    setLoading(false)
  }

  useEffect(() => {
    run()
  }, [])

  return {
    data,
    isLoading,
    error,
    run,
    setData,
    pagination: {
      index: pageIndex,
      previous: previousPage,
      next: nextPage,
      set: setPageIndex,
    },
  }
}
