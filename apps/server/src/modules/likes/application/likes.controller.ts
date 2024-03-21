import { Request } from 'express'

import { Controller, Get, Param, Req } from '@nestjs/common'

@Controller('/v1/tweets')
export class TweetController {
  likeDomainFacade: any
  @Get('/:tweetId/likesNumber')
  async countLikes(@Param('tweetId') tweetId: string, @Req() request: Request) {
    const likesNumber = await this.likeDomainFacade.countByTweetId(tweetId)

    return likesNumber
  }
}
