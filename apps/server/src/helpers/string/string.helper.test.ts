import { StringHelper } from './string.helper'

describe('toCamelCase', () => {
  test('When a string is already in camel case, then it stays in camel case', () => {
    const result = StringHelper.toCamelCase('hello_world')
    const expected = 'helloWorld'
    expect(result).toEqual(expected)
  })

  test('When a string is given, then it is converted to camel case', () => {
    const result = StringHelper.toCamelCase('hello_world')
    const expected = 'helloWorld'
    expect(result).toEqual(expected)
  })

  test('When a string with underscore is given, then it is converted to camel case', () => {
    const result = StringHelper.toCamelCase('__hello_world__')
    const expected = '__helloWorld__'
    expect(result).toEqual(expected)
  })
})
