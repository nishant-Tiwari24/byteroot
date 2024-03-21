import { Box, Text } from '@chakra-ui/react'
import { Select } from 'antd'
import { LANGUAGE_VERSIONS } from 'apps/server/src/modules/solve/constants'

const languages = Object.entries(LANGUAGE_VERSIONS)
const ACTIVE_COLOR = 'blue.400'

const LanguageSelector = ({ language, onSelect }) => {
  return (
    <Box ml={2} mb={4}>
      <Select
        value={language}
        onChange={onSelect} // Use onSelect directly as onChange handler
        className="w-60 rounded-md text-black border-1"
      >
        {languages.map(([lang, version]) => (
          <Select.Option
            key={lang}
            value={lang}
            className="border-[1px] border-zinc-500 gap-1"
          >
            {`${lang} ${version}`}
          </Select.Option>
        ))}
      </Select>
    </Box>
  )
}

export default LanguageSelector
