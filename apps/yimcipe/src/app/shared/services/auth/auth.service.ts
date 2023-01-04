import { HttpService } from '../http/http.service';
import { Injectable } from '@angular/core';
import { User } from '../../interfaces/interface';

@Injectable()
export class AuthService {

  constructor(private httpService: HttpService){}

  authBaseUrl = 'users/auth'

  sendVerificationEmail(user: Pick<User, "email">){
    return this.httpService.post(`${this.authBaseUrl}/verify-email`, user)
  }

  registerUser(user: User){
    return this.httpService.post(`${this.authBaseUrl}/register`, user);
  }

  loginUser(payload: Pick<User, "email" | "password">){
    return this.httpService.post(`${this.authBaseUrl}/login`, payload)
  }
}
