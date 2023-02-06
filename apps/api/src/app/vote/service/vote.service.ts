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
       const upvotedByThisVoter = await this.voteModel.findOne({where: {voterId: voterId}})
       if(!upvotedByThisVoter){
        const createVote = await this.voteModel.create({
            voterId: voterId, 
            recipeId: recipeId,
            upvote: voteType === 'upvote' ? 1 : 0,
            downvote: voteType === 'downvote' ? 1 : 0
        })
        if(createVote){
            return {
                success: true,
                message: voteType === 'upvote' ? 'Upvoted Successfully' : 'Downvoted Successfully'
            }
        }
        return {
            success: false,
            message: 'Could not upvote'
        }
        }
        
       const updateVote = await this.voteModel.update({
        upvote: voteType === 'upvote' ? 1 : 0,
        downvote: voteType === 'downvote' ? 1 : 0
       }, {
        where: {recipeId: recipeId, voterId: voterId}
       })
       
       if(updateVote){
        return {
            success: true,
            message: 'Voted Successfully',
            status: HttpStatus.OK
        }
       }
        return {
            success: false,
            error: 'Could not update your vote',
        }
    }
       
    }