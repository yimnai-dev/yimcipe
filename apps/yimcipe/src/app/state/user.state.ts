import { State, Action, StateContext } from "@ngxs/store";
import { CreateUser, LogoutUser, LoginUser } from "../actions/user.actions";

export class UserStateModel {
  user: unknown
}

@State<UserStateModel>({
  name: 'User',
  defaults: {
    user: {}
  }
})
export class UserState {

  @Action(CreateUser)
  create({getState, patchState}: StateContext<UserStateModel>, {payload}: CreateUser){
    const state = getState()
    patchState({
      user: [state.user, payload]
    })
  }

  @Action(LoginUser)
  login({getState, patchState}: StateContext<UserStateModel>, {payload}: LoginUser){
    const state = getState()
    patchState({
      user: [state.user, payload]
    })
  }

  @Action(LogoutUser)
  logout({getState, patchState}: StateContext<UserStateModel>){
    const state = getState()
    patchState({
      user: {}
    })
  }


}

