import { BehaviorSubject } from 'rxjs';
import { Injectable } from "@angular/core";
import { HttpService } from "../http/http.service";

@Injectable()
export class VoteService {

  voteBaseUrl = 'recipes/vote'
  votes: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  constructor(private readonly http: HttpService){}

  vote(payload: {recipeId: string; voterId: string; voteType: 'upvote' | 'downvote'}){
    return this.http.post(`${this.voteBaseUrl}/make-vote?voteType=${payload.voteType}&recipeId=${payload.recipeId}&voterId=${payload.voterId}`)
  }

  getVotes(){
    return this.http.get(`${this.voteBaseUrl}/all`)
  }

}
