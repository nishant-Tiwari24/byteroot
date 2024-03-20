import { StringLibrary } from '../string'

/**
 * @provider Dayjs
 * @description A library to transform the date from the models into other format
 * @usage `dayjs(date).format(format)`
 * @import import dayjs from 'dayjs'
 */

export namespace DateLibrary {
  export function toHuman(dateString: string): string {
    if (!StringLibrary.isDefined(dateString)) {
      return ''
    }

    const date = new Date(dateString)

    if (!isDefined(date)) {
      console.error(
        'Invalid date. Please ensure you are providing the correct value.',
      )
      return dateString
    }

    const dateHuman = date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })

    const timeHuman = date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })

    return `${dateHuman}, ${timeHuman}`
  }

  export function timeAgo(dateString: string): string {
    const now = new Date()
    const date = new Date(dateString)
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (days > 7) {
      return toHuman(dateString)
    }

    if (days === 1) {
      return `a day ago`
    } else if (days > 1) {
      return `${days} days ago`
    } else if (hours > 1) {
      return `${hours} hours ago`
    } else if (minutes > 1) {
      return `${minutes} minutes ago`
    } else if (seconds >= 1) {
      return `${seconds} seconds ago`
    } else {
      return 'Just now'
    }
  }

  export function isDefined(date: Date): boolean {
    return !isNaN(date.getTime())
  }
}
