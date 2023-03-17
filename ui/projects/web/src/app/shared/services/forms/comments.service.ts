import { Injectable } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";


@Injectable()
export class CommentFormService{
  commentForm: FormGroup = new FormGroup({
    comment: new FormControl('', [Validators.required])
  })

}
