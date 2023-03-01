import { FormGroup, FormControl } from '@angular/forms';
import { ToastService } from './../../shared/services/toastr/toast.service';
import { tap, shareReplay, catchError, throwError, Subject } from 'rxjs';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ProfileService } from '../../shared/services/profile/profile.service';

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
  file!: File | null;

  profileForm: FormGroup = new FormGroup({
    fullName: new FormControl(''),
    occupation: new FormControl(''),
    photo: new FormControl(''),
  });

  constructor(public profileService: ProfileService, private toastService: ToastService) {
    this.profileService.getProfile(this.authUser.userId)
    this.profile = JSON.parse(localStorage.getItem('profile') || '{}')
   }

   ngOnInit(): void {
   }

   get formIsValid() {
     return this.profileForm.get('fullName')?.value.length === 0 && this.profileForm.get('occupation')?.value.length === 0 && this.profileForm.get('photo')?.value.length === 0;
   }

   onFileChange(event: any){
    if(event.target.files.length > 0){
      const file = event.target.files[0];
      this.file = file
    }
   }


   updateProfile(){
    const formData = {
      fullName: this.profileForm.get('fullName')?.value,
      occupation: this.profileForm.get('occupation')?.value,
      photo: this.file
    }
    const payload = this.trimPayload(formData)
    console.log('Payload: ', payload)
    this.isLoading$.next(true);
     this.profileService.updateProfile({...payload} as any, this.authUser.userId, this.profile.profileId).pipe(
      tap((response: any) => {
        this.isLoading$.next(false);
        if(response?.success){
          this.toastService.showSuccess(response.message)
          localStorage.setItem('profile', JSON.stringify(payload))
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
      console.log('Hello')
      this.profileService.getProfile(this.authUser.userId)
      this.isLoading$.next(false);
     })
   }

   trimPayload(profilePayload: any){
    const trimmedPayload = Object.entries(profilePayload).filter(ob => ob[1] !== undefined && ob[1] !== null && ob[1] !== '')
    const newPayload = Object.fromEntries(trimmedPayload)
    return newPayload
  }

}

type Payload = {fullName: string, occupation: string, photo: unknown}
