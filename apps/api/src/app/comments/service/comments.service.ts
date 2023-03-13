import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CommentDto } from '../../../dtos/dto.holder';
import { Comments } from '../../models/comments.model';
import { Recipe } from '../../models/recipe.model';
import { User } from '../../models/user.model';
import { generateUUID } from '../../utils/cid-generator.util';

@Injectable()
export class CommentService {
    constructor(
        @InjectModel(Comments)
        private readonly commentsModel: typeof Comments,
        @InjectModel(User)
        private readonly userModel: typeof User,
        @InjectModel(Recipe)
        private readonly recipeModel: typeof Recipe
    ) { }

    makeComment = async (commentInfo: CommentDto) => {
        const commenterExists = await this.userModel.findOne({ where: { userId: commentInfo.commenterId } })
        if (!commenterExists) {
            return {
                success: false,
                message: 'Commenter does not exist',
                status: HttpStatus.NOT_FOUND
            }
        }
        const recipeExists = await this.recipeModel.findOne({ where: { recipeId: commentInfo.recipeId } })
        if (!recipeExists) {
            return {
                success: false,
                message: 'Recipe you are trying to comment on does not longer exist!',
                status: HttpStatus.NOT_FOUND
            }
        }
        const commentId = generateUUID()
        const payload = {
            recipeId: commentInfo.recipeId,
            userId: commentInfo.commenterId,
            commentId: commentId,
            comment: commentInfo.comment
        }
        const createComment = await this.commentsModel.create({ ...payload })
        if (!createComment) {
            return {
                success: false,
                message: 'Could not comment under this recipe',
                status: HttpStatus.BAD_REQUEST
            }
        }
        return {
            success: true,
            message: 'Commented Successfully',
            status: HttpStatus.OK
        }
    }

    getAllComments = async () => {
        const comments = await this.commentsModel.findAll({
            include: {
                model: User,
                attributes: {
                    exclude: ['password', 'passwordResetToken', 'passwordResetExpires', 'passwordResetPossible', 'registrationMechanism']
                },
            },
        })
        if (!comments) {
            return {
                success: false,
                message: 'Could not load comments',
                status: HttpStatus.BAD_REQUEST
            }
        }
        return {
            success: true,
            message: 'Comments Loaded successfully!',
            comments: comments
        }
    }
}
