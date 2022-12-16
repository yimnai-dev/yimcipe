import { LoginUserDto } from '../../../../../../libs/api-interfaces/src/lib/login.dto';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../service/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password'
    });
  }

  async validate(email: string, password: string): Promise<any> {
    const account = await this.authService.validateUser(email, password);
    if (!account) {
      throw new UnauthorizedException();
    }
    return account;
  }
}
