import { Body, Controller, Delete, Get, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import ProfileDto from 'libs/api-interfaces/src/lib/profile.dto';
import { ProfileService } from '../service/profile.service';
import { FileInterceptor } from '@nestjs/platform-express'
import { JwtAuthGuard } from '../../user/guards/jwt-auth.guard';
// import { diskStorage } from 'multer';
import {} from 'multer'
import { UProfile } from '../../utils/profile.util';

@ApiTags('Profile')
@UseGuards(JwtAuthGuard)
@Controller('users/profile')
export class ProfileController {

    constructor(private profileService: ProfileService){}

    @Post('create')
    @UseInterceptors(FileInterceptor('profilePhoto'))
    createUserProfile(
        @UploadedFile() profilePhoto: Express.Multer.File,
        @Body() profile: ProfileDto
    ){
        return this.profileService.createProfile(profile, profilePhoto)
    }

    @Put('update')
    @UseInterceptors(FileInterceptor('photo'))
    updateUserProfile(
        @Body() profile: Partial<ProfileDto>,
        @Query('userId') userId: string,
        @Query('profileId') profileId: string,
        @UploadedFile() photo: Express.Multer.File
    ){
        console.log('Profile: ', profile)
        console.log('typeof profile: ', typeof profile)
        return this.profileService.updateProfile(profile, userId, profileId, photo)
    }

    @Delete('delete')
    deleteProfile(
        @Query('profileId') profileId: string
    ){
        return this.profileService.deleteProfile(profileId)
    }

    @Get('get-profile')
    getUserProfile(
        @Query('profileId') profileId: string
    ){
        return this.profileService.getUserProfile(profileId)
    }
    
}
