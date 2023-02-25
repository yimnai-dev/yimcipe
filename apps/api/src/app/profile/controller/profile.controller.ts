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
        @Body('fullName') fullName: string,
        @Body('occupation') occupation: string,
        @Body('photo') @UploadedFile() photo: Express.Multer.File,
        @Query('userId') userId: string,
        @Query('profileId') profileId: string,
    ){
        return this.profileService.updateProfile({fullName: fullName, occupation: occupation, photo: photo}, userId, profileId)
    }

    @Delete('delete')
    deleteProfile(
        @Query('profileId') profileId: string
    ){
        return this.profileService.deleteProfile(profileId)
    }

    @Get('get-profile')
    getUserProfile(
        @Query('userId') userId: string
    ){
        return this.profileService.getUserProfile(userId)
    }

}
