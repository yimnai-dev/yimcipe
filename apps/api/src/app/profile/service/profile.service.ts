import { CACHE_MANAGER, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Profile } from '../../models/profile.model';
import { ProfileDto } from '../../../../../../libs/api-interfaces/src/lib/dto.holder';
import { generateUUID } from '../../utils/cid-generator.util';
import { User } from '../../models/user.model';
import { UProfile } from '../../utils/profile.util';
import { profileImageIsValid } from '../../utils/profile-image-validator';

@Injectable()
export class ProfileService {

    constructor(
        @InjectModel(Profile)
        private readonly profileModel: typeof Profile,
        @InjectModel(User)
        private readonly userModel: typeof User,
        @Inject(CACHE_MANAGER)  private readonly cacheManager: Cache

    ){}

    createProfile = async (profile: ProfileDto, photo: Express.Multer.File) => {
        const profileId = generateUUID()
        const isImageValid = profileImageIsValid(photo)
        if(!isImageValid.valid){
            return {
                success: isImageValid.valid,
                message: isImageValid.reason,
                status: HttpStatus.BAD_REQUEST
            }
        }

        const userProfile: UProfile = {
            ...profile,
            profileId: profileId,
            photo: photo,
            status: 'UNVERIFIED'
        }
        const verifyUserExistence = await this.userModel.findOne({where: {userId: profile.userId}})
        if(!verifyUserExistence){
            return {
                success: false,
                message: 'User for whom this profile is created does not exist. Make sure the userId is correct',
                status: HttpStatus.AMBIGUOUS
            }
        }
        const createUserProfile = await this.profileModel.findOrCreate({where: {...userProfile}})
        if(!createUserProfile){
            return {
                success: false,
                message: 'Could not create user profile',
                status: HttpStatus.BAD_REQUEST
            }
        }
        return {
            success: true,
            message: 'User profile created successfully',
            status: HttpStatus.CREATED
        }
    }

    updateProfile = async (profile: Partial<Pick<UProfile, 'fullName' | 'occupation' | 'photo'>>, userId: string, profileId: string) => {
        const profileDeterminant = {...profile} as const
        type streamlinedProfile = Pick<UProfile, 'fullName' | 'occupation' | 'photo'>
        type IUProfile = Partial<Pick<streamlinedProfile, keyof typeof profileDeterminant>>
        const profileToupdate: IUProfile = {...profile}
        if(!userId || !profileId){
            return {
                success: false,
                message: 'userId and profileId are required',
                status: HttpStatus.PRECONDITION_FAILED
            }
        }
        if(Object.entries(profile).length === 0){
            return {
                success: false,
                message: 'You must update at least one property',
                status: HttpStatus.PARTIAL_CONTENT
            }
        }
        const update = await this.profileModel.update(profileToupdate, {where: {userId: userId, profileId: profileId}})
        if(!update){
            return {
                success: false,
                message: 'Could not update profile',
                status: HttpStatus.FAILED_DEPENDENCY
            }
        }
        return {
            success: true,
            message: 'Profile updated successfully',
            status: HttpStatus.OK
        }
    }

    deleteProfile = async (profileId: string) => {
        const deleteP = await this.profileModel.destroy({where: {profileId: profileId}})
        if(!deleteP){
            return {
                success: false,
                message: 'Could not delete user profile',
                status: HttpStatus.FORBIDDEN
            }
        }
        return {
            success: true,
            message: 'User profile deleted successfully',
            status: HttpStatus.OK
        }
    }

    getUserProfile = async (userId: string) => {
        const profile = await this.profileModel.findOne({where: {userId: userId}});
        if(!profile){
            return{
                success: false,
                message: 'Could not find user profile',
                status: HttpStatus.NOT_FOUND
            }
        }
        return {
            success: true,
            message: 'Profile found',
            status: HttpStatus.OK,
            profile: profile
        }
    }


}
