import { Injectable } from "@angular/core";
import { HttpService } from "../http/http.service";

@Injectable()
export class CommentService {
  constructor(private http: HttpService) {}

  commentBaseUrl = 'recipes/comments'

  makeComment(payload: {commenterId: string, recipeId: string, comment: string}){
    return this.http.post(`${this.commentBaseUrl}/make-comment`, {...payload})
  }
}
