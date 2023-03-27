import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastService } from '../../shared/services/toastr/toast.service';
import { tap, shareReplay, catchError, throwError, Subject, BehaviorSubject } from 'rxjs';
import { ChangeDetectionStrategy, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProfileService } from '../../shared/services/profile/profile.service';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { NgIf, AsyncPipe } from '@angular/common';

@Component({
    selector: 'yimcipe-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgIf, LoadingSpinnerComponent, FormsModule, ReactiveFormsModule, AsyncPipe]
})
export class ProfileComponent implements OnInit {
  passwordVisibilityState = false

  authUser = JSON.parse(localStorage.getItem('authUser') || '{}')

  isLoading$: Subject<boolean> = new Subject<boolean>();

  userProfile$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  photo!: any;
  file!: File | null;

  profileForm: FormGroup = new FormGroup({
    fullName: new FormControl(''),
    occupation: new FormControl(''),
    photo: new FormControl(''),
  });
  parsedProfile = JSON.parse(localStorage.getItem('profile') || '{}')

  constructor(public profileService: ProfileService, private toastService: ToastService) {
    this.profileService.getProfile(this.authUser.userId)
    this.userProfile$.next(this.parsedProfile)
  }

  ngOnInit(): void {
  }

  formIsValid() {
    return !this.profileForm.get('fullName')?.value
      && !this.profileForm.get('occupation')?.value
      && !this.profileForm.get('photo')?.value
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.file = file
    }
  }


  updateProfile() {
    const data = {
      fullName: this.profileForm.get('fullName')?.value,
      occupation: this.profileForm.get('occupation')?.value,
      photo: this.file
    }
    const payload = this.trimPayload(data)
    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      formData.append(key, value as any)
    })
    this.isLoading$.next(true);
    this.profileService.updateProfile(formData, this.authUser.userId, this.userProfile$.getValue().profileId).pipe(
      tap((response: any) => {
        this.isLoading$.next(false);
        if (response?.success) {
          this.toastService.showSuccess(response.message)
          this.profileService.getProfile(this.authUser.userId)
          this.userProfile$.next(this.parsedProfile)
        }
        else {
          this.isLoading$.next(false);
          this.toastService.showError(response.message)
        }
      }),
      catchError((error: any) => {
        this.isLoading$.next(false);
        this.toastService.showError(error.error.message)
        return throwError(() => { error })
      }),
      shareReplay(1)
    ).subscribe(() => {
      this.isLoading$.next(false);
      this.profileForm.reset()
    })
  }

  trimPayload(profilePayload: any) {
    const trimmedPayload = Object.entries(profilePayload).filter(ob => Boolean(ob[1]))
    const newPayload = Object.fromEntries(trimmedPayload)
    return newPayload
  }

}
