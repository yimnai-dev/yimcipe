import { Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../user/guards/jwt-auth.guard';
import { VoteService } from '../service/vote.service';

@ApiTags('Votes')
@UseGuards(JwtAuthGuard)
@Controller('recipes/vote')
export class VoteController {

    constructor(
        private readonly voteService: VoteService
    ) {}
    @Post('make-vote')
    makeVote(
        @Query('recipeId') recipeId: string,
        @Query('voterId') voterId: string,
        @Query('voteType') voteType: 'upvote' | 'downvote'
    ){
        return this.voteService.makeOrChangeVote(voterId, recipeId, voteType)
    }

    @Get('all')
    getAllVotes(){
        return this.voteService.getVotes()
    }

}
