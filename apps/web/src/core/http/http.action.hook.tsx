import { useSnackbar } from 'notistack'
import { useState } from 'react'

interface Options {
  defaultData?: any
}

interface ReturnType {
  data: any
  isLoading: boolean
  isSuccess: boolean
  error: string
  run: (query: () => Promise<any>) => Promise<any>
  clear: () => void
}

export const useHttpAction = (options: Options = {}): ReturnType => {
  const { enqueueSnackbar } = useSnackbar()

  const [data, setData] = useState(options.defaultData)
  const [isLoading, setLoading] = useState(false)
  const [isSuccess, setSuccess] = useState(false)
  const [error, setError] = useState<string>()

  const run = async (query: () => Promise<any>) => {
    setLoading(true)

    try {
      const data = await query()

      setData(data)

      setSuccess(true)
    } catch (error) {
      setError(error.message)
      enqueueSnackbar(error.message)
    }

    setLoading(false)
  }

  const clear = () => {
    setData(options.defaultData)
    setLoading(false)
    setError(undefined)
  }

  return {
    data,
    isLoading,
    isSuccess,
    error,
    run,
    clear,
  }
}
