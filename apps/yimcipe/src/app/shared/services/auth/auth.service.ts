import { User } from './../../interfaces/interface';
import { HttpService } from '../http/http.service';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class AuthService {

  constructor(private httpService: HttpService){}

  authBaseUrl = 'users/auth'

  sendVerificationEmail(user: Pick<User, "email">){
    return this.httpService.post(`${this.authBaseUrl}/verify-email`, user)
  }

  registerUser(user: Pick<User, 'verificationCode' | 'username' | 'email' | 'password'>){
    return this.httpService.post(`${this.authBaseUrl}/register`, user);
  }

  loginUser(user: Pick<User, "email" | "password">){
    return this.httpService.post(`${this.authBaseUrl}/login`, user)
  }


  //Perhaps not too clean Authentication Logic and methods here. Doesn't just return observable APIs. Let just say computation(Don't know why I said that :)
  setUserSession(authUser: Pick<User, "access_token" | "expires_in">){
    const expiresAt = moment().add(authUser.expires_in, 'second');
    localStorage.setItem('access_token', authUser.access_token)
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  logout(){
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_at');
  }

  isLoggedIn(){
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut(){
    return !this.isLoggedIn()
  }

  getExpiration(){
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration as string);
    return moment(expiresAt);
  }
}
