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
    private readonly recipeModel: typeof User,
  ) {}

  getVotes = async () => {
    const votes = await this.voteModel.findAll();
    if (!votes) {
      return {
        success: false,
        message: 'Could not retrieve votes',
        status: HttpStatus.EXPECTATION_FAILED,
      };
    }
    return {
      success: true,
      message: 'Successfully retrieved votes',
      status: HttpStatus.ACCEPTED,
      votes: votes,
    };
  };

  makeOrChangeVote = async (
    voterId: string,
    recipeId: string,
    type: 'upvote' | 'downvote',
  ) => {
    const voteOpts = ['upvote', 'downvote'];
    const verifyVoteType = voteOpts.find((vote) => vote === type.toLowerCase());
    if (!verifyVoteType) {
      return {
        success: false,
        message: 'Vote type must either upvote or downvote',
        status: HttpStatus.EXPECTATION_FAILED,
      };
    }
    const userExists = await this.userModel.findOne({
      where: { userId: voterId },
    });
    if (!userExists) {
      return {
        success: false,
        message: 'Voter does not exist',
        status: HttpStatus.NOT_FOUND,
      };
    }
    const recipeExists = await this.recipeModel.findOne({
      where: { recipeId: recipeId },
    });
    if (!recipeExists) {
      return {
        success: false,
        message: 'Recipe you are trying to upvote does not exist any more!',
        status: HttpStatus.NOT_FOUND,
      };
    }
    const voteExists = await this.voteModel.findOne({
      where: { voterId: voterId, recipeId: recipeId },
    });
    if (!voteExists) {
      const createVote = await this.voteModel.create({
        recipeId: recipeId,
        voterId: voterId,
        upvote: type.toLowerCase() === voteOpts[0] ? 1 : 0,
        downvote: type.toLowerCase() === voteOpts[1] ? 1 : 0,
      });
      if (!createVote) {
        return {
          success: false,
          message: 'Could not successfully create new vote',
          status: HttpStatus.EXPECTATION_FAILED,
        };
      }
      return {
        success: true,
        message: `Successfully created new vote for recipe with id: ${recipeId}`,
        status: HttpStatus.OK,
      };
    }
    // const payload = type === 'upvote' ? {upvote: 1 ? 0 : 1, downvote: 0 ? 1 : 0} : {upvote: 0 ? 1 : 0, downvote: 1 ? 0 : 1}
    const upvote = voteExists.getDataValue('upvote') as number;
    const downvote = voteExists.getDataValue('downvote') as number;
    const payload =
      type === 'upvote'
        ? { upvote: !upvote, downvote: downvote === 0 ? 0 : !downvote }
        : { downvote: !downvote, upvote: upvote === 0 ? 0 : !upvote };
    // const payload = {upvote: upvote, downvote: downvote}
    const updateVote = await this.voteModel.update(payload, {
      where: { recipeId: recipeId, voterId: voterId },
    });
    if (updateVote) {
      return {
        success: true,
        message: 'Vote updated successfully',
        status: HttpStatus.ACCEPTED,
      };
    }
    return {
      success: false,
      message: 'Could not update vote',
      status: HttpStatus.EXPECTATION_FAILED,
    };
  };
}
