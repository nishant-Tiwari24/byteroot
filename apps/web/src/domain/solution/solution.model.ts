import { Discussion } from '../discussion'

export class Solution {
  id: string

  content: string

  upvotes: number

  discussionId: string

  discussion?: Discussion

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
