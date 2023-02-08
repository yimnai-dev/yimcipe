export class GetProfile {
  static readonly type = "[PROFILE] Get User Profile"
  constructor(payload: unknown){}
}

export class GetRecipes {
  static readonly type = "[RECIPES] Get All Recipes"
  constructor(payload: unknown){}
}


export class GetCategories {
  static readonly type = "[CATEGORIES] Get All Categories"
}

export class GetAllData {
  static readonly type = "[DATA] Get all required dashboard data"
  constructor(public payload: {recipes: any[], categories: any[], profile: any}){}
}
