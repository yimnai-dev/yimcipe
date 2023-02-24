import { BehaviorSubject } from 'rxjs';
import { Injectable } from "@angular/core";
import { HttpService } from "../http/http.service";

@Injectable()
export class VoteService {

  voteBaseUrl = 'recipes/vote'
  votes: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(private readonly http: HttpService){}

  vote(payload: {recipeId: string; voterId: string; voteType: 'upvote' | 'downvote'}){
    return this.http.post(`${this.voteBaseUrl}/make-vote?voterId=${payload.voterId}&recipeId=${payload.recipeId}&voteType=${payload.voteType}`)
  }

  getVotes(){
    return this.http.get(`${this.voteBaseUrl}/all`)
  }
  getAllVotes(){
    this.getVotes().subscribe((result: any) => {
      this.votes.next(result.votes)
    })
  }

}
