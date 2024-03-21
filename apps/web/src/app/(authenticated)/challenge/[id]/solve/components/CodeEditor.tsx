import { useRef, useState } from 'react'
import { Box, HStack } from '@chakra-ui/react'
import { Editor } from '@monaco-editor/react'
import LanguageSelector from 'apps/web/src/app/(authenticated)/challenge/[id]/solve/components/Language'
import {
  LANGUAGE_VERSIONS,
  CODE_SNIPPETS,
} from 'apps/server/src/modules/solve/constants'
import Output from './Output'

const CodeEditor = () => {
  const editorRef = useRef()
  const [value, setValue] = useState('')
  const [language, setLanguage] = useState('javascript')

  const onMount = editor => {
    editorRef.current = editor
    editor.focus()
  }

  const onSelect = language => {
    setLanguage(language)
    setValue(CODE_SNIPPETS[language])
  }

  return (
    <Box>
      <HStack spacing={4}>
        <Box w="75%" className="">
          <LanguageSelector language={language} onSelect={onSelect} />
          <Editor
            options={{
              minimap: {
                enabled: false,
              },
              fontSize: 16,
              padding: { top: 12 },
            }}
            height="74vh"
            theme="vs-dark"
            language={language}
            defaultValue={CODE_SNIPPETS[language]}
            onMount={onMount}
            value={value}
            onChange={value => setValue(value)}
          />
        </Box>
        <Output editorRef={editorRef} language={language} />
      </HStack>
    </Box>
  )
}
export default CodeEditor
