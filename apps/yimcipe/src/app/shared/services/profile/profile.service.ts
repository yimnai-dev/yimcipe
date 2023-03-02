import { HttpService } from './../http/http.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ProfileService {

  constructor(private http: HttpService) { }

  profileBaseUrl = 'users/profile';
  // profileBaseUrl = 'https://api.yimcipe.com/api/v1/users/';

  getProfile(userId: string) {
     this.http.get(`${this.profileBaseUrl}/get-profile?userId=${userId}`)
     .subscribe((response: any) => {
      localStorage.setItem('profile', JSON.stringify(response.profile))
     })
  }

  updateProfile(profile: FormData, userId: string, profileId: string){
    return this.http.update(`${this.profileBaseUrl}/update?userId=${userId}&profileId=${profileId}`, profile);
  }


}
