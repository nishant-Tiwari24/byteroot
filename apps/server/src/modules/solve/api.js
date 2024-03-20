import axios from 'axios'
import { LANGUAGE_VERSIONS } from 'apps/server/src/modules/solve/constants'

const API = axios.create({
  baseURL: 'https://emkc.org/api/v2/piston',
})

export const executeCode = async (language, sourceCode) => {
  const response = await API.post('/execute', {
    language: language,
    version: LANGUAGE_VERSIONS[language],
    files: [
      {
        content: sourceCode,
      },
    ],
  })
  return response.data
}
