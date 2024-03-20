import { v4 as uuidv4 } from 'uuid'

export namespace Utility {
  export function getUUID(): string {
    return uuidv4()
  }

  export function sleep(milliseconds: number): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, milliseconds)
    })
  }

  export function isNull(value: any): boolean {
    return value === null || value === undefined
  }

  export function isDefined(value: any): boolean {
    return value !== null && value !== undefined
  }

  export function openInNewTab(window: Window, url: string): void {
    window.open(url, '_blank')
  }

  export function sortByString<Type>(items: Type[], key: keyof Type): Type[] {
    return items.sort((a: Type, b: Type) =>
      (a[key] as string).localeCompare(b[key] as string),
    )
  }

  export function removeTrailingSlash(content: string): string {
    const REGEX_SLASH = /\/$/g

    return content.replace(REGEX_SLASH, '')
  }

  export function stringToInitials(content: string): string {
    const words = content.trim().split(' ')

    const isOneWord = words.length === 1

    if (isOneWord) {
      return words[0].slice(0, 2)?.toUpperCase()
    }

    return `${words[0][0]}${words[1][0]}`.toUpperCase()
  }
}
