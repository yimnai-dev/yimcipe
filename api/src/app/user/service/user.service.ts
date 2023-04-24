import {
  VerifyUserDto,
  UpdateCredentialsDto,
  UserByIdDto,
  RegisterUserDto,
} from '../../../dtos/dto.holder';
import { UserRegistrationMechanism } from '../../utils/types/user.type';
import { generateUUID } from './../../utils/cid-generator.util';
import { encryptPassword } from './../../utils/password.util';
import { User } from './../../models/user.model';
import { HttpException, HttpStatus, Injectable, Session } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Request } from 'express';
import { SendMailService } from '../../shared/services/mail/mail.service';
import { Profile } from '../../models/profile.model';
import { baseUserAvatar } from '../../utils/data.util';
import { randomCodeGenerator } from 'src/app/utils/random-number.util';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private sendMailService: SendMailService,
    @InjectModel(Profile)
    private profileModel: typeof Profile,
  ) {}

  async verifyEmail(user: VerifyUserDto, req: Request) {
    const randomCode = randomCodeGenerator();

    // eslint-disable-next-line @typescript-eslint/ban-types
    let payload: {} = {};
    const message = `
    <p>Hey ${user.email},</p>
    <p>Please copy the code below and enter in the form. It expires in 15 minutes after which you would have to verify your email again</p>
    <h1><strong>${randomCode}</strong></h1>
    <p>If you did not request this email you can safely ignore it.</p>`;
    const subject = 'Email Verification';
    const userExists = await this.userModel.findOne({
      where: { email: user.email },
    });
    if (userExists) {
      return {
        success: false,
        message: 'A user with this email already exists',
        status: HttpStatus.EXPECTATION_FAILED,
      };
    }
    await this.sendMailService
      .sendEmail(user.email, subject, message)
      .then((result) => {
        req.session.verificationCode = randomCode;
        req.session.verificationEmail = user.email;
        payload = {
          success: true,
          message: result,
          status: HttpStatus.OK,
        };
      })
      .catch((error) => {
        payload = {
          success: false,
          message: error,
          status: HttpStatus.BAD_REQUEST,
        };
      });
    return { ...payload };
  }

  async registerUser(
    user: RegisterUserDto,
    @Session() session: Record<string, any>,
  ) {
    const userExists = await this.userModel.findOne({
      where: { email: user.email },
    });
    if (userExists) {
      return {
        success: false,
        message: 'A user with this email already exists',
        status: HttpStatus.EXPECTATION_FAILED,
      };
    }
    if (user.password.length < 8) {
      return {
        success: false,
        message: 'Password must contain at least 8 characters',
        status: HttpStatus.EXPECTATION_FAILED,
      };
    }
    if (!user.username || !user.email || !user.password) {
      return {
        success: false,
        message: 'All fields (email, password, username) are required',
        status: HttpStatus.EXPECTATION_FAILED,
      };
    }
    const hashedPassword = encryptPassword(user.password);
    const userId = generateUUID();
    if (
      !user.verificationCode ||
      +user.verificationCode !== session.verificationCode ||
      user.email !== session.verificationEmail
    ) {
      return {
        success: false,
        message:
          'Verification code does not match or email does not match that used to get verification code',
        status: HttpStatus.BAD_REQUEST,
      };
    }
    const payload = {
      userId: userId,
      username: user.username,
      email: user.email,
      password: hashedPassword,
      registrationMechanism: UserRegistrationMechanism.LOCAL_SIGNUP,
    };
    const createUser = await this.userModel.create(payload);
    const initProfile = await this.profileModel.create({
      profileId: generateUUID(),
      userId: userId,
      photo: baseUserAvatar,
    });
    if (createUser && initProfile) {
      return {
        success: true,
        message: 'Successfully created new user and initialized profile',
        status: HttpStatus.CREATED,
      };
    }
    return {
      success: false,
      message: 'Could not create user successfully due to an unknown error',
      status: HttpStatus.EXPECTATION_FAILED,
    };
  }

  async getAllUsers() {
    const users = await this.userModel.findAll({
      attributes: {
        exclude: ['password'],
      },
      include: [Profile],
    });
    if (!users) {
      return {
        success: false,
        message: 'Not users exist yet!',
        status: HttpStatus.NOT_FOUND,
      };
    }
    return {
      success: true,
      message: 'Users fetched successfully',
      payload: users,
    };
  }

  async deleteUser(user: UserByIdDto) {
    const account = await this.userModel.destroy({
      where: { userId: user.userId },
    });
    if (!account) {
      return {
        success: false,
        message: 'Could not get User with given ID!',
        status: HttpStatus.NOT_FOUND,
      };
    }
    return {
      success: true,
      message: 'User with given ID fetched',
      payload: account,
    };
  }

  async updateUser(user: UserByIdDto, data: UpdateCredentialsDto) {
    const userExists = await this.userModel.findOne({
      where: { userId: user.userId },
    });
    if (!userExists) {
      return {
        success: false,
        message: 'User could not be found.',
        status: HttpStatus.NOT_FOUND,
      };
    }

    const payload = {
      username: data.username ? data.username : userExists.get('username'),
      email: data.email ? data.email : userExists.get('email'),
      password: data.password
        ? encryptPassword(data.password)
        : userExists.get('password'),
    };

    const updatedUser = await this.userModel.update(payload, {
      where: { userId: user.userId },
    });
    if (!updatedUser) {
      return {
        success: false,
        message: 'User could not be updated',
        status: HttpStatus.EXPECTATION_FAILED,
      };
    }
  }

  async forgotPassword(user: VerifyUserDto, req: Request) {
    // eslint-disable-next-line @typescript-eslint/ban-types
    let payload: {} = {};
    const userExists = await this.userModel.findOne({
      where: { email: user.email },
    });
    if (!userExists) {
      return new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    }
    const resetCode = randomCodeGenerator();

    await this.userModel.update(
      {
        passwordResetToken: resetCode,
        passwordResetExpires: new Date(
          Date.now() + 3600000,
        ).toLocaleTimeString(),
      },
      { where: { email: user.email } },
    );
    const message = `
    <p>Hey ${user.email},</p>
    <p>Please copy this token and paste in the field. Do not share it with anyone. It expires in one hour after which you would have to verify your email again</p>
    <h1><strong>${resetCode}</strong></h1>
    <p>If you did not request this email you can safely ignore it.</p>

  `;
    const subject = 'Reset Password';
    await this.sendMailService
      .sendEmail(user.email, subject, message)
      .then((result) => {
        req.session.verificationCode = resetCode;
        req.session.verificationEmail = user.email;
        payload = {
          success: true,
          message: result,
          status: HttpStatus.OK,
        };
      })
      .catch((error) => {
        payload = {
          success: false,
          message: error,
          status: HttpStatus.NOT_FOUND,
        };
      });
    return { ...payload };
  }

  resetPassword = async (verificationCode: number, req: Request) => {
    if (verificationCode !== req.session.verificationCode) {
      return {
        success: false,
        message: 'Invalid Password Reset Code',
        status: HttpStatus.PRECONDITION_FAILED,
      };
    }
    const userExists =
      req.session.verificationEmail &&
      (await this.userModel.findOne({
        where: { email: req.session.verificationEmail },
      }));
    if (!userExists) {
      return {
        success: false,
        message: 'Reset token has expired. Ask for another',
        status: HttpStatus.GATEWAY_TIMEOUT,
      };
    }
    if (
      verificationCode.toString() !==
      userExists.getDataValue('passwordResetToken')
    ) {
      return {
        success: false,
        message: 'Invalid reset Token',
        status: HttpStatus.FORBIDDEN,
      };
    }
    const passwordResetEnabled = await this.userModel.update(
      {
        passwordResetToken: null,
        passwordResetExpires: null,
        passwordResetPossible: true,
      },
      { where: { email: req.session.verificationEmail } },
    );
    if (!passwordResetEnabled) {
      return {
        success: false,
        message: 'Permission Denied. Try again later',
        status: HttpStatus.PRECONDITION_FAILED,
      };
    }

    return {
      success: true,
      message: 'Password change enabled.',
      status: HttpStatus.CREATED,
    };
  };

  changePassword = async (
    newPass: string,
    confirmPass: string,
    email: string,
  ) => {
    if (newPass.length < 8 || confirmPass.length < 8) {
      return {
        success: false,
        message: 'Password is too short',
        status: HttpStatus.NOT_ACCEPTABLE,
      };
    }
    if (newPass !== confirmPass) {
      return {
        success: false,
        message: 'Passwords do not match!',
        status: HttpStatus.NOT_ACCEPTABLE,
      };
    }
    const encrpytedNewPass = encryptPassword(newPass);
    const changePassword = await this.userModel.update(
      { password: encrpytedNewPass },
      { where: { email: email } },
    );
    if (!changePassword) {
      return {
        success: false,
        message: 'Could not update password. Try again later',
        status: HttpStatus.EXPECTATION_FAILED,
      };
    }
    await this.userModel.update(
      { passwordResetPossible: false },
      { where: { email: email } },
    );
    return {
      success: true,
      message: 'Password changed successfully',
      status: HttpStatus.CREATED,
    };
  };
}
