import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Recipe } from '../../models/recipe.model';
import { User } from '../../models/user.model';
import { Vote } from '../../models/vote.model';

@Injectable()
export class VoteService {
    constructor(
        @InjectModel(Vote)
        private readonly voteModel: typeof Vote,
        @InjectModel(User)
        private readonly userModel: typeof User,
        @InjectModel(Recipe)
        private readonly recipeModel: typeof User
    ){}

    makeOrChangeVote = async (recipeId: string, voterId: string, voteType: string) => {
        const voteTypeOpts = ['UPVOTE', 'DOWNVOTE'];
        if(!voteTypeOpts.includes(voteType.toUpperCase())){
            return {
                success: false,
                message: 'Vote type must either upvote or downvote'
            }
        }
       const voterExists = await this.userModel.findOne({where: {userId: voterId}})
       if(!voterExists){
        return {
            success: false,
            message: 'Voter does not exist',
            status: HttpStatus.NOT_FOUND
        }
       }
       const recipeExists = await this.recipeModel.findOne({where: {recipeId: recipeId}})
       if(!recipeExists){
        return {
            success: false,
            message: 'Recipe you are trying to upvote does not exist any more!',
            status: HttpStatus.NOT_FOUND
        }
       }
      const voteExists = await this.voteModel.findOne({where: {voterId: voterId, recipeId: recipeId}})

      if(!voteExists || (voteExists?.getDataValue('recipeId') !== recipeId)){
        const createVote = await this.voteModel.create({
              recipeId: recipeId,
              voterId: voterId,
              upvote: voteType.toUpperCase() === 'UPVOTE' ? 1 : 0,
              downvote: voteType.toUpperCase() === 'DOWNVOTE' ? 1 : 0
            })
        if(!createVote){
          return {
              success: false,
              message: 'Could not successfully create new vote',
              status: HttpStatus.EXPECTATION_FAILED
          }
        }
        return {
            success: true,
            message: `Successfully created new vote for recipe with id: ${recipeId}`,
            status: HttpStatus.OK
        }

    }

    if(voteExists && voteExists.getDataValue('recipeId') === recipeId){
      let payload: {} = {}
      if(voteType.toUpperCase() === 'UPVOTE'){
        payload = {
          upvote: 1,
          downvote: 0,
        }
      }
      if(voteType.toUpperCase() === 'DOWNVOTE'){
        payload = {
          upvote: 0,
          downvote: 1,
        }
      }
      const updateVote = await this.voteModel.update(payload, {where: {recipeId: recipeId, voterId: voterId}})
      if(updateVote){
        const verifyVote = this.voteModel.findOne({where: {recipeId: recipeId, voterId: voterId}})
        return {
          success: true,
          message: 'Vote updated successfully',
          status: HttpStatus.ACCEPTED
        }
      }
      return {
        success: false,
        message: 'Could not update vote',
        status: HttpStatus.EXPECTATION_FAILED
      }
    }

}

getVotes = async () => {
  const votes = await this.voteModel.findAll()
  if(!votes){
    return {
      success: false,
      message: 'Could not retrieve votes',
      status: HttpStatus.EXPECTATION_FAILED
    }
  }
  return {
    success: true,
    message: 'Successfully retrieved votes',
    status: HttpStatus.ACCEPTED,
    votes: votes
  }
 }

}
