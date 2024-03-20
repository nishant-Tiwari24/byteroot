export namespace Regex {
  export function findMatches(content: string, regexExp: RegExp): string[] {
    const matches = content.match(regexExp) ?? []

    return matches
  }

  /**
   * Returns all captured group of each regex matches.
   */
  export function findCaptures(content: string, regexExp: RegExp): string[][] {
    const captures: string[][] = []

    const matches = findMatches(content, regexExp)

    for (const match of matches) {
      const regexExpCopy = new RegExp(regexExp)
      const groups = regexExpCopy.exec(match).slice(1)
      captures.push(groups)
    }

    return captures
  }
}
