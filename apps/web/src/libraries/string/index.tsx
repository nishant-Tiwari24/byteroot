export namespace StringLibrary {
  export function stringify(value: any = {}): string {
    return JSON.stringify(value, null, 2)
  }

  export function capitalise(content: string): string {
    if (!content) {
      return ''
    }
    return content.charAt(0).toUpperCase() + content.slice(1)
  }

  export function toCamelCase(content: string): string {
    const REGEX_UPPERCASE = /^[A-Z]+$/g
    const isAllUpperCase = REGEX_UPPERCASE.test(content)

    if (isAllUpperCase) {
      return content.toLowerCase()
    }

    return content
      .toLowerCase()
      .replace(/_([a-zA-Z0-9])/g, (_, match) => match.toUpperCase())
  }

  export function toCapitalisedCamelCase(content: string): string {
    const contentCamelCase = toCamelCase(content)
    const contentCapitalised = capitalise(contentCamelCase)

    return contentCapitalised
  }

  export function isDefined(value: string): boolean {
    return typeof value === 'string' && value.trim() !== ''
  }
}
