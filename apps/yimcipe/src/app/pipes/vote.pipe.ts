import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'vote',
  standalone: true,
  pure: false
})
export class VotePipe implements PipeTransform {
  transform(votes: any[], type: string, recipeId: string) {
  let result: any[] = [];
  if(type === 'upvote'){
    result = votes.filter((vote: any) => vote.upvote === 1)
  }
  if(type === 'downvote'){
    result = votes.filter((vote: any) => vote.downvote === 1)
  }
  return result.length
  }
}

// type any = {downvote: number; upvote: number; voterId: string; recipeId: string;}
