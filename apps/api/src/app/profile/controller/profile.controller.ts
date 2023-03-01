import { Body, Controller, Delete, Get, Put, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProfileService } from '../service/profile.service';
import { FileInterceptor } from '@nestjs/platform-express'
import { JwtAuthGuard } from '../../user/guards/jwt-auth.guard';
import {} from 'multer'

@ApiTags('Profile')
@UseGuards(JwtAuthGuard)
@Controller('users/profile')
export class ProfileController {

    constructor(private profileService: ProfileService){}

    @Put('update')
    @UseInterceptors(FileInterceptor('photo'))
    async updateUserProfile(
      @Body('fullName') fullName: string,
      @Body('occupation') occupation: string,
      @UploadedFile() photo: any,
      @Query('userId') userId: string,
      @Query('profileId') profileId: string,
    ){
      console.log('File: ', photo)
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
