export class CreateUser {
  static readonly type = '[USER] Create'
  constructor(public payload: unknown){}
}

export class LoginUser {
  static readonly type = '[USER] Login'
  constructor(public payload: unknown){}
}

export class LogoutUser {
  static readonly type = '[USER] Logout'
  constructor(){}
}
