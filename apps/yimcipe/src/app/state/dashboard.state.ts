import { GetAllData } from './../actions/dashboard.actions';
import { State, Action, StateContext } from "@ngxs/store";

import { GetProfile, GetCategories, GetRecipes } from "../actions/dashboard.actions";

export class DashboardStateModel {
  recipes!: any[]
  profile!: any
  categories!: any[]
}

@State<DashboardStateModel>({
  name: 'Dashboard',
  defaults: {
    recipes: [],
    profile: {},
    categories: []
  }
})

export class DashboardState {

  @Action(GetAllData)
  getRecipes({getState, setState}: StateContext<DashboardStateModel>, {payload}: GetAllData){
    const state = getState()
    setState({
      recipes: [...payload.recipes],
      profile: payload.profile,
      categories: [...payload.categories]
    })
  }

}
