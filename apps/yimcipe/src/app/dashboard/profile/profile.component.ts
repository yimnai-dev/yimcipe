import { ToastService } from './../../shared/services/toastr/toast.service';
import { tap, shareReplay, catchError, throwError, Subject } from 'rxjs';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ProfileService } from '../../shared/services/profile/profile.service';
import { Buffer } from 'buffer';

@Component({
  selector: 'yimcipe-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  passwordVisibilityState = false

  authUser = JSON.parse(localStorage.getItem('authUser') || '{}')

  isLoading$: Subject<boolean> = new Subject<boolean>();

  profile!: any;
  photo!: any;

  constructor(public profileService: ProfileService, private toastService: ToastService) {
    this.getUserProfile()
    this.profile = JSON.parse(localStorage.getItem('profile') || '{}')
    const base64 = Buffer.from(this.profile.photo.data).toString('base64');
    const dataUrl = `data:image/jpeg;base64,${base64}`;
    this.photo = dataUrl
    console.log('dataUrl', dataUrl);

   }

   model = {
    occupation: '',
    fullName: '',
    photo: '',
   }

   ngOnInit(): void {
    console.log('Profile now: ', this.profile);

   }

   getUserProfile() {
     this.profileService.getProfile(this.authUser.userId).pipe(
      shareReplay(1)
     ).subscribe((response: any) => {
      localStorage.setItem('profile', JSON.stringify(response.profile))
     });
   }

   updateProfile(){
    const profile = {...this.model};
    this.isLoading$.next(true);
     this.profileService.updateProfile(profile, this.authUser.userId, this.profile.profileId).pipe(
      tap((response: any) => {
        console.log('Response: ', response);

        this.isLoading$.next(false);
        if(response?.success){
          this.toastService.showSuccess(response.message)
          localStorage.setItem('profile', JSON.stringify(profile))
          this.profile = JSON.parse(localStorage.getItem('profile') || '{}')
        }
        else{
          this.isLoading$.next(false);
          this.toastService.showError(response.message)
        }
      }),
      catchError((error: any) => {
        this.isLoading$.next(false);
        this.toastService.showError(error.error.message)
        return throwError(() => {error})
      }),
      shareReplay(1)
     ).subscribe(() => {
      this.isLoading$.next(false);
     })
   }
}
