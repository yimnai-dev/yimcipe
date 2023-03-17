import { CACHE_MANAGER, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Profile } from '../../models/profile.model';
import { UProfile } from '../../utils/profile.util';
import { Buffer } from 'buffer';
import { profileImageIsValid } from '../../utils/profile-image-validator';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile)
    private readonly profileModel: typeof Profile,
  ) {}

  updateProfile = async (
    profile: Partial<Pick<UProfile, 'fullName' | 'occupation' | 'photo'>>,
    userId: string,
    profileId: string,
  ) => {
    const imageIsValid = profile.photo && profileImageIsValid(profile.photo);
    if (imageIsValid && imageIsValid.valid === false) {
      return {
        success: false,
        message: imageIsValid.reason,
      };
    }
    const profileDeterminant = { ...profile } as const;
    type streamlinedProfile = Pick<
      UProfile,
      'fullName' | 'occupation' | 'photo'
    >;
    type IUProfile = Partial<
      Pick<streamlinedProfile, keyof typeof profileDeterminant>
    >;
    const buffer =
      Boolean(profile.photo) &&
      Buffer.alloc(profile.photo.buffer.length, profile.photo.buffer, 'base64');
    const profileToupdate: IUProfile = Boolean(profile.photo)
      ? { ...profile, photo: profile.photo && buffer.toString('base64') }
      : { ...profile };
    if (!userId || !profileId) {
      return {
        success: false,
        message: 'userId and profileId are required',
        status: HttpStatus.PRECONDITION_FAILED,
      };
    }

    if (Object.entries(profile).length === 0) {
      return {
        success: false,
        message: 'You must update at least one property',
        status: HttpStatus.PARTIAL_CONTENT,
      };
    }
    const update = await this.profileModel.update(profileToupdate, {
      where: { userId: userId, profileId: profileId },
    });
    if (!update) {
      return {
        success: false,
        message: 'Could not update profile',
        status: HttpStatus.FAILED_DEPENDENCY,
      };
    }

    return {
      success: true,
      message: 'Profile updated successfully',
      status: HttpStatus.OK,
    };
  };

  deleteProfile = async (profileId: string) => {
    const deleteP = await this.profileModel.destroy({
      where: { profileId: profileId },
    });
    if (!deleteP) {
      return {
        success: false,
        message: 'Could not delete user profile',
        status: HttpStatus.FORBIDDEN,
      };
    }
    return {
      success: true,
      message: 'User profile deleted successfully',
      status: HttpStatus.OK,
    };
  };

  getUserProfile = async (userId: string) => {
    const profile = await this.profileModel.findOne({
      where: { userId: userId },
    });
    if (!profile) {
      return {
        success: false,
        message: 'Could not find user profile',
        status: HttpStatus.NOT_FOUND,
      };
    }
    return {
      success: true,
      message: 'Profile retrieved successfully',
      profile: {
        fullName: profile.getDataValue('fullName'),
        occupation: profile.getDataValue('occupation'),
        photo: profile.getDataValue('photo'),
        status: profile.getDataValue('status'),
        userId: profile.getDataValue('userId'),
        profileId: profile.getDataValue('profileId'),
      },
    };
  };
}
